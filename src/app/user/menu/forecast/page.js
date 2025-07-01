'use client'

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Forecast() {

    const [prophetChart, setProphetChart] = useState([]);
    const [arimaChart, setArimaChart] = useState([]);

    useEffect(() => {
        const fetchArima = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/forecast/arima", {
                    method: "POST",
                });
                if (!response.ok) throw new Error("오류 ㅋ");
                const data = await response.json();
                setArimaChart(data);
                console.log("ARIMA:", data);
            } catch (error) {
                console.log("arima error:", error.message);
            }
        };
        fetchArima();
    }, []);

    useEffect(() => {
        const fetchProphet = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/forecast/prophet", {
                    method: "POST",
                });
                if (!response.ok) throw new Error("오류 ㅋ");
                const data = await response.json();
                setProphetChart(data);
                console.log("PROPHET:", data);
            } catch (error) {
                console.log("prophet error:", error.message);
            }
        };
        fetchProphet();
    }, []);

    function mergeByDate(arr1, arr2, name1, name2) {
        const map = {};
        arr1.forEach(item => {
            if (!map[item.date]) map[item.date] = { date: item.date };
         map[item.date][name1] = item.value;
        });
        arr2.forEach(item => {
            if (!map[item.date]) map[item.date] = { date: item.date };
            map[item.date][name2] = item.value;
        });
        return Object.values(map).sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    const comparisonData = mergeByDate(arimaChart, prophetChart, "ARIMA", "PROPHET");

    return(
        <>
        <div>ARIMA & PROPHET</div>
<ResponsiveContainer width="100%" height={400}>
  <LineChart data={comparisonData}>
    <CartesianGrid strokeDasharray="3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="ARIMA" name="ARIMA" stroke="#8884d8" dot={false} />
    <Line type="monotone" dataKey="PROPHET" name="PROPHET" stroke="#000000" dot={false} />
  </LineChart>
</ResponsiveContainer>
        </>
    );
};