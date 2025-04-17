import * as React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import ShowMedia from "./ShowMedia";

export default function CardWidget({ media }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardActionArea>
        <ShowMedia media={media} style={{ height: 200 }} />
      </CardActionArea>
    </Card>
  );
}
