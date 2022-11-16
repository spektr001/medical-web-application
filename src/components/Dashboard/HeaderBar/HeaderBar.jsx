import * as React from "react";
import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import crossIcon from "../../../assets/images/cross.png";
import heartIcon from "../../../assets/images/heart.png";

export const HeaderBar = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: 15,
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img width="50px" src={crossIcon} alt="redcross" />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            WebPocketDoc
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img width="40px" src={heartIcon} alt="heart" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
