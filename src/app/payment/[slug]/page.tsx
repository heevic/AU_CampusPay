import React from 'react';
import CookItem from "@/components/CookItem/CookItem";
import PaymentBtn from "@/app/payment/paymentBtn";
import TapMenu from "@/components/TapMenu/TapMenu";
import PreviousButton from "@/components/PreviousButton";

type Props = {
    params: {
        slug: string;
    }
}

const PaymentsPage = ({params}: Props) => {
    return (
        <div className='w-1/2 min-h-screen m-auto p-4 flex flex-col items-center justify-center'>
            <TapMenu/>
            {/* 조식, 중식, 석식*/}
            <CookItem props={'조식'}/>
            <CookItem props={`중식1`}/>
            <CookItem props={'중식2'}/>
            <CookItem props={'석식'}/>
            <div className='w-1/2 flex justify-around'>
                <PreviousButton/>
                <PaymentBtn/>
            </div>
        </div>
    );
}

export default PaymentsPage;