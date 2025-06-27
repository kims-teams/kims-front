"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import gantt from "dhtmlx-gantt";

// 🧩 툴팁 기능 활성화
gantt.plugins({ tooltip: true });

// 🧮 기간 계산: 분 단위
const calculateDurationInMinutes = (start, end) => {
  const durationMs = new Date(end) - new Date(start);
  const minutes = durationMs / (1000 * 60);
  return Math.round(minutes);
};

// ⏱️ 시간만 포맷 (09:05)
const formatHourMinute = (date) => {
  const d = new Date(date);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
};

// 🕒 툴팁 전용 포맷 (yyyy-MM-dd HH:mm)
const formatFullDateTime = (date) => {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}`;
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
      .catch((err) => {
        console.error("간트 데이터 로딩 실패:", err);
      });
  }, []);

  useEffect(() => {
    gantt.clearAll();

    // 🧾 툴팁 정의
    gantt.templates.tooltip_text = function (start, end, task) {
      const duration = calculateDurationInMinutes(start, end);
      return `
        ${formatFullDateTime(start)} ~ ${formatFullDateTime(end)} (${duration}분)<br/>
        <b>시나리오</b>: ${task.scenarioId || "-"}
      `;
    };

    // 📅 축 단위 설정
    gantt.config.scales = [
      { unit: "hour", step: 1, format: "%H:%i" },
      { unit: "minute", step: 5, format: "%H:%i" },
    ];

    // ✅ 왼쪽 목록 열 포맷 수정 (시간만 표시)
    gantt.config.columns = [
      { name: "text", label: "작업명", tree: true, width: "*" },
      {
        name: "start_date",
        label: "시작",
        align: "center",
        template: function (task) {
          return formatHourMinute(task.start_date);
        },
      },
      {
        name: "end_date",
        label: "종료",
        align: "center",
        template: function (task) {
          return formatHourMinute(task.end_date);
        },
      },
    ];

    // 📅 전체 날짜 포맷
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.start_date = new Date("2025-06-23T09:00:00");
    gantt.config.end_date = new Date("2025-06-23T12:00:00");

    gantt.init("gantt_here");

    if (tasks.length > 0) {
      gantt.parse({ data: tasks });
    }
  }, [tasks]);

  return (
    <Box sx={{ height: "800px", width: "100%" }}>
      <div id="gantt_here" style={{ width: "100%", height: "100%" }}></div>
    </Box>
  );
}
