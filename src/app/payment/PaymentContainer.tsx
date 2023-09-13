'use client'
import React, {useState} from 'react';
import PreviousButton from "@/components/PreviousButton";
import PaymentBtn from "@/app/payment/PaymentBtn";
import CookItem from "@/app/payment/CookItem";

const PaymentContainer = () => {
    const [activeTab, setActiveTab] = useState('교직원');
    const [selectedItem, setSelectedItem] = useState({ name: '', amount: 0 });

    const handleItemClick = (name: string, amount: number) => {
        setSelectedItem({ name, amount });
    };

    console.log(activeTab, selectedItem);

    return (
        <>
            {/*<PaymentTapMenu/>*/}
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
                </div>
                <div>
                    {activeTab === '교직원' &&
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <CookItem
                                props={'교직원 조식 5000'}
                                onClick={()=> handleItemClick('교직원 조식', 5000)}
                            />
                            <CookItem
                                props={`교직원 중식 5000`}
                                onClick={()=> handleItemClick('교직원 중식', 5000)}
                            />
                        </div>
                    }
                    {activeTab === '학생' &&
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <CookItem
                                props={'학생 조식 1000'}
                                onClick={() => handleItemClick('학생 조식', 1000)}
                            />
                            <CookItem
                                props={'학생 중식1 4000'}
                                onClick={() => handleItemClick('학생 중식1', 4000)}
                            />
                            <CookItem
                                props={'학생 중식2 4000'}
                                onClick={() => handleItemClick('학생 중식2', 4000)}
                            />
                            <CookItem
                                props={'학생 석식 4000'}
                                onClick={() => handleItemClick('학생 석식', 4000)}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className="flex justify-around mt-6">
                <PreviousButton props={'취소'} />
                <PaymentBtn props={selectedItem}/>
            </div>
        </>
    );
};

export default PaymentContainer;