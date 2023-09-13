'use client'
import React, {useEffect, useState} from 'react';

const TapMenu = () => {
    const [activeTab, setActiveTab] = useState('교직원');
    /* TODO - 임시 데이터 추가시 타입 재정의 예정 */
    const [text, setText] = useState<any>('데이터 로딩중...');

    useEffect(() => {
        fetch('/api/cooks')
            .then((res) => res.json())
            .then((data) => setText(data.data));
    }, []);
    console.log(text[0].menu)

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
            <div>
                {activeTab === '교직원' && <div className='p-5 pt-0'>{text[0].menu}</div>}
                {activeTab === '학생' && <div className='p-5 pt-0'>학생 메뉴</div>}
                {activeTab === '기숙사' && <div className='p-5 pt-0'>기숙사 메뉴</div>}
            </div>
        </div>
    );
};

export default TapMenu;