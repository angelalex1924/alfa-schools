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
