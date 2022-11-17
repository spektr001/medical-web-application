import * as React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import heartIcon from "../../../assets/images/heart.png";

export const LoginDialog = (props) => {
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      props.updateLoginState(false);
      navigate("/dashboard");
    } catch (error) {
      alert("Помилка! Некоректний email або пароль.");
    }
  };

  return (
    <Dialog
      onClose={() => {
        props.updateLoginState(false);
      }}
      open={props.open}
    >
      <DialogTitle>
        Увійдіть в систему
        <img width="30px" src={heartIcon} alt="heart" />
      </DialogTitle>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          padding: 2,
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
  );
};
