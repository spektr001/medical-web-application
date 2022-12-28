import * as React from "react";
import { anemiaDataset, heartDisDataset } from "./datasets";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Chip from "@mui/material/Chip";
let brain = require("brain.js");

export const AnemiaDetect = () => {
  const [data, setData] = React.useState(["Loading..."]);
  const [gender, setGender] = React.useState(1);

  React.useEffect(() => {
    async function fetchData() {
      const querySnapshots = doc(
        db,
        "healthDatabase",
        localStorage.getItem("email")
      );
      const mySnap = await getDoc(querySnapshots);
      setData(mySnap.data().healthStat);
      setGender(mySnap.data().gender);
    }
    fetchData();
  }, []);

  let net = new brain.NeuralNetwork();

  const getCoefficient = (value, maxV, minV) => {
    if (value > maxV) {
      value = maxV;
    } else if (value < minV) {
      value = minV;
    }

    return value / maxV;
  };

  const getMaxProbability = (output) => {
    if (output[0] > output[1]) {
      return "Анемії не виявлено";
    } else {
      return "Виявлено анемію";
    }
  };

  net.train(anemiaDataset);

  let output;

  if (data.length === 0) {
    output = null;
  } else {
    output = net.run({
      gender: gender,
      hgb: getCoefficient(data[data.length - 1].hgb, 20, 5),
      mch: getCoefficient(data[data.length - 1].mch, 30, 15),
      mchc: getCoefficient(data[data.length - 1].mchc, 40, 20),
      mcv: getCoefficient(data[data.length - 1].mcv, 110, 60),
    });
  }

  return (
    <>
      <Chip
        sx={{ marginLeft: 2 }}
        label={
          data.length === 0
            ? "Loading..."
            : getMaxProbability(Object.values(output))
        }
        color={
          data.length === 0
            ? "primary"
            : getMaxProbability(Object.values(output)) === "Анемії не виявлено"
            ? "success"
            : getMaxProbability(Object.values(output)) === "Виявлено анемію"
            ? "error"
            : null
        }
      />
    </>
  );
};

export const HeartDisDetect = () => {
  const [data, setData] = React.useState(["Loading..."]);
  const [gender, setGender] = React.useState(1);
  const [age, setAge] = React.useState(18);

  React.useEffect(() => {
    async function fetchData() {
      const querySnapshots = doc(
        db,
        "healthDatabase",
        localStorage.getItem("email")
      );
      const mySnap = await getDoc(querySnapshots);
      setData(mySnap.data().healthStat);
      setGender(mySnap.data().gender);
      setAge(mySnap.data().age);
    }
    fetchData();
  }, []);

  let net = new brain.NeuralNetwork();

  const getCoefficient = (value, maxV, minV) => {
    if (value > maxV) {
      value = maxV;
    } else if (value < minV) {
      value = minV;
    }

    return value / maxV;
  };

  const getMaxProbability = (output) => {
    if (output[0] > output[1]) {
      return "Схильності до серцевих захворювань не зафіксовано";
    } else {
      return "Виявлено схильність до серцевих захворювань";
    }
  };

  net.train(heartDisDataset);

  let output;

  if (data.length === 0) {
    output = null;
  } else {
    output = net.run({
      gender: gender,
      age: getCoefficient(age, 80, 30),
      bp: getCoefficient(data[data.length - 1].bp, 180, 90),
      csl: getCoefficient(data[data.length - 1].csl, 570, 100),
    });
  }

  return (
    <>
      <Chip
        sx={{ marginLeft: 2 }}
        label={
          data.length === 0
            ? "Loading..."
            : getMaxProbability(Object.values(output))
        }
        color={
          data.length === 0
            ? "primary"
            : getMaxProbability(Object.values(output)) ===
              "Схильності до серцевих захворювань не зафіксовано"
            ? "success"
            : getMaxProbability(Object.values(output)) ===
              "Виявлено схильність до серцевих захворювань"
            ? "error"
            : null
        }
      />
    </>
  );
};
