"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const artworkRouter_1 = __importDefault(require("./router/artworkRouter"));
const checkoutRouter_1 = __importDefault(require("./router/checkoutRouter"));
const emailRouter_1 = __importDefault(require("./router/emailRouter"));
const verifyRouter_1 = __importDefault(require("./router/verifyRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://your-frontend-domain.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express_1.default.json());
let isConnected = false;
// 🔌 MongoDB Connection Function
async function connectToMongoDB() {
    if (isConnected)
        return;
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });
        isConnected = true;
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
// Connect only if URI exists
if (process.env.MONGO_URI) {
    connectToMongoDB();
}
else {
    console.warn("MONGO_URI not set — skipping MongoDB connection.");
}
// Routes
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use(artworkRouter_1.default);
app.use(checkoutRouter_1.default);
app.use(emailRouter_1.default);
app.use("/verify", verifyRouter_1.default);
app.use("/404", (_req, res) => res.status(404).json({ error: "Not Found" }));
// Error handling middleware
app.use((err, _req, res) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
});
// Start server
const PORT = process.env.BACKEND_PORT || 7001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
