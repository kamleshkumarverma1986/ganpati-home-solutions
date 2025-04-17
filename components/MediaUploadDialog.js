"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Paper, Tooltip } from "@mui/material";
import MediaUpload from "./MediaUpload";
import CircularProgress from "@mui/material/CircularProgress";
import ShowMedia from "./ShowMedia";
import { getFileType } from "@/utils/helper";

export default function MediaUploadDialog({ imageList = [], onDelete, onAdd }) {
  const [loadingImageList, setLoadingImageList] = React.useState([]);

  const onSuccessfulAdd = (uploadedImages) => {
    setLoadingImageList([]);
    onAdd(uploadedImages);
  };

  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{
          textAlign: "center",
          position: "sticky",
          top: 0,
          zIndex: 999,
          p: 2,
        }}
      >
        <MediaUpload
          onInitialUpload={setLoadingImageList}
          onSuccessUpload={onSuccessfulAdd}
        />
      </Paper>
      <ImageList variant="masonry" cols={3} gap={12}>
        {loadingImageList.map((file, index) => (
          <ImageListItem key={index}>
            <ShowMedia
              media={{
                resource_type: getFileType(file),
                url: URL.createObjectURL(file),
                secure_url: URL.createObjectURL(file),
              }}
            />
            <ImageListItemBar
              title="Loading..."
              subtitle={"Please wait!"}
              sx={{ padding: "5px" }}
              actionIcon={
                <Box>
                  <CircularProgress />
                </Box>
              }
            />
          </ImageListItem>
        ))}
        {imageList.map((img) => (
          <ImageListItem key={img.asset_id}>
            <ShowMedia media={img} />
            <ImageListItemBar
              sx={{ position: "relative", bottom: "7px" }}
              actionIcon={
                <Box sx={{ display: "flex" }}>
                  <Tooltip title="Delete this image">
                    <IconButton
                      aria-label={`Delete this image`}
                      onClick={() => onDelete(img.asset_id)}
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
