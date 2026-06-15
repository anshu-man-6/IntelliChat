import "./Chatwindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState } from "react";
import { HashLoader } from "react-spinners";

function Chatwindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    previousChat,
    setPreviousChat,setNewChat,setRefreshThreads
  } = useContext(MyContext);

  const [hashLoader, setHashLoader] = useState(false);

  const getReply = async () => {
     // Prevent empty messages
    if (!prompt.trim()) return;
    setHashLoader(true);
    setNewChat(false)
   

    const userMessage = prompt;

    

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          threadId: currThreadId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Store latest reply
      setReply(data.reply);

      // Add user + assistant message to chat history
      setPreviousChat((prev) => [
        ...prev,
        {
          role: "user",
          content: userMessage,
        },
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
       setRefreshThreads(prev => !prev);
      // Clear input
      setPrompt("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Hide loader
      setHashLoader(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getReply();
    }
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          IntelliChat &nbsp;
          <i className="fa-solid fa-chevron-down"></i>
        </span>

        <div className="usericonDiv">
          <span className="usericon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      <Chat />

      {/* Loading spinner */}
      <HashLoader color="white" loading={hashLoader} />

      <div className="chatInput">
        <div className="userInput">
          <input
            type="text"
            placeholder="Ask Anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div id="submit" onClick={getReply}>
            Send
          </div>
        </div>

        <p className="info">
          SigmaGPT can make mistakes. Check important information.
        </p>
      </div>
    </div>
  );
}

export default Chatwindow;