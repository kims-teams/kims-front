"use client";

import useAuthRedirect from "../../../../hooks/useAuthRedirect";

export default function ResultPage() {
  useAuthRedirect();

  return (
    <div>
      <h2>실행 결과</h2>
    </div>
  );
}
