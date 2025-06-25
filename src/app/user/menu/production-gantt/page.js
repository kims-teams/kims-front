"use client";

import { useEffect, useState } from "react";
import { Gantt, ViewMode } from "@rsagiev/gantt-task-react-19";
import "@rsagiev/gantt-task-react-19/dist/index.css";

export default function ProductionGanttPage() {
  const [tasks, setTasks] = useState([]);

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
      .then((res) => {
        if (!res.ok) throw new Error("데이터 요청 실패");
        return res.json();
      })
      .then((data) => {
        console.log("✅ 응답 데이터:", data);

        const filtered = data.filter(
          (item) => !item.remarks?.startsWith("작업장 ")
        );

        const grouped = filtered.reduce((acc, item) => {
          const key = item.workcenterId || item.workcenter_id;
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        }, {});

        const formatted = [];

        Object.entries(grouped).forEach(([_, items], groupIdx) => {
          items.forEach((item, i) => {
            const start = item?.startTime ? new Date(item.startTime) : null;
            const end = item?.endTime ? new Date(item.endTime) : null;

            if (
              !(start instanceof Date && !isNaN(start.getTime())) ||
              !(end instanceof Date && !isNaN(end.getTime()))
            ) {
              console.warn("⚠️ 유효하지 않은 날짜 있음:", item);
              return;
            }

            formatted.push({
              id: `Task-${groupIdx}-${i}`,
              name: item.toolId
                ? `${item.remarks} (${item.toolId})`
                : `${item.remarks}`,
              start,
              end,
              type: "task",
              progress: 100,
              isDisabled: false,
            });
          });
        });

        const safeTasks = formatted.filter((task) => {
          const isValid =
            task &&
            task.start instanceof Date &&
            !isNaN(task.start.getTime()) &&
            task.end instanceof Date &&
            !isNaN(task.end.getTime()) &&
            typeof task.id === "string" &&
            typeof task.name === "string" &&
            typeof task.type === "string";

          if (!isValid) {
            console.warn("⛔️ 필터에서 제거된 task:", task);
          }

          return isValid;
        });

        console.log("🎯 변환된 safeTasks:", safeTasks);
        setTasks(safeTasks);
      })
      .catch((err) => {
        console.error("🚨 간트 데이터 불러오기 실패:", err);
      });
  }, []);

  const viewStart = new Date("2025-06-23T09:00:00");
  const viewEnd = new Date("2025-06-23T12:00:00");

  return (
    <div style={{ height: "600px", overflowX: "auto" }}>
      {tasks.length > 0 &&
      tasks.every(
        (t) =>
          t?.start instanceof Date &&
          !isNaN(t.start?.getTime?.()) &&
          t?.end instanceof Date &&
          !isNaN(t.end?.getTime?.())
      ) ? (
        <Gantt
          tasks={tasks}
          viewMode={ViewMode.Hour}
          startDate={viewStart}
          endDate={viewEnd}
          listCellWidth=""
          columnWidth={120}
          preStepsCount={0}
        />
      ) : (
        <p style={{ padding: "1rem" }}>⏳ 간트 데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
}
