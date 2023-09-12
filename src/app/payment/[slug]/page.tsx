import React from 'react';
import CookItem from "@/app/payment/CookItem";
import PaymentBtn from "@/app/payment/PaymentBtn";
import TapMenu from "@/components/TapMenu/TapMenu";
import PreviousButton from "@/components/PreviousButton";

type Props = {
    params: {
        slug: string;
    }
}

const PaymentsPage = ({ params }: Props) => {
    return (
        <div className="w-full min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <TapMenu />
                <div className="grid grid-cols-1 gap-4 mt-4">
                    <CookItem props={'조식'} />
                    <CookItem props={`중식1`} />
                    <CookItem props={'중식2'} />
                    <CookItem props={'석식'} />
                </div>
                <div className="flex justify-around mt-6">
                    <PreviousButton />
                    <PaymentBtn />
                </div>
            </div>
        </div>
    );
};

export default PaymentsPage;