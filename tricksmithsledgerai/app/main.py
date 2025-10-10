from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from ai_service import AIMuseService

app = FastAPI()

class IdeaRequest(BaseModel):
    raw_idea: str
    category: str

@app.get("/")
def home():
    return {"message": "Welcome to Tricksmith's Ledger AI Muse!"}

@app.post("/api/v1/expand-idea")
async def expand_idea(request: IdeaRequest):
    service = AIMuseService()
    result = service.expand_idea(request.raw_idea, request.category)
    return {"result": result}