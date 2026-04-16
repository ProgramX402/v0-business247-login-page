import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "default" | "white"
  size?: "sm" | "md" | "lg"
  href?: string
  className?: string
}

export function Logo({ 
  variant = "default", 
  size = "md", 
  href,
  className 
}: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl"
  }

  const variantClasses = {
    default: "text-primary",
    white: "text-white"
  }

  const content = (
    <span className={cn(
      "font-logo font-bold tracking-tight",
      sizeClasses[size],
      variantClasses[variant],
      className
    )}>
      Business247
    </span>
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
