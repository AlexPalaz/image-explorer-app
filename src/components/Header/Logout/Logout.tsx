"use client";

import { logout } from "./action";

export type LogoutProps = {
  name: string;
  title?: string;
};

export default function Logout({ name, title }: LogoutProps) {
  return (
    <button onClick={() => logout()} title={title || name}>
      {name}
    </button>
  );
}
