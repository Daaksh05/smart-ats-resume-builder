import os
import sys

# Set Vercel environment variable explicitly
os.environ["VERCEL"] = "1"

# Add the backend directory to sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_path = os.path.join(current_dir, '..', 'backend')
backend_path = os.path.normpath(backend_path)

if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

# Import the FastAPI app
from main import app
