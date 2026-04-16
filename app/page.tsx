"use client"

import { LoginForm } from "@/components/login-form"
import { AuthLayout } from "@/components/auth-layout"

export default function LoginPage() {
  return (
    <AuthLayout
      title="Manage your business with clarity and precision"
      description="Streamline operations, track performance, and make data-driven decisions all in one place."
    >
      <LoginForm />
    </AuthLayout>
  )
}
