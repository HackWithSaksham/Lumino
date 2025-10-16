<!-- LUMINO README -->

<div align="center">
  
# 🌟 **Lumino**
### *Collaborate. Create. Connect.*

> A real-time productivity and collaboration platform to brainstorm, organize, and bring ideas to life.  
> Featuring **Mindmaps**, **Autosave**, **Live Chat**, **AI Suggestions**, and **Multi-user Collaboration** — Lumino helps teams work smarter, not harder.

[![GitHub stars](https://img.shields.io/github/stars/HackWithSaksham/Lumino?color=gold&style=for-the-badge)](https://github.com/HackWithSaksham/Lumino/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/HackWithSaksham/Lumino?color=teal&style=for-the-badge)](https://github.com/HackWithSaksham/Lumino/forks)
[![GitHub issues](https://img.shields.io/github/issues/HackWithSaksham/Lumino?color=orange&style=for-the-badge)](https://github.com/HackWithSaksham/Lumino/issues)

</div>

---

## 🪄 About Lumino

**Lumino** is an interactive platform built to empower **teams, creators, and thinkers** to collaborate in real time.  
It merges structured documentation with visual mindmaps, enabling **clear thinking and smooth collaboration** — all in one place.

Whether you’re building a startup, planning content, or brainstorming ideas — Lumino gives your thoughts *structure and visibility.*

---

## ⚡ Key Features

| ✨ Feature | 💬 Description |
|-------------|----------------|
| 🧠 **Mindmaps** | Create and visualize interconnected ideas with intuitive mapping. |
| 💬 **Live Chat** | Chat and collaborate in real-time with your teammates. |
| 🔄 **Autosave** | Every keystroke is saved — never lose your progress again. |
| 🤝 **Multi-User Collaboration** | Edit and build together in the same workspace. |
| 🧩 **Add Sections** | Insert, reorder, and nest sections for structured thinking. |
| 🏷️ **Categorization** | Tag your ideas — Comedy, Fantasy, Romance, Tech, and more. |
| 🌗 **Dark / Light Mode** | Comfortable on eyes — switch seamlessly between themes. |
| 🧭 **Minimal, Modern UI** | Distraction-free workspace with a fluid design. |
| 🤖 **AI Media Suggestions** | Get automatic image, GIF, and video suggestions based on your written content using **Gemini API** or **GPT-4/GPT-4o**. |
| 💡 **AI Idea Recommender** | Receive intelligent idea recommendations related to your current topic or note. |
| 👤 **User Profile System** | Every user has a customizable profile with activity logs and progress tracking. |
| 🏅 **Badges & Milestones** | Unlock badges for milestones like “Top Contributor” or “5 Ideas Created.” |
| 🏆 **Rank System** | Earn ranks based on your activity, ideas shared, and collaboration impact. |
| 🔥 **Daily Streaks** | Maintain your daily streaks to boost productivity and engagement! |

---

## 🧰 Tech Stack

<div align="center">

| Layer | Technologies Used |
|--------|------------------|
| 💻 **Frontend** | React · TailwindCSS · ShadCN/UI |
| ⚙️ **Backend** | Node.js (Express.js) · Python (FastAPI) |
| 🗄️ **Database** | MongoDB |
| 🔌 **Realtime** | Socket.io |
| 🧠 **AI / LLMs** | Gemini API · OpenAI GPT‑4/GPT‑4o (structured output via Pydantic SDK) |
| ☁️ **Secrets & Config** | python-dotenv |
| ☁️ **Hosting** | Vercel · Render · Railway |

</div>

---

## 📁 Folder Structure

The **Lumino** project is organized into three main layers — `client`, `server`, and `app`, ensuring clear separation between frontend, backend, and AI services.

```bash
Lumino/
│
├── app/                         # 🧠 AI microservice layer (Python FastAPI)
│   ├── ai_service.py             # Handles AI response generation & logic
│   ├── main.py                   # FastAPI entry point
│   ├── schemas.py                # Pydantic models for structured LLM responses
│
├── client/                      # 💻 Frontend (React + Vite)
│   ├── Lumino/
│   │   ├── components/           # Reusable UI components (cards, modals, etc.)
│   │   ├── context/              # React Context API (AppContent, global state)
│   │   ├── pages/                # Main app pages (Home, Mindmaps, Chat, etc.)
│   │   ├── public/               # Static assets (logos, icons, images)
│   │   ├── src/                  # Entry scripts & utilities
│   │   ├── index.html            # Main HTML template
│   │   ├── package.json          # Frontend dependencies
│   │   ├── vite.config.js        # Vite configuration
│   │   └── README.md             # Frontend documentation
│
├── server/                      # ⚙️ Backend (Node.js + Express)
│   ├── config/                   # Database connection and environment config
│   ├── Controller/               # Core logic for routes and operations
│   ├── flags/                    # Optional settings, toggles, and constants
│   ├── Models/                   # Mongoose schemas for MongoDB
│   ├── Routes/                   # Express routes (auth, ideas, collaboration, etc.)
│   ├── uploads/                  # Stored uploaded files (if any)
│   ├── server.js                 # Entry point for backend server
│   ├── userAuth.js               # JWT middleware for authentication
│   ├── package.json              # Backend dependencies
│   └── .env                      # Backend environment variables
│
├── .gitignore                   # Ignored files for Git
├── README.md                    # Main project documentation
├── requirements.txt              # Python dependencies (for FastAPI service)
└── package.json                 # Root-level dependency metadata
```

### 🧭 Overview
| Section | Description |
|----------|-------------|
| **app/** | AI logic layer using FastAPI and Gemini/GPT APIs. |
| **client/** | Frontend built with React + Tailwind + ShadCN/UI. |
| **server/** | Backend using Node.js, Express.js, and MongoDB. |
| **requirements.txt** | Lists Python dependencies for AI microservice. |
| **.env** | Environment configuration files for secrets and URLs. |

---

## 🧩 Architecture Overview

The architecture of Lumino follows a **three-layered structure**, where each layer communicates seamlessly:

1️⃣ **Client (React)** — Handles the UI and real-time interaction using Socket.io.  
2️⃣ **Server (Node.js)** — Manages routes, authentication, and database operations.  
3️⃣ **App (FastAPI)** — Provides AI-assisted features using Gemini / GPT models.

Together, these layers create a smooth workflow from **frontend interactions → backend processing → AI augmentation**.

---

## ⚙️ Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/HackWithSaksham/Lumino.git
cd Lumino
```

### 2️⃣ Install Dependencies

#### Frontend
```bash
cd client/Lumino
npm install
npm run dev
```

#### Backend
```bash
cd server
npm install
npm run server
```

### 3️⃣ Environment Setup
Create a `.env` file in the project root or inside respective folders:

```bash
VITE_BACKEND_URL=http://localhost:4000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret_key
NODE_ENV=development  
SMTP_USER=your_smtp_username   
SMTP_PASS=your_smtp_password    
SENDER_EMAIL=your_email_address
```

Then open [http://localhost:5173](http://localhost:5173) in your browser 🚀

---

## 👤 Author
**Saksham Garg**  
🎓 Developer | 💻 Innovator | 🌐 Tech Enthusiast  

<div align="center">

⭐ If you like Lumino, give it a star!  
Made with ❤️ by Saksham Garg

</div>
