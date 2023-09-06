'use client'
import React, {useEffect, useRef} from 'react';
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
        <div style={{background:'#fff'}}>
            <canvas ref={canvasRef}></canvas>
            <canvas ref={canvasRef}></canvas>
            <canvas ref={canvasRef}></canvas>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
};

export default Page;