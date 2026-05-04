import uuid
from fastapi import APIRouter
from app.agents.orchestrator import run_agents

router = APIRouter()

@router.post("/")
def chat(data: dict):
    user_input = data.get("message")

    chat_id = data.get("chat_id")

    # If no chat_id → create one
    if not chat_id:
        chat_id = str(uuid.uuid4())

    result = run_agents(user_input, chat_id)

    return {
        "chat_id": chat_id,
        "response": result
    }