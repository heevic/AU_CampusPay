import React from 'react';

const HistoryItem = () => {
    return (
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
                <div className="text-gray-800 font-medium">식권 종류: 조식</div>
                <div className="text-gray-600">결제 일자: 2023-09-12</div>
            </div>
            <div className="text-green-500 font-bold">완료</div>
        </div>
    );
};

export default HistoryItem;