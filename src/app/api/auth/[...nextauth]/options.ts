import type { NextAuthOptions } from "next-auth";
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
                /** 테스트계정 몽고디비 연결 필요 */
                const user = {
                    id: 'i0000001',
                    name: 'root',
                    password: 'welcome2ansan'
                }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }

            /** ### 세션 설정 */

            /** ### 콜백 : JWT */
        })
    ],
}