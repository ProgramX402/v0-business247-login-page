"use client";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/reset-password-form";
import { AuthLayout } from "@/components/auth-layout";

function ResetPasswordContent() {
  return <ResetPasswordForm />
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Create your new password"
      description="Choose a strong password to keep your account secure and get back to managing your business."
    >
      <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
        <ResetPasswordContent />
      </Suspense>
    </AuthLayout>
  )
}
