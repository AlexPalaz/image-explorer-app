import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { generate } from "random-words";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse("Email and password are required", {
        status: 400,
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: (generate() as string) + Math.floor(Math.random() * 10000),
        },
      },
    });

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.getAll();

    if (error) {
      return new NextResponse(error.message, { status: 400 });
    }

    return new NextResponse(JSON.stringify({ data, cookies: sessionCookie }), {
      status: 200,
    });
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
