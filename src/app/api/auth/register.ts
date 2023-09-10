import {NextApiRequest, NextApiResponse} from "next";
import bcrypt from 'bcrypt';
import {connectDB} from "@/app/api/db/mongoDb";

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        /** ### 요청시 body 에 담기는 내용 */
        const {
            email,
            password,
            name,
            student_number,
            phone
        } = req.body;

        try {
            /** ### Connect DataBase */
            let db = (await connectDB).db(process.env.MONGODB_NAME!);
            /*** ### 비밀번호 해싱 */
            let pwdHash: string = await bcrypt.hash(req.body.password, 10)
            await db.collection(process.env.MONGODB_USER_COLLECTION!).insertOne({
                ...req.body,
                password: pwdHash,
                role: 'customer'
            })
            /** ### Response */
            res.status(200).json({success: true, message: '회원가입이 정상적으로 처리되었습니다.'});
            /*** ### 에러 핸들링 */
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: '인터넷 또는 서버 오류 발생', error: err.message});
            } else {
                res.status(500).json({message: '인터넷 또는 서버 오류 발생', error: "알 수 없는 에러"});
            }
        }
    }
}

export default Register;