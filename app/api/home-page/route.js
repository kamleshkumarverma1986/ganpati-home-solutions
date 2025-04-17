import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { getHomePage } from "@/service";
import HomePage from "@/models/homePage";

export async function GET() {
  try {
    const homePage = await getHomePage();
    return NextResponse.json(
      {
        message: "Data retrieved successfully!",
        homePage,
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

export async function POST(req) {
  try {
    await connectToDB();
    let homePage;
    const { _id, ...otherProps } = await req.json();
    const homePages = await HomePage.find({}).lean();
    if (homePages.length && _id) {
      homePage = await HomePage.findOneAndUpdate({ id: _id }, otherProps, {
        new: true,
      });
    } else {
      homePage = await HomePage.create(otherProps);
    }
    return NextResponse.json(
      {
        message: "Data updated successfully",
        homePage,
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
