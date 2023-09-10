import Link from "next/link";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";
import {undefined} from "zod";
import TapMenu from "@/components/TapMenu/TapMenu";
import React from "react";
import {BsQrCode} from "react-icons/bs";
import {MdPayment} from "react-icons/md";
import {AiOutlineHistory} from "react-icons/ai";

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
    <main className='w-screen h-screen bg-gray-200'>
        <div className='grid grid-cols-2 gap-4'>
            <TapMenu/>
            <div className='ml-5 p-5 bg-white'>
                <h2>세션 정보</h2>
                <p>
                    아이디 : root<br/>
                    비밀번호 : welcome2ansan<br/>
                    공급자 : 깃허브
                </p>
                <>
                    {session ? (
                        <div>session : {session?.user?.name}</div>
                    ) : (
                        <div>session : null</div>
                    )}
                </>
            </div>
            <div className='mr-5 p-5 bg-white flex flex-col gap-4'>
                <Link href={'/'} className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                    <BsQrCode/>
                    <span>식권 사용</span>
                </Link>
                <Link href={'/'} className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                    <MdPayment/>
                    <span>식권 구입</span>
                </Link>
                <Link href={'/'} className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                    <AiOutlineHistory/>
                    <span>결제 내역</span>
                </Link>
            </div>
            <div className='ml-5 mr-5 p-5 bg-white col-span-2'>Announce</div>
        </div>
    </main>
  )
}