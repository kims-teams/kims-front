"use client";

import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useScenarioStore } from "hooks/useScenarioStore";

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
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
};

export default function ProductionGanttPage() {
  const [tasks, setTasks] = useState([]);
  const [scenarioList, setScenarioList] = useState([]);

  const selectedScenario = useScenarioStore((state) => state.selectedScenario);
  const setSelectedScenario = useScenarioStore(
    (state) => state.setSelectedScenario
  );
  const scenario = selectedScenario?.id || "";

  useEffect(() => {
    fetch("http://52.78.234.7:8080/api/scenario")
      .then((res) => res.json())
      .then((data) => setScenarioList(data))
      .catch((err) => console.error("시나리오 목록 로딩 실패:", err));
  }, []);

  useEffect(() => {
    if (scenario) fetchGanttData(scenario);
    else setTasks([]);
  }, [scenario]);

  const fetchGanttData = (scenarioId) => {
    fetch(`http://52.78.234.7:5000/api/simulation/production-gantt/${scenarioId}`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data
          .filter((item) => item.StartDate && item.EndDate)
          .map((item, i) => ({
            id: item.TaskId ?? i + 1,
            text: item.TaskName ?? `작업-${i + 1}`,
            start_date: new Date(item.StartDate),
            end_date: new Date(item.EndDate),
            scenarioName: selectedScenario?.name ?? "",
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

      const style = document.createElement("style");
      style.innerHTML = `
        .gantt_task_line {
          background-color: #1a3d7c !important;
          border: 1px solid #1a3d7c !important;
          border-radius: 4px;
        }
      `;
      document.head.appendChild(style);

      gantt.plugins({ tooltip: true });
      gantt.clearAll();

      gantt.templates.tooltip_text = (start, end, task) => {
        const duration = calculateDurationInMinutes(start, end);
        return `
          <b>${task.text}</b><br/>
          ${formatFullDateTime(start)} ~ ${formatFullDateTime(end)}<br/>
          (${duration}분)<br/>
           <b>시나리오:</b> ${task.scenarioName || "-"}
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

      gantt.config.row_height = 43;
      gantt.config.bar_height = 33;
      gantt.config.date_format = "%Y-%m-%d %H:%i";
      gantt.config.grid_resize = true;
      gantt.config.autosize = "y";

      gantt.config.min_column_width = 50;
      gantt.config.scale_height = 47;

      gantt.init("gantt_here");

      if (tasks.length > 0) {
        const firstStart = tasks[0].start_date;
        const lastEnd = tasks[tasks.length - 1].end_date;

        gantt.config.start_date = new Date(firstStart);
        gantt.config.end_date = new Date(lastEnd.getTime() + 5 * 60 * 1000);

        gantt.parse({ data: tasks });

        setTimeout(() => {
          const pos = gantt.getTaskPosition(tasks[0]);
          gantt.scrollTo(pos.left - 300, null);
          gantt.setSizes();
        }, 0);
      }
    };

    if (typeof window !== "undefined" && tasks.length > 0) {
      initGantt();
    }
  }, [tasks]);

  return (
    <Box sx={{ flexGrow: 1, height: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          py: 1.7,
          borderBottom: "1px solid #ddd",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small">
            <InputLabel>시나리오</InputLabel>
            <Select
              value={scenario}
              onChange={(e) => {
                const selected = scenarioList.find(
                  (s) => s.id === e.target.value
                );
                setSelectedScenario(selected);
              }}
              label="시나리오"
              sx={{ minWidth: 140 }}
            >
              {scenarioList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <Box
        sx={{
          overflow: "auto",
          position: "relative",
        }}
      >
        {!scenario ? (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#999",
              fontSize: "1.2rem",
            }}
          >
            시나리오를 선택해주세요.
          </Box>
        ) : tasks.length > 0 ? (
          <div
            id="gantt_here"
            style={{
              minWidth: "100%",
              height: "100%",
            }}
          ></div>
        ) : null}
      </Box>
    </Box>
  );
}
