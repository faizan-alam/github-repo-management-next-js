import { getRepoInformation } from "@/services/github.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const repoResults = await getRepoInformation();
    return NextResponse.json(repoResults);
  } catch (error) {
    return NextResponse.json({ error });
    // error handling
  }
}
