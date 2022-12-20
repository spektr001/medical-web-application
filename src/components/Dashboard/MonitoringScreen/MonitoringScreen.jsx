import * as React from "react";
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
