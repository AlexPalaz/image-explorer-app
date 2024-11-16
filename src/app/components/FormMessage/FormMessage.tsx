"use client";

import { useSearchParams } from "next/navigation";

export type FormMessageProps = {
  type: "error" | "success";
};

export default function FormMessage({ type }: FormMessageProps) {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  if (!message) return null;

  const colorClass = type === "success" ? "text-green-400" : "text-red-400";

  return <div className={`text-xs ${colorClass}`}>{message}</div>;
}
