import { createBrowserClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createClient() {
  return createBrowserClient(supabaseUrl!, supabaseKey!);
}

export async function getUser() {
  const supabase = await createClient();
  const accessToken = (await cookies()).get("access-token")?.value;
  const { data } = await supabase.auth.getUser(accessToken);

  return data.user || null;
}
