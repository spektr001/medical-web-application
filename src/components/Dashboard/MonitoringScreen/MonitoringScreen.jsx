import * as React from "react";
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Дата</TableCell>
            <TableCell align="right">Пульс</TableCell>
            <TableCell align="right">Верхній тиск</TableCell>
            <TableCell align="right">Нижній тиск</TableCell>
            <TableCell align="right">Ріст</TableCell>
            <TableCell align="right">Вага</TableCell>
            <TableCell align="right">ІМТ</TableCell>
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
              <TableCell align="right">{data.pulse}</TableCell>
              <TableCell align="right">{data.hPressure}</TableCell>
              <TableCell align="right">{data.lPressure}</TableCell>
              <TableCell align="right">{data.height}</TableCell>
              <TableCell align="right">{data.weight}</TableCell>
              <TableCell align="right">{data.imt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
