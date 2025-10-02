from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["recommendations"])


class RecommendationRequest(BaseModel):
    summoner_name: str
    region: str = "na1"


@router.post("/recommendations/champion")
async def get_champion_recommendation(request: RecommendationRequest):
    """Get champion recommendation (placeholder)"""
    return {
        "summoner": request.summoner_name,
        "region": request.region,
        "recommendation": {
            "champion": "Ahri",
            "reason": "High winrate in current meta",
            "confidence": 0.85
        },
        "message": "This is a placeholder response. Agent system not yet implemented."
    }


@router.post("/recommendations/build")
async def get_build_recommendation(request: RecommendationRequest):
    """Get item build recommendation (placeholder)"""
    return {
        "summoner": request.summoner_name,
        "region": request.region,
        "build": {
            "items": ["Luden's Tempest", "Sorcerer's Shoes", "Void Staff"],
            "runes": ["Electrocute", "Sudden Impact", "Eyeball Collection"]
        },
        "message": "This is a placeholder response. Agent system not yet implemented."
    }

