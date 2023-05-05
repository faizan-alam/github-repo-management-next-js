import { getRepoInformation } from "@/services/github.service";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  try {
    const repoResults = await getRepoInformation();
    return NextResponse.json(repoResults);
  } catch (error) {
    return NextResponse.json({ error });
    // error handling
  }
}
