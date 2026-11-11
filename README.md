# Learning Studio

An English-language HTML, CSS and JavaScript learning website for the Web Technology course.

## Run locally

Open this folder in VS Code and choose **Terminal → Run Task → Preview Learning Studio**, or run:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Visit http://127.0.0.1:8000. A web server is required because `nav.js` fetches the shared `nav.html`; opening HTML files directly through `file://` does not support this fetch. VS Code Live Server also works.

## Pages and interactions

- `index.html`: overview and an original, local SVG hero image.
- `quotes.html`: 16 original Learning Studio quotations, all readable without JavaScript. The hero randomly selects a quotation on load and on each click without consecutive repeats. The page labels the original writing explicitly.
- `project.html`: five future project ideas with HTML, CSS and JavaScript filters. `projects.html` preserves the former address with a redirect.
- `machine.html`: a useless machine that switches itself off after 1.8 seconds.
- `contact.html`: a feedback drafting exercise that downloads a text file. It does not send messages, use a fictional mailbox, or store drafts on a server.

Navigation markup lives only in `nav.html`; `nav.js` inserts it and binds menu/theme controls. Theme storage is optional. Navigation failure provides a retry action. All five pages share responsive layouts, keyboard focus, a skip link, theme controls and site identity assets.

## Assets and submission

See `submission/course-entry.md` for ready-to-copy platform text and the five required image locations. `submission/checklist.md` records local completion and the external steps still required. `submission/verification.txt` contains the browser-check results.

`assets/hero.svg`, `assets/og-cover.jpg`, `assets/app-icon.png`, and `assets/favicon.png` were created for this project. The quotations are original Learning Studio copy, not historical quotations. The page fonts are DM Sans and Manrope, requested from Google Fonts, with local sans-serif fallbacks if the request is unavailable. No external photographs are used.

## Development tools

Git is initialized independently in this folder on `main`. VS Code extension recommendations are in `.vscode/extensions.json`; OpenAI Codex and Claude Code were detected in the local VS Code installation. Account login and extension access are user-managed. Use the assistant to explain or review code, and check its changes in the browser and with `git diff`.

JavaScript syntax checks:

```sh
node --check app.js
node --check nav.js
```

Deployment and uploads are deliberately left to the owner. Once the real site URL is confirmed, use an absolute `og:image` URL in each page for reliable social previews; the image file is already supplied.
