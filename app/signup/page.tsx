"use client"

import { SignupForm } from "@/components/signup-form"
import { AuthLayout } from "@/components/auth-layout"

export default function SignupPage() {
  return (
    <AuthLayout
      title="Start managing your business today"
      description="Join thousands of businesses already using Business247 to streamline their operations."
    >
      <SignupForm />
    </AuthLayout>
  )
}
