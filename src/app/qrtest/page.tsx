'use client'
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const Page = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, '네이버', function (error) {
                if (error) console.error(error);
                console.log('success!');
            });
        }
    }, []);

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-white">
            <canvas ref={canvasRef}></canvas>
            <p className='text-center'>중식 n식권<br/>사용여부</p>
            <button>취소요청</button>
        </div>
    );
};

export default Page;