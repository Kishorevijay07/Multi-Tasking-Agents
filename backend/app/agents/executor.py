from app.services.llm_service import call_llm

def execution_agent(task: str, research_data: str):
    prompt = f"""
    You are an Execution Agent.

    Task:
    {task}

    Research Data:
    {research_data}

    Perform the task and give final output.
    """

    return call_llm(prompt)