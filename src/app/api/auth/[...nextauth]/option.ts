import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    // 외부 공급자
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
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

            // 사용자 지정 로그인
            async authorize(credentials) {
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
        })
    ],
}