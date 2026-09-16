---
name: deploy-dogtrial
description: Ship a change to www/index.html — regenerate the Claude Artifact fragment and the standalone PWA bundle, then deploy both. Use after any edit to the DogTrial app.
---

DogTrial is a single-file app at `www/index.html`. Every change gets pushed to three places: git, a Claude Artifact, and the live PWA at dogtrial.dog/app/. Do these steps in order.

## 0. Verify first

Before deploying, confirm the change actually works:

```bash
node -e "
var fs = require('fs');
var html = fs.readFileSync('www/index.html', 'utf8');
var script = html.match(/<script>([\s\S]*)<\/script>/)[1];
new Function(script);
console.log('OK');
"
```

If the change is user-visible, test it in the Browser pane against the local dev server (port 8934) and check `read_console_messages` for errors before continuing.

## 1. Commit and push

```bash
git add -A
git commit -m "..."
git push origin main
```

## 2. Regenerate the Artifact fragment

The Artifact needs a bare fragment — `www/index.html` minus `<!DOCTYPE>`, `<html>`, `</html>`, `<head>`, `</head>`, `<meta charset>`, `<body...>`, `</body>`. Everything else (styles, scripts, other meta/link tags) stays untouched — do NOT strip the whole `<head>...</head>` block, only those exact lines, or the CSS disappears.

```bash
python3 -c "
with open('www/index.html', 'r') as f:
    lines = f.readlines()
out = []
for line in lines:
    stripped = line.strip()
    if stripped.startswith('<!DOCTYPE'): continue
    if stripped.startswith('<html'): continue
    if stripped == '</html>': continue
    if stripped == '<head>': continue
    if stripped == '</head>': continue
    if stripped.startswith('<meta charset'): continue
    if stripped.startswith('<body'): continue
    if stripped == '</body>': continue
    out.append(line)
with open('/tmp/dogtrial_artifact_fragment.html', 'w') as f:
    f.writelines(out)
print('done', len(out))
"
```

Publish it with the Artifact tool, `action: "publish"`, `url: "https://claude.ai/code/artifact/73cfcc13-18df-4121-a0c1-c17d3156d22a"`.

If `www/media/**` has new or changed files referenced by relative path (e.g. training videos), pass them via the `files` map on the same publish call, e.g. `{"media/training/sit.mp4": "www/media/training/sit.mp4"}` — only include files that are new or changed since the last publish.

## 3. Rebuild the standalone PWA bundle

The deploy directory is `/tmp/dogtrial-site-deploy` (may not survive a host reboot — if missing, recreate it by curling the currently-live files from dogtrial.dog rather than guessing, so an incomplete directory doesn't regress the live site: root `index.html`, `app/manifest.json`, `app/icon-192.png`, `app/icon-512.png`, `app/apple-touch-icon.png`).

Copy the source and inject the PWA head tags right after the `mobile-web-app-capable` meta tag:

```bash
python3 -c "
with open('www/index.html', 'r') as f:
    content = f.read()

marker = '<meta name=\"mobile-web-app-capable\" content=\"yes\">'
inject = marker + '\n' + '''<meta name=\"theme-color\" content=\"#5B6EF5\">
<link rel=\"manifest\" href=\"/app/manifest.json\">
<link rel=\"apple-touch-icon\" href=\"/app/apple-touch-icon.png\">'''

assert content.count(marker) == 1
content = content.replace(marker, inject, 1)

with open('/tmp/dogtrial-site-deploy/app/index.html', 'w') as f:
    f.write(content)
print('done')
"
```

If `www/media/` has files not yet in the deploy dir, copy them over too:

```bash
mkdir -p /tmp/dogtrial-site-deploy/app/media/training
cp www/media/training/*.mp4 /tmp/dogtrial-site-deploy/app/media/training/
```

Syntax-check the copied file the same way as step 0, pointed at `/tmp/dogtrial-site-deploy/app/index.html`.

## 4. Deploy the PWA

```bash
cd /tmp/dogtrial-site-deploy && npx wrangler pages deploy . --project-name=dogtrial --commit-dirty=true
```

## 5. Confirm it's live

```bash
curl -s https://dogtrial.dog/app/ | grep -c "<something distinctive about this change>"
```

For new media files, check each one directly:

```bash
curl -s -o /dev/null -w "%{http_code}\n" "https://dogtrial.dog/app/media/training/<file>.mp4"
```

Report back with what changed and confirmation it's live — don't just say "done", show the proof (test result, curl output, or screenshot).
