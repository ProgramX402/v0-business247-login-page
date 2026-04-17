"use client";
import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { AuthLayout } from "@/components/auth-layout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password securely"
      description="We'll send you a secure code to reset your password and get you back to managing your business."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
