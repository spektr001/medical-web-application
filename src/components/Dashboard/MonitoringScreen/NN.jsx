import * as React from "react";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Chip from "@mui/material/Chip";
let brain = require("brain.js");

export const NN = () => {
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
      return "no anemia";
    } else {
      return "anemia";
    }
  };

  net.train([
    {
      input: {
        gender: 1,
        hgb: getCoefficient(15, 20, 5),
        mch: getCoefficient(23, 30, 15),
        mchc: getCoefficient(29, 40, 20),
        mcv: getCoefficient(84, 110, 60),
      },
      output: { noanemia: 1 },
    },
    {
      input: {
        gender: 0,
        hgb: getCoefficient(16, 20, 5),
        mch: getCoefficient(25, 30, 15),
        mchc: getCoefficient(28, 40, 20),
        mcv: getCoefficient(72, 110, 60),
      },
      output: { noanemia: 1 },
    },
    {
      input: {
        gender: 0,
        hgb: getCoefficient(9, 20, 5),
        mch: getCoefficient(21, 30, 15),
        mchc: getCoefficient(30, 40, 20),
        mcv: getCoefficient(71, 110, 60),
      },
      output: { anemia: 1 },
    },
    {
      input: {
        gender: 0,
        hgb: getCoefficient(15, 20, 5),
        mch: getCoefficient(16, 30, 15),
        mchc: getCoefficient(31, 40, 20),
        mcv: getCoefficient(87, 110, 60),
      },
      output: { noanemia: 1 },
    },
    {
      input: {
        gender: 1,
        hgb: getCoefficient(15, 20, 5),
        mch: getCoefficient(22, 30, 15),
        mchc: getCoefficient(28, 40, 20),
        mcv: getCoefficient(99, 110, 60),
      },
      output: { noanemia: 1 },
    },
    {
      input: {
        gender: 1,
        hgb: getCoefficient(13, 20, 5),
        mch: getCoefficient(19, 30, 15),
        mchc: getCoefficient(29, 40, 20),
        mcv: getCoefficient(83, 110, 60),
      },
      output: { anemia: 1 },
    },
    {
      input: {
        gender: 0,
        hgb: getCoefficient(11, 20, 5),
        mch: getCoefficient(24, 30, 15),
        mchc: getCoefficient(32, 40, 20),
        mcv: getCoefficient(91, 110, 60),
      },
      output: { anemia: 1 },
    },
    {
      input: {
        gender: 0,
        hgb: getCoefficient(15, 20, 5),
        mch: getCoefficient(27, 30, 15),
        mchc: getCoefficient(32, 40, 20),
        mcv: getCoefficient(72, 110, 60),
      },
      output: { noanemia: 1 },
    },
    {
      input: {
        gender: 1,
        hgb: getCoefficient(13, 20, 5),
        mch: getCoefficient(26, 30, 15),
        mchc: getCoefficient(28, 40, 20),
        mcv: getCoefficient(77, 110, 60),
      },
      output: { anemia: 1 },
    },
    {
      input: {
        gender: 0,
        hgb: getCoefficient(11, 20, 5),
        mch: getCoefficient(28, 30, 15),
        mchc: getCoefficient(31, 40, 20),
        mcv: getCoefficient(86, 110, 60),
      },
      output: { anemia: 1 },
    },
  ]);

  let output 

  if (data.length === 0) {
    output = null
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
    <Chip
      label={data.length === 0 ? "Loading..." : getMaxProbability(Object.values(output))}
      color={
        data.length === 0 ? "primary" :
        getMaxProbability(Object.values(output)) === "no anemia"
          ? "success"
          : getMaxProbability(Object.values(output)) === "anemia"
          ? "error"
          : null
          
      }
    />
  );
};
