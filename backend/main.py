from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analysis import router as analysis_router
from routes.report import router as report_router

app = FastAPI(title="ID Solutions API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis_router)
app.include_router(report_router)
