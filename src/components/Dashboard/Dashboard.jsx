import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { HeaderBar } from "./HeaderBar/HeaderBar"
import { IndicatorsScreen } from "./IndicatorsScreen/IndicatorsScreen";
import { MonitoringScreen } from "./MonitoringScreen/MonitoringScreen";

export const Dashboard = () => {
    return (
        <>
        <HeaderBar />
        <Routes>
            <Route path="/" element={<IndicatorsScreen />} />
            <Route path="/monitors" element={<MonitoringScreen />} />
        </Routes>
        
        </>
    )
};
