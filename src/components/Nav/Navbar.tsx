'use client'
import React, {useState} from 'react';
import Link from "next/link";
import {GiHamburgerMenu} from "react-icons/gi";
import {AiOutlineClose} from "react-icons/ai";

const TopNavbar = () => {
    const [isClicked, setIsClicked] = useState(false);
    const handleNavClick = () => {
        setIsClicked(!isClicked)
    }

    return (
        <>
            {/** ### 네비게이션 메뉴 */}
            <nav className='flex justify-between w-screen bg-blue-300 h-14'>
                <ul className='h-full flex justify-start items-center gap-3'>
                    <li className='pl-10'><Link href='/'>메인(로고 자리)</Link></li>
                    <li><Link href='/login'>커스텀 로그인</Link></li>
                    <li><Link href='/api/auth/signin/github'>깃허브 로그인</Link></li>
                    <li><Link href='/api/auth/signout/github'>로그아웃</Link></li>
                    <li><Link href='/admin'>어드민</Link></li>
                    <li><Link href='/payment'>이니시스</Link></li>
                    <li><Link href='/qrtest'>큐알코드</Link></li>
                </ul>
                <button onClick={handleNavClick} className='pr-10'><GiHamburgerMenu/></button>
            </nav>
            {/** ### 모바일 대응 (임시) */}
            <div className={`fixed top-0 right-0 w-screen h-full bg-gray-50 transition-transform duration-300 ${isClicked ? 'translate-x-0' : 'translate-x-full'}`}>
                <ul className='h-14 flex justify-between items-center'>
                    <li className='pl-10'><Link href='/'>메인</Link></li>
                    <li className='pr-10'><button onClick={handleNavClick}><AiOutlineClose/></button></li>
                </ul>
                <ul>
                    <li><Link href='/'>메인</Link></li>
                    <li><Link href='/login'>커스텀 로그인</Link></li>
                    <li><Link href='/api/auth/signin/github'>깃허브 로그인</Link></li>
                    <li><Link href='/api/auth/signout/github'>로그아웃</Link></li>
                    <li><Link href='/admin'>어드민</Link></li>
                    <li><Link href='/payment'>이니시스</Link></li>
                    <li><Link href='/qrtest'>큐알코드</Link></li>
                </ul>
            </div>
        </>
    );
};

export default TopNavbar;