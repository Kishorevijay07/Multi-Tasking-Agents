from app.services.rag_pipeline import search_similar
from app.services.llm_service import call_llm

def research_agent(task: str, history: str = ""):
    context_chunks = search_similar(task)
    context = "\n".join(context_chunks)

    prompt = f"""
    You are a Research Agent.

    Task:
    {task}

    Chat History:
    {history}

    Relevant Context:
    {context}

    Use the context and chat history to give an accurate answer.
    """

    return call_llm(prompt)