import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { AnemiaDetect, HeartDisDetect } from "./NN";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export const MonitoringScreen = () => {
  const [data, setData] = React.useState(["Loading..."]);

  React.useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      await localStorage.setItem("email", currentUser.email);
    });
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      const querySnapshots = doc(
        db,
        "healthDatabase",
        localStorage.getItem("email")
      );
      const mySnap = await getDoc(querySnapshots);
      setData(mySnap.data().healthStat);
    }
    fetchData();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell align="right">HGB</TableCell>
              <TableCell align="right">MCH</TableCell>
              <TableCell align="right">MCHC</TableCell>
              <TableCell align="right">MCV</TableCell>
              <TableCell align="right">BP</TableCell>
              <TableCell align="right">CSL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <TableRow
                key={data.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.date}
                </TableCell>
                <TableCell align="right">{data.hgb}</TableCell>
                <TableCell align="right">{data.mch}</TableCell>
                <TableCell align="right">{data.mchc}</TableCell>
                <TableCell align="right">{data.mcv}</TableCell>
                <TableCell align="right">{data.bp}</TableCell>
                <TableCell align="right">{data.csl}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          backgroundColor: "#fff",
        }}
      >
        <LineChart
          width={700}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          0.
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="hgb" stroke="#00FFFF" />
          <Line type="monotone" dataKey="mch" stroke="#0000FF" />
          <Line type="monotone" dataKey="mchc" stroke="#008000" />
          <Line type="monotone" dataKey="mcv" stroke="#008080" />
          <Line type="monotone" dataKey="bp" stroke="#CC0000" />
          <Line type="monotone" dataKey="csl" stroke="#FFFF00" />
        </LineChart>

        <RadarChart outerRadius={90} width={730} height={250} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="date" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            name="HGB"
            dataKey="hgb"
            stroke="#00FFFF"
            fill="#00FFFF"
            fillOpacity={0.6}
          />
          <Radar
            name="MCH"
            dataKey="mch"
            stroke="#0000FF"
            fill="#0000FF"
            fillOpacity={0.6}
          />
          <Radar
            name="MCHC"
            dataKey="mchc"
            stroke="#008000"
            fill="#008000"
            fillOpacity={0.6}
          />
          <Radar
            name="MCV"
            dataKey="mcv"
            stroke="#008080"
            fill="#008080"
            fillOpacity={0.6}
          />
          <Radar
            name="BP"
            dataKey="bp"
            stroke="#CC0000"
            fill="#CC0000"
            fillOpacity={0.6}
          />
          <Radar
            name="CSL"
            dataKey="csl"
            stroke="#FFFF00"
            fill="#FFFF00"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h1>Результати: </h1>
        <AnemiaDetect />
        <HeartDisDetect />
      </Box>
    </>
  );
};
