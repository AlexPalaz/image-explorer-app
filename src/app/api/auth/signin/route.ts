import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse("Email and password are required", {
        status: 400,
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return new NextResponse(error.message, { status: 400 });
    }

    return new NextResponse(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
