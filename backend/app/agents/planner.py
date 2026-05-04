from app.services.llm_service import call_llm

def planner_agent(user_input: str):
    prompt = f"""
    You are a Planner Agent.

    Break the user request into clear step-by-step tasks.

    User request:
    {user_input}

    Return steps as numbered list.
    """

    return call_llm(prompt)