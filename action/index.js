"use server"

import EnquiryUser from "@/models/enquiryUser";
import { connectToDB } from "@/utils/database";

export const addEnquiry = async (formData) => {
    try {
        await connectToDB();
        await EnquiryUser.create({
            fullName: formData.get("fullName"),
            mobileNumber: formData.get("mobileNumber"),
            email: formData.get("email"),
            address: formData.get("address"),
            schoolName: formData.get("schoolName"),
            currentClass: formData.get("currentClass"),
            currentBoard: formData.get("currentBoard"),
            goal: formData.get("goal"),
        });
        return {
            isSuccess: true,
            message: "Thank you for your inquiry. Our team will get back to you soon.",
        };
    } catch (error) {
        console.log("Error: ", error);
        return {
            isSuccess: false,
            message: "Something went wrong",
        };
    }
}