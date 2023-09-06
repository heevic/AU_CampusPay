import styles from './page.module.scss'
import Link from "next/link";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/option";
import {undefined} from "zod";

type User = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined
} | undefined;

type Session = {
    user?: User;
}

type T = {
    session: Session | null;
}

export default async function Home() {
  const session: Session | null = await getServerSession(options)

    return (
    <main className={styles.main}>
      <h2>임시 페이지</h2>
      <div>로그인 페이지 : <Link href={'/login'}>로그인</Link></div>
      <div>로그인 페이지 : <Link href={'http://localhost:3000/api/auth/signin/github'}>깃허브로그인</Link></div>
      <div>로그아웃 : <Link href={'http://localhost:3000/api/auth/signout/github'}>로그아웃</Link></div>
      <div>어드민 페이지 : <Link href={'/'}>어드민</Link></div>
      <div>결제 페이지 : <Link href={'/'}>결제</Link></div>
      <div>QR 출력 페이지 : <Link href={'/'}>QR Code</Link></div>
        <>
            {session ? (
                <div>{session?.user?.name}</div>
            ) : (
                <div>session null</div>
            )}
        </>
    </main>
  )
}