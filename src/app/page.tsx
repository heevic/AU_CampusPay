import Link from "next/link";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";
import {undefined} from "zod";
import TapMenu from "@/components/TapMenu/TapMenu";

type User = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined
} | undefined;

type Session = {
    user?: User;
}

type T = {
    session: Session | null;
}

export default async function Home() {
  const session: Session | null = await getServerSession(options)

    return (
    <main className='w-screen h-screen bg-gray-200'>
        <div className='grid grid-cols-2 gap-4'>
            <TapMenu/>
            <div className='ml-5 p-5 bg-white'>
                <h2>세션 정보</h2>
                <p>
                    아이디 : root<br/>
                    비밀번호 : welcome2ansan<br/>
                    공급자 : 깃허브
                </p>
                <>
                    {session ? (
                        <div>session : {session?.user?.name}</div>
                    ) : (
                        <div>session : null</div>
                    )}
                </>
            </div>
            <div className='mr-5 p-5 bg-white'>Move Menu</div>
            <div className='ml-5 mr-5 p-5 bg-white col-span-2'>Announce</div>
        </div>
    </main>
  )
}