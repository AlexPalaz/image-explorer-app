"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export type FormMessageProps = {
  type: "error" | "success";
};

function Message({ type }: FormMessageProps) {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  if (!message) return null;

  const colorClass = type === "success" ? "text-green-400" : "text-red-400";

  return <div className={`text-xs ${colorClass}`}>{message}</div>;
}

export default function FormMessage({ type }: FormMessageProps) {
  return (
    <Suspense>
      <Message type={type} />
    </Suspense>
  );
}
