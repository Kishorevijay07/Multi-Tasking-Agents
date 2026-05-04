from app.database.db import SessionLocal
from app.models.message import Message
from app.models.chat import Chat
from app.models.user import User

def ensure_chat_exists(chat_id):
    db = SessionLocal()
    chat = db.query(Chat).filter_by(id=chat_id).first()
    if not chat:
        new_chat = Chat(id=chat_id, title="New Chat")
        db.add(new_chat)
        db.commit()
    db.close()

def save_message(chat_id, role, content):
    db = SessionLocal()

    msg = Message(
        chat_id=chat_id,
        role=role,
        content=content
    )

    db.add(msg)
    db.commit()
    db.close()

def get_chat_history(chat_id):
    db = SessionLocal()

    messages = db.query(Message).filter_by(chat_id=chat_id).all()

    db.close()

    return messages