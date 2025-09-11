"use client";

import { usePathname } from "next/navigation";
import { Component as Footer } from "./footer-taped-design";

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't show Footer on admin pages
  const hiddenPaths = [
    "/admin"
  ];
  
  const shouldHideFooter = hiddenPaths.some(path => pathname.startsWith(path));
  
  if (shouldHideFooter) {
    return null;
  }
  
  return <Footer />;
}
