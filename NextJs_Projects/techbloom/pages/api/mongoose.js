import mongoose from "mongoose";

const connectToDb = handler => async (req, res) => {
    try {
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }
        await mongoose.connect(process.env.MONGO_URL);
        return handler(req, res);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        res.status(500).json({ success: false, error: "Database connection error" });
    }
}

export default connectToDb;