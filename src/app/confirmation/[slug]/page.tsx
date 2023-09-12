'use client'
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import QrCode from "@/app/confirmation/QrCode";

type Props = {
    params: {
        slug: string;
    }
}

const ConfirmationPage = ({params}: Props) => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-white">
            <QrCode/>
            <p className='text-center'>중식 n식권<br/>사용여부<br/>{params.slug}</p>
            <button>취소요청</button>
        </div>
    );
};

export default ConfirmationPage;