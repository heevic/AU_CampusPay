import React from 'react';
import PaymentContainer from "@/app/payment/PaymentContainer";

type Props = {
    params: {
        slug: string;
    }
}

const PaymentsPage = ({ params }: Props) => {
    return (
        <div className="w-full min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <PaymentContainer/>
            </div>
        </div>
    );
};

export default PaymentsPage;