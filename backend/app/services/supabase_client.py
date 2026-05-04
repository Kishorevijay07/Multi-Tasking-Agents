from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = "https://your-project.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)