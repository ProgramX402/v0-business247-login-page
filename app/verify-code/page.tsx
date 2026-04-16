"use client"

import Link from "next/link"
import { VerifyCodeForm } from "@/components/verify-code-form"
import { Suspense } from "react"

function VerifyCodeContent() {
  return <VerifyCodeForm />
}

export default function VerifyCodePage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-foreground/20 backdrop-blur-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                  <path d="M12 3v6" />
                </svg>
              </div>
              <span className="text-xl font-semibold">Business247</span>
            </Link>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Almost there!
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-md">
              Enter the verification code we sent to your email to continue resetting your password.
            </p>
          </div>

          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Business247. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Verify Code Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 bg-background">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-primary-foreground"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                  <path d="M12 3v6" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-foreground">Business247</span>
            </Link>
          </div>

          <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
            <VerifyCodeContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
