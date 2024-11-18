"use client";

import { useEffect } from "react";

export default function SignOut() {
  useEffect(() => {
    window.location.href = "/";
  }, []);
  return <></>;
}
