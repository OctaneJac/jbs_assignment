'use client'

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"

export default function Navbar(){
    const router = useRouter()
    const { data:session } = authClient.useSession()

    const signout = async () =>
    {
        await authClient.signOut(
            {
                fetchOptions: 
                {
                    onSuccess: () => 
                    {
                    router.push("/"); // redirect to login page
                    },
                },  
            }
        );
    }

    return(
        <nav className="navbar ">
            <div className="flex flex-row mx-auto h-8 bg-amber-600 text-center justify-center">Navbar&nbsp;
            {session && (
                <a className="underline underline-offset-2 cursor-pointer" onClick={signout}>Sign out here</a>
            )}
            </div>
        </nav>
    )
};