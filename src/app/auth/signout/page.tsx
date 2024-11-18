"use client";

import { setCookie } from "cookies-next";
import { useEffect } from "react";

export default function SignOut() {
  useEffect(() => {
    setCookie("user", "", { secure: true });
    window.location.href = "/";
  }, []);
  return <></>;
}
