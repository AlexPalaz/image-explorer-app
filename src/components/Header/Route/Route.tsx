"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type RouteProps = {
  name: string;
  href: string;
  title?: string;
};

export default function Route({ name, href, title }: RouteProps) {
  const pathname = usePathname();

  return (
    <Link
      className={`route ${
        pathname === href ? "underline underline-offset-8" : ""
      }`}
      href={href}
      title={title || name}
    >
      {name}
    </Link>
  );
}
