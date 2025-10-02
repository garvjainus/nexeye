# Nexeye Setup Guide - Step-by-Step

This guide walks you through getting Nexeye running from scratch.

## Step 1: Get API Keys

### MongoDB Atlas (Database)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (free tier M0 works)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)

### Riot Developer API
1. Go to https://developer.riotgames.com/
2. Sign in with your Riot account
3. Register your application
4. Copy your API key from the dashboard

### OpenAI API
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API keys section
4. Create new API key
5. Copy the key (starts with `sk-`)

## Step 2: Install Prerequisites

### Check if you have Python 3.10+
```bash
python3 --version
```

If not installed or version is too old:
- **macOS**: `brew install python@3.11`
- **Windows**: Download from https://www.python.org/downloads/
- **Linux**: `sudo apt install python3.11` or equivalent

### Check if you have Node.js 18+
```bash
node --version
```

If not installed:
- **macOS**: `brew install node`
- **Windows**: Download from https://nodejs.org/
- **Linux**: `sudo apt install nodejs npm` or use nvm

## Step 3: Setup Backend

```bash
# Navigate to the backend directory
cd backend

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
```

**Edit `backend/.env`** with your actual values:
```bash
# Use nano, vim, or any text editor
nano .env
```

Paste your values:
```
HOST=127.0.0.1
PORT=8000
MONGODB_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB_NAME=nexeye
RIOT_API_KEY=RGAPI-your-key-here
OPENAI_API_KEY=sk-your-key-here
```

Save and exit (Ctrl+O, Enter, Ctrl+X in nano).

## Step 4: Run Backend

```bash
# Make sure you're still in backend/ with venv activated
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

You should see:
```
🚀 Nexeye API v0.1.0 starting up...
📡 Server running on http://127.0.0.1:8000
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

**Test it**: Open http://127.0.0.1:8000/api/health in your browser
- Should return: `{"status":"healthy","service":"Nexeye API"}`

**Keep this terminal running** - open a new one for the next step.

## Step 5: Setup Client

**In a new terminal window:**

```bash
# Navigate to client directory
cd client

# Install Node dependencies
npm install
```

This will install Electron and other dependencies.

## Step 6: Run Client

```bash
# Still in client/ directory
npm start
```

The Electron application should launch!

## Step 7: Test the App

1. **Check Connection Status**
   - Top-right corner should show green dot and "Connected"
   - If yellow/red, make sure backend is running (Step 4)

2. **Try a Recommendation**
   - Enter any summoner name (e.g., "Faker")
   - Select region (e.g., "Korea")
   - Click "Get Champion Recommendation"

3. **See Placeholder Results**
   - You should see a recommendation appear
   - Note: This is dummy data - real AI not implemented yet

## Development Mode

To run the client with Developer Tools (for debugging):
```bash
cd client
npm run dev
```

This opens Chrome DevTools so you can see console logs and network requests.

## Stopping the Application

- **Client**: Close the Electron window or press Ctrl+C in the terminal
- **Backend**: Press Ctrl+C in the terminal where uvicorn is running

## Common Issues

### "ModuleNotFoundError" when starting backend
- Make sure virtual environment is activated
- Try: `pip install -r requirements.txt` again

### "Cannot find module" in client
- Delete `node_modules/` folder
- Run `npm install` again

### Backend starts but client shows "Backend Offline"
- Check backend is on port 8000: http://127.0.0.1:8000/api/health
- Check firewall isn't blocking port 8000
- Check backend terminal for error messages

### "Invalid API key" errors (future, when implementing features)
- Double-check `.env` file has correct keys
- No quotes around values in `.env`
- Restart backend after changing `.env`

## Next Session

Now that you have the skeleton running, you can start implementing:
1. MongoDB connection and schema
2. Riot API integration
3. LangGraph multi-agent pipeline
4. RAG implementation
5. Real recommendations

## File Structure Reference

```
nexeye/
├── backend/
│   ├── venv/              # Virtual environment (don't commit)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py        # FastAPI app
│   │   ├── config.py      # Settings
│   │   └── routes/        # API endpoints
│   ├── requirements.txt   # Python dependencies
│   └── .env              # YOUR API KEYS (don't commit!)
│
└── client/
    ├── node_modules/      # Node packages (don't commit)
    ├── src/
    │   ├── main.js        # Electron main
    │   ├── preload.js     # Security bridge
    │   └── renderer/      # UI files
    └── package.json       # Node dependencies
```

## Getting Help

- Check the main README.md for architecture details
- Review the PRD (prd.md) for project requirements
- Backend logs: Check the terminal where uvicorn is running
- Client logs: Use `npm run dev` and check Developer Tools console

Happy coding! 🚀

