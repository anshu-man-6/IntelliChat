import "./Chat.css";
import "highlight.js/styles/github-dark.css";

import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";


function Chat() {
  const { newchat, previousChat, reply } = useContext(MyContext);

  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    // No messages yet
    if (!previousChat?.length) return;

    // Show stored message directly when no new reply
    if (!reply) {
      setLatestReply(null);
      return;
    }

    setLatestReply("");

    let index = 0;

    const interval = setInterval(() => {
      setLatestReply(reply.slice(0, index + 1));

      index++;

      if (index >= reply.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [reply, previousChat]);

  return (
    <>
      {newchat && <h1>Start a New Chat!</h1>}

      <div className="chats">
        {/* All messages except latest assistant reply */}
        {previousChat?.slice(0, -1).map((chat, idx) => (
          <div
            key={idx}
            className={chat.role === "user" ? "userdiv" : "gptdiv"}
          >
            {chat.role === "user" ? (
              <p className="usermessage">{chat.content}</p>
            ) : (
              <div className="gptmessage">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {chat.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}

        {/* Typing animation */}
        {previousChat?.length > 0 && latestReply !== null && (
          <div className="gptdiv">
            <div className="gptmessage">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {latestReply}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Show final assistant message after refresh */}
        {previousChat?.length > 0 && latestReply === null && (
          <div className="gptdiv">
            <div className="gptmessage">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {previousChat.at(-1)?.content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;