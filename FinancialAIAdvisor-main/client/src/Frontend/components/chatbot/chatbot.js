
// import { useState, useEffect } from "react";
// import useChat from "../../../hooks/useChat";
// import "../styles/chat.css";

// const Chatbot = () => {
//   const { messages, addMessage } = useChat();
//   const [input, setInput] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [showHistory, setShowHistory] = useState(false);

//   useEffect(() => {
//     fetchChatHistory();
//   }, []);

//   // ✅ Fetch Chat History (Authenticated API Call)
//   const fetchChatHistory = async () => {
//     try {
//       const token = localStorage.getItem("token"); // ✅ Ensure user is authenticated
//       if (!token) {
//         console.error("User not authenticated");
//         return;
//       }

//       const response = await fetch("http://localhost:4000/api/chat/history", {
//         method: "GET",
//         headers: { 
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}` // ✅ Send token for authentication
//         }
//       });

//       if (!response.ok) throw new Error("Failed to fetch chat history");

//       const data = await response.json();
//       setChatHistory(data);
//     } catch (error) {
//       console.error("Error fetching chat history:", error);
//     }
//   };

//   // ✅ Send Message to Chatbot (Authenticated API Call)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     addMessage(input, "user");
//     setInput("");

//     try {
//       const token = localStorage.getItem("token"); // ✅ Ensure user is authenticated
//       if (!token) {
//         console.error("User not authenticated");
//         return;
//       }

//       const response = await fetch("http://localhost:4000/api/chat", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}` // ✅ Send token for authentication
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await response.json();

//       // Format JSON response
//       let formattedResponse = "";
//       if (typeof data.response === "object") {
//         formattedResponse = JSON.stringify(data.response, null, 2)
//           .replace(/\\n/g, "<br>") // Preserve line breaks
//           .replace(/ /g, "&nbsp;"); // Preserve spaces for alignment
//       } else {
//         formattedResponse = data.response;
//       }

//       addMessage(formattedResponse, "bot");
//       fetchChatHistory(); // ✅ Refresh chat history after new message
//     } catch (error) {
//       addMessage("Error fetching response.", "bot");
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}-message`}>
//             <span dangerouslySetInnerHTML={{ __html: msg.text }} />
//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit} className="chat-form">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="chat-input"
//           placeholder="Type your financial question..."
//         />
//         <button type="submit" className="chat-button">Send</button>
//       </form>

//       {/* ✅ View Chat History Button */}
//       <button className="chat-history-button" onClick={() => setShowHistory(!showHistory)}>
//         {showHistory ? "Hide Chat History" : "View Chat History"}
//       </button>

//       {/* ✅ Display Chat History */}
//       {showHistory && (
//         <div className="chat-history">
//           <h3>Chat History</h3>
//           {chatHistory.length === 0 ? (
//             <p>No chat history available.</p>
//           ) : (
//             chatHistory.map((msg, index) => (
//               <div key={index} className="chat-message">
//                 <strong>You:</strong> {msg.message} <br />
//                 <strong>AI:</strong> {msg.response}
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
// export default Chatbot;

// import { useState, useEffect } from "react";
// import useChat from "../../../hooks/useChat";
// import "../styles/chat.css";

// const Chatbot = () => {
//   const { messages, addMessage } = useChat();
//   const [input, setInput] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [showHistory, setShowHistory] = useState(false);

//   // ✅ Load Chat History from Local Storage
//   useEffect(() => {
//     const storedHistory = localStorage.getItem("chatHistory");
//     if (storedHistory) {
//       setChatHistory(JSON.parse(storedHistory));
//     }
//   }, []);

//   // ✅ Send Message to Chatbot (Temporarily Store History in Local Storage)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const newUserMessage = { question: input, answer: "🤖 Generating response..." };
//     addMessage(input, "user");
//     setChatHistory((prev) => [...prev, newUserMessage]); // Update State
//     localStorage.setItem("chatHistory", JSON.stringify([...chatHistory, newUserMessage])); // Save to Local Storage

//     setInput("");

//     try {
//       const response = await fetch("http://localhost:4000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!response.ok) throw new Error("Chatbot error");

//       const data = await response.json();

//       // ✅ Format response properly
//       const newBotMessage = { question: input, answer: data.response };

//       setChatHistory((prev) => [...prev, newBotMessage]); // Update state
//       localStorage.setItem("chatHistory", JSON.stringify([...chatHistory, newBotMessage])); // Save to Local Storage

//       addMessage(data.response, "bot");
//     } catch (error) {
//       console.error("❌ Error fetching response:", error);
//       addMessage("Error fetching response.", "bot");
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}-message`}>
//             <span dangerouslySetInnerHTML={{ __html: msg.text }} />
//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit} className="chat-form">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="chat-input"
//           placeholder="Type your financial question..."
//         />
//         <button type="submit" className="chat-button">Send</button>
//       </form>

//       {/* ✅ View Chat History Button */}
//       <button className="chat-history-button" onClick={() => setShowHistory(!showHistory)}>
//         {showHistory ? "Hide Chat History" : "View Chat History"}
//       </button>

//       {/* ✅ Display Chat History */}
//       {showHistory && (
//         <div className="chat-history">
//           <h3>📜 Chat History</h3>
//           {chatHistory.length === 0 ? (
//             <p>No chat history available.</p>
//           ) : (
//             chatHistory.map((msg, index) => (
//               <div key={index} className="chat-message">
//                 <p><strong>🧑 You:</strong> {msg.question}</p>
//                 <p><strong>🤖 AI:</strong> {msg.answer}</p>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;

import { useState, useEffect } from "react";
import "../styles/chat.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // Stores current chat messages
  const [input, setInput] = useState(""); // User input message
  const [chatHistory, setChatHistory] = useState([]); // Stores chat history
  const [showHistory, setShowHistory] = useState(false); // Toggle chat history view

  useEffect(() => {
    fetchChatHistory();
  }, []);

  // ✅ Fetch Chat History (GET /api/chat/history)
  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ User not authenticated");
        return;
      }

      const response = await fetch("http://localhost:4000/api/chat/history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send authentication token
        },
      });

      if (!response.ok) throw new Error("Failed to fetch chat history");

      const data = await response.json();
      console.log("📜 Chat History Data:", data); // Debugging Log

      // ✅ Check if data exists and is in the correct format
      if (Array.isArray(data)) {
        setChatHistory(data);
      } else {
        console.error("❌ Invalid chat history format:", data);
        setChatHistory([]); // Set empty array to avoid undefined errors
      }
    } catch (error) {
      console.error("❌ Error fetching chat history:", error);
    }
  };

  // ✅ Send Message to Chatbot (POST /api/chat)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]); // Update UI instantly

    setInput(""); // Clear input field

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ User not authenticated");
        return;
      }

      console.log("📤 Sending message to chatbot:", input);

      const response = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        console.error("❌ Chatbot API Error:", response.statusText);
        setMessages((prev) => [...prev, { sender: "bot", text: "Error fetching response." }]);
        return;
      }

      const data = await response.json();
      console.log("🤖 Chatbot Response:", data);

      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
      fetchChatHistory(); // Refresh chat history after message
    } catch (error) {
      console.error("❌ Error fetching chatbot response:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error fetching response." }]);
    }
  };

  return (
    <div className="chat-container">
      {/* ✅ Chat Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}-message`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* ✅ Chat Input Form */}
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="Ask me anything about finance..."
        />
        <button type="submit" className="chat-button">Send</button>
      </form>

      {/* ✅ View Chat History Button */}
      <button className="chat-history-button" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Hide Chat History" : "View Chat History"}
      </button>

      {/* ✅ Display Chat History */}
      {showHistory && (
        <div className="chat-history">
          <h3>📜 Chat History</h3>
          {chatHistory.length === 0 ? (
            <p>No chat history available.</p>
          ) : (
            chatHistory.map((msg, index) => (
              <div key={index} className="chat-message">
                <p><strong>🧑 You:</strong> {msg.messages?.[0]?.question || "Unknown"}</p>
                <p><strong>🤖 AI:</strong> {msg.messages?.[0]?.answer || "No response available"}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
