"use client";

import { usePathname } from "next/navigation";
import { AIChatbot } from "./chatbot";

export function ConditionalChatbot() {
  const pathname = usePathname();
  
  // Don't show chatbot on privacy policy, terms of service, and admin pages
  const hiddenPaths = [
    "/legal/privacy-policy",
    "/legal/terms-of-service",
    "/admin"
  ];
  
  const shouldHideChatbot = hiddenPaths.some(path => pathname.startsWith(path));
  
  if (shouldHideChatbot) {
    return null;
  }
  
  return <AIChatbot />;
}
