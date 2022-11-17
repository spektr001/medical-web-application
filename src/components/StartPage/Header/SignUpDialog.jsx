import * as React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../../firebase-config";
import { db } from "../../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import crossIcon from "../../../assets/images/cross.png";

export const SignUpDialog = (props) => {
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      await createUser();
      alert("Ви успішно зареєструвалися!");
      props.updateSignUpState(false);
      props.updateLoginState(true);
    } catch (error) {
      alert("Помилка! Некоректний email або пароль.");
    }
  };

  const createUser = () => {
    setDoc(doc(db, "healthDatabase", user.email), {});
  };

  return (
    <Dialog
      onClose={() => {
        props.updateSignUpState(false);
      }}
      open={props.open}
    >
      <DialogTitle>
        Час зареєструватися!
        <img width="30px" src={crossIcon} alt="cross" />
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
  );
};
