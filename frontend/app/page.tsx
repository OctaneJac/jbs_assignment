import ProjectList from "@/components/project-list"
import {auth} from "@/lib/auth"
import { headers } from "next/headers"


export default async function Home(){
     const session = await auth.api.getSession(
        {
            headers: await headers()
        }
    )   

    if (session) {
        return (
            <div className="flex flex-col items-center justify-center py-2">
                <h1 className="text-xl font-bold">You have logged in.</h1> 
                <ProjectList/>     
            </div>      
        )
    }

    if (!session) {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Welcome to the JBS Project Tracker</h1>
            <div className="flex flex-row gap-2 justify-center">
            <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <a href="/signin">Login</a>
            </button>
            <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                <a href="/signup">Signup</a>
            </button>
            </div>
        </div>
    )
}
}