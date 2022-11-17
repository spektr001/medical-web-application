import * as React from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";

export const IndicatorsScreen = () => {
  const [pulse, setPulse] = React.useState("");
  const [hPressure, setHPressure] = React.useState("");
  const [lPressure, setLPressure] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [i, setI] = React.useState("");

  const imt = () => {
    setI((weight / Math.pow(height, 2)).toFixed(1));
  };

  const result = () => {
    if (i === "") {
      return "";
    } else if (i < 18.5) {
      return "Недостатня маса. Рекомендується покращити харчування.";
    } else if (i < 18.5 && i > 24.9) {
      return "Норма.";
    } else if (i > 25.0) {
      return "Надлишкова маса. Рекомендується переглянути раціон та звернути увагу на фізичні вправи.";
    } else if (i < 25.0 && i > 29.9) {
      return "Передожиріння. Рекомендується переглянути раціон та звернути увагу на фізичні вправи.";
    } else if (i < 30.0 && i > 34.9) {
      return "Ожиріння 1 ступеня. Рекомендується звернутися до дієтолога.";
    } else if (i < 35.0 && i > 39.9) {
      return "Ожиріння 2 ступеня. Рекомендується звернутися до дієтолога.";
    } else if (i > 40.0) {
      return "Ожиріння 3 ступеня. Небезпека для здоров'я. Рекомендується негайно звернутися до лікаря.";
    }
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
          <h2>Основні показники</h2>
          <TextField
            onChange={(event) => {
              setPulse(event.target.value);
            }}
            id="outlined-basic"
            label="Введіть пульс"
            variant="outlined"
            helperText={
              pulse === ""
                ? ""
                : "Пульс в нормі" && pulse < 60
                ? "Пульс занизький"
                : "Пульс в нормі" && pulse > 80
                ? "Пульс зависокий"
                : "Пульс в нормі"
            }
          />
          <TextField
            onChange={(event) => {
              setHPressure(event.target.value);
            }}
            id="outlined-basic"
            label="Введіть верхній тиск"
            variant="outlined"
            helperText={
              hPressure === ""
                ? ""
                : "Тиск в нормі" && hPressure < 120
                ? "Тиск занизький"
                : "Тиск в нормі" && hPressure > 120
                ? "Тиск зависокий"
                : "Тиск в нормі"
            }
          />

          <TextField
            onChange={(event) => {
              setLPressure(event.target.value);
            }}
            id="outlined-basic"
            label="Введіть нижній тиск"
            variant="outlined"
            helperText={
              lPressure === ""
                ? ""
                : "Тиск в нормі" && lPressure < 80
                ? "Тиск занизький"
                : "Тиск в нормі" && lPressure > 80
                ? "Тиск зависокий"
                : "Тиск в нормі"
            }
          />
        </Box>
        <Box>
          <h2>ІМТ (Індекс маси тіла)</h2>
          <TextField
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
            onChange={(event) => {
              setHeight(event.target.value);
            }}
            id="outlined-basic"
            label="Введіть зріст"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">м</InputAdornment>,
            }}
          />
          <Button onClick={imt} color="inherit" variant="filled">
            Підрахувати
          </Button>
          <h3>
            Результат: {i}. {result()}
          </h3>
          <Button variant="filled">Запам'ятати дані</Button>
        </Box>
      </Box>
    </>
  );
};
