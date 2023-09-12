import React from "react";
import Link from "next/link";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";
import TapMenu from "@/components/TapMenu/TapMenu";
import {BsQrCode} from "react-icons/bs";
import {MdPayment} from "react-icons/md";
import {AiOutlineHistory} from "react-icons/ai";
import {GrUserAdmin} from "react-icons/gr";
import {Session} from "@/types/auth";
import TopNavbar from "@/components/Nav/Navbar";

export default async function Home() {
  const session: Session | null = await getServerSession(options)

    return (
        <>
            <TopNavbar/>
            <main className='h-screen bg-gray-200'>
                <div className='grid grid-cols-2 gap-4'>
                    {/** ### TapMenu Component */}
                    <TapMenu/>
                    {/** ### User Profile */}
                    <div className='ml-5 p-5 bg-white'>
                        {session ? (
                            <>
                                <div>User Email : {session?.user?.email}</div>
                                <div>User Role : {session?.user?.role}</div>
                            </>
                        ) : (
                            <>
                                <Link href={`/login`} className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                                    <span>로그인</span>
                                </Link>
                                <Link href={`/register`} className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                                    <span>회원가입</span>
                                </Link>
                            </>
                        )}
                    </div>
                    {/** ### Link */}
                    <div className='mr-5 p-5 bg-white flex flex-col gap-4'>
                        <Link href={`/confirmation/${session?.user?.email}`} className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                            <BsQrCode/>
                            <span>식권 사용</span>
                        </Link>
                        <Link href={`/payment/${session?.user?.email}`} className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                            <MdPayment/>
                            <span>식권 구입</span>
                        </Link>
                        <Link href={`/profile/${session?.user?.email}`} className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                            <AiOutlineHistory/>
                            <span>결제 내역</span>
                        </Link>
                        {session?.user?.role === 'admin' &&
                            <Link href={'/admin'} className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                                <GrUserAdmin/>
                                <span>관리자 페이지</span>
                            </Link>
                        }
                    </div>
                    {/** ### AnnounceManet */}
                    <div className='ml-5 mr-5 p-5 bg-white col-span-2'>
                        <h3>공지사항</h3>
                    </div>
                </div>
            </main>
        </>
  )
}