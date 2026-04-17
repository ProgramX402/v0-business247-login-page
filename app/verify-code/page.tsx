"use client";
import { Suspense } from "react";
import { VerifyCodeForm } from "@/components/verify-code-form";
import { AuthLayout } from "@/components/auth-layout";

function VerifyCodeContent() {
  return <VerifyCodeForm />
}

export default function VerifyCodePage() {
  return (
    <AuthLayout
      title="Almost there!"
      description="Enter the verification code we sent to your email to continue resetting your password."
    >
      <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
        <VerifyCodeContent />
      </Suspense>
    </AuthLayout>
  )
}
