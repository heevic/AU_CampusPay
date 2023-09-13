import {connectDB} from "@/app/api/db/mongoDb";
import {NextResponse} from "next/server";

export async function GET (request: Request) {
    try {
        const db = (await connectDB).db(process.env.MONGODB_NAME);
        const postList = await db.collection(process.env.MONGODB_ANNOUNCEMENT as string).find().toArray();
        return NextResponse.json({ success: true, data: postList })
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({
                success: false,
                message: '인터넷 또는 서버 오류 발생',
                err: err.message
            });
        }
    }
}