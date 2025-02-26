import mongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null }

export default async function connectDB() {
    if (cached.conn) return cached.conn
    cached.promise = mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((mongoose) => mongoose)
    cached.conn = await cached.promise
    return cached.conn
}