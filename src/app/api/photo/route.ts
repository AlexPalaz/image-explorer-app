import { unsplash } from "@/app/utils/unsplash";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const photoId = searchParams.get("id") || "";

    const res = await unsplash.photos.get({
      photoId
    });

    if (res.type === "success") {
      return new Response(JSON.stringify(res.response), { status: 200 });
    } else {
      throw new Error(`Error fetching random images: ${res.errors}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Error: ${error.message}`, {
        status: 500,
      });
    } else {
      console.error("Unknown error occurred:", error);
    }
  }
}
