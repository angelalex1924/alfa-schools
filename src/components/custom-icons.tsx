import { Home, Briefcase, Users } from "lucide-react"

interface IconProps {
  className?: string
  [key: string]: any
}

export const HomeIcon = ({ className, ...props }: IconProps) => (
  <Home className={className} {...props} />
)

export const PortfolioIcon = ({ className, ...props }: IconProps) => (
  <Briefcase className={className} {...props} />
)

export const WhyUsIcon = ({ className, ...props }: IconProps) => (
  <Users className={className} {...props} />
)

export const GamesIcon = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <g clipPath="url(#clip0_4418_10012)">
      <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.25 11H7.75C6.79 11 6 10.21 6 9.25V6.75C6 5.79 6.79 5 7.75 5H16.25C17.21 5 18 5.79 18 6.75V9.25C18 10.21 17.21 11 16.25 11Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.3 15.2793L8 17.5793" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.03003 15.3105L10.33 17.6105" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.49 15.3301H16.51" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.49 17.5005V17.4805" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_4418_10012">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)
