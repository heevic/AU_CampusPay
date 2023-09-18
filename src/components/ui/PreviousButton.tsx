'use client'
import React from 'react';
import {useRouter} from "next/navigation";

type PreviousButtonProps = {
    props: string;
}

const PreviousButton = ({props}: PreviousButtonProps) => {
    const router = useRouter();
    const handlePrevious= () => {
        router.push('/')
    }

    return (
        <button onClick={handlePrevious}>{props}</button>
    );
};

export default PreviousButton;