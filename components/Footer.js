import { Paper, Container, Box, Typography } from "@mui/material";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 999,
      }}
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Copyright />
        </Box>
      </Container>
    </Paper>
  );
}
