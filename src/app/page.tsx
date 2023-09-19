import React from "react";
import Link from "next/link";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";
import TapMenu from "@/components/TapMenu";
import {BsQrCode} from "react-icons/bs";
import {MdPayment} from "react-icons/md";
import {AiOutlineHistory} from "react-icons/ai";
import {GrUserAdmin} from "react-icons/gr";
import TopNavbar from "@/components/Navbar";

export default async function Home() {
    const session = await getServerSession(options)
    const res = await fetch(`${process.env.SITE_URL}/api/notice`);
    const data = await res.json();
    const factText = data.data[0];

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
                            <div className='flex flex-col gap-4'>
                                <Link
                                    href={`/login`}
                                    className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                                    <span>로그인</span>
                                </Link>
                                <Link
                                    href={`/register`}
                                    className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                                    <span>회원가입</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    {/** ### Link */}
                    <div className='mr-5 p-5 bg-white flex flex-col gap-4'>
                        <Link href={`/confirmation/${session?.user?.email}`}
                              className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                            <BsQrCode/>
                            <span>식권 사용</span>
                        </Link>
                        <Link href={`/payment/${session?.user?.email}`}
                              className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                            <MdPayment/>
                            <span>식권 구입</span>
                        </Link>
                        <Link href={`/history/${session?.user?.email}`}
                              className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                            <AiOutlineHistory/>
                            <span>결제 내역</span>
                        </Link>
                        {/** ### 관리자 유저 처리 */}
                        {session?.user?.role === 'admin' &&
                            <Link href={'/admin'}
                                  className='flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>
                                <GrUserAdmin/>
                                <span>관리자 페이지</span>
                            </Link>
                        }
                    </div>
                    {/** ### AnnounceManet */}
                    <div className='ml-5 mr-5 p-5 bg-white col-span-2 rounded-lg shadow-lg'>
                        <h3 className='text-xl font-bold mb-4'>공지사항</h3>
                        <div className='divide-y divide-gray-300'>
                            {[...Array(5)].map((_, idx) => (
                                <div key={idx} className={`flex justify-between py-3 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <div className='w-1/4 px-2'> {factText.title} </div>
                                    <div className='w-1/4 px-2'> {factText.title} </div>
                                    {/*<div className='w-1/2 px-2'> {factText.content} </div>*/}
                                    <div className='w-1/4 px-2 text-right'> {factText.date} </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}