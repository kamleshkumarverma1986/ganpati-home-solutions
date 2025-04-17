// This file is used for server side data fetch

import HomePage from "@/models/homePage";
import { connectToDB } from "@/utils/database";

const initialHomePageDataSet = {
  carouselImageList: [],
  offerImageList: [],
  topperStudentImageList: [],
  facultyImageList: [],
  placementImageList: [],
  testimonialImageList: [],
  galleryImageList: [],
};

export const getHomePage = async () => {
  try {
    await connectToDB();
    const homePages = await HomePage.find({}).lean();
    // Remember: Only one home-page object will be saved in DB.
    return !!homePages.length
      ? { ...initialHomePageDataSet, ...homePages[0] }
      : initialHomePageDataSet;
  } catch (error) {
    console.log("Error: ", error);
  }
};
