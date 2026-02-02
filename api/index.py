import os
import sys
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Set Vercel environment variable explicitly
os.environ["VERCEL"] = "1"

# Add the backend directory to sys.path
backend_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'backend')
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)
    logger.info(f"Added {backend_path} to sys.path")

# Import the FastAPI app
try:
    from main import app
    logger.info("Successfully imported FastAPI app from main.py")
except Exception as e:
    logger.error(f"Failed to import FastAPI app: {e}")
    # Create a minimal fallback app
    from fastapi import FastAPI
    app = FastAPI()
    
    @app.get("/")
    def fallback_root():
        return {"error": str(e), "message": "Backend import failed"}
    
    @app.get("/api/health")
    def fallback_health():
        return {"status": "error", "error": str(e)}

# Handler for Vercel
handler = app
