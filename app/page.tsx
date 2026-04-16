"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { Building2 } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.45_0.2_260)_0%,oklch(0.55_0.2_260)_50%,oklch(0.5_0.18_240)_100%)]" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Business247</span>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight text-balance max-w-md">
              Manage your business with clarity and precision
            </h1>
            <p className="text-lg text-white/80 max-w-md leading-relaxed">
              Streamline operations, track performance, and make data-driven decisions all in one place.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>&copy; 2026 Business247</span>
            <span>·</span>
            <a href="#" className="hover:text-white/80 transition-colors">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-white/80 transition-colors">Terms</a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-16 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">Business247</span>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
