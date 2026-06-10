import mongoose from 'mongoose';

const connectDB = async () => {
    const mongoUri = String(process.env.MONGO_URI || '').trim();

    if (!mongoUri) {
        console.warn('MONGO_URI is not set. API routes will return safe defaults without database access.');
        return;
    }

    try {
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB unavailable: ${error.message}`);
        console.warn('API will continue with safe default responses until the database is reachable.');
    }
};

export default connectDB;
