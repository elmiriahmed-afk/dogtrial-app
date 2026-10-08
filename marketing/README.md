# Marketing orchestrator (Claude + OpenAI)

Runs the project's marketing agents (`.claude/agents/*.md`) through the Anthropic and OpenAI APIs: one model drafts, the other reviews, the first revises. Nothing is published automatically; results are saved in `marketing/out/` (git-ignored).

## Setup (once)
1. Create `.env.local` at the repo root (git-ignored — never commit it, never paste keys in a chat):
   ```
   ANTHROPIC_API_KEY=...
   OPENAI_API_KEY=...
   OPENAI_MODEL=<the OpenAI model name you want to use>
   # optional: ANTHROPIC_MODEL=claude-sonnet-5-5
   ```
2. API usage is billed separately from Claude and ChatGPT subscriptions. Set spending limits in both consoles.

## Run
```
node marketing/run.mjs --dry-run post "Launch announcement, Instagram, FR + EN"   # shows prompts, no cost
node marketing/run.mjs post "Launch announcement, Instagram, FR + EN"
node marketing/run.mjs store-listing "Rewrite the App Store subtitle and keywords, EN-US and FR"
node marketing/run.mjs video-brief "3 Reels ideas for launch week"
```

## Edit
- `context.md` — product facts and availability. Update it when facts change (EU launch, Android approval, pricing).
- `pipelines.json` — steps, agent per step, provider per step.
- The agents themselves live in `.claude/agents/`; edits there apply to both Claude Code and this script.
