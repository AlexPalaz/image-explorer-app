import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url);
    const photoId = searchParams.get("id");

    if (!photoId) {
      return new NextResponse("photo_id is required", { status: 400 });
    }

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("photo_id", photoId);

    if (error) {
      return new NextResponse(`Error fetching comments: ${error.message}`, {
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
    const body = await req.json();

    const { username, photo_id, comment } = body;

    if (!username || !photo_id || !comment) {
      return new NextResponse(
        "Missing required fields: username, photo_id, comment",
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          username,
          photo_id,
          comment,
        },
      ])
      .select();

    if (error) {
      return new NextResponse(`Error adding comment: ${error.message}`, {
        status: 500,
      });
    }

    return NextResponse.json({ message: "Comment added successfully", data });
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