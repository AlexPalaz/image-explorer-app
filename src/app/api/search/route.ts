import { unsplash } from "@/app/utils/unsplash";
import { NextRequest } from "next/server";
import { generate } from "random-words";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const term = searchParams.get("term") || "";

    const res = await unsplash.search.getPhotos({ query: term as string });

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
