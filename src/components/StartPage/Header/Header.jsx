import * as React from "react";
import { LoginDialog } from "./LoginDialog";
import { SignUpDialog } from "./SignUpDialog";
import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import crossIcon from "../../../assets/images/cross.png";

export const Header = () => {
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const updateLoginState = (newValue) => {
    setOpenLogin(newValue);
  };
  const updateSignUpState = (newValue) => {
    setOpenSignUp(newValue);
  };

  return (
    <>
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
            <Button onClick={handleClickOpenLogin} color="inherit">
              Увійти
            </Button>
            <Button onClick={handleClickOpenSignUp} color="inherit">
              Зареєструватися
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <LoginDialog open={openLogin} updateLoginState={updateLoginState} />
      <SignUpDialog open={openSignUp} updateSignUpState={updateSignUpState} updateLoginState={updateLoginState} />
    </>
  );
};
