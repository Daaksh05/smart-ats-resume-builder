import os
import sys

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add the backend directory to sys.path
try:
    backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend')
    sys.path.append(backend_path)
    logger.info(f"Added {backend_path} to sys.path")
    from main import app
    logger.info("Successfully imported FastAPI app")
except Exception as e:
    logger.error(f"Failed to load backend: {e}")
    raise e
