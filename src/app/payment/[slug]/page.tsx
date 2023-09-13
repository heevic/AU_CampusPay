import React from 'react';
import CookItem from "@/app/payment/CookItem";
import PaymentBtn from "@/app/payment/PaymentBtn";
import TapMenu from "@/components/TapMenu/TapMenu";
import PreviousButton from "@/components/PreviousButton";
import PaymentTapMenu from "@/app/payment/PaymentTapMenu";

type Props = {
    params: {
        slug: string;
    }
}

const PaymentsPage = ({ params }: Props) => {
    return (
        <div className="w-full min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <PaymentTapMenu/>
                <div className="flex justify-around mt-6">
                    <PreviousButton props={'취소'} />
                    <PaymentBtn />
                </div>
            </div>
        </div>
    );
};

export default PaymentsPage;