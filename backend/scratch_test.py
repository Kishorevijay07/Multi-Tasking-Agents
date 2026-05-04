import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.routes.chat import chat
try:
    res = chat({"message": "Hello"})
    print("Success:", res)
except Exception as e:
    import traceback
    traceback.print_exc()
