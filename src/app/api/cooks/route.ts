import {connectDB} from "@/app/api/db/mongoDb";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    try {
        const db = (await connectDB).db(process.env.MONGODB_NAME);
        const items = await db.collection(process.env.MONGODB_COOK as string).find().toArray()
        return NextResponse.json({ data: items });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ err: err.message}, { status: 500 });
        }
    }
}