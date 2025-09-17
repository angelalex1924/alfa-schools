import React from 'react'

const WhyUsIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    className="iconify iconify--emojione"
    preserveAspectRatio="xMidYMid meet"
    fill="currentColor"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g fill="#ff5a79">
        <path d="M30.2 2.1C18.6 2.8 12.5 9.4 12 21.3h11.7c.1-4.1 2.5-7.2 6.7-7.7c4.2-.4 8.2.6 9.4 3.4c1.3 3.1-1.6 6.7-3 8.2c-2.6 2.8-6.8 4.9-9 7.9c-2.1 3-2.5 6.9-2.7 11.7h10.3c.1-3.1.3-6 1.7-7.9c2.3-3.1 5.7-4.5 8.5-7c2.7-2.3 5.6-5.1 6-9.5C53.3 7.5 42.7 1.3 30.2 2.1"></path>
        <ellipse cx="30.5" cy="55.6" rx="6.5" ry="6.4"></ellipse>
      </g>
    </g>
  </svg>
))

WhyUsIcon.displayName = 'WhyUsIcon'

export default WhyUsIcon
