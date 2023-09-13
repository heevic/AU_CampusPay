import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/app/api/db/mongoDb"; // 실제 경로로 변경해주세요

export default async function payment(req: NextApiRequest, res: NextApiResponse) {
    try {
        const dbConnection = await connectDB;
        if (!dbConnection) throw new Error('Database connection failed');

        const dbName = process.env.MONGODB_NAME;
        const collectionName = process.env.MONGODB_PAYMENT;
        if (!dbName || !collectionName) throw new Error('Environment variables are not set correctly');

        const { imp_uid, merchant_uid } = req.body;
        const db = dbConnection.db(dbName);
        await db.collection(collectionName).insertOne({ imp_uid, merchant_uid });

        res.status(200).json({ success: true, message: "Payment inserted successfully" });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}