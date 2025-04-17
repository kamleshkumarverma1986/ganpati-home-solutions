"use client";

import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getFileType } from "@/utils/helper";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const uploadImageOnCloud = async (imageData, file) => {
  const fileType = getFileType(file);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${fileType}/upload`,
    {
      method: "POST",
      body: imageData,
    }
  );
  const json = await res.json();
  return json;
};

export default function MediaUpload({
  onSuccessUpload,
  onInitialUpload,
  isMultiple = true,
  children,
}) {
  const [fileList, setFileList] = useState(null);

  const onImageUploadHandler = async (files) => {
    try {
      const allImagePromises = [];
      files.forEach((file) => {
        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );
        imageData.append(
          "cloud_name",
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        );
        allImagePromises.push(uploadImageOnCloud(imageData, file));
      });
      const medias = await Promise.all(allImagePromises);
      const mainMedia = medias.map((media) => {
        const { asset_id, resource_type, secure_url, url } = media;
        return { asset_id, resource_type, secure_url, url };
      });
      setFileList(null);
      onSuccessUpload(mainMedia);
    } catch (error) {
      console.log("There is some error while uploading media", error);
    }
  };

  useEffect(() => {
    const files = !!fileList ? [...fileList] : [];
    if (files.length) {
      (async () => {
        onInitialUpload(files);
        await onImageUploadHandler(files);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileList]);

  return (
    <>
      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        sx={{ margin: "20px" }}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          multiple={isMultiple}
          onChange={(e) => {
            setFileList(e.target.files);
          }}
        />
      </Button>
    </>
  );
}
