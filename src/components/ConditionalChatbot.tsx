"use client";

import { usePathname } from "next/navigation";
import { AIChatbot } from "./chatbot";

export function ConditionalChatbot() {
  const pathname = usePathname();
  
  // Don't show chatbot on privacy policy and terms of service pages
  const hiddenPaths = [
    "/legal/privacy-policy",
    "/legal/terms-of-service"
  ];
  
  const shouldHideChatbot = hiddenPaths.some(path => pathname.startsWith(path));
  
  if (shouldHideChatbot) {
    return null;
  }
  
  return <AIChatbot />;
}
