"use client";

import React, { useEffect, useState } from "react";
import { GanttComponent, Inject, Selection } from "@syncfusion/ej2-react-gantt";
import { registerLicense } from "@syncfusion/ej2-base";
import "@syncfusion/ej2-react-gantt/styles/material.css";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NNaF1cWWhOYVFpR2Nbek5zflZCallZVAciSV9jS3tTcEdmWXxddHFdR2ZdUk90Vg=="
);

const parseDate = (str) => new Date(str);

const startView = new Date("2025-06-23T08:45:00");
const endView = new Date("2025-06-23T12:00:00");

export default function ProductionGanttPage() {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const scenarioId = 9;
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("🚨 토큰 없음. 로그인 필요.");
      return;
    }

    fetch(
      `http://localhost:8080/api/simulation/results?scenarioId=${scenarioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item, i) => ({
          TaskID: i + 1,
          TaskName: item.remarks,
          StartDate: parseDate(item.startTime),
          EndDate: parseDate(item.endTime),
        }));
        setTaskData(formatted);
      })
      .catch((err) => {
        console.error("🚨 간트 데이터 불러오기 실패:", err);
      });
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <GanttComponent
        dataSource={taskData}
        taskFields={{
          id: "TaskID",
          name: "TaskName",
          startDate: "StartDate",
          endDate: "EndDate",
        }}
        height="600px"
        rowHeight={40}
        allowSelection={true}
        highlightWeekends={true}
        projectStartDate={startView}
        projectEndDate={endView}
        timelineSettings={{
          timelineUnitSize: 40,
          topTier: { unit: "Hour", format: "HH:mm" },
          bottomTier: { unit: "Minutes", count: 5, format: "mm" },
        }}
        labelSettings={{ leftLabel: "TaskName" }}
        treeColumnIndex={1}
        gridLines="None"
        splitterSettings={{ position: "30%" }}
        columns={[
          {
            field: "TaskID",
            headerText: "ID",
            width: "60",
            textAlign: "Center",
          },
          {
            field: "TaskName",
            headerText: "작업 이름",
            width: "200",
          },
        ]}
      >
        <Inject services={[Selection]} />
      </GanttComponent>
    </div>
  );
}
