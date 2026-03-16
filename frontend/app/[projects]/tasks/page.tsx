import TaskList from "@/components/task-list";
import {auth} from "@/lib/auth"
import { redirect } from 'next/navigation';
import { headers } from "next/headers"

export default async function Page() {
   const session = await auth.api.getSession(
        {
            headers: await headers()
        }
    )  
    if (!session) {
      redirect("/")
    }
  
    return (
      <div>
        <TaskList />
      </div>
  );
}
