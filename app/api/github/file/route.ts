import {
  getFileInformation,
  updateFileContent,
  deleteFileContent,
} from "@/services/github.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const path = new URL(request?.url)?.searchParams?.get("path");

    if (!path) throw "Path dons't exist";
    const repoResults = await getFileInformation(path);
    return NextResponse.json(repoResults);
  } catch (error) {
    return NextResponse.json({ error });
    // error handling
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const { path, content } = await request.json();

    if (!path) throw "Path dons't exist";
    const repoResults = await updateFileContent(path, content);
    return NextResponse.json(repoResults);
  } catch (error) {
    return NextResponse.json({ error });
    // error handling
  }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    const path = new URL(request?.url)?.searchParams?.get("path");

    if (!path) throw "Path dons't exist";
    const repoResults = await deleteFileContent(path);
    return NextResponse.json(repoResults);
  } catch (error) {
    return NextResponse.json({ error });
    // error handling
  }
}
