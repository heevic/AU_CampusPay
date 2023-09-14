import React from 'react';
import QrCode from "@/app/confirmation/QrCode";

type Props = {
    params: {
        slug: string;
    }
}

const ConfirmationPage = async ({params}: Props) => {
    //const res = await fetch('ENDPOINT');
    //const data = await res.json();
    //const factText = data.data[0];

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
                    <QrCode />
                </div>
                <p className="text-center text-gray-700 font-medium">
                    {params.slug}
                    <br />
                    중식 n식권
                    <br />
                    사용여부
                </p>
                <button className="mt-6 px-8 py-2 bg-red-500 text-white rounded-full font-medium tracking-wide hover:bg-red-600 transition ease-in-out duration-300">
                    취소요청
                </button>
            </div>
        </div>
    );
};


export default ConfirmationPage;