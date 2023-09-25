import React from 'react';
import VerticalNav from "@/components/adminNav";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

const AdminPage = async () => {
    const session = await getServerSession(options);
    if(!session?.user.role || !session) {
        window.location.href='/';
    }
    console.log(session)

    return (
        <div className="flex">
            <div className="w-[400px]">
                <VerticalNav />
            </div>

            <main className="w-screen bg-black">
            </main>
        </div>
    );
};

export default AdminPage;
