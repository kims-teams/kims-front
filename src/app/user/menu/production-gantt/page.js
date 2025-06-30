"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

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
  const [scenarioList, setScenarioList] = useState([]);
  const [scenario, setScenario] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/scenario")
      .then((res) => res.json())
      .then((data) => {
        setScenarioList(data);
        if (data.length > 0) setScenario(data[0].scenarioId); // key가 scenarioId인 경우 유지
      })
      .catch((err) => console.error("시나리오 목록 로딩 실패:", err));
  }, []);

  const handleSearch = () => {
    if (!scenario) return;

    fetch(`http://localhost:8080/api/simulation/production-gantt/${scenario}`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data
          .filter((item) => item.StartDate && item.EndDate)
          .map((item, i) => ({
            id: item.TaskId ?? i + 1,
            text: item.TaskName ?? `작업-${i + 1}`,
            start_date: new Date(item.StartDate),
            end_date: new Date(item.EndDate),
            scenarioId: scenario,
          }));

        setTasks(formatted);
      })
      .catch((err) => console.error("간트 데이터 로딩 실패:", err));
  };

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
        {
          unit: "day",
          step: 1,
          format: (date) => gantt.date.date_to_str("%Y년 %m월 %d일")(date),
        },
        { unit: "hour", step: 1, format: "%H:%i" },
        { unit: "minute", step: 5, format: "%H:%i" },
      ];

      gantt.config.columns = [
        { name: "text", label: "작업명", tree: true, width: 160 },
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
      gantt.config.grid_resize = true;
      gantt.config.autosize = "y";

      gantt.init("gantt_here");

      if (tasks.length > 0) {
        const firstStart = tasks[0].start_date;
        const lastEnd = tasks[tasks.length - 1].end_date;

        gantt.config.start_date = new Date(firstStart);
        gantt.config.end_date = new Date(lastEnd);

        gantt.parse({ data: tasks });
        setTimeout(() => gantt.setSizes(), 0);
      }
    };

    if (typeof window !== "undefined") {
      initGantt();
    }
  }, [tasks]);

  return (
    <Box sx={{ flexGrow: 1, height: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: "1px solid #ddd",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small">
            <InputLabel>시나리오</InputLabel>
            <Select
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              label="시나리오"
              sx={{ minWidth: 140 }}
            >
              {scenarioList.map((item, idx) => (
                <MenuItem key={idx} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleSearch}>
            검색
          </Button>
        </Stack>
      </Box>

      <Box sx={{ height: "calc(100vh - 128px)", overflow: "hidden" }}>
        <div id="gantt_here" style={{ width: "100%", height: "100%" }}></div>
      </Box>
    </Box>
  );
}
