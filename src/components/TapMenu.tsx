'use client'
import React, { useEffect, useState } from 'react';
import TabMenuPaymentBtn from '@/components/ui/TabMenuPaymentBtn'

const TapMenu = () => {
    const [activeTab, setActiveTab] = useState('교직원');
    /* TODO - 임시 데이터 추가시 타입 재정의 예정 */
    const [todayDate, setTodayDate] = useState<string>('식단 데이터 로딩중...');
    const [menus, setMenus] = useState<any[]>([]);
    
    const today = new Date(); /* 오늘 날짜 가져오기 */
    const m = today.getMonth() + 1; /* 오늘 월자 number로 가져오기 */
    const d = today.getDate(); /* 오늘 일자 number로  가져오기 */
    const formattedDate = `${today.getFullYear()}${(m.toString().padStart(2, '0'))}${(d.toString().padStart(2, '0'))}`; /* 오늘 날짜 연연연연월월일일 형태의 String 으로 변환하기 */

    useEffect(() => {
        fetch('/api/cooks') 
            .then((res) => res.json())
            .then((data) => {
                /* 오늘 날짜와 일치하고 activeTab의 값과 일치하는 메뉴를 반환 */
                const todayMenus = data.data.filter((todayMenu: any) => {
                    return todayMenu.date === formattedDate && todayMenu.role === activeTab;
                });

                /*  menus에 todayMenus객체의 각 배열 반환 */
                setMenus(todayMenus.map((todayMenu: any) => [todayMenu]));
                /* todayDate에 n월n일 단위의 날짜 String 반환 */
                setTodayDate(`${m}월 ${d}일`);
            });
    }, [activeTab] /* activeTab 값의 변경마다 useEffect 실행 */);

    return (
        <div className="m-5 mb-0 col-span-2 bg-white">
            <div className="flex border-b mb-4">
                <button
                    onClick={() => setActiveTab('교직원')}
                    className={`py-2 px-4 w-full text-center ${activeTab === '교직원' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                >교직원
                </button>
                <button
                    onClick={() => setActiveTab('학생')}
                    className={`py-2 px-4 w-full text-center ${activeTab === '학생' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                >학생
                </button>
                <button
                    onClick={() => setActiveTab('기숙사')}
                    className={`py-2 px-4 w-full text-center ${activeTab === '기숙사' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                >기숙사
                </button>
            </div>
            <div className="grid grid-cols-3 gap-4 m-auto mt-10">
                
                {
                /* menus에 해당하는 메뉴가 없을 경우 */
                menus.length === 0 ? (
                    <div className="w-11/12 min-h-[125px] p-5 border-solid border-2 border-black-500 ml-auto mx-auto mb-5 rounded">
                        <div className="w-fit px-5 m-auto text-center font-semibold -translate-y-9 border-solid border-2 border-black-500 rounded-lg bg-stone-200">
                            {todayDate}
                        </div>
                        <div className='min-h-full text-center'>
                            <div className="p-0.5 min text-center font-medium text-[18px]">
                                오늘의 메뉴가 없습니다.
                            </div>
                        </div>
                    </div>
                ) : 
                /* menus에 해당하는 메뉴가 있을 경우*/
                /* menus 객체를 각 배열로 분할한다. */
                (menus.map((menuItems, index) => {
                        const todayMenu = menuItems[0]; /* 표시할 메뉴의 데이터 */
                        const items = todayMenu.menu; /* 표시할 메뉴의 음식들 */
                        const price = todayMenu.price; /* 표시할 메뉴의 가격 */

                        return (
                            <div className="w-11/12 min-h-[125px] p-5 border-solid border-2 border-black-500 ml-auto mx-auto mb-5 rounded" key={index}>
                                <div className="w-fit px-5 m-auto text-center font-semibold -translate-y-9 border-solid border-2 border-black-500 rounded-lg bg-stone-200">{todayDate}</div>
                                <div className='min-h-full text-center'>
                                    {/* items 배열의 각 요소 string으로 반환 */}
                                    {items.map((item: string, itemIndex: number) => (
                                        <div className="p-0.5 min text-center font-medium text-[18px]" key={itemIndex}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className='flex -translate-y-20'>
                                    <TabMenuPaymentBtn props={{ name: items[0], amount: price }} /> {/* TabMenuPaymentBtn에 첫 번째 음식 이름: String, 메뉴 가격: number props로 전달하기 */}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default TapMenu;
