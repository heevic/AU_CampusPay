import Image from 'next/image'
import styles from './page.module.scss'
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>임시 페이지</h2>
      <div>로그인 페이지 : <Link href={'/'}>로그인</Link></div>
      <div>어드민 페이지 : <Link href={'/'}>어드민</Link></div>
      <div>결제 페이지 : <Link href={'/'}>결제</Link></div>
      <div>QR 출력 페이지 : <Link href={'/'}>QR Code</Link></div>
    </main>
  )
}