from app.agents.planner import planner_agent
from app.agents.researcher import research_agent
from app.agents.executor import execution_agent
from app.services.chat_service import save_message, get_chat_history, ensure_chat_exists

def run_agents(user_input: str, chat_id: str):

    # 1. Ensure chat exists and get history
    ensure_chat_exists(chat_id)
    messages = get_chat_history(chat_id)

    history_text = ""
    for m in messages:
        history_text += f"{m.role}: {m.content}\n"

    # 2. Plan
    plan = planner_agent(user_input)

    # 3. Research with memory
    research = research_agent(plan, history_text)

    # 4. Execute
    result = execution_agent(plan, research)

    # 5. Save messages
    save_message(chat_id, "user", user_input)
    save_message(chat_id, "assistant", result)

    return result