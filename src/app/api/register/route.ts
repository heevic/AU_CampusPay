import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectDB } from '@/app/api/db/mongoDb';

export async function POST(request: Request) {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const student_number = formData.get('student_number');
    const phone = formData.get('phone');

    try {
        let db = (await connectDB).db(process.env.MONGODB_NAME!);
        let pwdHash: string = await bcrypt.hash(password, 10);
        await db.collection(process.env.MONGODB_USER_COLLECTION!).insertOne({
            email,
            password: pwdHash,
            name,
            student_number,
            phone,
            role: 'customer',
        });
        return NextResponse.json({ success: true, message: '회원가입이 성공적으로 완료되었습니다.' }); // 성공 메시지를 변경하거나 사용자에게 반환할 추가 정보를 추가할 수 있습니다.
    } catch (err) {
        // 추가된 에러 핸들링
        if (err instanceof Error) {
            return NextResponse.json({ success: false, message: '인터넷 또는 서버 오류 발생', error: err.message });
        } else {
            return NextResponse.json({ success: false, message: '인터넷 또는 서버 오류 발생', error: "알 수 없는 에러" });
        }
    }
}