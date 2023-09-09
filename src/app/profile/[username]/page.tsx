import React from 'react';

type Props = {
    params: {
        username: string;
    }
}

const Page = ({params}: Props) => {
    return (
        <div>
           User {params.username}
        </div>
    );
};

export default Page;