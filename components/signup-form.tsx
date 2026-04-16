"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check,
  Upload,
  X,
} from "lucide-react"

type Step = 1 | 2 | 3

interface FormData {
  // Step 1
  firstName: string
  lastName: string
  email: string
  password: string
  // Step 2
  businessName: string
  phoneNumber: string
  country: string
  state: string
  city: string
  street: string
  // Step 3
  brandColor: string
  logo: File | null
}

const BRAND_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Green", value: "#22C55E" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Cyan", value: "#06B6D4" },
]

export function SignupForm() {
  const [step, setStep] = useState<Step>(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [states, setStates] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    businessName: "",
    phoneNumber: "",
    country: "Nigeria",
    state: "",
    city: "",
    street: "",
    brandColor: "#3B82F6",
    logo: null,
  })

  // Fetch Nigerian states on mount
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true)
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: "Nigeria" }),
          }
        )
        const data = await response.json()
        if (data.data?.states) {
          setStates(data.data.states.map((s: { name: string }) => s.name))
        }
      } catch (error) {
        console.error("Failed to fetch states:", error)
        // Fallback states
        setStates([
          "Lagos",
          "Abuja Federal Capital Territory",
          "Kano",
          "Rivers",
          "Oyo",
          "Kaduna",
          "Ogun",
          "Enugu",
          "Delta",
          "Anambra",
        ])
      }
      setLoadingStates(false)
    }
    fetchStates()
  }, [])

  // Fetch cities when state changes
  useEffect(() => {
    if (!formData.state) {
      setCities([])
      return
    }

    const fetchCities = async () => {
      setLoadingCities(true)
      setFormData((prev) => ({ ...prev, city: "" }))
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: "Nigeria", state: formData.state }),
          }
        )
        const data = await response.json()
        if (data.data && data.data.length > 0) {
          setCities(data.data)
        } else {
          setCities([formData.state])
        }
      } catch (error) {
        console.error("Failed to fetch cities:", error)
        setCities([formData.state])
      }
      setLoadingCities(false)
    }
    fetchCities()
  }, [formData.state])

  const updateFormData = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateFormData("logo", file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    updateFormData("logo", null)
    setLogoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const isStep1Valid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.length >= 8
    )
  }

  const isStep2Valid = () => {
    return (
      formData.businessName.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      formData.state !== "" &&
      formData.city !== "" &&
      formData.street.trim() !== ""
    )
  }

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as Step)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    // Handle successful signup
    console.log("Form submitted:", formData)
  }

  const handleSkipAndFinish = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    console.log("Form submitted (skipped step 3):", formData)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Create your account
        </h2>
        <p className="text-muted-foreground">
          {step === 1 && "Start with your personal details"}
          {step === 2 && "Tell us about your business"}
          {step === 3 && "Customize your brand (optional)"}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
                s < step
                  ? "bg-primary text-primary-foreground"
                  : s === step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                  s < step ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                  First name
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  required
                  className="h-11 bg-card border-border focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  required
                  className="h-11 bg-card border-border focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                required
                className="h-11 bg-card border-border focus:border-primary focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  required
                  minLength={8}
                  className="h-11 pr-11 bg-card border-border focus:border-primary focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Business Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-sm font-medium text-foreground">
                Business name
              </Label>
              <Input
                id="businessName"
                placeholder="Your Company Ltd"
                value={formData.businessName}
                onChange={(e) => updateFormData("businessName", e.target.value)}
                required
                className="h-11 bg-card border-border focus:border-primary focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-foreground">
                Phone number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+234 800 000 0000"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                required
                className="h-11 bg-card border-border focus:border-primary focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Country</Label>
              <Input
                value="Nigeria"
                disabled
                className="h-11 bg-muted border-border cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium text-foreground">
                  State
                </Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => updateFormData("state", value)}
                >
                  <SelectTrigger className="h-11 bg-card border-border focus:border-primary focus:ring-primary/20">
                    {loadingStates ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <SelectValue placeholder="Select state" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-foreground">
                  City
                </Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => updateFormData("city", value)}
                  disabled={!formData.state || loadingCities}
                >
                  <SelectTrigger className="h-11 bg-card border-border focus:border-primary focus:ring-primary/20">
                    {loadingCities ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <SelectValue placeholder="Select city" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="street" className="text-sm font-medium text-foreground">
                Street address
              </Label>
              <Input
                id="street"
                placeholder="123 Main Street"
                value={formData.street}
                onChange={(e) => updateFormData("street", e.target.value)}
                required
                className="h-11 bg-card border-border focus:border-primary focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        )}

        {/* Step 3: Brand Customization (Optional) */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Brand color</Label>
              <div className="grid grid-cols-5 gap-3">
                {BRAND_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => updateFormData("brandColor", color.value)}
                    className={`w-full aspect-square rounded-lg transition-all ${
                      formData.brandColor === color.value
                        ? "ring-2 ring-offset-2 ring-primary"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {formData.brandColor === color.value && (
                      <Check className="w-5 h-5 mx-auto text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Business logo</Label>
              {logoPreview ? (
                <div className="relative inline-block">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-24 h-24 object-contain rounded-lg border border-border bg-card"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Upload className="w-8 h-8" />
                  <span className="text-sm font-medium">Click to upload logo</span>
                  <span className="text-xs">PNG, JPG up to 5MB</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-2">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="h-11 px-6 border-border hover:bg-accent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}

          {step < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={step === 1 ? !isStep1Valid() : !isStep2Valid()}
              className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <div className="flex-1 flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleSkipAndFinish}
                disabled={isLoading}
                className="flex-1 h-11 border-border hover:bg-accent"
              >
                Skip
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Create account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/"
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
