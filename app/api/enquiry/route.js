import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import EnquiryUser from "@/models/enquiryUser";

export async function GET() {
  try {
    await connectToDB();
    const enquiryUsers = await EnquiryUser.find().sort({ created: -1 });
    return NextResponse.json(
      {
        message: "Data retrieved successfully!",
        enquiryUsers,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Something went wrong!",
      },
      {
        status: 500,
      }
    );
  }
}
