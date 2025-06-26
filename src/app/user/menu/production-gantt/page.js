"use client";

import React, { useEffect, useState, useRef } from "react";
import { GanttComponent, Inject, Selection } from "@syncfusion/ej2-react-gantt";
import { registerLicense } from "@syncfusion/ej2-base";
import "@syncfusion/ej2-react-gantt/styles/bootstrap5.css";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1cWWhOYVFpR2Nbek5zflZCallZVAciSV9jS3tTcEdmWXxddHFdR2ZdUk90Vg=="
);

const startView = new Date("2025-06-23T09:00:00");
const endView = new Date("2025-06-23T12:00:00");
const rowHeight = 40;

export default function ProductionGanttPage() {
  const [taskData, setTaskData] = useState([]);
  const ganttRef = useRef(null);
  const leftScrollRef = useRef(null);

  useEffect(() => {
    const scenarioId = 9;
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(
      `http://localhost:8080/api/simulation/production-gantt/${scenarioId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const withLinks = data.map((item, idx) => ({
          ...item,
          Predecessor: idx === 0 ? null : `${data[idx - 1].TaskID}FS`,
        }));
        setTaskData(withLinks);
      });
  }, []);

  const syncScroll = (e) => {
    if (ganttRef.current) {
      ganttRef.current.ganttChartModule.scrollObject.setScrollTop(
        e.target.scrollTop
      );
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <style>{`
        .e-gantt .e-grid {
          display: none !important;
        }
        .e-gantt .e-timeline-gantt-chart {
          background-color: #ffffff !important;
        }
        .e-gantt .e-chart-row-border {
          stroke: #dcdcdc !important;
          stroke-width: 1px;
        }
        .e-gantt .e-chart-vertical-line {
          stroke: #f1f1f1 !important;
          stroke-width: 1px;
        }
        .e-gantt .e-task-label {
          fill: #000 !important;
        }
        .e-gantt .e-timeline-single-header-cell,
        .e-gantt .e-timeline-top-header-cell,
        .e-gantt .e-timeline-bottom-header-cell {
          padding: 0 !important;
        }
        .e-gantt-tooltip {
          background-color: #2e2e2e !important;
          color: #fff !important;
          border-radius: 6px;
          font-size: 13px;
          padding: 8px 12px;
        }
      `}</style>

      <div
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          paddingLeft: 10,
          backgroundColor: "#eee",
          fontWeight: "bold",
          borderRadius: 4,
          marginBottom: 6,
          border: "1px solid #ccc",
        }}
      >
        작업 스케줄 간트 차트
      </div>

      <div style={{ display: "flex", overflowX: "auto" }}>
        <div
          style={{ width: 200, overflowY: "auto" }}
          onScroll={syncScroll}
          ref={leftScrollRef}
        >
          <div style={{ height: rowHeight, boxSizing: "border-box" }} />
          <div
            style={{
              height: rowHeight,
              fontWeight: "bold",
              borderBottom: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f8f8f8",
              boxSizing: "border-box",
              paddingLeft: 8,
              fontSize: 14,
            }}
          >
            ID / 작업명
          </div>

          {taskData.map((item) => (
            <div
              key={item.TaskID}
              style={{
                height: rowHeight,
                display: "flex",
                alignItems: "center",
                boxSizing: "border-box",
                paddingLeft: 8,
                fontSize: 14,
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {item.TaskID}. {item.TaskName}
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              height: rowHeight,
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: 16,
              paddingLeft: 10,
              backgroundColor: "#fff",
              borderBottom: "1px solid #ddd",
              boxSizing: "border-box",
            }}
          >
            Date: 2025-06-23
          </div>

          <GanttComponent
            ref={ganttRef}
            dataSource={taskData}
            taskFields={{
              id: "TaskID",
              name: "TaskName",
              startDate: "StartDate",
              endDate: "EndDate",
              dependency: "Predecessor",
            }}
            height="700px"
            rowHeight={rowHeight}
            allowSelection={true}
            highlightWeekends={true}
            projectStartDate={startView}
            projectEndDate={endView}
            timelineSettings={{
              timelineUnitSize: 50,
              topTier: { unit: "Hour", format: "HH:mm" },
              bottomTier: { unit: "Minutes", count: 5, format: "mm" },
              timelineViewMode: "Timeline",
            }}
            labelSettings={{ leftLabel: "TaskName" }}
            treeColumnIndex={-1}
            splitterSettings={{ position: "0%" }}
            columns={[]}
            gridLines="Both"
            tooltipSettings={{
              showTooltip: true,
              tooltipTemplate: (props) => (
                <div className="e-gantt-tooltip">
                  <div>Duration: {props.Duration} days</div>
                  <div>Progress: {props.Progress}%</div>
                </div>
              ),
            }}
          >
            <Inject services={[Selection]} />
          </GanttComponent>
        </div>
      </div>
    </div>
  );
}
