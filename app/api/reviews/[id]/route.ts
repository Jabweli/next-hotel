import { getRoomReviews } from "@/lib/apis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const roomId = params.id;

  try {
    const roomReviews = await getRoomReviews(roomId);

    return NextResponse.json(roomReviews, {
      status: 200,
      statusText: "Succesful",
    });
  } catch (error) {
    console.error("Getting Review Failed", error);
    return new NextResponse("Unable to fetch", { status: 400 });
  }
}
