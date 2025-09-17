"use client"

import React from 'react'

// Santa Claus Icon
export const SantaIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="#dc2626"/>
    <path d="M12 6C8.7 6 6 8.7 6 12V16C6 17.1 6.9 18 8 18H16C17.1 18 18 17.1 18 16V12C18 8.7 15.3 6 12 6Z" fill="#dc2626"/>
    <path d="M8 18V20C8 21.1 8.9 22 10 22H14C15.1 22 16 21.1 16 20V18H8Z" fill="#1f2937"/>
    <circle cx="10" cy="12" r="1" fill="white"/>
    <circle cx="14" cy="12" r="1" fill="white"/>
    <path d="M10 15C10 15.5 10.4 16 11 16H13C13.6 16 14 15.5 14 15" stroke="white" strokeWidth="1" fill="none"/>
  </svg>
)

// Christmas Tree Icon
export const ChristmasTreeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className}>
    <g>
      <circle fill="#FEDEA1" cx="268.8" cy="140.8" r="25.6"></circle> 
      <path fill="#FF877F" d="M230.4,320c-21.171,0-38.4-17.229-38.4-38.4c0-21.171,17.229-38.4,38.4-38.4s38.4,17.229,38.4,38.4 C268.8,302.771,251.58,320,230.4,320z"></path> 
      <circle fill="#D9E5CB" cx="166.4" cy="422.4" r="25.6"></circle> 
      <path fill="#788F5D" d="M12.092,499.2L128.734,320H89.6l91.281-153.6H140.8L256,5.111L371.2,166.4h-40.081L422.4,320h-39.125 l116.642,179.2H12.092z M332.8,371.2c-21.171,0-38.4,17.229-38.4,38.4c0,21.171,17.229,38.4,38.4,38.4s38.4-17.229,38.4-38.4 C371.2,388.429,353.98,371.2,332.8,371.2z M166.4,396.8c-14.114,0-25.6,11.486-25.6,25.6s11.486,25.6,25.6,25.6 c14.114,0,25.6-11.486,25.6-25.6S180.514,396.8,166.4,396.8z M230.4,243.2c-21.171,0-38.4,17.229-38.4,38.4 c0,21.171,17.229,38.4,38.4,38.4s38.4-17.229,38.4-38.4C268.8,260.429,251.58,243.2,230.4,243.2z M268.8,115.2 c-14.114,0-25.6,11.486-25.6,25.6s11.486,25.6,25.6,25.6s25.6-11.486,25.6-25.6C294.4,126.686,282.914,115.2,268.8,115.2z"></path> 
      <path fill="#6FB0B6" d="M332.8,448c-21.171,0-38.4-17.229-38.4-38.4c0-21.171,17.229-38.4,38.4-38.4s38.4,17.229,38.4,38.4 C371.2,430.771,353.98,448,332.8,448z"></path> 
      <g> 
        <path fill="#573A32" d="M25.6,512h460.8c9.591,0,18.372-5.359,22.758-13.884c4.386-8.525,3.644-18.79-1.929-26.598 L408.149,332.8h1.451c9.438,0,18.116-5.197,22.571-13.517c4.454-8.329,3.968-18.423-1.271-26.283L355.038,179.2h3.362 c9.839,0,18.807-5.641,23.074-14.515c4.267-8.866,3.063-19.396-3.081-27.085l-102.4-128C271.13,3.533,263.774,0,256,0 c-7.774,0-15.13,3.533-19.994,9.609l-102.4,128c-6.144,7.689-7.347,18.21-3.081,27.085c4.267,8.866,13.235,14.507,23.074,14.507 h3.362L81.101,293.001c-5.239,7.851-5.726,17.954-1.271,26.283c4.454,8.32,13.133,13.517,22.571,13.517h1.451L4.77,471.518 c-5.572,7.799-6.315,18.065-1.929,26.598S16.009,512,25.6,512z M153.6,307.2h-51.2l102.4-153.6h-51.2L256,25.6l102.4,128h-51.2 l102.4,153.6h-51.2l128,179.2H25.6L153.6,307.2z"></path> 
        <path fill="#573A32" d="M230.4,230.4c-28.279,0-51.2,22.921-51.2,51.2c0,28.279,22.921,51.2,51.2,51.2 s51.2-22.921,51.2-51.2C281.6,253.321,258.679,230.4,230.4,230.4z M230.4,307.2c-14.114,0-25.6-11.486-25.6-25.6 c0-14.114,11.486-25.6,25.6-25.6c14.114,0,25.6,11.486,25.6,25.6C256,295.714,244.514,307.2,230.4,307.2z"></path> 
        <path fill="#573A32" d="M332.8,358.4c-28.279,0-51.2,22.921-51.2,51.2c0,28.279,22.921,51.2,51.2,51.2 s51.2-22.921,51.2-51.2C384,381.321,361.079,358.4,332.8,358.4z M332.8,435.2c-14.114,0-25.6-11.486-25.6-25.6 c0-14.114,11.486-25.6,25.6-25.6s25.6,11.486,25.6,25.6C358.4,423.714,346.914,435.2,332.8,435.2z"></path> 
        <path fill="#573A32" d="M268.8,179.2c21.205,0,38.4-17.195,38.4-38.4s-17.195-38.4-38.4-38.4s-38.4,17.195-38.4,38.4 S247.595,179.2,268.8,179.2z M268.8,128c7.057,0,12.8,5.743,12.8,12.8c0,7.057-5.743,12.8-12.8,12.8s-12.8-5.743-12.8-12.8 C256,133.743,261.743,128,268.8,128z"></path> 
        <path fill="#573A32" d="M166.4,384c-21.205,0-38.4,17.195-38.4,38.4c0,21.205,17.195,38.4,38.4,38.4s38.4-17.195,38.4-38.4 C204.8,401.195,187.605,384,166.4,384z M166.4,435.2c-7.057,0-12.8-5.743-12.8-12.8s5.743-12.8,12.8-12.8s12.8,5.743,12.8,12.8 S173.457,435.2,166.4,435.2z"></path> 
      </g> 
    </g>
  </svg>
)

// Reindeer Icon
export const ReindeerIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="12" cy="16" rx="8" ry="4" fill="#8b4513"/>
    <ellipse cx="8" cy="12" rx="2" ry="3" fill="#8b4513"/>
    <ellipse cx="16" cy="12" rx="2" ry="3" fill="#8b4513"/>
    <circle cx="9" cy="10" r="1" fill="black"/>
    <circle cx="15" cy="10" r="1" fill="black"/>
    <path d="M12 8L10 6L8 4" stroke="#8b4513" strokeWidth="2" fill="none"/>
    <path d="M12 8L14 6L16 4" stroke="#8b4513" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="6" r="1" fill="#dc2626"/>
  </svg>
)

// Gift Box Icon
export const GiftBoxIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="8" width="16" height="12" fill="#dc2626"/>
    <rect x="4" y="8" width="16" height="4" fill="#16a34a"/>
    <path d="M12 2V8" stroke="#16a34a" strokeWidth="2"/>
    <path d="M8 4H16" stroke="#16a34a" strokeWidth="2"/>
    <circle cx="12" cy="6" r="1" fill="#16a34a"/>
  </svg>
)

// Bell Icon
export const BellIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C8.7 2 6 4.7 6 8V12L4 16H20L18 12V8C18 4.7 15.3 2 12 2Z" fill="#fbbf24"/>
    <path d="M12 20C13.1 20 14 19.1 14 18H10C10 19.1 10.9 20 12 20Z" fill="#fbbf24"/>
    <circle cx="12" cy="6" r="1" fill="#dc2626"/>
  </svg>
)

// Star Icon
export const StarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="#fbbf24"/>
  </svg>
)

// Snowman Icon
export const SnowmanIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="3" fill="white" stroke="#1f2937" strokeWidth="1"/>
    <circle cx="12" cy="16" r="4" fill="white" stroke="#1f2937" strokeWidth="1"/>
    <circle cx="10" cy="7" r="0.5" fill="black"/>
    <circle cx="14" cy="7" r="0.5" fill="black"/>
    <path d="M10 9C10.5 9.5 11.2 9.8 12 9.8C12.8 9.8 13.5 9.5 14 9" stroke="black" strokeWidth="1" fill="none"/>
    <path d="M12 2L11 4" stroke="#8b4513" strokeWidth="2"/>
    <path d="M12 2L13 4" stroke="#8b4513" strokeWidth="2"/>
  </svg>
)

// Candy Cane Icon
export const CandyCaneIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 2L8 22" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"/>
    <path d="M8 2L8 22" stroke="white" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2"/>
    <path d="M8 2C8 2 10 4 12 6C14 8 16 10 18 12" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
