import { getUser } from "@/app/utils/supabase/client";
import Route from "./Route/Route";

export default async function Header() {
  const user = await getUser();

  return (
    <div className="header h-14 w-full flex items-center px-4 bg-yellow-300 font-semibold">
      <div className="flex gap-4">
        <Route name="Home" href="/" />
        {!user && (<Route name="Sign up" href="/auth/signup" />)}
        {!user && (<Route name="Sign in" href="/auth/signin" />)}
      </div>
    </div>
  );
}
