import Box from "@mui/material/Box";
import SectionTitle from "./SectionTitle";
import NoImageWidget from "./NoImageWidget";
import CardWidget from "./CardWidget";

export default function CardSection({ title, imageList = [] }) {
  return (
    <Box>
      <SectionTitle title={title} />
      {!!imageList.length ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "auto",
          }}
        >
          {imageList.map((img) => {
            return <CardWidget key={img.asset_id} media={img} />;
          })}
        </Box>
      ) : (
        <NoImageWidget />
      )}
    </Box>
  );
}
