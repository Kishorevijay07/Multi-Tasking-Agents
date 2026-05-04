from sentence_transformers import SentenceTransformer
from app.database.db import engine
import psycopg2
import os

model = SentenceTransformer("all-MiniLM-L6-v2")

def generate_embedding(text: str):
    return model.encode(text).tolist()

def get_connection():
    return psycopg2.connect(os.getenv("DATABASE_URL"))

def store_embedding(text: str):
    embedding = generate_embedding(text)

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO embeddings (content, embedding) VALUES (%s, %s::vector)",
        (text, str(embedding))
    )

    conn.commit()
    cur.close()
    conn.close()


def search_similar(query: str):
    query_embedding = generate_embedding(query)

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT content
        FROM embeddings
        ORDER BY embedding <=> %s::vector
        LIMIT 5
        """,
        (str(query_embedding),)
    )

    results = cur.fetchall()

    cur.close()
    conn.close()

    return [r[0] for r in results]

def chunk_text(text, chunk_size=500):
    chunks = []
    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i+chunk_size])
    return chunks