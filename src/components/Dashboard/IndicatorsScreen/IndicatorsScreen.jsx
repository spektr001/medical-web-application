import * as React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { db } from "../../../firebase-config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import moment from "moment";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

export const IndicatorsScreen = () => {
  const [hgb, setHgb] = React.useState("");
  const [mch, setMch] = React.useState("");
  const [mchc, setMchc] = React.useState("");
  const [mcv, setMcv] = React.useState("");
  const [bp, setBp] = React.useState("");
  const [csl, setCsl] = React.useState("");
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const clearParams = () => {
    setHgb("");
    setMch("");
    setMchc("");
    setMcv("");
    setBp("");
    setCsl();
  };

  const sendParams = async () => {
    await updateDoc(doc(db, "healthDatabase", user.email), {
      healthStat: arrayUnion({
        date: moment().format("D.MM.YYYY"),
        hgb: Number(hgb),
        mch: Number(mch),
        mchc: Number(mchc),
        mcv: Number(mcv),
        bp: Number(bp),
        csl: Number(csl),
      }),
    });
    alert("Дані успішно записано!");
  };

  return (
    <>
      <h1 align="center">Введіть ваші показники</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
        >
          <TextField
            value={hgb}
            onChange={(event) => {
              setHgb(event.target.value);
            }}
            id="outlined-basic"
            label="HGB"
            variant="outlined"
            helperText={"Рівень гемоглобіну"}
          />
          <TextField
            value={mch}
            onChange={(event) => {
              setMch(event.target.value);
            }}
            id="outlined-basic"
            label="MCH"
            variant="outlined"
            helperText={"Вміст гемоглобіну в еритроциті"}
          />

          <TextField
            value={mchc}
            onChange={(event) => {
              setMchc(event.target.value);
            }}
            id="outlined-basic"
            label="MCHC"
            variant="outlined"
            helperText={"Концентрація гемоглобіну в еритроциті"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
        >
          <TextField
            value={mcv}
            onChange={(event) => {
              setMcv(event.target.value);
            }}
            id="outlined-basic"
            label="MCV"
            variant="outlined"
            helperText={"Середній об'єм еритроцита"}
          />
          <TextField
            value={bp}
            onChange={(event) => {
              setBp(event.target.value);
            }}
            id="outlined-basic"
            label="BP"
            variant="outlined"
            helperText={"Кров'яний тиск"}
          />
          <TextField
            value={csl}
            onChange={(event) => {
              setCsl(event.target.value);
            }}
            id="outlined-basic"
            label="CSL"
            variant="outlined"
            helperText={"Рівень холестерину"}
          />
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              sx={{ marginBottom: 5 }}
              onClick={sendParams}
              variant="contained"
            >
              Записати дані
            </Button>
            <Button onClick={clearParams} variant="contained">
              Очистити дані
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
