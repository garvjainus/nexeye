from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application configuration loaded from environment variables"""
    
    # API Configuration
    api_title: str = "Nexeye API"
    api_version: str = "0.1.0"
    
    # MongoDB
    mongodb_url: str = ""
    mongodb_db_name: str = "nexeye"
    
    # External APIs
    riot_api_key: str = ""
    openai_api_key: str = ""
    
    # Server
    host: str = "127.0.0.1"
    port: int = 8000
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()

