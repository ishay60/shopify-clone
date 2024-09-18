import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "gray.800",
        p: 4,
        mt: 8,
      }}
    >
      <Container sx={{ textAlign: "center" }}>
        <Typography sx={{ color: "gray.400" }}>
          &copy; {new Date().getFullYear()} My Store. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
