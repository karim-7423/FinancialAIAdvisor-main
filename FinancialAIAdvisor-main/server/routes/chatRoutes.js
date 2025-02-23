// import express from "express";
// import { handleChatRequest } from "../controller/chatbotController.js";

// const router = express.Router();

// // Route for handling chatbot requests
// router.post("/chat", handleChatRequest);

// export default router;
import express from "express";
import { handleChatRequest, getChatHistory } from "../controller/chatbotController.js";
import { auth } from "../Middleware/authMiddleware.js"; // ✅ Ensure users are authenticated

const router = express.Router();

router.post("/chat", auth, handleChatRequest); // ✅ Protected chat endpoint
router.get("/chat/history", auth, getChatHistory); // ✅ Endpoint to fetch chat history

export default router;

