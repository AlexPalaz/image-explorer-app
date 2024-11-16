"use server";

import { AuthTokenResponsePassword } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    redirect(`/auth/signin?message=${errorMessage}`);
  }

  const { data } = (await response.json()) as AuthTokenResponsePassword;
  const session = data.session;

  if (session) {
    const cookieStore = await cookies();
    cookieStore.set("access-token", session.access_token, { secure: true });
    cookieStore.set("refresh-token", session.refresh_token, { secure: true });
  }

  redirect("/");
}
