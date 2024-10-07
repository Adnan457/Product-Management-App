import React, { useState } from "react";
import "../styles/chatBot.css"; // Include styles for the chat UI

const ChatBot = ({ userName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat visibility

  const handleSendMessage = async () => {
    if (!input) return;

    // Add user's message to the state
    setMessages([...messages, { text: input, sender: userName }]);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.message, sender: "Bot" }]);
      setInput(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat header with a toggle arrow (▼ when closed, ▲ when open) */}
      <div
        className="chatbot-header"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        Chat Support
        <span style={{ marginLeft: "10px", cursor: "pointer" }}>
          {isChatOpen ? "▲" : "▼"}
        </span>
      </div>

      {/* Chat content and input fields are only visible if the chat is open */}
      {isChatOpen && (
        <>
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === userName ? "user-message" : "bot-message"
                }`}
              >
                <strong>{msg.sender}: </strong>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
