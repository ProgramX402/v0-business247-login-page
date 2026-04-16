"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Loader2, Mail, CheckCircle2 } from "lucide-react"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Check your email
          </h2>
          <p className="text-muted-foreground">
            We&apos;ve sent a 6-digit reset code to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <div className="space-y-4">
          <Link href={`/verify-code?email=${encodeURIComponent(email)}`}>
            <Button
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all"
            >
              Enter reset code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <p className="text-sm text-center text-muted-foreground">
            Didn&apos;t receive the code? Check your spam folder or{" "}
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false)
                setEmail("")
              }}
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              try a different email
            </button>
          </p>
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

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Link>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Forgot your password?
        </h2>
        <p className="text-muted-foreground">
          Enter your email address and we&apos;ll send you a code to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 bg-card border-border focus:border-primary focus:ring-primary/20 transition-all"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Send reset code
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link 
          href="/signup" 
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Create account
        </Link>
      </p>
    </div>
  )
}
