'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {getMonthAndDay, getFormattedDate} from "@/service/date";
import {User} from "@/model/user";

type Props = {
    activeTab: string;
    session: {
        user: User;
    }
}

const MenuCard = ({activeTab, session}: Props) => {
    /* TODO - 임시 데이터 추가시 타입 재정의 예정 */
    const [menus, setMenus] = useState<any[]>([]);

    const formattedDate = getFormattedDate();
    const { month, day } = getMonthAndDay();
    const todayDate = `${month}월 ${day}일`;

    useEffect(() => {
        fetch('/api/cooks')
            .then((res) => res.json())
            .then((data) => {
                const todayMenus = data.data.filter((todayMenu: any) => {
                    return todayMenu.date === formattedDate && todayMenu.role === activeTab;
                });

                setMenus(todayMenus.map((todayMenu: any) => [todayMenu]));
            });
    }, [activeTab]);
    console.log(menus)

    return (
        <div className="grid grid-cols-3 gap-4 m-auto mt-10">
            {/* menus 에 해당하는 메뉴가 없을 경우 */}
            {menus.length === 0 ? (
                    <div className="w-11/12 min-h-[125px] p-5 border-solid border-2 border-black-500 ml-auto mx-auto mb-5 rounded">
                        <div className="w-fit px-5 m-auto text-center font-semibold -translate-y-9 border-solid border-2 border-black-500 rounded-lg bg-stone-200">
                            {todayDate}
                        </div>
                        <div className='min-h-full text-center'>
                            <p className="p-0.5 min text-center font-medium text-[18px]">
                                오늘의 메뉴가 없습니다.
                            </p>
                        </div>
                    </div>
                ) :
                /* menus에 해당하는 메뉴가 있을 경우*/
                /* menus 객체를 각 배열로 분할한다. */
                (menus.map((menuItems, index) => {
                        const todayMenu = menuItems[0]; /* 표시할 메뉴의 데이터 */
                        const items = todayMenu.menu; /* 표시할 메뉴의 음식들 */

                        return (
                            <div className="w-11/12 min-h-[125px] p-5 border-solid border-2 border-black-500 ml-auto mx-auto mb-5 rounded" key={index}>
                                <div className="w-fit px-5 m-auto text-center font-semibold -translate-y-9 border-solid border-2 border-black-500 rounded-lg bg-stone-200">{todayDate}</div>
                                <div className='mx-auto min-h-full text-center'>
                                    {/* items 배열의 각 요소 string으로 반환 */}
                                    {items.map((item: string, itemIndex: number) => (
                                        <div className="p-0.5 min text-center font-medium text-[18px]" key={itemIndex}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className='flex -translate-y-20'>
                                    <Link href={`/payment/${session && session.user ? session.user.email : '/login'}`}>
                                        결제
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}
        </div>
    );
};

export default MenuCard;