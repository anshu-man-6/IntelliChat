# 🚀 IntelliChat

> A Full-Stack AI-Powered Conversational Platform built with React, Node.js, Express, MongoDB, and NVIDIA-hosted Large Language Models.

IntelliChat is a modern AI chat application inspired by ChatGPT. It provides a seamless conversational experience with persistent chat history, thread-based conversations, markdown support, syntax-highlighted code rendering, and real-time AI responses.

---

## ✨ Features

### 🤖 AI-Powered Conversations

* Real-time AI-generated responses
* Integration with NVIDIA-hosted Large Language Models
* Context-aware conversations

### 💬 Thread-Based Chat Management

* Create unlimited chat sessions
* Persistent conversation history
* Switch between previous conversations instantly
* Delete unwanted chat threads

### 📝 Rich Message Rendering

* Markdown support
* Syntax-highlighted code blocks
* Clean and readable message formatting

### 🎨 Modern User Interface

* Responsive design
* ChatGPT-inspired layout
* Smooth user experience
* Loading indicators and typing animations

### 🗄️ Persistent Storage

* MongoDB database integration
* Secure storage of conversations
* Automatic thread management

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Context API
* React Markdown
* Rehype Highlight
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### AI Integration

* NVIDIA Inference API
* Llama / Nemotron Models

---

## 📂 Project Structure

```bash
IntelliChat/
│
├── Frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── Backend/
│   ├── routes/
│   ├── model/
│   ├── APIcall.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/IntelliChat.git
cd IntelliChat
```

---

### 2️⃣ Install Frontend Dependencies

```bash
cd Frontend
npm install
```

---

### 3️⃣ Install Backend Dependencies

```bash
cd ../Backend
npm install
```

---

### 4️⃣ Configure Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

NVIDIA_API_KEY=your_nvidia_api_key
```

---

### 5️⃣ Start Backend

```bash
npm run dev
```

---

### 6️⃣ Start Frontend

```bash
cd ../Frontend
npm run dev
```

---

## 🚀 Future Enhancements

* Streaming AI responses
* Voice-to-Text support
* Text-to-Speech support
* User Authentication
* Dark / Light Theme Toggle
* Image Generation Support
* File Upload and Analysis
* AI Memory Across Conversations

---

## 📸 Screenshots

Add screenshots of your application here.

```md
![Home](./screenshots/home.png)
![Chat](./screenshots/chat.png)
```

---

## 🎯 Key Learning Outcomes

Through this project, I gained hands-on experience with:

* Full-Stack Development
* REST API Design
* State Management in React
* MongoDB Database Design
* AI API Integration
* Markdown Rendering
* Syntax Highlighting
* Thread Management Systems
* Modern UI/UX Design

---

## 👨‍💻 Author

**Anshuman Pandey**

* B.Tech Student
* MERN Stack Developer
* Problem Solver
* AI Enthusiast

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

> Building intelligent conversations, one message at a time.
