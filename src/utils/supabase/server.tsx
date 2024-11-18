import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

export async function getUser() {
  const userCookie = (await cookies()).get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  return user || null;
}

export async function refreshSession() {
  const supabase = await createClient();
  const refreshToken = (await cookies()).get("refresh-token")?.value;

  if (refreshToken) {
    const { data } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    return data.session || null;
  } else {
    return null;
  }
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    supabaseResponse.cookies.set("user", JSON.stringify(user));
  } else {
    supabaseResponse.cookies.set("user", JSON.stringify(""));
  }

  if (request.nextUrl.pathname.startsWith("/auth/signout")) {
    supabaseResponse.cookies.set("user", JSON.stringify(""));
    await supabase.auth.signOut();
  }

  return supabaseResponse;
}
