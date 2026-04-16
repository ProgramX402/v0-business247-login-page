"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  CreditCard,
  Building2,
  Wallet,
  Plus,
  MoreVertical,
  Check,
  Shield,
  Star,
  Trash2,
  Edit,
  AlertCircle,
} from "lucide-react"

// Sample payment methods data
const initialPaymentMethods = [
  {
    id: "1",
    type: "card",
    name: "Visa ending in 4242",
    details: "**** **** **** 4242",
    expiry: "12/26",
    isDefault: true,
    isActive: true,
    brand: "visa",
    lastUsed: "2024-01-15",
  },
  {
    id: "2",
    type: "card",
    name: "Mastercard ending in 8888",
    details: "**** **** **** 8888",
    expiry: "09/25",
    isDefault: false,
    isActive: true,
    brand: "mastercard",
    lastUsed: "2024-01-10",
  },
  {
    id: "3",
    type: "bank",
    name: "GTBank",
    details: "****5678",
    accountName: "Business 247 Ltd",
    isDefault: false,
    isActive: true,
    lastUsed: "2024-01-12",
  },
  {
    id: "4",
    type: "bank",
    name: "First Bank",
    details: "****9012",
    accountName: "Business 247 Ltd",
    isDefault: false,
    isActive: false,
    lastUsed: "2023-12-20",
  },
  {
    id: "5",
    type: "wallet",
    name: "Paystack Wallet",
    details: "wallet@business247.com",
    balance: 250000,
    isDefault: false,
    isActive: true,
    lastUsed: "2024-01-14",
  },
]

const cardBrandColors: Record<string, string> = {
  visa: "bg-blue-600",
  mastercard: "bg-orange-500",
}

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [methodType, setMethodType] = useState<string>("card")

  const cards = paymentMethods.filter((m) => m.type === "card")
  const banks = paymentMethods.filter((m) => m.type === "bank")
  const wallets = paymentMethods.filter((m) => m.type === "wallet")

  const handleSetDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    )
  }

  const handleToggleActive = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) =>
        method.id === id ? { ...method, isActive: !method.isActive } : method
      )
    )
  }

  const handleDelete = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id))
    setDeleteId(null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-5 w-5" />
      case "bank":
        return <Building2 className="h-5 w-5" />
      case "wallet":
        return <Wallet className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payment Methods</h1>
          <p className="text-muted-foreground">
            Manage your payment methods and billing preferences
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>
                Add a new payment method to your account
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Payment Type</Label>
                <Select value={methodType} onValueChange={setMethodType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="bank">Bank Account</SelectItem>
                    <SelectItem value="wallet">Digital Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {methodType === "card" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" type="password" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </>
              )}

              {methodType === "bank" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gtbank">GTBank</SelectItem>
                        <SelectItem value="firstbank">First Bank</SelectItem>
                        <SelectItem value="accessbank">Access Bank</SelectItem>
                        <SelectItem value="zenithbank">Zenith Bank</SelectItem>
                        <SelectItem value="ubabank">UBA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input id="accountNumber" placeholder="0123456789" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input id="accountName" placeholder="Business Name Ltd" />
                  </div>
                </>
              )}

              {methodType === "wallet" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="walletProvider">Wallet Provider</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paystack">Paystack</SelectItem>
                        <SelectItem value="flutterwave">Flutterwave</SelectItem>
                        <SelectItem value="opay">OPay</SelectItem>
                        <SelectItem value="palmpay">PalmPay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="walletEmail">Email/Phone</Label>
                    <Input id="walletEmail" placeholder="email@example.com" />
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Payment Method
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Methods</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentMethods.length}</div>
            <p className="text-xs text-muted-foreground">
              {paymentMethods.filter((m) => m.isActive).length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cards</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cards.length}</div>
            <p className="text-xs text-muted-foreground">
              Credit and debit cards
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bank Accounts</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banks.length}</div>
            <p className="text-xs text-muted-foreground">
              Linked bank accounts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cards Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Credit & Debit Cards
          </CardTitle>
          <CardDescription>
            Manage your saved cards for payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {cards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CreditCard className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No cards added yet</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`relative rounded-xl p-5 text-white ${
                    card.brand ? cardBrandColors[card.brand] : "bg-gray-800"
                  } ${!card.isActive ? "opacity-60" : ""}`}
                >
                  {card.isDefault && (
                    <Badge className="absolute right-3 top-3 bg-white/20 text-white hover:bg-white/30">
                      <Star className="mr-1 h-3 w-3" />
                      Default
                    </Badge>
                  )}
                  <div className="flex items-center justify-between">
                    <CreditCard className="h-8 w-8" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white hover:bg-white/20"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSetDefault(card.id)}>
                          <Star className="mr-2 h-4 w-4" />
                          Set as Default
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteId(card.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-6 font-mono text-lg tracking-wider">
                    {card.details}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="opacity-80">Expires {card.expiry}</span>
                    <span className="font-medium uppercase">{card.brand}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bank Accounts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Bank Accounts
          </CardTitle>
          <CardDescription>
            Linked bank accounts for withdrawals and transfers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {banks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Building2 className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No bank accounts linked</p>
            </div>
          ) : (
            <div className="space-y-4">
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  className={`flex items-center justify-between rounded-lg border p-4 ${
                    !bank.isActive ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{bank.name}</p>
                        {bank.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            Default
                          </Badge>
                        )}
                        {!bank.isActive && (
                          <Badge variant="outline" className="text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {bank.accountName} - {bank.details}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={bank.isActive}
                      onCheckedChange={() => handleToggleActive(bank.id)}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSetDefault(bank.id)}>
                          <Star className="mr-2 h-4 w-4" />
                          Set as Default
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteId(bank.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Digital Wallets Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Digital Wallets
          </CardTitle>
          <CardDescription>
            Connected digital wallet accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {wallets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Wallet className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No wallets connected</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`flex items-center justify-between rounded-lg border p-4 ${
                    !wallet.isActive ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                      <Wallet className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{wallet.name}</p>
                        {wallet.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{wallet.details}</p>
                      {wallet.balance !== undefined && (
                        <p className="text-sm font-medium text-green-600">
                          Balance: {formatCurrency(wallet.balance)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={wallet.isActive}
                      onCheckedChange={() => handleToggleActive(wallet.id)}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSetDefault(wallet.id)}>
                          <Star className="mr-2 h-4 w-4" />
                          Set as Default
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteId(wallet.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20">
        <CardContent className="flex items-start gap-4 pt-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">
              Your payment information is secure
            </h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              All payment methods are encrypted and stored securely. We use industry-standard
              security measures to protect your financial information. Card details are never
              stored on our servers.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Delete Payment Method
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this payment method? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
