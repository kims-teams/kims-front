"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const calculateDurationInMinutes = (start, end) => {
  const durationMs = new Date(end) - new Date(start);
  return Math.round(durationMs / (1000 * 60));
};

const formatHourMinute = (date) => {
  const d = new Date(date);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const formatFullDateTime = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(
    2,
    "0"
  )} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

export default function ProductionGanttPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/simulation/production-gantt/9")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data
          .filter((item) => item.StartDate && item.EndDate)
          .map((item) => ({
            id: item.TaskID,
            text: item.TaskName,
            start_date: new Date(item.StartDate),
            end_date: new Date(item.EndDate),
            scenarioId: "S010000",
          }));
        setTasks(formatted);
      })
      .catch((err) => console.error("간트 데이터 로딩 실패:", err));
  }, []);

  useEffect(() => {
    const initGantt = async () => {
      const ganttLib = await import("dhtmlx-gantt");
      await import("dhtmlx-gantt/codebase/dhtmlxgantt.css");

      const gantt = ganttLib.default;

      gantt.plugins({ tooltip: true });
      gantt.clearAll();

      gantt.templates.tooltip_text = (start, end, task) => {
        const duration = calculateDurationInMinutes(start, end);
        return `
          <b>${task.text}</b><br/>
          ${formatFullDateTime(start)} ~ ${formatFullDateTime(end)}<br/>
          (${duration}분)<br/>
          <b>시나리오:</b> ${task.scenarioId || "-"}
        `;
      };

      gantt.config.scales = [
        { unit: "hour", step: 1, format: "%H:%i" },
        { unit: "minute", step: 5, format: "%H:%i" },
      ];

      gantt.config.columns = [
        {
          name: "text",
          label: "작업명",
          tree: true,
          width: 160,
          resize: true,
        },
        {
          name: "start_date",
          label: "시작",
          align: "center",
          width: 100,
          template: (task) => formatHourMinute(task.start_date),
        },
        {
          name: "end_date",
          label: "종료",
          align: "center",
          width: 100,
          template: (task) => formatHourMinute(task.end_date),
        },
      ];

      gantt.config.row_height = 48;
      gantt.config.bar_height = 38;
      gantt.config.date_format = "%Y-%m-%d %H:%i";
      gantt.config.start_date = new Date("2025-06-23T09:00:00");
      gantt.config.end_date = new Date("2025-06-23T12:00:00");
      gantt.config.grid_resize = true;
      gantt.config.autosize = "y";

      gantt.init("gantt_here");

      if (tasks.length > 0) {
        gantt.parse({ data: tasks });
        setTimeout(() => gantt.setSizes(), 0);
      }
    };

    if (typeof window !== "undefined") {
      initGantt();
    }
  }, [tasks]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        overflow: "hidden",
      }}
    >
      <div id="gantt_here" style={{ width: "100%", height: "100%" }}></div>
    </Box>
  );
}
