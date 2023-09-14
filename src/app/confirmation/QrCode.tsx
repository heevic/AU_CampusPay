'use client'
import React, {useEffect, useRef} from 'react';
import QRCode from "qrcode";
import {useSession} from "next-auth/react";

const QrCode = () => {
    const { data: session } = useSession();
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, `${process.env.SITE_URL}/confirmation/${session?.user?.name}`, function (error) {
                if (error) console.error(error);
                console.log('success!');
            });
        }
    }, []);

    return (
        <canvas ref={canvasRef}></canvas>
    );
};

export default QrCode;