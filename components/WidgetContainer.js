import Box from "@mui/material/Box";

export default function WidgetContainer({ children }) {
  return (
    <Box
      sx={{
        marginTop: { xs: "18px", md: "50px" },
        marginBottom: { xs: "18px", md: "50px" },
      }}
    >
      {children}
    </Box>
  );
}
