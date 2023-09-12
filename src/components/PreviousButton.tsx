'use client'
import React from 'react';
import {useRouter} from "next/navigation";

const PreviousButton = () => {
    const router = useRouter();
    const handlePrevious= () => {
        router.push('/')
    }

    return (
        <button onClick={handlePrevious}>취소</button>
    );
};

export default PreviousButton;