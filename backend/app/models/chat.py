
from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.db import Base

class Chat(Base):
    __tablename__ = "chats"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)