import * as React from "react";
import Card from "@mui/material/Card";
import ShowMedia from "./ShowMedia";

export default function MarqueeCard({ media }) {
  return (
    <Card sx={{ margin: "10px" }} elevation={3} square>
      <ShowMedia media={media} style={{ height: 200 }} />
    </Card>
  );
}
