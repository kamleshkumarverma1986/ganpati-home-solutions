import Box from "@mui/material/Box";
import MarqueeWidgetContainer from "./MarqueeWidgetContainer";
import SectionTitle from "./SectionTitle";

export default function MarqueeSection({ title, imageList = [] }) {
  return (
    <Box>
      <SectionTitle title={title} />
      <MarqueeWidgetContainer imageList={imageList} />
    </Box>
  );
}
