import * as React from "react";
import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            WebPocketDoc
          </Typography>
          <span>
            by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/spektr001"
            >
              spectrum001
            </a>
          </span>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
