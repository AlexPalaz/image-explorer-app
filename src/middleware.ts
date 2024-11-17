import { NextResponse, type NextRequest } from "next/server";
import { getUser, refreshSession } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const user = await getUser();

  if (user == null) {
    const session = await refreshSession();

    if (session) {
      const response = NextResponse.next({
        request,
      });

      response.cookies.set("access-token", session.access_token, { secure: true });
      response.cookies.set("refresh-token", session.refresh_token, { secure: true });

      return response;
    }
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|components|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
