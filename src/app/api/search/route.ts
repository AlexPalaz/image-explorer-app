import { unsplash } from "@/utils/unsplash";
import { NextRequest } from "next/server";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const term = searchParams.get("term") || "";
    const page = searchParams.get("page") || 1;

    const res = await unsplash.search.getPhotos({
      query: term as string,
      page: page as number,
      perPage: 12,
    });

    await delay(2000);

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
