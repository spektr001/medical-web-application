import * as React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { db } from "../../../firebase-config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import moment from "moment";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";

export const IndicatorsScreen = () => {
  const [hgb, setHgb] = React.useState("");
  const [mch, setMch] = React.useState("");
  const [mchc, setMchc] = React.useState("");
  const [mcv, setMcv] = React.useState("");
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
  };

  const sendParams = async () => {
    await updateDoc(doc(db, "healthDatabase", user.email), {
      healthStat: arrayUnion({
        date: moment().format("D.MM.YYYY"),
        hgb: Number(hgb),
        mch: Number(mch),
        mchc: Number(mchc),
        mcv: Number(mcv),
      }),
    });
    alert("Дані успішно записано!");
  };

  return (
    <>
      <h1 align="center">Давайте проаналізуємо ваші показники</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
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
          <h2>Метрики крові</h2>
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
        </Box>
        <Box>
          {/* <h2>ІМТ (Індекс маси тіла)</h2>
          <TextField
            value={weight}
            onChange={(event) => {
              setWeight(event.target.value);
            }}
            id="outlined-basic"
            label="Введіть вагу"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">кг</InputAdornment>,
            }}
          />
          <TextField
            value={height}
            onChange={(event) => {
              setHeight(event.target.value);
            }}
            id="outlined-basic"
            label="Введіть зріст"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">м</InputAdornment>,
            }}
          /> */}
          {/* <Button onClick={imt} color="inherit" variant="filled">
            Підрахувати
          </Button>
          <h3>Результат: {i}</h3>
          <span>{result()}</span>
          <br /> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20",
            }}
          >
            <Button onClick={sendParams} variant="contained">
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
