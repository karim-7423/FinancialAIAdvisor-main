import ChatModel from "../models/ChatModel.js";
import dotenv from "dotenv";
import Sentiment from "sentiment";
import axios from "axios";

dotenv.config();
const sentiment = new Sentiment();

const financialTips = [
  "💰 Save at least 20% of your income each month.",
  "📉 Avoid impulse buying by waiting 24 hours before making a purchase.",
  "📊 Invest in diversified assets to reduce risk.",
  "🏦 Use high-yield savings accounts for emergency funds.",
  "💳 Pay off high-interest debt as soon as possible to avoid extra fees.",
];

const faqs = {
  "c": "💰 Save at least 20% of your income each month and avoid impulse purchases.",
  "best way to invest": "📊 Diversify your investments and consider low-cost index funds.",
  "how to improve credit score": "✅ Pay bills on time and keep credit utilization below 30%.",
  "how to start budgeting": "📋 Track your expenses and allocate your income into savings, needs, and wants.",
};

// **Fetch API Data Functions**
const fetchCurrencyRates = async () => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    return response.data["Realtime Currency Exchange Rate"] || "No data available";
  } catch (error) {
    return "❌ Unable to fetch currency exchange rates.";
  }
};

const fetchStockGainers = async () => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/market-gainers?token=${process.env.FINNHUB_API_KEY}`
    );
    return response.data || "No stock gainers data available.";
  } catch (error) {
    return "❌ Unable to fetch stock gainers.";
  }
};

const fetchEconomicEvents = async () => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/calendar/economic?token=${process.env.FINNHUB_API_KEY}`
    );
    return response.data.economicCalendar || "No economic events available.";
  } catch (error) {
    return "❌ Unable to fetch economic events.";
  }
};

const fetchMetalPrices = async () => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_METAL_PRICE&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    return response.data["Global Metal Price"] || "No data available.";
  } catch (error) {
    return "❌ Unable to fetch metal prices.";
  }
};

// ✅ **Handle Incoming Chat Requests**
export const handleChatRequest = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id; // ✅ Ensure chat is linked to a user
  const lowerMessage = message.toLowerCase();

  // ✅ Check if message is an FAQ
  if (faqs[lowerMessage]) {
    return res.json({ response: faqs[lowerMessage] });
  }

  try {
    // ✅ Sentiment Analysis
    const sentimentResult = sentiment.analyze(message);
    let sentimentLabel = "😐 Neutral";
    if (sentimentResult.score > 0) sentimentLabel = "😊 Positive";
    else if (sentimentResult.score < 0) sentimentLabel = "😞 Negative";

    let responseText = `🔍 Sentiment Analysis: ${sentimentLabel}`;

    // ✅ Determine Relevant API
    let financialData = "❌ No relevant financial data found.";
    if (message.includes("exchange rate") || message.includes("currency")) {
      financialData = await fetchCurrencyRates();
    } else if (message.includes("stock") || message.includes("market gainers")) {
      financialData = await fetchStockGainers();
    } else if (message.includes("economic event") || message.includes("inflation")) {
      financialData = await fetchEconomicEvents();
    } else if (message.includes("gold") || message.includes("silver") || message.includes("metal prices")) {
      financialData = await fetchMetalPrices();
    }

    responseText += `\n📊 Financial Data: ${JSON.stringify(financialData, null, 2)}`;

    // ✅ Add a Financial Tip
    const randomTip = financialTips[Math.floor(Math.random() * financialTips.length)];
    responseText += `\n💡 Financial Tip: ${randomTip}`;

    // ✅ Save Message to Database (With User ID)
    const chatEntry = new ChatModel({ userId, messages: [{ question: message, answer: responseText }] });
    await chatEntry.save();

    res.json({ response: responseText });
  } catch (error) {
    res.status(500).json({ response: "Error fetching financial data." });
  }
};

// ✅ **Fetch User's Chat History**
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Fetch chat history for logged-in user
    const chatHistory = await ChatModel.find({ userId }).sort({ "messages.timestamp": -1 });

    res.json(chatHistory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat history." });
  }
};
