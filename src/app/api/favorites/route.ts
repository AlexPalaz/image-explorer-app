import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return new NextResponse("user_id is required", { status: 400 });
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return new NextResponse(`Error fetching favorites: ${error.message}`, {
        status: 500,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Error: ${error.message}`, {
        status: 500,
      });
    } else {
      console.error("Unknown error occurred:", error);
      return new Response("An unknown error occurred", { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const token = (await headers()).get('Authorization');
    const user = await supabase.auth.getUser(token as string);
    const user_id = user.data.user?.id;

    const body = await req.json();

    const { photo, photo_id } = body;

    if (!user_id || !photo || !photo_id) {
      return new NextResponse(
        "Missing required fields: user_id, photo",
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("favorites")
      .insert([
        {
          user_id,
          photo,
          photo_id
        },
      ])
      .select();

    if (error) {
      return new NextResponse(`Error adding favorite: ${error.message}`, {
        status: 500,
      });
    }

    return NextResponse.json({ message: "Favorite photo added successfully", data });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Error: ${error.message}`, {
        status: 500,
      });
    } else {
      console.error("Unknown error occurred:", error);
      return new Response("An unknown error occurred", { status: 500 });
    }
  }
}
