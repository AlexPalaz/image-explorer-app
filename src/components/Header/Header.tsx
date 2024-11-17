import { getUser } from "@/utils/supabase/server";
import Route from "./Route/Route";

export default async function Header() {
  const user = await getUser();

  return (
    <div className="header h-14 w-full flex items-center px-4 bg-yellow-300 font-semibold">
      <div className="flex gap-4">
        <Route name="Home" href="/" />
        {!user && (<Route name="Sign up" href="/auth/signup" />)}
        {!user && (<Route name="Sign in" href="/auth/signin" />)}
        {user && (<Route name="Favorites" href="/favorites" />)}
      </div>
    </div>
  );
}
