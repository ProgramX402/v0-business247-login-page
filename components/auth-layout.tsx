import { Logo } from "@/components/logo"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.45_0.2_260)_0%,oklch(0.55_0.2_260)_50%,oklch(0.5_0.18_240)_100%)]" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <Logo variant="white" href="/" />
          
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight text-balance max-w-md">
              {title}
            </h1>
            <p className="text-lg text-white/80 max-w-md leading-relaxed">
              {description}
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

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Logo variant="default" href="/" />
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
