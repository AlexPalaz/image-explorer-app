import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
    },
  });
}

export async function getUser() {
  const supabase = await createClient();
  const accessToken = (await cookies()).get("access-token")?.value;
  const { data } = await supabase.auth.getUser(accessToken);

  return data.user || null;
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
