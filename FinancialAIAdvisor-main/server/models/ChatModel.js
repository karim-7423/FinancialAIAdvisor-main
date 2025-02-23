import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Store User ID
  message: String,
  response: String,
  timestamp: { type: Date, default: Date.now },
});

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;
