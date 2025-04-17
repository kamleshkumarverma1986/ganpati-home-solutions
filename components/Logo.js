import { Box } from "@mui/material";
import LogoImg from "../public/images/logo.png";

export default function Logo(props) {
  return (
    <Box
      component="img"
      sx={{ display: "flex", height: 50, width: "auto", cursor: "pointer" }}
      alt="Ganpati-Home-Solutions"
      src={LogoImg.src}
      {...props}
    ></Box>
  );
}
