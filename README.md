# ID Solutions

**ID Solutions** — TTPS case analysis platform for evidence review, statutory element assessment, and King's Counsel-style cross-examination report generation.

## Live site

Deploy the `web/` Next.js app to Vercel. API routes mirror the Python FastAPI backend for serverless deployment.

## Web app (Vercel)

```powershell
cd web
npm install
npm run dev
```

Open http://localhost:3000

### API endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/analyze-case` | Analyze evidence against offence elements |
| POST | `/api/generate-report` | Download case analysis as DOCX |

## Python backend (local)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

## Node backend (optional)

```powershell
cd backend
npm install
```

Use `docxGenerator.js` and `routes/report.js` with Express if preferred.

## Disclaimer

Decision-support only — not legal advice. All outputs require review by qualified legal counsel before court use.
