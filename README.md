# AI Frontend — Improved

This is an improved, minimal React + Vite frontend for image generation.
It demonstrates:
- separation of API layer (`src/lib/api.ts`)
- provider switching via context
- improved error handling and UX basics
- instructions to deploy and push to Git

**Important:** Do NOT put API keys in client-side code for production. Use a backend proxy.

## Quick start

1. Install
```bash
npm install
```

2. Dev
```bash
npm run dev
```

3. Build
```bash
npm run build
```

## To push to your GitHub repository

```bash
# in project dir
git init
git add .
git commit -m "Improved frontend refactor"
# replace <your-repo-url> with your GitHub repo (HTTPS)
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

If you want me to produce a patch you can apply to your existing repo instead, tell me and I'll generate a diff.
