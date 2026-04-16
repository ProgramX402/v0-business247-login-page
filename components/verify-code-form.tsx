"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, Loader2, RefreshCw } from "lucide-react"

export function VerifyCodeForm() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [resendCountdown, setResendCountdown] = useState(0)
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    // Countdown timer for resend
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return
    
    setError("")
    const newCode = [...code]
    
    // Handle paste
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("")
      pastedCode.forEach((digit, i) => {
        if (index + i < 6) {
          newCode[index + i] = digit
        }
      })
      setCode(newCode)
      const nextIndex = Math.min(index + pastedCode.length, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }
    
    newCode[index] = value
    setCode(newCode)
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsResending(false)
    setResendCountdown(60)
    setCode(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const fullCode = code.join("")
    if (fullCode.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }
    
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // For demo, accept any code - in production, validate against backend
    // Redirect to reset password page
    window.location.href = `/reset-password?email=${encodeURIComponent(email)}&code=${fullCode}`
  }

  const isComplete = code.every(digit => digit !== "")

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Link 
          href="/forgot-password"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Enter verification code
        </h2>
        <p className="text-muted-foreground">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">{email || "your email"}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-center gap-2 sm:gap-3">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => { inputRefs.current[index] = el }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-semibold bg-card border-border focus:border-primary focus:ring-primary/20 transition-all ${
                  error ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""
                }`}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all"
          disabled={isLoading || !isComplete}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Verify code
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Didn&apos;t receive the code?
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResend}
          disabled={isResending || resendCountdown > 0}
          className="border-border hover:bg-accent transition-all"
        >
          {isResending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          {resendCountdown > 0 
            ? `Resend in ${resendCountdown}s` 
            : "Resend code"
          }
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link 
          href="/" 
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Back to sign in
        </Link>
      </p>
    </div>
  )
}
