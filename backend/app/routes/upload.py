from fastapi import APIRouter, UploadFile, File
import shutil
from app.services.pdf_loader import extract_text_from_pdf
from app.services.rag_pipeline import store_embedding
from app.services.rag_pipeline import chunk_text

router = APIRouter()

@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text_from_pdf(file_path)
    chunks = chunk_text(text)

    for chunk in chunks:
        store_embedding(chunk)

    return {"message": "File processed and stored"}