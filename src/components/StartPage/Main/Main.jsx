import * as React from "react";
import { Box } from "@mui/material";
import doc1 from "../../../assets/images/doctor.png";
import doc2 from "../../../assets/images/doctor2.png";

export const Main = () => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
         }}>
            <img src={doc1} alt="doc" />
            <h2>WebPocketDoc - Ваш персональний асистент</h2>
            <img src={doc2} alt="doc" />
            <h2>Для контролю стану вашого здоров'я</h2>
        </Box>
    )
}