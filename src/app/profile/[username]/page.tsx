import React from 'react';

type Props = {
    params: {
        username: string;
    }
}

const ProfilePage = ({params}: Props) => {
    return (
        <div>
           User {params.username}
        </div>
    );
};

export default ProfilePage;