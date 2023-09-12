'use client'
import React from 'react';

type CookItemProps = {
    props: string;
}

const CookItem = ({props}: CookItemProps) => {
    return (
        <div className='w-full h-10 border-2 text-center'>
            <div>{props}</div>
        </div>
    );
};

export default CookItem;