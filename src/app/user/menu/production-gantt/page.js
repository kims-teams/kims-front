"use client";
import useAuthRedirect from "../../../../hooks/useAuthRedirect";

export default function ProductionGanttPage() {
  useAuthRedirect();

  return (
    <div>
      <h2>생산 계획 간트</h2>
    </div>
  );
}
