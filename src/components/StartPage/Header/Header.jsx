import * as React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase-config";
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
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      alert("Ви успішно зареєструвалися!");
      setOpenSignUp(false);
      setOpenLogin(true);
    } catch (error) {
      alert("Помилка! Некоректний email або пароль.");
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setOpenLogin(false);
    } catch (error) {
      alert("Помилка! Некоректний email або пароль.");
    }
  };

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = (value) => {
    setOpenLogin(false);
  };

  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUp = (value) => {
    setOpenSignUp(false);
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

      <Dialog onClose={handleCloseLogin} open={openLogin}>
        <DialogTitle>
          Увійдіть в систему
          <img width="30px" src={heartIcon} alt="heart" />
        </DialogTitle>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            padding: 2
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
            id="standard-basic"
            label="Email"
            type="email"
            variant="standard"
          />
          <br />
          <TextField
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
            id="standard-basic"
            label="Password"
            type="password"
            variant="standard"
            
          />
          <Button onClick={login} color="inherit" variant="outlined">
            Увійти
          </Button>
        </Box>
      </Dialog>

      <Dialog onClose={handleCloseSignUp} open={openSignUp}>
        <DialogTitle>
          Час зареєструватися!
          <img width="30px" src={crossIcon} alt="cross" />
        </DialogTitle>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            padding: 2
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
            id="standard-basic"
            label="Email"
            type="email"
            variant="standard"
          />
          <br />
          <TextField
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
            id="standard-basic"
            label="Password"
            type="password"
            variant="standard"
            helperText="Щонайменше 6 символів"
          />
          <Button onClick={register} color="inherit" variant="outlined">
            Зареєструватися!
          </Button>
        </Box>
      </Dialog>
    </>
  );
};
