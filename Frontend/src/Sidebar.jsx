import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
  const {
    allthreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPreviousChat,refreshThreads
  } = useContext(MyContext);

  // Fetch all chat threads
  const getAllThreads = async () => {
    try {
      const response = await fetch(
        "https://intellichat-9e3p.onrender.com/api/thread"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch threads");
      }

      const data = await response.json();

      const filteredData = data.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));

      setAllThreads(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  // Load threads when sidebar mounts
  useEffect(() => {
    getAllThreads();
  }, [refreshThreads]);

  // Create a new chat
  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setPreviousChat([]);
    setCurrThreadId(uuidv1());
  };

  // Load selected thread
  const changeThread = async (threadId) => {
    try {
      const response = await fetch(
        `https://intellichat-9e3p.onrender.com/api/thread/${threadId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch thread");
      }

      const messages = await response.json();

      setCurrThreadId(threadId);
      setPreviousChat(messages);
      setNewChat(false);
      setReply(null);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="sidebar">

      {/* New Chat Button */}
      <button
        className="newchatbtn"
        onClick={createNewChat}
      >
        <img
          src="src/assets/intellichatai_logo.jpg"
          alt="SigmaGPT Logo"
          className="logo"
        />

        <p>New Chat</p>

        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      {/* Chat History */}
      <ul className="history">
        {allthreads?.map((thread) => (
          <li
            key={thread.threadId}
            onClick={() =>
              changeThread(thread.threadId)
            }
            className={
              currThreadId === thread.threadId
                ? "activeThread"
                : ""
            }
          >
            {thread.title}
            <i className="fa-solid fa-trash"
            
            onClick={async (e) => {
  e.stopPropagation();

  try {
    const id = thread.threadId;

    const response = await fetch(
      `https://intellichat-9e3p.onrender.com/api/thread/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    setAllThreads((prev) =>
      prev.filter((t) => t.threadId !== id)
    );

    if (id === currThreadId) {
      createNewChat();
    }
  } catch (error) {
    console.log(error);
  }
}}
            
            ></i>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="sign">
        <p>By Anshuman Pandey ♥</p>
      </div>

    </section>
  );
}

export default Sidebar;
