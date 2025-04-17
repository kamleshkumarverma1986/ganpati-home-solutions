"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import BasicCardWidget from "@/components/BasicCardWidget";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  return (
    <Container component="main">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <BasicCardWidget
          title={"Update Home Page"}
          desc={"You can update the home page as per your requirement"}
        >
          <Button
            size="small"
            onClick={() => router.push("/admin-dashboard/edit-home-page")}
          >
            Update Home Page
          </Button>
        </BasicCardWidget>
        <BasicCardWidget
          title={"Enquiry List"}
          desc={"You can view all the enquiries"}
        >
          <Button
            size="small"
            onClick={() => router.push("/admin-dashboard/enquiries")}
          >
            Enquiry List
          </Button>
        </BasicCardWidget>
      </Box>
    </Container>
  );
}
