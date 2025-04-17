import Typography from "@mui/material/Typography";

export default function SectionTitle({ title }) {
  return (
    <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
      {title}
    </Typography>
  );
}
