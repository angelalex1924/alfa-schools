"use client"
import { useTheme } from "next-themes";





function ChatModeIcon({ className, isActive, forceWhite }) {
  const { theme } = useTheme?.() || {};
  let color = "#fff";
  if (forceWhite) color = "#fff";
  else if (theme === "dark") color = "#000";
  else if (!isActive && theme !== "dark") color = "#bdbdbd";
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 10.5H16" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path>
      <path d="M8 14H13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path>
      <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path>
    </svg>
  );
}

function SearchModeIcon({ className, isActive, forceWhite }) {
  const { theme } = useTheme?.() || {};
  let color = "#fff";
  if (forceWhite) color = "#fff";
  else if (theme === "dark") color = "#000";
  else if (!isActive && theme !== "dark") color = "#bdbdbd";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.8978 20.4629C19.1822 22.1242 20.3546 22.4637 21.4838 21.2188C22.5159 20.0805 22.1195 18.9585 20.5969 18.7278C19.4713 18.5472 18.7052 19.3313 18.8978 20.4629Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReasonModeIcon({ className, isActive, forceWhite }) {
  const { theme } = useTheme?.() || {};
  let color = "#fff";
  if (forceWhite) color = "#fff";
  else if (theme === "dark") color = "#000";
  else if (!isActive && theme !== "dark") color = "#bdbdbd";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <g clipPath="url(#clip0_4418_3807)">
        <path d="M19.0699 6.27018C21.1599 10.4702 18.9599 14.9302 15.7299 16.8802V18.0402C15.7299 18.3302 15.8399 19.0002 14.7699 19.0002H9.25986C8.15986 19.0002 8.29986 18.5702 8.29986 18.0402V16.8802C5.99986 15.4902 4.10986 12.7802 4.10986 9.90018C4.10986 4.95018 8.65986 1.07018 13.7999 2.19018C14.5499 2.36018 15.2799 2.63018 15.9399 3.00018" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 21.9992C10.79 21.3492 13.21 21.3492 15.5 21.9992" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_4418_3807">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

import AITextLoading from "./AITextLoading";

import { cn } from "@/lib/utils"

import { useState, useRef, useEffect } from "react"
import {
  MessageSquare,
  Search,
  Eye,
  Lightbulb,
  Settings,
  X,
  RefreshCw,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Bot,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  Share2,
  MoreHorizontal,
  Loader2,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"
import { chatbotTranslationsEl } from "../../src/translations/chatbot-el"
import { chatbotTranslationsEn } from "../../src/translations/chatbot-en"
import { useLanguage } from "@/contexts/LanguageContext"

// Custom animations
const animateTilt = {
  "0%, 100%": { transform: "rotate(-1deg)" },
  "50%": { transform: "rotate(1deg)" },
}

// Enhanced suggestions for different modes
const modeSuggestionsEn = {
  chat: [
    "What languages do you teach?",
    "What are your class schedules?",
    "How much do the courses cost?",
    "How can I enroll?"
  ],
  search: [
    "ALFA Centers Nea Filadelfia",
    "ALFA Centers Chalandri", 
    "English certificates",
    "French certificates"
  ],
  reason: [
    "What is the best age to learn a foreign language?",
    "Which language should I choose?",
    "Why learn English?",
    "Why learn French?"
  ],
}

// System prompts for different modes
const modePromptsEn = {
  chat: "You are the ALFA Language Centers AI assistant. ALFA Language Centers are foreign language schools operating since 1986, specializing in English, French, Italian, and German language education. They have two centers: Nea Filadelfia (phone: +30 210 2777 725, address: Agiou Georgiou 15, Nea Filadelfia 143 42) and Chalandri (phone: +30 210 6800 708, address: Roumeli 27, Chalandri 152 33, email: info@alfaschoolchalandri.com). Both centers operate Monday-Friday 16:00-22:00. They offer comprehensive language programs for all ages and levels, including regular classes, intensive courses, exam preparation, business language training, and cultural activities. IMPORTANT INSTRUCTIONS: 1) Keep responses SHORT and CONCISE (2-3 sentences max). 2) Never mention specific prices or cost figures. Instead, explain that pricing depends on the program and level, and suggest contacting the centers directly for detailed information. 3) Always be diplomatic and professional in your responses. 4) For sensitive questions, provide balanced information without taking strong positions. 5) If asked about competitors, focus on ALFA's strengths without criticizing others. 6) For contact information, always provide the specific phone numbers and addresses for each center. 7) For general inquiries, suggest contacting the centers directly at the provided phone numbers.",

  search:
    "You are the ALFA Language Centers AI assistant in SEARCH MODE. In this mode, you should provide detailed, structured information about ALFA's language programs, centers, and educational offerings. ALFA has two centers: Nea Filadelfia (phone: +30 210 2777 725, address: Agiou Georgiou 15, Nea Filadelfia 143 42) and Chalandri (phone: +30 210 6800 708, address: Roumeli 27, Chalandri 152 33, email: info@alfaschoolchalandri.com). Both centers operate Monday-Friday 16:00-22:00. Format your responses with clear headings, bullet points, and organized sections. Focus on being comprehensive and precise. IMPORTANT INSTRUCTIONS: 1) Keep responses CONCISE and well-structured (use bullet points). 2) Never mention specific prices or cost figures. Instead, explain that pricing depends on the program, level, and duration. Always suggest contacting the centers directly for detailed pricing information. 3) Be diplomatic and professional in all responses. 4) When discussing programs, focus on educational value and benefits rather than costs. 5) Avoid making direct comparisons with competitors. 6) For program details or schedules, provide general information rather than specific commitments. 7) Always provide specific contact information for each center when relevant.",

  reason:
    "You are the ALFA Language Centers AI assistant in REASONING MODE. In this mode, you should provide in-depth analysis, comparisons, and strategic insights about language learning and education. ALFA has two centers: Nea Filadelfia (phone: +30 210 2777 725, address: Agiou Georgiou 15, Nea Filadelfia 143 42) and Chalandri (phone: +30 210 6800 708, address: Roumeli 27, Chalandri 152 33, email: info@alfaschoolchalandri.com). Both centers operate Monday-Friday 16:00-22:00. Explain the 'why' behind recommendations and discuss the benefits and impact of language learning. Your responses should be thoughtful and analytical. IMPORTANT INSTRUCTIONS: 1) Keep responses FOCUSED and CONCISE while being analytical (3-4 key points max). 2) Never mention specific prices, costs, or financial figures. Instead, discuss educational value in general terms and explain that specific program details would require contacting the centers directly. 3) Present balanced perspectives on complex educational topics. 4) When discussing language learning strategies or program choices, present pros and cons without making definitive recommendations that might not apply to all situations. 5) For questions about program timelines or requirements, emphasize that these vary based on individual needs and goals. 6) Always suggest contacting the centers directly for personalized advice rather than providing specific commitments. 7) Focus on educational benefits and language learning advantages.",
}

// Mode descriptions and icons
const modeConfigEn = {
  chat: {
    title: "Chat Mode",
    description: "Ask anything about Acron Web",
    icon: ChatModeIcon,
    color: "text-blue-500",
    gradient: "from-blue-500 to-teal-500",
    buttonGradient: "from-blue-500 to-teal-500",
    lightColor: "#3b82f6",
    darkColor: "#14b8a6",
  },
  search: {
    title: "Search Mode",
    description: "Find specific information",
    icon: SearchModeIcon,
    color: "text-indigo-500",
    gradient: "from-orange-500 to-amber-500",
    buttonGradient: "from-orange-500 to-amber-500",
    lightColor: "#6366f1",
    darkColor: "#a855f7",
  },
  reason: {
    title: "Reasoning Mode",
    description: "Get detailed explanations",
    icon: ReasonModeIcon,
    color: "text-[#9af318]",
    gradient: "from-[#9af318] to-green-500",
    buttonGradient: "from-[#9af318] to-green-500",
    lightColor: "#9af318",
    darkColor: "#22c55e",
  },
}

// Available models - Updated with better free models
// Model display names and icons for dropdown, but real model values for backend
const AI_MODELS = {
  chat: [
    { label: "o3-mini", value: "qwen/qwen3-4b:free", icon: () => (<img src="/o3.png" alt="o3-mini" style={{ width: 18, height: 18, borderRadius: 6, objectFit: 'cover', display: 'inline-block' }} />) },
    { label: "Claude", value: "qwen/qwen3-30b-a3b:free", icon: () => (
      <svg fill="#000" fillRule="evenodd" style={{ flex: "none", lineHeight: "1" }} viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><title>Anthropic Icon Light</title><path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" /></svg>
    ) },
    { label: "GPT-4o", value: "mistral-7b-instruct:free", icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={18} height={18} viewBox="0 0 48 48" style={{ display: 'inline-block', verticalAlign: 'middle', borderRadius: 6 }}>
        <path fill="#546e7a" d="M30.7,7.27L28.33,9.1c-1.605-2.067-4.068-3.209-6.697-3.092C17.313,6.2,14,9.953,14,14.277l0,9.143 l10.5,6.12l-1,1.72l-11.706-6.827C11.302,24.146,11,23.62,11,23.051l0-8.687C11,8.1,16.129,2.79,22.39,3.007 C25.669,3.12,28.68,4.663,30.7,7.27z"></path><path fill="#546e7a" d="M12.861,9.833l0.4,2.967c-2.592,0.357-4.813,1.919-6.026,4.254c-1.994,3.837-0.4,8.582,3.345,10.745 l7.918,4.571l10.55-6.033l0.99,1.726l-11.765,6.724c-0.494,0.282-1.101,0.281-1.594-0.003l-7.523-4.343 C3.73,27.308,1.696,20.211,5.014,14.898C6.752,12.114,9.594,10.279,12.861,9.833z"></path><path fill="#546e7a" d="M6.161,26.563l2.77,1.137c-0.987,2.423-0.745,5.128,0.671,7.346 c2.326,3.645,7.233,4.638,10.977,2.476l7.918-4.572l0.05-12.153l1.99,0.006l-0.059,13.551c-0.002,0.569-0.307,1.094-0.8,1.379 l-7.523,4.343c-5.425,3.132-12.588,1.345-15.531-4.185C5.083,32.994,4.914,29.616,6.161,26.563z"></path><path fill="#546e7a" d="M17.3,40.73l2.37-1.83c1.605,2.067,4.068,3.209,6.697,3.092C30.687,41.8,34,38.047,34,33.723l0-9.143 l-10.5-6.12l1-1.72l11.706,6.827C36.698,23.854,37,24.38,37,24.949l0,8.687c0,6.264-5.13,11.574-11.39,11.358 C22.331,44.88,19.32,43.337,17.3,40.73z"></path><path fill="#546e7a" d="M35.139,38.167l-0.4-2.967c2.592-0.357,4.813-1.919,6.026-4.254c1.994-3.837,0.4-8.582-3.345-10.745 l-7.918-4.571l-10.55,6.033l-0.99-1.726l11.765-6.724c0.494-0.282,1.101-0.281,1.594,0.003l7.523,4.343 c5.425,3.132,7.459,10.229,4.141,15.543C41.248,35.886,38.406,37.721,35.139,38.167z"></path><path fill="#546e7a" d="M41.839,21.437l-2.77-1.137c0.987-2.423,0.745-5.128-0.671-7.346 c-2.326-3.645-7.233-4.638-10.977-2.476l-7.918,4.572l-0.05,12.153l-1.99-0.006l0.059-13.551c0.002-0.569,0.307-1.094,0.8-1.379 l7.523-4.343c5.425-3.132,12.588,1.345,15.531,4.185C42.917,15.006,43.086,18.384,41.839,21.437z"></path>
      </svg>
    ) },
    { label: "Gemini - 2.5", value: "gemini-2.5-pro:free", icon: () => (
      <svg
        height="1em"
        style={{ flex: "none", lineHeight: "1", width: 18, height: 18, borderRadius: 6, display: 'inline-block', verticalAlign: 'middle' }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Gemini</title>
        <defs>
          <linearGradient
            id="lobe-icons-gemini-fill"
            x1="0%"
            x2="68.73%"
            y1="100%"
            y2="30.395%"
          >
            <stop offset="0%" stopColor="#1C7DFF" />
            <stop offset="52.021%" stopColor="#1C69FF" />
            <stop offset="100%" stopColor="#F0DCD6" />
          </linearGradient>
        </defs>
        <path
          d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12"
          fill="url(#lobe-icons-gemini-fill)"
          fillRule="nonzero"
        />
      </svg>
    ) },
    { label: "Llama", value: "meta-llama/llama-4-maverick:free", icon: () => (
      <svg height="1em" style={{ flex: 'none', lineHeight: '1', width: 18, height: 18, borderRadius: 6, display: 'inline-block', verticalAlign: 'middle' }} viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><title>Meta</title><path d="M6.897 4h-.024l-.031 2.615h.022c1.715 0 3.046 1.357 5.94 6.246l.175.297.012.02 1.62-2.438-.012-.019a48.763 48.763 0 00-1.098-1.716 28.01 28.01 0 00-1.175-1.629C10.413 4.932 8.812 4 6.896 4z" fill="url(#lobe-icons-meta-fill-0)"></path><path d="M6.873 4C4.95 4.01 3.247 5.258 2.02 7.17a4.352 4.352 0 00-.01.017l2.254 1.231.011-.017c.718-1.083 1.61-1.774 2.568-1.785h.021L6.896 4h-.023z" fill="url(#lobe-icons-meta-fill-1)"></path><path d="M2.019 7.17l-.011.017C1.2 8.447.598 9.995.274 11.664l-.005.022 2.534.6.004-.022c.27-1.467.786-2.828 1.456-3.845l.011-.017L2.02 7.17z" fill="url(#lobe-icons-meta-fill-2)"></path><path d="M2.807 12.264l-2.533-.6-.005.022c-.177.918-.267 1.851-.269 2.786v.023l2.598.233v-.023a12.591 12.591 0 01.21-2.44z" fill="url(#lobe-icons-meta-fill-3)"></path><path d="M2.677 15.537a5.462 5.462 0 01-.079-.813v-.022L0 14.468v.024a8.89 8.89 0 00.146 1.652l2.535-.585a4.106 4.106 0 01-.004-.022z" fill="url(#lobe-icons-meta-fill-4)"></path><path d="M3.27 16.89c-.284-.31-.484-.756-.589-1.328l-.004-.021-2.535.585.004.021c.192 1.01.568 1.85 1.106 2.487l.014.017 2.018-1.745a2.106 2.106 0 01-.015-.016z" fill="url(#lobe-icons-meta-fill-5)"></path><path d="M10.78 9.654c-1.528 2.35-2.454 3.825-2.454 3.825-2.035 3.2-2.739 3.917-3.871 3.917a1.545 1.545 0 01-1.186-.508l-2.017 1.744.014.017C2.01 19.518 3.058 20 4.356 20c1.963 0 3.374-.928 5.884-5.33l1.766-3.13a41.283 41.283 0 00-1.227-1.886z" fill="#0082FB"></path><path d="M13.502 5.946l-.016.016c-.4.43-.786.908-1.16 1.416.378.483.768 1.024 1.175 1.63.48-.743.928-1.345 1.367-1.807l.016-.016-1.382-1.24z" fill="url(#lobe-icons-meta-fill-6)"></path><path d="M20.918 5.713C19.853 4.633 18.583 4 17.225 4c-1.432 0-2.637.787-3.723 1.944l-.016.016 1.382 1.24.016-.017c.715-.747 1.408-1.12 2.176-1.12.826 0 1.6.39 2.27 1.075l.015.016 1.589-1.425-.016-.016z" fill="#0082FB"></path><path d="M23.998 14.125c-.06-3.467-1.27-6.566-3.064-8.396l-.016-.016-1.588 1.424.015.016c1.35 1.392 2.277 3.98 2.361 6.971v.023h2.292v-.022z" fill="url(#lobe-icons-meta-fill-7)"></path><path d="M23.998 14.15v-.023h-2.292v.022c.004.14.006.282.006.424 0 .815-.121 1.474-.368 1.95l-.011.022 1.708 1.782.013-.02c.62-.96.946-2.293.946-3.91 0-.083 0-.165-.002-.247z" fill="url(#lobe-icons-meta-fill-8)"></path><path d="M21.344 16.52l-.011.02c-.214.402-.519.67-.917.787l.778 2.462a3.493 3.493 0 00.438-.182 3.558 3.558 0 001.366-1.218l.044-.065.012-.02-1.71-1.784z" fill="url(#lobe-icons-meta-fill-9)"></path><path d="M19.92 17.393c-.262 0-.492-.039-.718-.14l-.798 2.522c.449.153.927.222 1.46.222.492 0 .943-.073 1.352-.215l-.78-2.462c-.167.05-.341.075-.517.073z" fill="url(#lobe-icons-meta-fill-10)"></path><path d="M18.323 16.534l-.014-.017-1.836 1.914.016.017c.637.682 1.246 1.105 1.937 1.337l.797-2.52c-.291-.125-.573-.353-.9-.731z" fill="url(#lobe-icons-meta-fill-11)"></path><path d="M18.309 16.515c-.55-.642-1.232-1.712-2.303-3.44l-1.396-2.336-.011-.02-1.62 2.438.012.02.989 1.668c.959 1.61 1.74 2.774 2.493 3.585l.016.016 1.834-1.914a2.353 2.353 0 01-.014-.017z" fill="url(#lobe-icons-meta-fill-12)"></path><defs><linearGradient id="lobe-icons-meta-fill-0" x1="75.897%" x2="26.312%" y1="89.199%" y2="12.194%"><stop offset=".06%" stop-color="#0867DF"></stop><stop offset="45.39%" stop-color="#0668E1"></stop><stop offset="85.91%" stop-color="#0064E0"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-1" x1="21.67%" x2="97.068%" y1="75.874%" y2="23.985%"><stop offset="13.23%" stop-color="#0064DF"></stop><stop offset="99.88%" stop-color="#0064E0"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-2" x1="38.263%" x2="60.895%" y1="89.127%" y2="16.131%"><stop offset="1.47%" stop-color="#0072EC"></stop><stop offset="68.81%" stop-color="#0064DF"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-3" x1="47.032%" x2="52.15%" y1="90.19%" y2="15.745%"><stop offset="7.31%" stop-color="#007CF6"></stop><stop offset="99.43%" stop-color="#0072EC"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-4" x1="52.155%" x2="47.591%" y1="58.301%" y2="37.004%"><stop offset="7.31%" stop-color="#007FF9"></stop><stop offset="100%" stop-color="#007CF6"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-5" x1="37.689%" x2="61.961%" y1="12.502%" y2="63.624%"><stop offset="7.31%" stop-color="#007FF9"></stop><stop offset="100%" stop-color="#0082FB"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-6" x1="34.808%" x2="62.313%" y1="68.859%" y2="23.174%"><stop offset="27.99%" stop-color="#007FF8"></stop><stop offset="91.41%" stop-color="#0082FB"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-7" x1="43.762%" x2="57.602%" y1="6.235%" y2="98.514%"><stop offset="0%" stop-color="#0082FB"></stop><stop offset="99.95%" stop-color="#0081FA"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-8" x1="60.055%" x2="39.88%" y1="4.661%" y2="69.077%"><stop offset="6.19%" stop-color="#0081FA"></stop><stop offset="100%" stop-color="#0080F9"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-9" x1="30.282%" x2="61.081%" y1="59.32%" y2="33.244%"><stop offset="0%" stop-color="#027AF3"></stop><stop offset="100%" stop-color="#0080F9"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-10" x1="20.433%" x2="82.112%" y1="50.001%" y2="50.001%"><stop offset="0%" stop-color="#0377EF"></stop><stop offset="99.94%" stop-color="#0279F1"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-11" x1="40.303%" x2="72.394%" y1="35.298%" y2="57.811%"><stop offset=".19%" stop-color="#0471E9"></stop><stop offset="100%" stop-color="#0377EF"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-12" x1="32.254%" x2="68.003%" y1="19.719%" y2="84.908%"><stop offset="27.65%" stop-color="#0867DF"></stop><stop offset="100%" stop-color="#0471E9"></stop></linearGradient></defs></svg>
    ) },
  ],
  search: [
    { label: "o3-mini", value: "qwen/qwen3-4b:free", icon: () => (<img src="/o3.png" alt="o3-mini" style={{ width: 18, height: 18, borderRadius: 6, objectFit: 'cover', display: 'inline-block' }} />) },
    { label: "Claude", value: "qwen/qwen3-30b-a3b:free", icon: () => (
      <svg fill="#000" fillRule="evenodd" style={{ flex: "none", lineHeight: "1" }} viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><title>Anthropic Icon Light</title><path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" /></svg>
    ) },
    { label: "GPT-4o", value: "mistral-7b-instruct:free", icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={18} height={18} viewBox="0 0 48 48" style={{ display: 'inline-block', verticalAlign: 'middle', borderRadius: 6 }}>
        <path fill="#546e7a" d="M30.7,7.27L28.33,9.1c-1.605-2.067-4.068-3.209-6.697-3.092C17.313,6.2,14,9.953,14,14.277l0,9.143 l10.5,6.12l-1,1.72l-11.706-6.827C11.302,24.146,11,23.62,11,23.051l0-8.687C11,8.1,16.129,2.79,22.39,3.007 C25.669,3.12,28.68,4.663,30.7,7.27z"></path><path fill="#546e7a" d="M12.861,9.833l0.4,2.967c-2.592,0.357-4.813,1.919-6.026,4.254c-1.994,3.837-0.4,8.582,3.345,10.745 l7.918,4.571l10.55-6.033l0.99,1.726l-11.765,6.724c-0.494,0.282-1.101,0.281-1.594-0.003l-7.523-4.343 C3.73,27.308,1.696,20.211,5.014,14.898C6.752,12.114,9.594,10.279,12.861,9.833z"></path><path fill="#546e7a" d="M6.161,26.563l2.77,1.137c-0.987,2.423-0.745,5.128,0.671,7.346 c2.326,3.645,7.233,4.638,10.977,2.476l7.918-4.572l0.05-12.153l1.99,0.006l-0.059,13.551c-0.002,0.569-0.307,1.094-0.8,1.379 l-7.523,4.343c-5.425,3.132-12.588,1.345-15.531-4.185C5.083,32.994,4.914,29.616,6.161,26.563z"></path><path fill="#546e7a" d="M17.3,40.73l2.37-1.83c1.605,2.067,4.068,3.209,6.697,3.092C30.687,41.8,34,38.047,34,33.723l0-9.143 l-10.5-6.12l1-1.72l11.706,6.827C36.698,23.854,37,24.38,37,24.949l0,8.687c0,6.264-5.13,11.574-11.39,11.358 C22.331,44.88,19.32,43.337,17.3,40.73z"></path><path fill="#546e7a" d="M35.139,38.167l-0.4-2.967c2.592-0.357,4.813-1.919,6.026-4.254c1.994-3.837,0.4-8.582-3.345-10.745 l-7.918-4.571l-10.55,6.033l-0.99-1.726l11.765-6.724c0.494-0.282,1.101-0.281,1.594,0.003l7.523,4.343 c5.425,3.132,7.459,10.229,4.141,15.543C41.248,35.886,38.406,37.721,35.139,38.167z"></path><path fill="#546e7a" d="M41.839,21.437l-2.77-1.137c0.987-2.423,0.745-5.128-0.671-7.346 c-2.326-3.645-7.233-4.638-10.977-2.476l-7.918,4.572l-0.05,12.153l-1.99-0.006l0.059-13.551c0.002-0.569,0.307-1.094,0.8-1.379 l7.523-4.343c5.425-3.132,12.588,1.345,15.531,4.185C42.917,15.006,43.086,18.384,41.839,21.437z"></path>
      </svg>
    ) },
    { label: "Gemini - 2.5", value: "gemini-2.5-pro:free", icon: () => (
      <svg
        height="1em"
        style={{ flex: "none", lineHeight: "1", width: 18, height: 18, borderRadius: 6, display: 'inline-block', verticalAlign: 'middle' }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Gemini</title>
        <defs>
          <linearGradient
            id="lobe-icons-gemini-fill"
            x1="0%"
            x2="68.73%"
            y1="100%"
            y2="30.395%"
          >
            <stop offset="0%" stopColor="#1C7DFF" />
            <stop offset="52.021%" stopColor="#1C69FF" />
            <stop offset="100%" stopColor="#F0DCD6" />
          </linearGradient>
        </defs>
        <path
          d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12"
          fill="url(#lobe-icons-gemini-fill)"
          fillRule="nonzero"
        />
      </svg>
    ) },
    { label: "Llama", value: "meta-llama/llama-4-maverick:free", icon: () => (
      <svg height="1em" style={{ flex: 'none', lineHeight: '1', width: 18, height: 18, borderRadius: 6, display: 'inline-block', verticalAlign: 'middle' }} viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><title>Meta</title><path d="M6.897 4h-.024l-.031 2.615h.022c1.715 0 3.046 1.357 5.94 6.246l.175.297.012.02 1.62-2.438-.012-.019a48.763 48.763 0 00-1.098-1.716 28.01 28.01 0 00-1.175-1.629C10.413 4.932 8.812 4 6.896 4z" fill="url(#lobe-icons-meta-fill-0)"></path><path d="M6.873 4C4.95 4.01 3.247 5.258 2.02 7.17a4.352 4.352 0 00-.01.017l2.254 1.231.011-.017c.718-1.083 1.61-1.774 2.568-1.785h.021L6.896 4h-.023z" fill="url(#lobe-icons-meta-fill-1)"></path><path d="M2.019 7.17l-.011.017C1.2 8.447.598 9.995.274 11.664l-.005.022 2.534.6.004-.022c.27-1.467.786-2.828 1.456-3.845l.011-.017L2.02 7.17z" fill="url(#lobe-icons-meta-fill-2)"></path><path d="M2.807 12.264l-2.533-.6-.005.022c-.177.918-.267 1.851-.269 2.786v.023l2.598.233v-.023a12.591 12.591 0 01.21-2.44z" fill="url(#lobe-icons-meta-fill-3)"></path><path d="M2.677 15.537a5.462 5.462 0 01-.079-.813v-.022L0 14.468v.024a8.89 8.89 0 00.146 1.652l2.535-.585a4.106 4.106 0 01-.004-.022z" fill="url(#lobe-icons-meta-fill-4)"></path><path d="M3.27 16.89c-.284-.31-.484-.756-.589-1.328l-.004-.021-2.535.585.004.021c.192 1.01.568 1.85 1.106 2.487l.014.017 2.018-1.745a2.106 2.106 0 01-.015-.016z" fill="url(#lobe-icons-meta-fill-5)"></path><path d="M10.78 9.654c-1.528 2.35-2.454 3.825-2.454 3.825-2.035 3.2-2.739 3.917-3.871 3.917a1.545 1.545 0 01-1.186-.508l-2.017 1.744.014.017C2.01 19.518 3.058 20 4.356 20c1.963 0 3.374-.928 5.884-5.33l1.766-3.13a41.283 41.283 0 00-1.227-1.886z" fill="#0082FB"></path><path d="M13.502 5.946l-.016.016c-.4.43-.786.908-1.16 1.416.378.483.768 1.024 1.175 1.63.48-.743.928-1.345 1.367-1.807l.016-.016-1.382-1.24z" fill="url(#lobe-icons-meta-fill-6)"></path><path d="M20.918 5.713C19.853 4.633 18.583 4 17.225 4c-1.432 0-2.637.787-3.723 1.944l-.016.016 1.382 1.24.016-.017c.715-.747 1.408-1.12 2.176-1.12.826 0 1.6.39 2.27 1.075l.015.016 1.589-1.425-.016-.016z" fill="#0082FB"></path><path d="M23.998 14.125c-.06-3.467-1.27-6.566-3.064-8.396l-.016-.016-1.588 1.424.015.016c1.35 1.392 2.277 3.98 2.361 6.971v.023h2.292v-.022z" fill="url(#lobe-icons-meta-fill-7)"></path><path d="M23.998 14.15v-.023h-2.292v.022c.004.14.006.282.006.424 0 .815-.121 1.474-.368 1.95l-.011.022 1.708 1.782.013-.02c.62-.96.946-2.293.946-3.91 0-.083 0-.165-.002-.247z" fill="url(#lobe-icons-meta-fill-8)"></path><path d="M21.344 16.52l-.011.02c-.214.402-.519.67-.917.787l.778 2.462a3.493 3.493 0 00.438-.182 3.558 3.558 0 001.366-1.218l.044-.065.012-.02-1.71-1.784z" fill="url(#lobe-icons-meta-fill-9)"></path><path d="M19.92 17.393c-.262 0-.492-.039-.718-.14l-.798 2.522c.449.153.927.222 1.46.222.492 0 .943-.073 1.352-.215l-.78-2.462c-.167.05-.341.075-.517.073z" fill="url(#lobe-icons-meta-fill-10)"></path><path d="M18.323 16.534l-.014-.017-1.836 1.914.016.017c.637.682 1.246 1.105 1.937 1.337l.797-2.52c-.291-.125-.573-.353-.9-.731z" fill="url(#lobe-icons-meta-fill-11)"></path><path d="M18.309 16.515c-.55-.642-1.232-1.712-2.303-3.44l-1.396-2.336-.011-.02-1.62 2.438.012.02.989 1.668c.959 1.61 1.74 2.774 2.493 3.585l.016.016 1.834-1.914a2.353 2.353 0 01-.014-.017z" fill="url(#lobe-icons-meta-fill-12)"></path><defs><linearGradient id="lobe-icons-meta-fill-0" x1="75.897%" x2="26.312%" y1="89.199%" y2="12.194%"><stop offset=".06%" stop-color="#0867DF"></stop><stop offset="45.39%" stop-color="#0668E1"></stop><stop offset="85.91%" stop-color="#0064E0"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-1" x1="21.67%" x2="97.068%" y1="75.874%" y2="23.985%"><stop offset="13.23%" stop-color="#0064DF"></stop><stop offset="99.88%" stop-color="#0064E0"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-2" x1="38.263%" x2="60.895%" y1="89.127%" y2="16.131%"><stop offset="1.47%" stop-color="#0072EC"></stop><stop offset="68.81%" stop-color="#0064DF"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-3" x1="47.032%" x2="52.15%" y1="90.19%" y2="15.745%"><stop offset="7.31%" stop-color="#007CF6"></stop><stop offset="99.43%" stop-color="#0072EC"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-4" x1="52.155%" x2="47.591%" y1="58.301%" y2="37.004%"><stop offset="7.31%" stop-color="#007FF9"></stop><stop offset="100%" stop-color="#007CF6"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-5" x1="37.689%" x2="61.961%" y1="12.502%" y2="63.624%"><stop offset="7.31%" stop-color="#007FF9"></stop><stop offset="100%" stop-color="#0082FB"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-6" x1="34.808%" x2="62.313%" y1="68.859%" y2="23.174%"><stop offset="27.99%" stop-color="#007FF8"></stop><stop offset="91.41%" stop-color="#0082FB"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-7" x1="43.762%" x2="57.602%" y1="6.235%" y2="98.514%"><stop offset="0%" stop-color="#0082FB"></stop><stop offset="99.95%" stop-color="#0081FA"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-8" x1="60.055%" x2="39.88%" y1="4.661%" y2="69.077%"><stop offset="6.19%" stop-color="#0081FA"></stop><stop offset="100%" stop-color="#0080F9"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-9" x1="30.282%" x2="61.081%" y1="59.32%" y2="33.244%"><stop offset="0%" stop-color="#027AF3"></stop><stop offset="100%" stop-color="#0080F9"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-10" x1="20.433%" x2="82.112%" y1="50.001%" y2="50.001%"><stop offset="0%" stop-color="#0377EF"></stop><stop offset="99.94%" stop-color="#0279F1"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-11" x1="40.303%" x2="72.394%" y1="35.298%" y2="57.811%"><stop offset=".19%" stop-color="#0471E9"></stop><stop offset="100%" stop-color="#0377EF"></stop></linearGradient><linearGradient id="lobe-icons-meta-fill-12" x1="32.254%" x2="68.003%" y1="19.719%" y2="84.908%"><stop offset="27.65%" stop-color="#0867DF"></stop><stop offset="100%" stop-color="#0471E9"></stop></linearGradient></defs></svg>
    ) },
  ],
  reason: [
    { label: "Claude", value: "qwen/qwen3-30b-a3b:free", icon: () => (
      <svg fill="#000" fillRule="evenodd" style={{ flex: "none", lineHeight: "1" }} viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><title>Anthropic Icon Light</title><path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" /></svg>
    ) },
    { label: "o3-mini", value: "qwen/qwen3-4b:free", icon: () => (<img src="/o3.png" alt="o3-mini" style={{ width: 18, height: 18, borderRadius: 6, objectFit: 'cover', display: 'inline-block' }} />) },
    { label: "GPT-4o", value: "mistral-7b-instruct:free", icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={18} height={18} viewBox="0 0 48 48" style={{ display: 'inline-block', verticalAlign: 'middle', borderRadius: 6 }}>
        <path fill="#546e7a" d="M30.7,7.27L28.33,9.1c-1.605-2.067-4.068-3.209-6.697-3.092C17.313,6.2,14,9.953,14,14.277l0,9.143 l10.5,6.12l-1,1.72l-11.706-6.827C11.302,24.146,11,23.62,11,23.051l0-8.687C11,8.1,16.129,2.79,22.39,3.007 C25.669,3.12,28.68,4.663,30.7,7.27z"></path><path fill="#546e7a" d="M12.861,9.833l0.4,2.967c-2.592,0.357-4.813,1.919-6.026,4.254c-1.994,3.837-0.4,8.582,3.345,10.745 l7.918,4.571l10.55-6.033l0.99,1.726l-11.765,6.724c-0.494,0.282-1.101,0.281-1.594-0.003l-7.523-4.343 C3.73,27.308,1.696,20.211,5.014,14.898C6.752,12.114,9.594,10.279,12.861,9.833z"></path><path fill="#546e7a" d="M6.161,26.563l2.77,1.137c-0.987,2.423-0.745,5.128,0.671,7.346 c2.326,3.645,7.233,4.638,10.977,2.476l7.918-4.572l0.05-12.153l1.99,0.006l-0.059,13.551c-0.002,0.569-0.307,1.094-0.8,1.379 l-7.523,4.343c-5.425,3.132-12.588,1.345-15.531-4.185C5.083,32.994,4.914,29.616,6.161,26.563z"></path><path fill="#546e7a" d="M17.3,40.73l2.37-1.83c1.605,2.067,4.068,3.209,6.697,3.092C30.687,41.8,34,38.047,34,33.723l0-9.143 l-10.5-6.12l1-1.72l11.706,6.827C36.698,23.854,37,24.38,37,24.949l0,8.687c0,6.264-5.13,11.574-11.39,11.358 C22.331,44.88,19.32,43.337,17.3,40.73z"></path><path fill="#546e7a" d="M35.139,38.167l-0.4-2.967c2.592-0.357,4.813-1.919,6.026-4.254c1.994-3.837,0.4-8.582-3.345-10.745 l-7.918-4.571l-10.55,6.033l-0.99-1.726l11.765-6.724c0.494-0.282,1.101-0.281,1.594,0.003l7.523,4.343 c5.425,3.132,7.459,10.229,4.141,15.543C41.248,35.886,38.406,37.721,35.139,38.167z"></path><path fill="#546e7a" d="M41.839,21.437l-2.77-1.137c0.987-2.423,0.745-5.128-0.671-7.346 c-2.326-3.645-7.233-4.638-10.977-2.476l-7.918,4.572l-0.05,12.153l-1.99-0.006l0.059-13.551c0.002-0.569,0.307-1.094,0.8-1.379 l7.523-4.343c5.425-3.132,12.588,1.345,15.531,4.185C42.917,15.006,43.086,18.384,41.839,21.437z"></path>
      </svg>
    ) },
    { label: "Gemini - 2.5", value: "gemini-2.5-pro:free", icon: () => (
      <svg
        height="1em"
        style={{ flex: "none", lineHeight: "1", width: 18, height: 18, borderRadius: 6, display: 'inline-block', verticalAlign: 'middle' }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Gemini</title>
        <defs>
          <linearGradient
            id="lobe-icons-gemini-fill"
            x1="0%"
            x2="68.73%"
            y1="100%"
            y2="30.395%"
          >
            <stop offset="0%" stopColor="#1C7DFF" />
            <stop offset="52.021%" stopColor="#1C69FF" />
            <stop offset="100%" stopColor="#F0DCD6" />
          </linearGradient>
        </defs>
        <path
          d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12"
          fill="url(#lobe-icons-gemini-fill)"
          fillRule="nonzero"
        />
      </svg>
    ) },
    { label: "Llama", value: "meta-llama/llama-4-maverick:free", icon: () => (
      <svg height="1em" style={{ flex: 'none', lineHeight: '1', width: 18, height: 18, borderRadius: 6, display: 'inline-block', verticalAlign: 'middle' }} viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><title>Meta</title><path d="M6.897 4h-.024l-.031 2.615h.022c1.715 0 3.046 1.357 5.94 6.246l.175.297.012.02 1.62-2.438-.012-.019a48.763 48.763 0 00-1.098-1.716 28.01 28.01 0 00-1.175-1.629C10.413 4.932 8.812 4 6.896 4z" fill="url(#lobe-icons-meta-fill-0)"></path><path d="M6.873 4C4.95 4.01 3.247 5.258 2.02 7.17a4.352 4.352 0 00-.01.017l2.254 1.231.011-.017c.718-1.083 1.61-1.774 2.568-1.785h.021L6.896 4h-.023z" fill="url(#lobe-icons-meta-fill-1)"></path><path d="M2.019 7.17l-.011.017C1.2 8.447.598 9.995.274 11.664l-.005.022 2.534.6.004-.022c.27-1.467.786-2.828 1.456-3.845l.011-.017L2.02 7.17z" fill="url(#lobe-icons-meta-fill-2)"></path><path d="M2.807 12.264l-2.533-.6-.005.022c-.177.918-.267 1.851-.269 2.786v.023l2.598.233v-.023a12.591 12.591 0 01.21-2.44z" fill="url(#lobe-icons-meta-fill-3)"></path><path d="M2.677 15.537a5.462 5.462 0 01-.079-.813v-.022L0 14.468v.024a8.89 8.89 0 00.146 1.652l2.535-.585a4.106 4.106 0 01-.004-.022z" fill="url(#lobe-icons-meta-fill-4)"/>
      <path d="M3.27 16.89c-.284-.31-.484-.756-.589-1.328l-.004-.021-2.535.585.004.021c.192 1.01.568 1.85 1.106 2.487l.014.017 2.018-1.745a2.106 2.106 0 01-.015-.016z" fill="url(#lobe-icons-meta-fill-5)"/>
      <path d="M10.78 9.654c-1.528 2.35-2.454 3.825-2.454 3.825-2.035 3.2-2.739 3.917-3.871 3.917a1.545 1.545 0 01-1.186-.508l-2.017 1.744.014.017C2.01 19.518 3.058 20 4.356 20c1.963 0 3.374-.928 5.884-5.33l1.766-3.13a41.283 41.283 0 00-1.227-1.886z" fill="#0082FB"/>
      <path d="M13.502 5.946l-.016.016c-.4.43-.786.908-1.16 1.416.378.483.768 1.024 1.175 1.63.48-.743.928-1.345 1.367-1.807l.016-.016-1.382-1.24z" fill="url(#lobe-icons-meta-fill-6)"/>
      <path d="M20.918 5.713C19.853 4.633 18.583 4 17.225 4c-1.432 0-2.637.787-3.723 1.944l-.016.016 1.382 1.24.016-.017c.715-.747 1.408-1.12 2.176-1.12.826 0 1.6.39 2.27 1.075l.015.016 1.589-1.425-.016-.016z" fill="#0082FB"/>
      <path d="M23.998 14.125c-.06-3.467-1.27-6.566-3.064-8.396l-.016-.016-1.588 1.424.015.016c1.35 1.392 2.277 3.98 2.361 6.971v.023h2.292v-.022z" fill="url(#lobe-icons-meta-fill-7)"/>
      <path d="M23.998 14.15v-.023h-2.292v.022c.004.14.006.282.006.424 0 .815-.121 1.474-.368 1.95l-.011.022 1.708 1.782.013-.02c.62-.96.946-2.293.946-3.91 0-.083 0-.165-.002-.247z" fill="url(#lobe-icons-meta-fill-8)"/>
      <path d="M21.344 16.52l-.011.02c-.214.402-.519.67-.917.787l.778 2.462a3.493 3.493 0 00.438-.182 3.558 3.558 0 001.366-1.218l.044-.065.012-.02-1.71-1.784z" fill="url(#lobe-icons-meta-fill-9)"/>
      <path d="M19.92 17.393c-.262 0-.492-.039-.718-.14l-.798 2.522c.449.153.927.222 1.46.222.492 0 .943-.073 1.352-.215l-.78-2.462c-.167.05-.341.075-.517.073z" fill="url(#lobe-icons-meta-fill-10)"/>
      <path d="M18.323 16.534l-.014-.017-1.836 1.914.016.017c.637.682 1.246 1.105 1.937 1.337l.797-2.52c-.291-.125-.573-.353-.9-.731z" fill="url(#lobe-icons-meta-fill-11)"/>
      <path d="M18.309 16.515c-.55-.642-1.232-1.712-2.303-3.44l-1.396-2.336-.011-.02-1.62 2.438.012.02.989 1.668c.959 1.61 1.74 2.774 2.493 3.585l.016.016 1.834-1.914a2.353 2.353 0 01-.014-.017z" fill="url(#lobe-icons-meta-fill-12)"/>
      <defs><linearGradient id="lobe-icons-meta-fill-0" x1="75.897%" x2="26.312%" y1="89.199%" y2="12.194%"><stop offset=".06%" stop-color="#0867DF"/><stop offset="45.39%" stop-color="#0668E1"/><stop offset="85.91%" stop-color="#0064E0"/></linearGradient><linearGradient id="lobe-icons-meta-fill-1" x1="21.67%" x2="97.068%" y1="75.874%" y2="23.985%"><stop offset="13.23%" stop-color="#0064DF"/><stop offset="99.88%" stop-color="#0064E0"/></linearGradient><linearGradient id="lobe-icons-meta-fill-2" x1="38.263%" x2="60.895%" y1="89.127%" y2="16.131%"><stop offset="1.47%" stop-color="#0072EC"/><stop offset="68.81%" stop-color="#0064DF"/></linearGradient><linearGradient id="lobe-icons-meta-fill-3" x1="47.032%" x2="52.15%" y1="90.19%" y2="15.745%"><stop offset="7.31%" stop-color="#007CF6"/><stop offset="99.43%" stop-color="#0072EC"/></linearGradient><linearGradient id="lobe-icons-meta-fill-4" x1="52.155%" x2="47.591%" y1="58.301%" y2="37.004%"><stop offset="7.31%" stop-color="#007FF9"/><stop offset="100%" stop-color="#007CF6"/></linearGradient><linearGradient id="lobe-icons-meta-fill-5" x1="37.689%" x2="61.961%" y1="12.502%" y2="63.624%"><stop offset="7.31%" stop-color="#007FF9"/><stop offset="100%" stop-color="#0082FB"/></linearGradient><linearGradient id="lobe-icons-meta-fill-6" x1="34.808%" x2="62.313%" y1="68.859%" y2="23.174%"><stop offset="27.99%" stop-color="#007FF8"/><stop offset="91.41%" stop-color="#0082FB"/></linearGradient><linearGradient id="lobe-icons-meta-fill-7" x1="43.762%" x2="57.602%" y1="6.235%" y2="98.514%"><stop offset="0%" stop-color="#0082FB"/><stop offset="99.95%" stop-color="#0081FA"/></linearGradient><linearGradient id="lobe-icons-meta-fill-8" x1="60.055%" x2="39.88%" y1="4.661%" y2="69.077%"><stop offset="6.19%" stop-color="#0081FA"/><stop offset="100%" stop-color="#0080F9"/></linearGradient><linearGradient id="lobe-icons-meta-fill-9" x1="30.282%" x2="61.081%" y1="59.32%" y2="33.244%"><stop offset="0%" stop-color="#027AF3"/><stop offset="100%" stop-color="#0080F9"/></linearGradient><linearGradient id="lobe-icons-meta-fill-10" x1="20.433%" x2="82.112%" y1="50.001%" y2="50.001%"><stop offset="0%" stop-color="#0377EF"/><stop offset="99.94%" stop-color="#0279F1"/></linearGradient><linearGradient id="lobe-icons-meta-fill-11" x1="40.303%" x2="72.394%" y1="35.298%" y2="57.811%"><stop offset=".19%" stop-color="#0471E9"/><stop offset="100%" stop-color="#0377EF"/></linearGradient><linearGradient id="lobe-icons-meta-fill-12" x1="32.254%" x2="68.003%" y1="19.719%" y2="84.908%"><stop offset="27.65%" stop-color="#0867DF"/><stop offset="100%" stop-color="#0471E9"/></linearGradient></defs></svg>
    ) },
  ],
}

// LLM7.io Configuration - Free AI service with no API keys required
// Using multiple models for different modes to ensure reliability

// API token - Updated with new OpenRouter key (not used anymore)
const API_TOKEN = "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"

// Multiple API keys for fallback - REMOVED OpenRouter, keeping only LLM7.io
const API_KEYS = ["unused"] // LLM7.io doesn't need real API keys

// Alternative API endpoints and configurations - ONLY LLM7.io now
const API_CONFIGS = [
  {
    name: "LLM7.io",
    baseUrl: "https://api.llm7.io/v1/chat/completions",
    keys: ["unused"], // LLM7.io doesn't require API keys
    headers: (apiKey) => ({
      "Content-Type": "application/json",
    }),
    models: {
      chat: [
        "gpt-4o-mini-2024-07-18",
        "llama3.1:8b", 
        "mistral-small-2503",
        "phi-4",
        "deepseek-v3",
        "qwen2.5-coder-32b-instruct:int8"
      ],
      search: [
        "gpt-4o-mini-2024-07-18",
        "deepseek-v3",
        "mistral-small-2503",
        "llama3.1:8b",
        "qwen2.5-coder-32b-instruct:int8"
      ],
      reason: [
        "deepseek-v3",
        "gpt-4o-mini-2024-07-18", 
        "mistral-small-2503",
        "llama3.1:8b",
        "qwen2.5-coder-32b-instruct:int8"
      ]
    }
  }
]

// Current API configuration index
let currentApiConfigIndex = 0

// Custom Chat Icon SVG Component
const ChatIconSVG = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g>
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M8 10.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 14H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
)

const AIChatbot = () => {
  const pathname = usePathname()
  const { language } = useLanguage()
  const isGreekPath = language === 'el'

  // Απλή προσωρινή μνήμη για συχνές ερωτήσεις
  const responseCache = useRef({})

  // Συνάρτηση για τον έλεγχο αν μια ερώτηση είναι παρόμοια με μια αποθηκευμένη
  const findSimilarQuestion = (question) => {
    const normalizedQuestion = question.toLowerCase().trim()

    // Έλεγχος για ακριβή αντιστοιχία - πρώτα προτεραιότητα
    if (responseCache.current[normalizedQuestion]) {
      return responseCache.current[normalizedQuestion]
    }

    // Βελτιωμένος έλεγχος για παρόμοιες ερωτήσεις
    const questionWords = normalizedQuestion.split(/\s+/).filter((word) => word.length > 2) // Μειώνουμε από 3 σε 2

    for (const cachedQuestion in responseCache.current) {
      // Για μικρές ερωτήσεις, κάνουμε απλό έλεγχο περιεχομένου
      if (normalizedQuestion.length < 8) {
        if (cachedQuestion.includes(normalizedQuestion) || normalizedQuestion.includes(cachedQuestion)) {
          return responseCache.current[cachedQuestion]
        }
      } else {
        // Για μεγαλύτερες ερωτήσεις, ελέγχουμε για κοινές λέξεις-κλειδιά
        const cachedWords = cachedQuestion.split(/\s+/).filter((word) => word.length > 2)
        const commonWords = questionWords.filter((word) => cachedWords.includes(word))

        // Πιο αυστηρά κριτήρια για καλύτερη ακρίβεια
        if (commonWords.length >= 2 && commonWords.length >= questionWords.length * 0.6) {
          return responseCache.current[cachedQuestion]
        }
      }
    }

    return null
  }

  // Get translations based on path
  const getTranslations = () => {
    if (isGreekPath) {
      return {
        modeSuggestions: chatbotTranslationsEl.suggestions,
        modePrompts: chatbotTranslationsEl.prompts,
        modeConfig: {
          chat: {
            title: chatbotTranslationsEl.modes.chat.title,
            description: chatbotTranslationsEl.modes.chat.description,
           icon: ChatModeIcon,
            color: "text-[#81a1d4]",
            gradient: "from-[#81a1d4] to-[#6b8bc4]",
            buttonGradient: "from-[#81a1d4] to-[#6b8bc4]",
            lightColor: "#81a1d4",
            darkColor: "#6b8bc4",
          },
          search: {
            title: chatbotTranslationsEl.modes.search.title,
            description: chatbotTranslationsEl.modes.search.description,
           icon: SearchModeIcon,
            color: "text-indigo-500",
            gradient: "from-orange-500 to-amber-500",
            buttonGradient: "from-orange-500 to-amber-500",
            lightColor: "#6366f1",
            darkColor: "#a855f7",
          },
          reason: {
            title: chatbotTranslationsEl.modes.reason.title,
            description: chatbotTranslationsEl.modes.reason.description,
           icon: ReasonModeIcon,
            color: "text-[#9af318]",
            gradient: "from-[#9af318] to-green-500",
            buttonGradient: "from-[#9af318] to-green-500",
            lightColor: "#9af318",
            darkColor: "#22c55e",
          },
        },
        ui: chatbotTranslationsEl.ui,
      }
    } else {
      return {
        modeSuggestions: chatbotTranslationsEn.suggestions,
        modePrompts: chatbotTranslationsEn.prompts,
        modeConfig: {
          chat: {
            title: chatbotTranslationsEn.modes.chat.title,
            description: chatbotTranslationsEn.modes.chat.description,
           icon: ChatModeIcon,
            color: "text-[#81a1d4]",
            gradient: "from-[#81a1d4] to-[#6b8bc4]",
            buttonGradient: "from-[#81a1d4] to-[#6b8bc4]",
            lightColor: "#81a1d4",
            darkColor: "#6b8bc4",
          },
          search: {
            title: chatbotTranslationsEn.modes.search.title,
            description: chatbotTranslationsEn.modes.search.description,
           icon: SearchModeIcon,
            color: "text-indigo-500",
            gradient: "from-orange-500 to-amber-500",
            buttonGradient: "from-orange-500 to-amber-500",
            lightColor: "#6366f1",
            darkColor: "#a855f7",
          },
          reason: {
            title: chatbotTranslationsEn.modes.reason.title,
            description: chatbotTranslationsEn.modes.reason.description,
           icon: ReasonModeIcon,
            color: "text-[#9af318]",
            gradient: "from-[#9af318] to-green-500",
            buttonGradient: "from-[#9af318] to-green-500",
            lightColor: "#9af318",
            darkColor: "#22c55e",
          },
        },
        ui: chatbotTranslationsEn.ui,
      }
    }
  }

  const { modeSuggestions, modePrompts, modeConfig, ui } = getTranslations()

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const [activeMode, setActiveMode] = useState("chat") // 'chat', 'search', or 'reason'
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [animateEntry, setAnimateEntry] = useState(false)
  const [animateExit, setAnimateExit] = useState(false)
  const chatContainerRef = useRef(null)
  const [theme, setTheme] = useState("light") // 'light' or 'dark'
  const [showSettings, setShowSettings] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [feedbackGiven, setFeedbackGiven] = useState({})
  const [isInitializing, setIsInitializing] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingMessageIndex, setStreamingMessageIndex] = useState(null)
  const inputRef = useRef(null)
  const streamingIntervalRef = useRef(null) // Κρατάμε για cleanup
  const typingTimeoutsRef = useRef([]) // Νέο ref για timeout IDs
  const abortControllerRef = useRef(null) // Νέο ref για API abort
  const userStoppedTypingRef = useRef(false) // Νέο ref για έλεγχο αν ο χρήστης σταμάτησε το typing

  // Και προσθήκη των νέων μεταβλητών για το voice input
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef(null)
  const [currentModelIndex, setCurrentModelIndex] = useState(0) // Track which model we're using
  const [errorMessage, setErrorMessage] = useState(null) // Store error messages
  const [showError, setShowError] = useState(false) // Control error message visibility
  const [isMobile, setIsMobile] = useState(false) // Track if device is mobile
  const [isHovered, setIsHovered] = useState(false) // Track if bubble is hovered
  const [currentApiKeyIndex, setCurrentApiKeyIndex] = useState(0) // Track which API key we're using

  // Έλεγχος αν το chatbot είναι απασχολημένο (typing ή streaming)
  const isBusy = isTyping || isStreaming

  // Get current suggestions based on active mode
  const suggestions = modeSuggestions[activeMode] || modeSuggestions.chat
  const currentModeConfig = modeConfig[activeMode] || modeConfig.chat

  // Συνάρτηση για διακοπή του typing animation (moved here to fix initialization order)
  const stopTyping = () => {
    console.log("🛑 Stop typing called - immediate stop requested")
    
    // Σήμανση ότι ο χρήστης σταμάτησε το typing
    userStoppedTypingRef.current = true
    
    // ΚΡΙΣΙΜΟ: Άμεσος καθαρισμός καταστάσεων πρώτα
    setIsStreaming(false)
    setStreamingMessageIndex(null)
    setIsTyping(false)
    
    // Καθαρισμός όλων των timeouts
    if (typingTimeoutsRef.current && typingTimeoutsRef.current.length > 0) {
      console.log(`Clearing ${typingTimeoutsRef.current.length} timeouts`)
      typingTimeoutsRef.current.forEach(timeoutId => {
        clearTimeout(timeoutId)
      })
      typingTimeoutsRef.current = []
    }
    
    // Καθαρισμός intervals
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current)
      streamingIntervalRef.current = null
    }

    // Ακύρωση API call αν είναι σε εξέλιξη
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort()
        console.log("API request aborted successfully")
      } catch (error) {
        console.log("Error aborting controller:", error)
      }
      abortControllerRef.current = null
    }

    // Άμεση ολοκλήρωση του τρέχοντος μηνύματος αν υπάρχει
    if (streamingMessageIndex !== null) {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages]
        if (streamingMessageIndex >= 0 && streamingMessageIndex < updatedMessages.length) {
          const currentText = updatedMessages[streamingMessageIndex].text || ""
          const stoppedText = isGreekPath ? " [Σταματήθηκε από τον χρήστη]" : " [Stopped by user]"
          updatedMessages[streamingMessageIndex] = {
            ...updatedMessages[streamingMessageIndex],
            text: currentText + stoppedText
          }
        }
        return updatedMessages
      })
    }

    console.log("🛑 All typing states cleared successfully - should stop immediately")
  }

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Add keyboard shortcut for stopping (Escape key)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isBusy && isOpen) {
        event.preventDefault()
        stopTyping()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isBusy, isOpen]) // Remove stopTyping dependency

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0 && !isInitializing) {
      setIsInitializing(true)
      const welcomeMessage = {
        text: ui.welcome,
        isBot: true,
      }
      setMessages([welcomeMessage])
      setIsInitializing(false)
    }
  }, [messages, isInitializing, ui.welcome])

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 10)
  }

  // Αυτόματο scroll όταν αλλάζουν τα μηνύματα - απλοποιημένο
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle opening and closing animations
  useEffect(() => {
    if (isOpen) {
      setAnimateEntry(true)
      setTimeout(() => setAnimateEntry(false), 500)
      // Focus input when chat opens
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  // Check system dark mode preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDarkModePreferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(isDarkModePreferred ? "dark" : "light")
    }
  }, [])

  const handleClose = () => {
    // Αποτροπή κλεισίματος όταν το chatbot είναι απασχολημένο
    if (isBusy) return

    setAnimateExit(true)
    setIsHovered(false) // Κρύβουμε το tooltip όταν κλείνει το chatbot
    setTimeout(() => {
      setIsOpen(false)
      setAnimateExit(false)
    }, 300)
  }

  // Control body overflow when chatbot is open on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      // Απενεργοποίηση του scrolling στο background όταν το chatbot είναι ανοιχτό σε κινητό
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
      document.body.style.top = `-${window.scrollY}px`
      document.documentElement.style.scrollBehavior = "auto"
    } else {
      // Επαναφορά του scrolling όταν το chatbot είναι κλειστό
      const scrollY = document.body.style.top
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.top = ""
      document.documentElement.style.scrollBehavior = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }
    }

    return () => {
      // Καθαρισμός κατά την αποσύνδεση του component
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.top = ""
      document.documentElement.style.scrollBehavior = ""
    }
  }, [isOpen, isMobile])

  // Toggle theme

  // Toggle expanded view

  // Copy message to clipboard
  const copyToClipboard = (text, index) => {
    // Αφαίρεση των HTML tags για την αντιγραφή καθαρού κειμένου
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = text
    const plainText = tempDiv.textContent || tempDiv.innerText || ""

    navigator.clipboard.writeText(plainText)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Handle feedback
  const giveFeedback = (index, isPositive) => {
    setFeedbackGiven((prev) => ({
      ...prev,
      [index]: isPositive ? "positive" : "negative",
    }))
  }

  // Hide error message
  const dismissError = () => {
    setShowError(false)
    setTimeout(() => setErrorMessage(null), 300) // Clear after animation
  }

  // Update the generateResponse function - Simplified for LLM7.io only
  const generateResponse = async (userMessage, imageUrl = null, modelIndex = 0, retryCount = 0) => {
    console.log(`🚀 generateResponse called with: ${userMessage}, modelIndex: ${modelIndex}, retryCount: ${retryCount}`)
    
    // Prevent infinite loops - max 8 total attempts (multiple models × retries)
    if (retryCount >= 8) {
      const rateLimitMessage = isGreekPath 
        ? "Η υπηρεσία AI έχει φτάσει το όριο χρήσης. Παρακαλώ δοκιμάστε ξανά σε λίγα λεπτά ή επικοινωνήστε μαζί μας στο 6987770734."
        : "AI service has reached its rate limit. Please try again in a few minutes or contact us at 6987770734 for immediate assistance."
      
      setErrorMessage(rateLimitMessage)
      setShowError(true)
      setIsTyping(false)
      return rateLimitMessage
    }
    
    setIsTyping(true)

    // Δημιουργία νέου AbortController για αυτό το request - μόνο αν δεν υπάρχει ήδη
    if (!abortControllerRef.current) {
      abortControllerRef.current = new AbortController()
    }

    // Get current API configuration (always LLM7.io now)
    const currentConfig = API_CONFIGS[0]
    
    // Get models for the current mode from current config
    const modeModels = currentConfig.models[activeMode] || currentConfig.models.chat
    
    // If we've tried all models, show error
    if (modelIndex >= modeModels.length) {
      const allModelsMessage = isGreekPath
        ? "Όλα τα διαθέσιμα μοντέλα AI είναι προσωρινά μη διαθέσιμα. Παρακαλώ δοκιμάστε ξανά σε λίγα λεπτά."
        : "All available AI models are currently unavailable. Please try again in a few minutes."
      
      setErrorMessage(allModelsMessage)
      setShowError(true)
      setIsTyping(false)
      return allModelsMessage
    }

    const currentModel = modeModels[modelIndex]

    try {
      // Prepare the message content
      const messageContent = userMessage

      // Prepare previous messages for context - μειώνουμε σε 2 για ακόμα ταχύτερη απόκριση
      const contextMessages = messages.slice(-2).map((msg) => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text,
      }))

      console.log(`Trying LLM7.io with model: ${currentModel}, attempt ${retryCount + 1}`)

      // Add exponential backoff for retries
      if (retryCount > 0) {
        const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 3000) // Max 3 seconds
        console.log(`Waiting ${delay}ms before retry...`)
        await new Promise(resolve => setTimeout(resolve, delay))
      }

      // Δημιουργία του fetch options object
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "ALFA-Assistant/1.0",
        },
        body: JSON.stringify({
          model: currentModel,
          messages: [
            {
              role: "system",
              content: modePrompts[activeMode] || modePrompts.chat,
            },
            // Include previous messages for context
            ...contextMessages,
            {
              role: "user",
              content: messageContent,
            },
          ],
          // Προσθήκη παραμέτρων για καλύτερη απόκριση
          max_tokens: 400,
          temperature: 0.7,
          stream: false, // Σταματάμε το streaming για καλύτερη σταθερότητα
        })
      }

      // Προσθήκη signal μόνο αν υπάρχει AbortController
      if (abortControllerRef.current) {
        fetchOptions.signal = abortControllerRef.current.signal
      }

      const response = await fetch(currentConfig.baseUrl, fetchOptions)

      // Έλεγχος αν το request ακυρώθηκε
      if (abortControllerRef.current && abortControllerRef.current.signal.aborted) {
        return "Request was cancelled by user."
      }

      let data
      try {
        data = await response.json()
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError)
        throw new Error("Invalid response format from API")
      }

      // Check for rate limit or other errors
      if (!response.ok) {
        console.log(`Error with LLM7.io model ${currentModel}:`, data.error || data.message || response.statusText)

        if (response.status === 429) {
          console.log(`Rate limit hit on LLM7.io, trying next model...`)
          // Try next model immediately
          return generateResponse(userMessage, imageUrl, modelIndex + 1, retryCount + 1)
        } else if (response.status >= 500) {
          console.log(`Server error on LLM7.io, trying next model...`)
          // Server error, try next model
          return generateResponse(userMessage, imageUrl, modelIndex + 1, retryCount + 1)
        }

        throw new Error(`LLM7.io API responded with status: ${response.status} - ${data.error || data.message || response.statusText}`)
      }

      // Check if the response has the expected structure
      if (!data || !data.choices || !data.choices.length || !data.choices[0].message) {
        console.error("Unexpected API response structure:", data)
        
        // Try next model
        if (modelIndex < modeModels.length - 1) {
          return generateResponse(userMessage, imageUrl, modelIndex + 1, retryCount + 1)
        } else {
          throw new Error("Invalid response structure from API")
        }
      }

      // Success - update indicators
      setCurrentApiKeyIndex(0) // Always 0 for LLM7.io
      currentApiConfigIndex = 0
      console.log(`✅ LLM7.io working successfully with model ${currentModel}`)

      // Debug logging for response format
      console.log("Raw API response:", data)
      console.log("Message content:", data.choices[0].message.content)

      // Clear any previous error messages on success
      if (showError) {
        setShowError(false)
        setErrorMessage(null)
      }

      // Extract content properly - handle both string and object responses
      let responseContent = data.choices[0].message.content
      
      // If content is an object (like the JSON format shown), extract the actual text
      if (typeof responseContent === 'object' && responseContent !== null) {
        // Handle the specific format: {"role":"assistant","content":null,"tool_calls":null,"reasoning_content":"actual text"}
        if (responseContent.reasoning_content) {
          responseContent = responseContent.reasoning_content
        } else if (responseContent.content) {
          responseContent = responseContent.content
        } else if (responseContent.text) {
          responseContent = responseContent.text
        } else {
          // Try to stringify and extract any text content
          const stringified = JSON.stringify(responseContent)
          console.log("Unexpected content format:", stringified)
          responseContent = stringified
        }
      }
      
      // Check if responseContent is a stringified JSON object
      if (typeof responseContent === 'string' && responseContent.trim().startsWith('{')) {
        try {
          const parsed = JSON.parse(responseContent)
          console.log("Found stringified JSON, parsed:", parsed)
          
          // Extract actual content from various possible fields
          if (parsed.reasoning_content) {
            responseContent = parsed.reasoning_content
          } else if (parsed.content && parsed.content !== null) {
            responseContent = parsed.content
          } else if (parsed.text) {
            responseContent = parsed.text
          } else if (parsed.message) {
            responseContent = parsed.message
          } else {
            // If no recognizable content field, keep the original string
            console.log("No recognizable content field in JSON, keeping original")
          }
        } catch (parseError) {
          console.log("Failed to parse as JSON, keeping original string:", parseError)
        }
      }
      
      // Ensure we have a string response
      if (typeof responseContent !== 'string') {
        responseContent = String(responseContent || "Συγγνώμη, δεν μπόρεσα να δημιουργήσω μια σωστή απάντηση.")
      }

      // Final cleanup - remove any JSON artifacts that might remain
      responseContent = responseContent
        .replace(/^"/, '') // Remove leading quote
        .replace(/"$/, '') // Remove trailing quote
        .replace(/\\n/g, '\n') // Convert escaped newlines to actual newlines
        .replace(/\\"/g, '"') // Convert escaped quotes to actual quotes
        .trim() // Remove extra whitespace

      console.log("Final cleaned response:", responseContent)

      return responseContent
    } catch (error) {
      console.error(`Error fetching AI response from LLM7.io:`, error)

      // Έλεγχος αν το error είναι από abort
      if (error.name === 'AbortError') {
        return "Request was cancelled by user."
      }

      // Try next model if available
      if (modelIndex < modeModels.length - 1) {
        console.log(`Error with model ${currentModel}, trying next model...`)
        return generateResponse(userMessage, imageUrl, modelIndex + 1, retryCount + 1)
      }

      // If all models failed, return error message
      const connectionError = isGreekPath
        ? "Δεν μπορώ να συνδεθώ με την υπηρεσία AI αυτή τη στιγμή. Παρακαλώ δοκιμάστε ξανά αργότερα ή επικοινωνήστε με τα κέντρα ΑΛΦΑ."
        : "Unable to connect to AI service. Please try again later or contact ALFA Language Centers directly."
      
      setErrorMessage(connectionError)
      setShowError(true)
      return connectionError
    } finally {
      setIsTyping(false)
      abortControllerRef.current = null // Καθαρισμός του controller
    }
  }

  // Συνάρτηση για smooth typing animation σαν ChatGPT - ΔΙΟΡΘΩΜΕΝΗ
  const typeResponse = (text, messageIndex) => {
    // Reset του user stop flag - νέο typing ξεκινάει
    userStoppedTypingRef.current = false
    
    // Καθαρισμός τυχόν προηγούμενων timeouts
    typingTimeoutsRef.current.forEach(timeoutId => {
      clearTimeout(timeoutId)
    })
    typingTimeoutsRef.current = []

    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current)
    }

    setIsStreaming(true)
    setStreamingMessageIndex(messageIndex)

    // Χωρίζουμε το κείμενο σε λέξεις για πιο φυσικό typing
    const words = text.split(' ')
    let currentWordIndex = 0
    let currentText = ''
    let isCompleted = false // Νέα μεταβλητή για έλεγχο ολοκλήρωσης

    // Αρχικοποίηση του μηνύματος
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages]
      if (messageIndex >= 0 && messageIndex < updatedMessages.length) {
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          text: '',
        }
      }
      return updatedMessages
    })

    // Συνάρτηση για ολοκλήρωση του typing
    const completeTyping = () => {
      if (isCompleted) return // Αποφυγή διπλής κλήσης
      isCompleted = true
      
      console.log("Completing typing animation...")
      
      // Βεβαιωνόμαστε ότι εμφανίζεται όλο το κείμενο πρώτα
      setMessages((prevMessages) => {
        const finalMessages = [...prevMessages]
        if (messageIndex >= 0 && messageIndex < finalMessages.length) {
          finalMessages[messageIndex] = {
            ...finalMessages[messageIndex],
            text: text,
          }
        }
        return finalMessages
      })
      
      // Καθαρισμός των timeouts
      typingTimeoutsRef.current.forEach(timeoutId => {
        clearTimeout(timeoutId)
      })
      typingTimeoutsRef.current = []
      
      // Δίνουμε μικρή καθυστέρηση για να ολοκληρωθεί το React update πρώτα
      setTimeout(() => {
        // Καθαρισμός όλων των states
        setIsStreaming(false)
        setStreamingMessageIndex(null)
        setIsTyping(false) // Επιπλέον καθαρισμός
        
        console.log("All typing animation states cleared successfully")
      }, 50) // Μικρή καθυστέρηση για React batching
    }

    // Συνάρτηση για προσθήκη της επόμενης λέξης
    const addNextWord = () => {
      // ΚΡΙΣΙΜΟΣ ΕΛΕΓΧΟΣ: Αν ο χρήστης σταμάτησε το typing ή έχει ολοκληρωθεί
      if (isCompleted || currentWordIndex >= words.length || userStoppedTypingRef.current) {
        completeTyping()
        return
      }

      // Προσθήκη της επόμενης λέξης
      currentText += (currentWordIndex > 0 ? ' ' : '') + words[currentWordIndex]
      currentWordIndex++

      // Ενημέρωση του μηνύματος
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages]
        if (messageIndex >= 0 && messageIndex < updatedMessages.length) {
          updatedMessages[messageIndex] = {
            ...updatedMessages[messageIndex],
            text: currentText,
          }
        }
        return updatedMessages
      })

      // Scroll στο τέλος
      scrollToBottom()
      
      // Έλεγχος αν τελειώσαμε
      if (currentWordIndex >= words.length) {
        // Δίνουμε μικρή καθυστέρηση πριν ολοκληρώσουμε
        const finalTimeoutId = setTimeout(() => {
          completeTyping()
        }, 200)
        typingTimeoutsRef.current.push(finalTimeoutId)
      }
    }

    // Ξεκινάμε το typing με μεταβλητή ταχύτητα - πιο smooth
    const getTypingSpeed = (wordIndex) => {
      const word = words[wordIndex]
      if (!word) return 60
      
      // Πιο φυσικές καθυστερήσεις για διαφορετικούς τύπους λέξεων
      if (word.includes('.') || word.includes('!') || word.includes('?')) return 300 // Παύση για τέλος πρότασης
      if (word.includes(',') || word.includes(';') || word.includes(':')) return 150 // Μικρή παύση για στίξη
      if (word.length > 10) return 100 // Αργότερα για μεγάλες λέξεις
      if (word.length > 6) return 70
      if (word.length < 3) return 40 // Γρήγορα για μικρές λέξεις (the, a, is, κλπ)
      
      // Τυχαία μικρή διακύμανση για φυσικότητα
      return 60 + Math.random() * 20
    }

    // Αρχίζουμε με μικρή καθυστέρηση
    const initialTimeoutId = setTimeout(() => {
      const typeNextWord = () => {
        // ΚΡΙΣΙΜΟΣ ΕΛΕΓΧΟΣ: Πριν προσθέσουμε λέξη, ελέγχουμε αν ο χρήστης σταμάτησε το typing
        if (isCompleted || userStoppedTypingRef.current) {
          console.log("Typing stopped mid-animation")
          return // Άμεση έξοδος αν έχει σταματήσει
        }
        
        addNextWord()
        
        if (!isCompleted && currentWordIndex < words.length && !userStoppedTypingRef.current) {
          const nextSpeed = getTypingSpeed(currentWordIndex - 1)
          const timeoutId = setTimeout(typeNextWord, nextSpeed)
          typingTimeoutsRef.current.push(timeoutId) // Αποθήκευση του timeout ID
        }
      }
      
      typeNextWord()
    }, 100)
    
    typingTimeoutsRef.current.push(initialTimeoutId) // Αποθήκευση του αρχικού timeout ID
  }

  // Voice input functions
  const toggleListening = () => {
    if (isBusy) return

    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const startListening = () => {
    if (typeof window === "undefined") return

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (!SpeechRecognition) {
        console.error("Speech recognition not supported in this browser")
        setErrorMessage("Voice input is not supported in your browser")
        setShowError(true)
        return
      }

      if (!recognitionRef.current) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = isGreekPath ? "el-GR" : "en-US"

        recognitionRef.current.onresult = (event) => {
          const lastResult = event.results[event.results.length - 1]
          const transcript = lastResult[0].transcript
          setTranscript(transcript)
          setInputValue(transcript)
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error", event.error)
          if (event.error === "not-allowed") {
            setErrorMessage("Microphone access denied. Please allow microphone access to use voice input.")
            setShowError(true)
          }
          stopListening()
        }

        recognitionRef.current.onend = () => {
          if (isListening) {
            recognitionRef.current.start()
          } else {
            setIsListening(false)
          }
        }
      }

      setInputValue("")
      setTranscript("")
      recognitionRef.current.start()
      setIsListening(true)
    } catch (error) {
      console.error("Error initializing speech recognition:", error)
      setErrorMessage("Could not initialize voice input. Please try again or use text input.")
      setShowError(true)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)

      if (transcript) {
        setInputValue(transcript)
      }
    }
  }

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      // Καθαρισμός timeouts και abort controller κατά την αποσύνδεση
      if (typingTimeoutsRef.current && typingTimeoutsRef.current.length > 0) {
        typingTimeoutsRef.current.forEach(timeoutId => {
          clearTimeout(timeoutId)
        })
      }
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort()
        } catch (error) {
          console.log("Error aborting on cleanup:", error)
        }
      }
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Αποτροπή αποστολής νέου μηνύματος όταν το chatbot είναι απασχολημένο
    if (isBusy) return

    // ΚΡΙΣΙΜΟ: Καθαρισμός όλων των καταστάσεων πριν ξεκινήσει νέα αλληλεπίδραση
    if (isStreaming || isTyping) {
      console.log("Clearing previous states before new message...")
      setIsStreaming(false)
      setStreamingMessageIndex(null)
      setIsTyping(false)
      
      // Καθαρισμός timeouts
      if (typingTimeoutsRef.current && typingTimeoutsRef.current.length > 0) {
        typingTimeoutsRef.current.forEach(timeoutId => {
          clearTimeout(timeoutId)
        })
        typingTimeoutsRef.current = []
      }
    }

    // Reset του user stop flag για νέα αλληλεπίδραση
    userStoppedTypingRef.current = false

    // Hide any previous errors
    setShowError(false)

    // Add user message
    const messageText = inputValue.trim()
    setMessages((prev) => [...prev, { text: messageText, isBot: false }])

    const userMessage = inputValue
    setInputValue("")
    setShowSuggestions(false)

    // Σταματάμε την αναγνώριση φωνής αν είναι ενεργή
    if (isListening) {
      stopListening()
    }

    // Show typing indicator
    setIsTyping(true)

    try {
      // Έλεγχος για αποθηκευμένη απάντηση
      const cachedResponse = findSimilarQuestion(userMessage)

      if (cachedResponse) {
        // Χρήση της αποθηκευμένης απάντησης
        console.log("Using cached response")
        setTimeout(() => {
          setIsTyping(false)
          
          // Προσθήκη του μηνύματος με κενό κείμενο αρχικά
          setMessages((prev) => {
            const newMessages = [...prev, { text: "", isBot: true }]
            // Εκκίνηση του typing animation
            setTimeout(() => typeResponse(cachedResponse, newMessages.length - 1), 50)
            return newMessages
          })
        }, 200) // Μικρή καθυστέρηση για να φαίνεται φυσικό

        return
      }

      // Generate AI response (without image for suggestions)
      const aiResponse = await generateResponse(userMessage, null, 0) // Simplified call

      // Αποθήκευση της απάντησης στην προσωρινή μνήμη
      const normalizedQuestion = userMessage.toLowerCase().trim()
      if (normalizedQuestion.length > 3 && aiResponse.length > 20) {
        responseCache.current[normalizedQuestion] = aiResponse
        // Περιορισμός του μεγέθους της προσωρινής μνήμης - αυξάνουμε για καλύτερη απόδοση
        if (Object.keys(responseCache.current).length > 50) {
          const oldestKey = Object.keys(responseCache.current)[0]
          delete responseCache.current[oldestKey]
        }
      }

      // Προσθήκη του μηνύματος με κενό κείμενο αρχικά
      setMessages((prev) => {
        const newMessages = [...prev, { text: "", isBot: true }]
        // Ξεκίνα το streaming για το νέο μήνυμα
        typeResponse(aiResponse, newMessages.length - 1)
        return newMessages
      })
    } catch (error) {
      console.error("Error in handleSubmit:", error)
      setMessages((prev) => [
        ...prev,
        {
          text: "Συγγνώμη, αντιμετώπισα ένα σφάλμα. Παρακαλώ δοκιμάστε ξανά αργότερα.",
          isBot: true,
        },
      ])
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = async (suggestion) => {
    // Αποτροπή κλικ σε προτάσεις όταν το chatbot είναι απασχολημένο
    if (isBusy) return

    // ΚΡΙΣΙΜΟ: Καθαρισμός όλων των καταστάσεων πριν ξεκινήσει νέα αλληλεπίδραση
    if (isStreaming || isTyping) {
      console.log("Clearing previous states before suggestion...")
      setIsStreaming(false)
      setStreamingMessageIndex(null)
      setIsTyping(false)
      
      // Καθαρισμός timeouts
      if (typingTimeoutsRef.current && typingTimeoutsRef.current.length > 0) {
        typingTimeoutsRef.current.forEach(timeoutId => {
          clearTimeout(timeoutId)
        })
        typingTimeoutsRef.current = []
      }
    }

    // Reset του user stop flag για νέα αλληλεπίδραση
    userStoppedTypingRef.current = false

    setInputValue(suggestion)
    setShowSuggestions(false)

    // Add user message
    setMessages((prev) => [...prev, { text: suggestion, isBot: false }])

    // Show typing indicator
    setIsTyping(true)

    try {
      // Έλεγχος για αποθηκευμένη απάντηση
      const cachedResponse = findSimilarQuestion(suggestion)

      if (cachedResponse) {
        // Χρήση της αποθηκευμένης απάντησης
        console.log("Using cached response for suggestion")
        setTimeout(() => {
          setIsTyping(false)

          // Προσθήκη του μηνύματος με κενό κείμενο αρχικά
          setMessages((prev) => {
            const newMessages = [...prev, { text: "", isBot: true }]
            // Εκκίνηση του typing animation
            setTimeout(() => typeResponse(cachedResponse, newMessages.length - 1), 50)
            return newMessages
          })
        }, 200) // Μικρή καθυστέρηση για να φαίνεται φυσικό

        return
      }

      // Generate AI response (without image for suggestions)
      const aiResponse = await generateResponse(suggestion, null, 0) // Use safe defaults

      // Αποθήκευση της απάντησης στην προσωρινή μνήμη
      const normalizedQuestion = suggestion.toLowerCase().trim()
      if (normalizedQuestion.length > 3 && aiResponse.length > 20) {
        responseCache.current[normalizedQuestion] = aiResponse
        // Περιορισμός του μεγέθους της προσωρινής μνήμης
        if (Object.keys(responseCache.current).length > 50) {
          const oldestKey = Object.keys(responseCache.current)[0]
          delete responseCache.current[oldestKey]
        }
      }

      // Προσθήκη του μηνύματος με κενό κείμενο αρχικά
      setMessages((prev) => {
        const newMessages = [...prev, { text: "", isBot: true }]
        // Ξεκίνα το streaming για το νέο μήνυμα
        typeResponse(aiResponse, newMessages.length - 1)
        return newMessages
      })
    } catch (error) {
      console.error("Error in handleSuggestionClick:", error)
      setMessages((prev) => [
        ...prev,
        {
          text: "Συγγνώμη, αντιμετώπισα ένα σφάλμα. Παρακαλώ δοκιμάστε ξανά αργότερα.",
          isBot: true,
        },
      ])
      setIsTyping(false)
    }
  }

  const toggleSuggestions = () => {
    // Αποτροπή εναλλαγής προτάσεων όταν το chatbot είναι απασχολημένο
    if (isBusy) return

    setShowSuggestions(!showSuggestions)
  }

  const clearChat = () => {
    // Αποτροπή καθαρισμού συνομιλίας όταν το chatbot είναι απασχολημένο
    if (isBusy) return

    setMessages([
      {
        text: ui.welcome,
        isBot: true,
      },
    ])
    setShowSuggestions(true)
    setShowSettings(false)
    setShowError(false)
  }

  const switchMode = (mode) => {
    // Αποτροπή αλλαγής mode όταν το chatbot είναι απασχολημένο
    if (isBusy) return

    if (mode === activeMode) return

    setActiveMode(mode)

    // Δημιουργία του κατάλληλου μηνύματος καλωσορίσματος ανάλογα με τη λειτουργία
    let welcomeMessage = ui.welcome

    if (mode === "search") {
      welcomeMessage = isGreekPath
        ? `Γεια σας! Είμαι ο βοηθός AI της Acron Web σε ΛΕΙΤΟΥΡΓΙΑ ΑΝΑΖΗΤΗΣΗΣ. Ποιες συγκεκριμένες πληροφορίες αναζητάτε;`
        : `Hello! I'm the Acron Web AI assistant in SEARCH MODE. What specific information are you looking for?`
    } else if (mode === "reason") {
      welcomeMessage = isGreekPath
        ? `Γεια σας! Είμαι ο βοηθός AI της Acron Web σε ΛΕΙΤΟΥΡΓΙΑ ΑΝΑΛΥΣΗΣ. Τι θα θέλατε να αναλύσω ή να εξηγήσω;`
        : `Hello! I'm the Acron Web AI assistant in REASONING MODE. What would you like me to analyze or explain?`
    }

    setMessages([
      {
        text: welcomeMessage,
        isBot: true,
      },
    ])
    setShowSuggestions(true)
    setShowSettings(false)
    setShowError(false)
  }

  // Animation variants
  const chatContainerVariants = {
    hidden: { opacity: 0, y: isMobile ? "100%" : 20, scale: isMobile ? 1 : 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 350,
      },
    },
    exit: {
      opacity: 0,
      y: isMobile ? "100%" : 20,
      scale: isMobile ? 1 : 0.9,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4,
      },
    },
  }

  // Νέα συνάρτηση για τη δημιουργία gradient background
  const getGradientBackground = (mode) => {
    switch (mode) {
      case "chat":
        return "bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10"
      case "search":
        return "bg-gradient-to-br from-orange-400/10 via-transparent to-orange-500/10"
      case "reason":
        return "bg-gradient-to-br from-[#9af318]/10 via-transparent to-green-500/10"
      default:
        return "bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10"
    }
  }

  // Νέα συνάρτηση για τη δημιουργία border gradient
  const getBorderGradient = (mode) => {
    switch (mode) {
      case "chat":
        return "border-[#81a1d4]/20"
      case "search":
        return "border-indigo-500/20"
      case "reason":
        return "border-[#9af318]/20"
      default:
        return "border-[#81a1d4]/20"
    }
  }

  // Νέα συνάρτηση για τη δημιουργία glow effect
  const getGlowEffect = (mode) => {
    switch (mode) {
      case "chat":
        return "shadow-[0_0_15px_rgba(59,130,246,0.15)]"
      case "search":
        return "shadow-[0_0_15px_rgba(99,102,241,0.15)]"
      case "reason":
        return "shadow-[0_0_15px_rgba(154,243,24,0.15)]"
      default:
        return "shadow-[0_0_15px_rgba(59,130,246,0.15)]"
    }
  }

  // Συνάρτηση για μετατροπή Markdown σε HTML
  const parseMarkdown = (text) => {
    if (!text) return ""

    // Μετατροπή επικεφαλίδων
    const parsedText = text
      // Επικεφαλίδα 1 (h1)
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold my-3">$1</h1>')
      // Επικεφαλίδα 2 (h2)
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold my-2">$1</h2>')
      // Επικεφαλίδα 3 (h3)
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold my-2">$1</h3>')
      // Bold (**text**)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // Italic (*text*)
      .replace(/\*(.+?)\*/g, "<em>$1</em>")

    return parsedText
  }

  // Προσθέστε αυτό μετά τη δήλωση του responseCache
  const commonQuestionsCache = useRef({})

  // Προσθέστε αυτή τη συνάρτηση μετά το useEffect που αρχικοποιεί το welcome message
  useEffect(() => {
    // Προ-φόρτωση απαντήσεων για συχνές ερωτήσεις - απλοποιημένη
    const preloadCommonResponses = async () => {
      // Λίστα με συχνές ερωτήσεις στα αγγλικά και ελληνικά
      const commonQuestions = isGreekPath
        ? ["Ποιες υπηρεσίες προσφέρετε;"]
        : ["What services do you offer?"]

      // Προ-φόρτωση μόνο μιας ερώτησης για να αποφύγουμε conflicts
      for (const question of commonQuestions) {
        if (!commonQuestionsCache.current[question]) {
          try {
            // Χρησιμοποιούμε setTimeout για να μην μπλοκάρουμε το UI thread
            setTimeout(async () => {
              try {
                // Δημιουργούμε ξεχωριστό controller για το preloading
                const preloadController = new AbortController()
                
                // Χρήση του πρώτου API key μόνο
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${API_KEYS[0]}`,
                    "HTTP-Referer": "https://alfaschool.gr",
                    "X-Title": "ALFA Language Centers Assistant",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    model: "meta-llama/llama-4-maverick:free",
                    messages: [
                      {
                        role: "system",
                        content: modePrompts[activeMode] || modePrompts.chat,
                      },
                      {
                        role: "user",
                        content: question,
                      },
                    ],
                    max_tokens: 400, // Πιο σύντομες απαντήσεις
                    temperature: 0.7,
                  }),
                  signal: preloadController.signal
                })

                if (response.ok) {
                  const data = await response.json()
                  if (data.choices && data.choices[0] && data.choices[0].message) {
                    const responseText = data.choices[0].message.content
                    commonQuestionsCache.current[question] = responseText
                    // Προσθήκη στο κανονικό cache
                    responseCache.current[question.toLowerCase().trim()] = responseText
                    console.log("Preloaded response for:", question)
                  }
                }
              } catch (error) {
                // Σιωπηλή αποτυχία για το preloading - δεν επηρεάζει το UI
                console.log("Preload failed for question:", question, error.message)
              }
            }, 3000) // Καθυστέρηση 3 δευτερολέπτων για να μην παρεμβαίνει
          } catch (error) {
            console.error("Error setting up preloading:", error)
          }
        }
      }
    }

    // Εκτέλεση της προ-φόρτωσης μόνο αν το chatbot είναι ανοιχτό και δεν είναι απασχολημένο
    if (isOpen && !isBusy) {
      preloadCommonResponses()
    }
  }, [isOpen, isGreekPath]) // Αφαίρεση isBusy και currentApiKeyIndex dependencies

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            ref={chatContainerRef}
            className={cn(
              "backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-2xl flex flex-col overflow-hidden",
              "w-[360px] sm:w-[400px] h-[600px] sm:h-[650px] max-h-[85vh] rounded-3xl",
              // Mobile-specific styles
              "sm:bottom-6 sm:right-6 sm:max-w-[400px]",
              isMobile
                ? "fixed top-0 left-0 right-0 bottom-0 w-full h-full max-h-none max-w-none m-0 p-0 rounded-none border-none z-[9999]"
                : "border border-white/20 dark:border-gray-800/50",
              theme === "dark" && "dark",
              getGradientBackground(activeMode),
              getBorderGradient(activeMode),
              getGlowEffect(activeMode),
            )}
            style={{
              boxShadow: isMobile
                ? "none"
                : "0 10px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={chatContainerVariants}
          >
            {/* Header with glass effect */}
            <div
              className="p-4 border-b border-white/20 dark:border-gray-800/50 flex justify-between items-center backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 xs:py-5 rounded-t-3xl"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`bg-gradient-to-r ${currentModeConfig.gradient} p-2 rounded-xl mr-3 flex items-center justify-center shadow-lg`}
                    style={{
                      boxShadow: `0 4px 12px rgba(${currentModeConfig.lightColor}, 0.3)`,
                    }}
                  >
                    <currentModeConfig.icon className="h-4 w-4" isActive={true} forceWhite={true} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-base">{ui.header.title}</h2>
                    <div className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{ui.header.online}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => !isBusy && setShowSettings(!showSettings)}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    showSettings
                      ? "bg-gray-100/80 dark:bg-gray-800/80"
                      : "hover:bg-gray-100/80 dark:hover:bg-gray-800/80",
                    isBusy && "opacity-50 cursor-not-allowed",
                  )}
                  title={isBusy ? "Please wait..." : ui.header.settings}
                  disabled={isBusy}
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={handleClose}
                  className={cn(
                    "p-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg transition-colors",
                    "xs:p-3 xs:bg-gray-100/80 dark:xs:bg-gray-800/80 xs:rounded-full",
                    isBusy && "opacity-50 cursor-not-allowed",
                  )}
                  title={isBusy ? "Please wait..." : ui.header.close}
                  disabled={isBusy}
                >
                  <X className="h-4 w-4 xs:h-5 xs:w-5" />
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {showError && errorMessage && (
                <motion.div
                  className="px-4 py-3 bg-red-50/90 dark:bg-red-900/20 border-b border-red-100/50 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm flex items-start justify-between backdrop-blur-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <button
                    onClick={dismissError}
                    className="ml-2 p-1 hover:bg-red-100/50 dark:hover:bg-red-800/30 rounded-md flex-shrink-0"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Settings dropdown with glass effect */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  className="absolute right-2 top-16 w-56 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg border border-white/20 dark:border-gray-800/50 z-50 overflow-hidden"
                  style={{
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2">
                    <button
                      onClick={clearChat}
                      className={cn(
                        "w-full text-left px-3 py-2.5 text-sm hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg flex items-center",
                        isBusy && "opacity-50 cursor-not-allowed",
                      )}
                      disabled={isBusy}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      {ui.settings.clearChat}
                    </button>
                    <div className="border-t border-gray-200/50 dark:border-gray-700/50 my-1.5"></div>
                    <div className="px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {ui.settings.chatModes}
                    </div>
                    <button
                      onClick={() => switchMode("chat")}
                      className={cn(
                        "w-full text-left px-3 py-2.5 text-sm rounded-lg flex items-center",
                        activeMode === "chat"
                          ? "bg-[#81a1d4]/10 dark:bg-[#81a1d4]/20 text-[#81a1d4] dark:text-[#6b8bc4]"
                          : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                        isBusy && "opacity-50 cursor-not-allowed",
                      )}
                      disabled={isBusy}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {isGreekPath ? chatbotTranslationsEl.modes.chat.title : "Chat Mode"}
                    </button>
                    <button
                      onClick={() => switchMode("search")}
                      className={cn(
                        "w-full text-left px-3 py-2.5 text-sm rounded-lg flex items-center",
                        activeMode === "search"
                          ? "bg-orange-50/70 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                          : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                        isBusy && "opacity-50 cursor-not-allowed",
                      )}
                      disabled={isBusy}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      {isGreekPath ? chatbotTranslationsEl.modes.search.title : "Search Mode"}
                    </button>
                    <button
                      onClick={() => switchMode("reason")}
                      className={cn(
                        "w-full text-left px-3 py-2.5 text-sm rounded-lg flex items-center",
                        activeMode === "reason"
                          ? "bg-[#9af318]/20 dark:bg-[#9af318]/20 text-[#9af318] dark:text-[#9af318]"
                          : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                        isBusy && "opacity-50 cursor-not-allowed",
                      )}
                      disabled={isBusy}
                    >
                      <BrainCircuit className="h-4 w-4 mr-2" />
                      {isGreekPath ? chatbotTranslationsEl.modes.reason.title : "Reasoning Mode"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mode indicator with glass effect */}
            <div
              className="px-4 py-2 bg-gray-50/50 dark:bg-gray-800/30 border-b border-white/20 dark:border-gray-800/50 flex items-center justify-between backdrop-blur-xl"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span className="mr-2">{currentModeConfig.description}</span>
                <currentModeConfig.icon className={`h-3 w-3 ${currentModeConfig.color}`} />
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs ${currentModeConfig.color} flex items-center`}>
                  {activeMode === "chat" ? (
                    <MessageSquare className="h-3 w-3 mr-1" />
                  ) : activeMode === "search" ? (
                    <Search className="h-3 w-3 mr-1" />
                  ) : (
                    <Lightbulb className="h-3 w-3 mr-1" />
                  )}
                  {activeMode === "chat"
                    ? ui.modeIndicator.standard
                    : activeMode === "search"
                      ? ui.modeIndicator.enhanced
                      : ui.modeIndicator.advanced}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {/* ...existing code... (provider name and key number removed) */}
                </span>
              </div>
            </div>

            {/* Messages area with subtle pattern */}
            <div
              className={cn("flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar", getGradientBackground(activeMode))}
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.01) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0, 0, 0, 0.01) 2%, transparent 0%)",
                backgroundSize: "100px 100px",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={cn("flex", msg.isBot ? "justify-start" : "justify-end")}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 * (index % 3) }}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] p-4 rounded-2xl transition-all duration-300 group",
                        msg.isBot
                          ? "bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 shadow-lg border border-white/20 dark:border-gray-700/30 rounded-2xl rounded-tl-sm backdrop-blur-xl"
                          : `bg-gradient-to-r ${currentModeConfig.buttonGradient} text-white rounded-2xl rounded-br-sm shadow-lg backdrop-blur-xl`,
                        // Smooth animation για typing
                        isStreaming && streamingMessageIndex === index && "transform transition-transform duration-200",
                      )}
                      style={{
                        boxShadow: msg.isBot
                          ? "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
                          : `0 4px 15px rgba(${currentModeConfig.lightColor}, 0.3)`,
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                      }}
                    >
                      <div className="flex items-start">
                        {msg.isBot && (
                          <div className="mr-3 mt-1 flex-shrink-0 hidden sm:block">
                            <div
                              className={`w-8 h-8 rounded-full bg-gradient-to-r ${currentModeConfig.gradient} flex items-center justify-center shadow-lg`}
                              style={{
                                boxShadow: `0 4px 10px rgba(${currentModeConfig.lightColor}, 0.3)`,
                              }}
                            >
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                        <div className={cn("text-sm whitespace-pre-line", msg.isBot ? "" : "")}>
                          {msg.isBot ? (
                            <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }} />
                          ) : (
                            msg.text.split("\n").map((line, i) => (
                              <React.Fragment key={i}>
                                {line}
                                {i < msg.text.split("\n").length - 1 && <br />}
                              </React.Fragment>
                            ))
                          )}
                          {/* Smooth typing cursor για ChatGPT-like effect */}
                          {isStreaming && streamingMessageIndex === index && (
                            <span className="inline-block w-2 h-5 ml-1 bg-current opacity-100 animate-pulse rounded-sm" 
                                  style={{
                                    animation: 'blink 1s infinite',
                                    backgroundColor: currentModeConfig.lightColor
                                  }}>
                              <style jsx>{`
                                @keyframes blink {
                                  0%, 50% { opacity: 1; }
                                  51%, 100% { opacity: 0.3; }
                                }
                              `}</style>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Message actions */}
                      {msg.isBot && (
                        <div className="mt-2 pt-2 border-t border-gray-100/50 dark:border-gray-700/30 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => giveFeedback(index, true)}
                              className={cn(
                                "p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
                                feedbackGiven[index] === "positive" &&
                                  "text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-500",
                              )}
                              title={ui.messages.helpful}
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => giveFeedback(index, false)}
                              className={cn(
                                "p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
                                feedbackGiven[index] === "negative" &&
                                  "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500",
                              )}
                              title={ui.messages.notHelpful}
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => copyToClipboard(msg.text, index)}
                              className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                              title={ui.messages.copy}
                            >
                              {copiedIndex === index ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                            <button
                              className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                              title={ui.messages.share}
                            >
                              <Share2 className="h-3 w-3" />
                            </button>
                            <button
                              className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                              title={ui.messages.moreOptions}
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>


              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div
                    className="max-w-[85%] p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-lg border border-white/20 dark:border-gray-700/30 backdrop-blur-xl"
                    style={{
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                    }}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 flex-shrink-0 hidden sm:block">
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-r ${currentModeConfig.gradient} flex items-center justify-center shadow-lg`}
                          style={{
                            boxShadow: `0 4px 10px rgba(${currentModeConfig.lightColor}, 0.3)`,
                          }}
                        >
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <AITextLoading texts={["Thinking...", "Processing...", "Analyzing...", "Computing...", "Almost..."]} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions with glass effect */}
            <AnimatePresence>
              {showSuggestions && messages.length <= 2 && (
                <motion.div
                  className="px-4 py-3 bg-white/80 dark:bg-gray-900/80 border-t border-white/20 dark:border-gray-800/50 backdrop-blur-xl"
                  style={{
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {ui.input.suggestedQuestions}
                    </h4>
                    <button
                      onClick={toggleSuggestions}
                      className={cn(
                        "text-xs text-[#81a1d4] dark:text-[#6b8bc4] hover:underline flex items-center",
                        isBusy && "opacity-50 cursor-not-allowed",
                      )}
                      disabled={isBusy}
                    >
                      {ui.input.hide}
                      <ChevronUp className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={cn(
                          "text-left text-sm p-3 rounded-xl bg-gray-50/70 dark:bg-gray-800/70 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 transition-colors text-gray-700 dark:text-gray-300 border border-white/20 dark:border-gray-700/30 flex items-center justify-between group backdrop-blur-xl",
                          isBusy && "opacity-50 cursor-not-allowed",
                        )}
                        style={{
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                        }}
                        disabled={isBusy}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{suggestion}</span>
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#81a1d4]" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input area with glass effect */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-white/20 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-b-3xl"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Input with buttons */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/30 dark:border-gray-700/50 focus-within:border-[#81a1d4]/70 focus-within:ring-2 focus-within:ring-[#81a1d4]/30 transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={isListening ? "Listening..." : ui.input.placeholder}
                    className={cn(
                      "w-full p-3 pr-20 border-0 focus:ring-0 bg-transparent text-gray-900 dark:text-gray-100 outline-none text-sm",
                      isBusy && "opacity-75 cursor-not-allowed",
                      isListening && "pr-24 border-[#81a1d4]/50 dark:border-[#6b8bc4]/50",
                    )}
                    disabled={isBusy}
                  />

                  {/* Voice input button */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={cn(
                      "absolute right-12 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center transition-all",
                      isListening
                        ? "bg-[#81a1d4] text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700",
                      isBusy && "opacity-50 cursor-not-allowed",
                    )}
                    title={isBusy ? "Please wait..." : isListening ? "Stop listening" : "Voice input"}
                    disabled={isBusy}
                  >
                    {isListening ? (
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full animate-ping" style={{backgroundColor: 'rgba(129, 161, 212, 0.3)'}}></div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                          <line x1="12" x2="12" y1="19" y2="22"></line>
                        </svg>
                      </div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" x2="12" y1="19" y2="22"></line>
                      </svg>
                    )}
                  </button>

                  {/* Submit/Stop button */}
                  <button
                    type={isBusy ? "button" : "submit"}
                    onClick={isBusy ? (e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      stopTyping()
                    } : undefined}
                    className={cn(
                      "absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center transition-all",
                      isBusy
                        ? "bg-red-500 hover:bg-red-600 text-white shadow-lg border-2 border-red-400 animate-pulse" // Enhanced STOP button style
                        : inputValue.trim()
                          ? `bg-gradient-to-r ${currentModeConfig.buttonGradient} text-white hover:opacity-90`
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed",
                    )}
                    disabled={!isBusy && !inputValue.trim()}
                    title={isBusy ? "Click to STOP response" : "Send message"}
                  >
                    {isBusy ? (
                      // Enhanced STOP icon
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                        <rect x="5" y="5" width="14" height="14" fill="currentColor" rx="2"/>
                      </svg>
                    ) : isTyping ? (
                      <AITextLoading className="h-8" texts={["Thinking...", "Processing...", "Analyzing...", "Computing...", "Almost..."]} />
                    ) : (
                      // SEND icon
                      <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M2.33045 8.38999C0.250452 11.82 9.42048 14.9 9.42048 14.9C9.42048 14.9 12.5005 24.07 15.9305 21.99C19.5705 19.77 23.9305 6.13 21.0505 3.27C18.1705 0.409998 4.55045 4.74999 2.33045 8.38999Z"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M15.1999 9.12L9.41992 14.9"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </g>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Model dropdown and horizontal line, then mode buttons */}
              <div className="flex justify-center mt-3 space-x-2 items-center">
                {/* Model Dropdown */}
                <div className="flex items-center">
                  <div className="relative flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex items-center gap-1 h-8 pl-1 pr-2 text-xs rounded-md dark:text-white hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                          style={{ minWidth: 90 }}
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={AI_MODELS[activeMode][currentModelIndex].label}
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              transition={{ duration: 0.15 }}
                              className="flex items-center gap-1"
                            >
                              {/* Model Icon logic (adapted from widget) */}
                              {AI_MODELS[activeMode][currentModelIndex].icon()}
                              <span className="ml-1">{AI_MODELS[activeMode][currentModelIndex].label}</span>
                              <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
                            </motion.div>
                          </AnimatePresence>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className={cn(
                          "min-w-[10rem] rounded-xl border p-2 bg-white border-gray-200 shadow-lg",
                          "dark:bg-[#0a1a2f] dark:border-[#0a1a2f] dark:text-white dark:shadow-none"
                        )}
                        style={{}}
                      >
                        {AI_MODELS[activeMode].map((model, idx) => (
                          <DropdownMenuItem
                            key={model.label}
                            onSelect={() => setCurrentModelIndex(idx)}
                            className="flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2">
                              {model.icon()}
                              <span>{model.label}</span>
                            </div>
                            {currentModelIndex === idx && (
                              <Check className="w-4 h-4 text-[#81a1d4]" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {/* Vertical divider */}
                  <div className="h-6 w-px bg-black/10 dark:bg-white/10 mx-2" />
                </div>
                {/* Mode buttons */}
                <div className="flex space-x-2">
                  {Object.entries(modeConfig).map(([mode, config]) => {
                    const isActive = activeMode === mode
                    return (
                      <motion.button
                        key={mode}
                        type="button"
                        onClick={() => switchMode(mode)}
                        className={cn(
                          "rounded-full transition-all flex items-center justify-center",
                          isActive
                            ? `bg-gradient-to-r ${config.buttonGradient} text-white px-4 h-8`
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 w-8 h-8",
                          isBusy && "opacity-50 cursor-not-allowed",
                        )}
                        disabled={isBusy}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.15, type: "spring", stiffness: 400 },
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <config.icon className={cn("w-4 h-4", isActive ? "text-white mr-1.5" : "")} isActive={isActive} />
                        {isActive && (
                          <span className="text-xs font-medium text-white">
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                          </span>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Show suggestions button */}
              {!showSuggestions && messages.length > 1 && (
                <motion.button
                  type="button"
                  onClick={toggleSuggestions}
                  className={cn(
                    "mt-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center mx-auto bg-white/20 dark:bg-gray-800/20 px-3 py-1.5 rounded-xl border border-white/20 dark:border-gray-700/20",
                    isBusy && "opacity-50 cursor-not-allowed",
                  )}
                  disabled={isBusy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronDown className="h-3 w-3 mr-1" />
                  {ui.input.showSuggestions}
                </motion.button>
              )}

              {/* Footer */}
              <div className="mt-2 text-xs text-center text-gray-400 dark:text-gray-500">
                {isBusy && (
                  <div className="mb-2 text-red-500 font-medium animate-pulse">
                    {isGreekPath ? "Πατήστε το κουμπί STOP ή το πλήκτρο ESC για να σταματήσει η απάντηση" : "Press STOP button or ESC key to stop response"}
                  </div>
                )}
                {ui.footer.disclaimer}
                <div className="mt-1 flex items-center justify-center">
                  {ui.footer.poweredBy}
                  <a
                    href="https://ai.acronweb.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold flex items-center ml-1 transition-all duration-300 hover:scale-105 hover:brightness-110"
                    style={{ 
                      fontFamily: "'Outfit', 'Space Grotesk', 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                      fontWeight: 900,
                      letterSpacing: "-0.06em",
                      fontStretch: "condensed",
                      filter: "contrast(1.1)",
                      fontVariant: "small-caps"
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          opacity="0.5"
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                          fill="#92e232"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.0004 6.77539C11.5448 6.77539 11.1754 7.14476 11.1754 7.60039V16.4004C11.1754 16.856 11.5448 17.2254 12.0004 17.2254C12.456 17.2254 12.8254 16.856 12.8254 16.4004V7.60039C12.8254 7.14476 12.456 6.77539 12.0004 6.77539Z"
                          fill="#92e232"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.60039 8.97539C7.14476 8.97539 6.77539 9.34476 6.77539 9.80039V14.2004C6.77539 14.656 7.14476 15.0254 7.60039 15.0254C8.05603 15.0254 8.42539 14.656 8.42539 14.2004V9.80039C8.42539 9.34476 8.05603 8.97539 7.60039 8.97539Z"
                          fill="#92e232"
                        ></path>
                        <path
                          d="M15.5754 9.80039C15.5754 9.34476 15.9448 8.97539 16.4004 8.97539C16.856 8.97539 17.2254 9.34476 17.2254 9.80039V14.2004C17.2254 14.656 16.856 15.0254 16.4004 15.0254C15.9448 15.0254 15.5754 14.656 15.5754 14.2004V9.80039Z"
                          fill="#92e232"
                        ></path>
                      </g>
                    </svg> 
                    <span style={{ 
                      color: "#9af318",
                      textShadow: "0 2px 4px rgba(154, 243, 24, 0.2)"
                    }}>
                      ACRON
                    </span>
                    <span className="text-gray-700 dark:text-white" style={{
                      textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}>
                      AI
                    </span>
                  </a>
                </div>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open chat"
          >
            {/* Διορθωμένο bubble με σωστή τοποθέτηση του SVG */}

            <div className="relative">
              {/* Matte light blue bubble background, no glow */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex items-center justify-center" style={{backgroundColor: '#81a1d4'}}>
                {/* Icon - custom SVG, centered */}
                <span className="relative z-10 flex items-center justify-center w-full h-full">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="#fafafa" strokeWidth="1.5"></path>
                    <path d="M12 16V8" stroke="#fafafa" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path d="M8 14V10" stroke="#fafafa" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path d="M16 14V10" stroke="#fafafa" strokeWidth="1.5" strokeLinecap="round"></path>
                  </svg>
                </span>
              </div>

              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5">
                <div className="relative w-4 h-4">
                  {/* Matte lime green badge, no glow */}
                  <div className="absolute inset-0 rounded-full bg-lime-500"></div>
                </div>
              </div>
            </div>

            {/* Animated tooltip with gradient blue colors - positioned higher */}
            {isHovered && (
              <motion.div
                className="absolute right-full mr-3 pointer-events-none z-50"
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ top: "20%" }} // Moved even higher (was 30%)
              >
                <div className="text-white text-sm py-2 px-4 rounded-lg shadow-lg whitespace-nowrap border backdrop-blur-sm" style={{background: 'linear-gradient(to right, #81a1d4, #6b8bc4)', borderColor: 'rgba(129, 161, 212, 0.2)'}}>
                  Chat with ΑΛΦΑ AI
                  <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2.5 h-2.5" style={{backgroundColor: '#6b8bc4'}}></div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { AIChatbot }
