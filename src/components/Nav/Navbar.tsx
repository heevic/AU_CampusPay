'use client'
import React, {useState} from 'react';
import Link from "next/link";
import {GiHamburgerMenu} from "react-icons/gi";
import {AiOutlineClose} from "react-icons/ai";
import {useSession} from "next-auth/react";

const TopNavbar = () => {
    const {data: session} = useSession()
    const [isClicked, setIsClicked] = useState(false);
    const handleNavClick = () => {
        setIsClicked(!isClicked)
    }

    return (
        <header className='w-screen'>
            {/** ### 네비게이션 메뉴 */}
            {/** TODO : 관리자 페이지 session...role === admin */}
            <nav className='flex justify-between items-center w-screen bg-blue-300 h-14'>
                <div className='pl-10'><Link href='/'>메인(로고 자리)</Link></div>
                <ul className='h-full flex justify-start items-center gap-3 max-xmd:hidden'>
                    <li><Link href='/admin'>관리자 페이지</Link></li>
                    <li><Link href='/payment/username'>이니시스</Link></li>
                    {!session ? (
                        <>
                            <li><Link href='/login'>로그인</Link></li>
                            <li><Link href='/api/auth/signin/github'>깃허브 로그인</Link></li>
                        </>
                    ) : (
                        <li className='xl: pr-10'><Link href='/api/auth/signout/github'>로그아웃</Link></li>
                    )}
                </ul>
                {/** ### 모바일 대응 (임시) */}
                <button onClick={handleNavClick} className='pr-10 xmd:hidden max-xmd:block xl:hidden '>
                    <GiHamburgerMenu/>
                </button>
            </nav>
            {/** ### TopNav Open 모바일 대응 (임시) */}
            <div
                className={`fixed top-0 right-0 w-screen h-full bg-gray-50 transition-transform duration-300 ${isClicked ? 'translate-x-0' : 'translate-x-full'}`}>
                <ul className='h-14 flex justify-between items-center'>
                    <li className='pl-10'><Link href='/'>메인</Link></li>
                    <li className='pr-10'>
                        <button onClick={handleNavClick}><AiOutlineClose/></button>
                    </li>
                </ul>
                <ul className='pr-10 pl-10 text-lg'>
                    <li className='pb-1.5'><Link href='/admin'>어드민</Link></li>
                    <li className='pb-1.5'><Link href='/payment'>이니시스</Link></li>
                    {/** TODO: Feature 정해진 후 배열에 담아 map 반복 */}
                    {!session ? (
                        <>
                            <li><Link href='/login'>로그인</Link></li>
                            <li><Link href='/api/auth/signin/github'>깃허브 로그인</Link></li>
                        </>
                    ) : (
                        <li className='xl: pr-10'><Link href='/api/auth/signout/github'>로그아웃</Link></li>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default TopNavbar;