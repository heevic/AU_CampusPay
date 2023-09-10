import type { NextAuthOptions } from "next-auth";
import bcrypt from 'bcrypt';
import {connectDB} from "@/app/api/db/mongoDb";
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        /** ### 깃허브 외부 공급자*/
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        /** ### 사용자 지정 아이디로 로그인*/
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            /**
             * ### 사용자에게 보여질 입력 필드.
             * - credentials : 사용자가 로그인 폼에서 입력한 이메일과 비밀번호
             */
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "name"
                },
                password: {
                    label: 'password',
                    type: 'password',
                    placeholder: 'pwd'
                }
            },
            /** ### 자격증명을 이용한 사용자 인증 ( MongoDb ) */
            async authorize(credentials) {
                /** 테스트 관리자 계정 몽고디비 연결 필요 */
                const user = {
                    id: 'i0000001',
                    name: 'root',
                    password: 'welcome2ansan',
                    role: 'admin'
                }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            },
        })
    ],
    /** ### 세션 설정 */
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 1일 (24시간)
        updateAge: 24 * 60 * 60, // 24시간마다 세션 정보 업데이트
    },
    /** ### 콜백 : JWT */
    callbacks: {
        //5. JWT 콜백: 사용자의 역할과 ID를 토큰에 추가
        jwt: async ({token, user, account}: { token: any; user: any; account: any }) => {
            if (user) {
                token.user = {};
                token.user._id = user._id;
                token.user.name = user.name;
                token.user.email = user.email;
                token.user.password = user.password;
                token.user.phone = user.phone;
                token.user.role = user.role;
                token.user.lastAccess  = user.lastAccess;

                /* 세션 만료 시간 */
                //token.expires = new Date().getTime() + 24 * 60 * 60 * 1000;
            }
            return token;
        },
        /** ### 세션 콜백: 사용자의 ID와 역할을 세션에 추가 */
        session: async ({session, token}: { session: any; token: any }): Promise<any> => {
            if (token.user) session.user = token.user;
            return session;
        },
    },
    /** ### 경로 */
    pages: {
        //signIn: '/login',
        //signOut: '/login',
    },
    /** ### 어댑터 & 시크릿키 */
    //adapter: MongoDBAdapter(connectDB),
    secret: process.env.NEXTAUTH_SECRET
}