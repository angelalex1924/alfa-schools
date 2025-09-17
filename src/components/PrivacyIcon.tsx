import React from 'react'

const PrivacyIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 48 48"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="currentColor"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <title>shield</title>
      <desc>Created with Sketch.</desc>
      <g id="shield" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="编组">
          <rect id="矩形" fillOpacity="0.01" fill="#FFFFFF" x="0" y="0" width="48" height="48"></rect>
          <path
            d="M6,8.25564385 L24.008642,3 L42,8.25564385 L42,19.0336798 C42,30.3621834 34.7502223,40.4194233 24.0026245,44.0005035 L24.0026245,44.0005035 C13.2520792,40.4194856 6,30.3599802 6,19.0286999 L6,8.25564385 Z"
            id="矩形"
            stroke="#000000"
            strokeWidth="4"
            fill="#2F88FF"
            fillRule="nonzero"
            strokeLinejoin="round"
          ></path>
        </g>
      </g>
    </g>
  </svg>
))

PrivacyIcon.displayName = 'PrivacyIcon'

export default PrivacyIcon
