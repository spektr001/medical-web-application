import * as React from "react";
import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { TextField } from "@mui/material";
import crossIcon from "../../../assets/images/cross.png";
import heartIcon from "../../../assets/images/heart.png";

export const Header = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
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
            <Button onClick={handleClickOpen} color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          Login
          <img width="30px" src={heartIcon} alt="heart" />
        </DialogTitle>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="Email" variant="standard" /><br/>
          <TextField id="standard-basic" label="Password" variant="standard" />
        </Box>
      </Dialog>
    </>
  );
};
