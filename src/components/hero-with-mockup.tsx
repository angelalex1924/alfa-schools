import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Mockup } from "@/components/ui/mockup"
import { Glow } from "@/components/ui/glow"

interface HeroWithMockupProps {
  title: string
  description: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  mockupImage: {
    src: string
    alt: string
    width: number
    height: number
  }
  className?: string
}

export function HeroWithMockup({
  title,
  description,
  primaryCta = {
    text: "Get Started",
    href: "/get-started",
  },
  secondaryCta = {
    text: "GitHub",
    href: "https://github.com/your-repo",
    icon: <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  },
  mockupImage,
  className,
}: HeroWithMockupProps) {
  return (
    <section
      className={cn(
        "relative bg-background text-foreground",
        "py-12 px-4 md:py-24 lg:py-32",
        "overflow-hidden",
        className,
      )}
    >
      <div className="relative mx-auto max-w-[1280px] flex flex-col gap-12 lg:gap-24">
        <div className="relative z-10 flex flex-col items-center gap-6 pt-8 md:pt-16 text-center lg:gap-12">
          {/* Heading */}
          <h1
            className={cn(
              "inline-block animate-appear",
              "bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground",
              "bg-clip-text text-transparent",
              "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
              "leading-[1.1] sm:leading-[1.1]",
              "drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]",
            )}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={cn(
              "max-w-[550px] animate-appear opacity-0 [animation-delay:150ms]",
              "text-base sm:text-lg md:text-xl",
              "text-muted-foreground",
              "font-medium",
            )}
          >
            {description}
          </p>

          {/* CTAs */}
          <div
            className="relative z-10 flex flex-wrap justify-center gap-4 
            animate-appear opacity-0 [animation-delay:300ms]"
          >
            <Button
              asChild
              size="lg"
              className={cn(
                "bg-gradient-to-b from-brand to-brand/90 dark:from-brand/90 dark:to-brand/80",
                "hover:from-brand/95 hover:to-brand/85 dark:hover:from-brand/80 dark:hover:to-brand/70",
                "text-white shadow-lg",
                "transition-all duration-300",
              )}
            >
              <a href={primaryCta.href}>{primaryCta.text}</a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className={cn(
                "text-foreground/80 dark:text-foreground/70",
                "transition-all duration-300",
              )}
            >
              <a href={secondaryCta.href}>
                {secondaryCta.icon}
                {secondaryCta.text}
              </a>
            </Button>
          </div>

          {/* Mockup */}
          <div className="relative w-full pt-12 px-4 sm:px-6 lg:px-8">
            <Mockup
              className={cn(
                "animate-appear opacity-0 [animation-delay:700ms]",
                "shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]",
                "border-brand/10 dark:border-brand/5",
              )}
            >
              <img
                {...mockupImage}
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </Mockup>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>
    </section>
  )
}
