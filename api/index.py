import os
import sys

# Add the backend directory to sys.path so that absolute imports work
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from main import app
