# Inshorts Clone Web App

A full-stack web application that scrapes news from Inshorts and displays it in a beautiful React interface.

## Project Structure
- `/frontend`: Vite + React + Tailwind CSS v4
- `/backend`: Flask News API

## Setup and Running

### Prerequisites
- Node.js (for frontend)
- Python 3 (for backend)

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Run the App
You can run both servers simultaneously using the provided Python script:
```bash
python run_app.py
```
Or manually:
- Backend: `cd backend && python app.py` (runs on port 5000)
- Frontend: `cd frontend && npm run dev` (runs on port 5173)

## Features
- Category-wise news filtering
- Responsive design
- Real-time scraping
- Fast UI with Vite and React
