from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import health, recommendations

# Initialize FastAPI app
app = FastAPI(
    title=settings.api_title,
    version=settings.api_version
)

# CORS middleware for Electron client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router)
app.include_router(recommendations.router)


@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    print(f"🚀 {settings.api_title} v{settings.api_version} starting up...")
    print(f"📡 Server running on http://{settings.host}:{settings.port}")


@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    print("👋 Shutting down Nexeye API...")

