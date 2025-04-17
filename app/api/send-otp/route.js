import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";
import { generateOTP, sendSMS, invalidateOTP } from "@/utils/helper";

let otpTimeoutIdForAdminLogin = null;

export async function POST(req) {
  try {
    await connectToDB();
    const { mobileNumber } = await req.json();
    const admin = await Admin.findOne({ mobileNumber });

    if (!admin) {
      return NextResponse.json(
        {
          message: "You are not a Admin!",
        },
        {
          status: 401,
        }
      );
    }

    // Now we will send the OTP in mobile number
    const otp = generateOTP();
    console.log("otp sent ==> ", otp);
    await sendSMS({
      otp,
      mobileNumbers: [Number(mobileNumber)],
    });

    admin.otp = {
      value: otp,
      isExpire: false,
    };

    await admin.save();

    // Invalidating the OTP after specific time
    clearTimeout(otpTimeoutIdForAdminLogin);
    otpTimeoutIdForAdminLogin = invalidateOTP(admin);

    return NextResponse.json(
      {
        message: "OTP is successfully sent!",
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
