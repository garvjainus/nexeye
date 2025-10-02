# Nexeye – Product Requirements Document (LLM Context)

## Overview
Nexeye is a **desktop application** built with **Electron** (client) and **FastAPI** (backend). It analyzes **League of Legends** match history, player stats, and professional games. The system provides **champion picks, item builds, and strategy tips**. It uses a **LangGraph multi-agent pipeline** with **retrieval-augmented generation (RAG)** over pro and user datasets. A **MongoDB Atlas** backend with indexing and caching ensures real-time performance.

---

## Goals
- Deliver **personalized, context-aware recommendations**.  
- Use **multi-agent reasoning** for adaptive analysis.  
- Integrate both **user match history** and **pro match data** into RAG.  
- Maintain **low-latency performance** and cross-platform access.  

---

## Architecture

### Client
- **Electron** desktop app.  
- Displays recommendations, analytics, and performance dashboards.  
- Communicates with backend via HTTP and WebSocket.  

### Backend
- **FastAPI** service layer.  
- Orchestrates LangGraph agents.  
- Manages API calls to external data sources.  

### AI/ML Layer
- **LangGraph multi-agent system**:  
  - **User Data Agent** – retrieves match history and stats via Riot API.  
  - **Pro Data Agent** – fetches professional match data via Leaguepedia API.  
  - **Recommendation Agent** – fuses both data sources with RAG + OpenAI API.  
- **RAG Implementation**:  
  - Embedding search over user and pro datasets.  
  - Context fusion to produce personalized recommendations.  
  - Generation step with OpenAI API for natural language outputs.  

### Data Layer
- **MongoDB Atlas**.  
- Stores:  
  - User match histories.  
  - Pro match datasets.  
  - Cached queries.  
  - Embeddings for retrieval.  
- Optimizations: indexed queries and caching for 70% faster responses.  

---

## Tools / Integrations
- **Riot Developer API**: fetch player match data and statistics.  
- **Leaguepedia API**: retrieve pro match data and meta insights.  
- **Embedding + retrieval pipeline**: unify user and pro data into context-aware results.  

---

## Data Flow
1. User requests recommendation (e.g., champion, build, or strategy).  
2. Backend triggers LangGraph pipeline.  
3. **User Data Agent** fetches history (Riot API).  
4. **Pro Data Agent** fetches relevant pro match data (Leaguepedia API).  
5. **RAG**: embeddings retrieved + fused into unified context.  
6. **Recommendation Agent** generates personalized outputs via OpenAI API.  
7. Electron client displays recommendations and analytics.  

---

## Requirements
- Latency: **<200ms** average query time.  
- Caching: frequent queries must hit cache for speed.  
- Scalability: handle **hundreds of concurrent users** smoothly.  
- Resilience: fallback logic if external APIs fail.  

---

## Dependencies
- **Electron** – cross-platform client.  
- **FastAPI** – backend orchestration.  
- **LangGraph** – multi-agent reasoning pipeline.  
- **OpenAI API** – language + reasoning.  
- **MongoDB Atlas** – database + cache.  
- **Riot Developer API** – user match history.  
- **Leaguepedia API** – professional match data.  

---

## Example Use Cases
- **Champion Recommendation**: Suggest based on player winrate, matchup data, and pro meta trends.  
- **Item Build Path**: Recommend progression optimized for opponent comp.  
- **Strategy Tips**: Provide playstyle guidance using fused user + pro insights.  

---

## Future Extensions
- Real-time live-game adaptation.  
- Team synergy analysis (multi-player recommendations).  
- Advanced visual dashboards (heatmaps, timelines, comparative stats).  
