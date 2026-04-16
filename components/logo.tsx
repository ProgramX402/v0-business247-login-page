import { Building2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "default" | "white"
  size?: "sm" | "md" | "lg"
  showText?: boolean
  href?: string
  className?: string
}

export function Logo({ 
  variant = "default", 
  size = "md", 
  showText = true,
  href,
  className 
}: LogoProps) {
  const sizeClasses = {
    sm: {
      container: "w-8 h-8",
      icon: "w-4 h-4",
      text: "text-lg"
    },
    md: {
      container: "w-10 h-10",
      icon: "w-6 h-6",
      text: "text-xl"
    },
    lg: {
      container: "w-12 h-12",
      icon: "w-7 h-7",
      text: "text-2xl"
    }
  }

  const variantClasses = {
    default: {
      container: "bg-primary text-primary-foreground",
      text: "text-foreground"
    },
    white: {
      container: "bg-white/10 backdrop-blur-sm text-white",
      text: "text-white"
    }
  }

  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        "flex items-center justify-center rounded-lg",
        sizeClasses[size].container,
        variantClasses[variant].container
      )}>
        <Building2 className={sizeClasses[size].icon} />
      </div>
      {showText && (
        <span className={cn(
          "font-semibold tracking-tight",
          sizeClasses[size].text,
          variantClasses[variant].text
        )}>
          Business247
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    )
  }

  return content
}
