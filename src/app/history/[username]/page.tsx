import React from 'react';
import HistoryItem from "@/app/history/HistoryItem";

type Props = {
    params: {
        username: string;
    }
}

const ProfilePage = ({params}: Props) => {
    console.log(`User ${params.username}`)
    return (
        <div className="w-full min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">결제 내역</h1>
                <div className="space-y-4">
                    {/** ### Single Payment History Item : 블록을 복사하여 더 많은 결제 내역 항목을 생성할 수 있습니다. */}
                    <HistoryItem/>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;