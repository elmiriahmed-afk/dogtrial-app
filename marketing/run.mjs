import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnvFile(join(root, ".env.local"));

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const [pipelineName, ...rest] = args.filter((a) => a !== "--dry-run");
const brief = rest.join(" ").trim();

const pipelines = JSON.parse(readFileSync(join(here, "pipelines.json"), "utf8"));
if (!pipelineName || !pipelines[pipelineName] || !brief) {
  console.error('Usage: node marketing/run.mjs [--dry-run] <pipeline> "<brief>"');
  console.error("Pipelines: " + Object.entries(pipelines).map(([k, v]) => `${k} (${v.description})`).join("; "));
  process.exit(1);
}

const context = readFileSync(join(here, "context.md"), "utf8");

function agentPrompt(agent) {
  const file = readFileSync(join(root, ".claude", "agents", `${agent}.md`), "utf8");
  const body = file.replace(/^---[\s\S]*?---\s*/, "");
  return (
    body +
    "\n\n# Run environment\nYou are running through an API with no file, web or shell tools. " +
    "Use only the product facts below and the brief. Never invent facts; mark gaps as [TO CONFIRM].\n\n" +
    context
  );
}

async function callAnthropic(system, user) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("ANTHROPIC_API_KEY is not set (put it in .env.local)");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5",
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${data?.error?.message || "request failed"}`);
  return data.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
}

async function callOpenAI(system, user) {
  const key = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;
  if (!key) throw new Error("OPENAI_API_KEY is not set (put it in .env.local)");
  if (!model) throw new Error("OPENAI_MODEL is not set (put the model name you want to use in .env.local)");
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`OpenAI API ${res.status}: ${data?.error?.message || "request failed"}`);
  return data.choices[0].message.content;
}

const providers = { anthropic: callAnthropic, openai: callOpenAI };
const steps = pipelines[pipelineName].steps;
const outputs = [];
let log = `# ${pipelineName}\n\nBrief: ${brief}\n`;

for (const [i, step] of steps.entries()) {
  const system = agentPrompt(step.agent);
  const user = step.task
    .replaceAll("{{brief}}", brief)
    .replaceAll("{{prev}}", outputs[i - 1] ?? "")
    .replaceAll("{{first}}", outputs[0] ?? "");
  console.log(`[${i + 1}/${steps.length}] ${step.name} — agent ${step.agent} via ${step.provider}${dryRun ? " (dry run)" : ""}`);
  if (dryRun) {
    outputs.push(`<${step.name}: dry run, no API call>`);
    log += `\n## ${step.name} (${step.agent}, ${step.provider}) — DRY RUN\n\n### System prompt (${system.length} chars)\n${system.slice(0, 300)}...\n\n### User message\n${user}\n`;
    continue;
  }
  let text;
  try {
    text = await providers[step.provider](system, user);
  } catch (err) {
    console.error(`\nStep "${step.name}" failed: ${err.message}`);
    process.exit(1);
  }
  outputs.push(text);
  log += `\n## ${step.name} (${step.agent}, ${step.provider})\n\n${text}\n`;
}

const outDir = join(here, "out");
mkdirSync(outDir, { recursive: true });
const file = join(outDir, `${new Date().toISOString().replace(/[:.]/g, "-")}-${pipelineName}${dryRun ? "-dry" : ""}.md`);
writeFileSync(file, log);
console.log(`\nSaved: ${file}`);
if (!dryRun) console.log("\n=== FINAL ===\n" + outputs[outputs.length - 1]);
