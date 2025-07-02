'use client'

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Forecast() {

    const [prophetChart, setProphetChart] = useState([]);
    const [arimaChart, setArimaChart] = useState([]);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("파일을 선택해주세요!");
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch("http://127.0.0.1:5000/api/forecast/arima", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error("ARIMA 오류");
            const data = await response.json();
            setArimaChart(data);
        } catch (error) {
            alert("ARIMA 에러: " + error.message);
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/forecast/prophet", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error("PROPHET 오류");
            const data = await response.json();
            setProphetChart(data);
        } catch (error) {
            alert("PROPHET 에러: " + error.message);
        }
    };

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
        <div style={{maxWidth: 800, margin: "0 auto"}}>
            <div style={{marginBottom: 16}}>
                <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
                <button onClick={handleUpload} style={{marginLeft: 8}}>업로드 및 예측</button>
            </div>
            <div style={{marginBottom: 12, fontWeight: 600}}>ARIMA & PROPHET 예측 비교</div>
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
        </div>
    );
};