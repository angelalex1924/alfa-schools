"use client";

import { usePathname } from "next/navigation";
import ResponsiveNav from "./ResponsiveNav";

export function ConditionalResponsiveNav() {
  const pathname = usePathname();
  
  // Don't show ResponsiveNav on admin pages
  const hiddenPaths = [
    "/admin"
  ];
  
  const shouldHideResponsiveNav = hiddenPaths.some(path => pathname.startsWith(path));
  
  if (shouldHideResponsiveNav) {
    return null;
  }
  
  return <ResponsiveNav />;
}
