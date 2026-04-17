"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
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
  ArrowDownToLine,
  Clock,
  CheckCircle2,
  Zap,
  Globe,
  Banknote,
  Settings,
  RefreshCcw,
} from "lucide-react";

// Payment gateways data
const paymentGateways = [
  {
    id: "1",
    name: "Paystack",
    logo: "P",
    isConnected: true,
    isActive: true,
    transactionsToday: 45,
    volumeToday: 1250000,
    fees: "1.5% + ₦100",
    settlementTime: "Next day",
  },
  {
    id: "2",
    name: "Flutterwave",
    logo: "F",
    isConnected: true,
    isActive: false,
    transactionsToday: 0,
    volumeToday: 0,
    fees: "1.4% + ₦100",
    settlementTime: "Next day",
  },
  {
    id: "3",
    name: "Interswitch",
    logo: "I",
    isConnected: false,
    isActive: false,
    transactionsToday: 0,
    volumeToday: 0,
    fees: "1.5%",
    settlementTime: "T+1",
  },
  {
    id: "4",
    name: "Monnify",
    logo: "M",
    isConnected: false,
    isActive: false,
    transactionsToday: 0,
    volumeToday: 0,
    fees: "1.5%",
    settlementTime: "Instant",
  },
]

// Settlement accounts data
const initialSettlementAccounts = [
  {
    id: "1",
    bankName: "GTBank",
    accountNumber: "0123456789",
    accountName: "Business 247 Limited",
    isDefault: true,
    isVerified: true,
    lastPayout: "2024-01-15",
    totalReceived: 15750000,
  },
  {
    id: "2",
    bankName: "First Bank",
    accountNumber: "9876543210",
    accountName: "Business 247 Limited",
    isDefault: false,
    isVerified: true,
    lastPayout: "2024-01-10",
    totalReceived: 8250000,
  },
  {
    id: "3",
    bankName: "Access Bank",
    accountNumber: "5678901234",
    accountName: "Business 247 Limited",
    isDefault: false,
    isVerified: false,
    lastPayout: null,
    totalReceived: 0,
  },
]

// Recent payouts data
const recentPayouts = [
  {
    id: "1",
    amount: 450000,
    account: "GTBank - ****6789",
    status: "completed",
    date: "2024-01-15",
    reference: "PAY-2024011501",
  },
  {
    id: "2",
    amount: 325000,
    account: "GTBank - ****6789",
    status: "completed",
    date: "2024-01-14",
    reference: "PAY-2024011401",
  },
  {
    id: "3",
    amount: 180000,
    account: "First Bank - ****3210",
    status: "processing",
    date: "2024-01-15",
    reference: "PAY-2024011502",
  },
  {
    id: "4",
    amount: 275000,
    account: "GTBank - ****6789",
    status: "completed",
    date: "2024-01-13",
    reference: "PAY-2024011301",
  },
  {
    id: "5",
    amount: 125000,
    account: "GTBank - ****6789",
    status: "failed",
    date: "2024-01-12",
    reference: "PAY-2024011201",
  },
]

export default function PaymentMethodsPage() {
  const [settlementAccounts, setSettlementAccounts] = useState(initialSettlementAccounts)
  const [gateways, setGateways] = useState(paymentGateways)
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [isPayoutSettingsOpen, setIsPayoutSettingsOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [payoutSchedule, setPayoutSchedule] = useState("daily")
  const [minimumPayout, setMinimumPayout] = useState("10000")

  const pendingBalance = 580000
  const availableBalance = 1250000
  const totalReceived = 24000000

  const handleSetDefault = (id: string) => {
    setSettlementAccounts((prev) =>
      prev.map((account) => ({
        ...account,
        isDefault: account.id === id,
      }))
    )
  }

  const handleToggleGateway = (id: string) => {
    setGateways((prev) =>
      prev.map((gateway) =>
        gateway.id === id ? { ...gateway, isActive: !gateway.isActive } : gateway
      )
    )
  }

  const handleDelete = (id: string) => {
    setSettlementAccounts((prev) => prev.filter((account) => account.id !== id))
    setDeleteId(null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
            <Clock className="mr-1 h-3 w-3" />
            Processing
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">
            <AlertCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payment Methods</h1>
          <p className="text-muted-foreground">
            Manage how you receive payments from customers
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={isPayoutSettingsOpen} onOpenChange={setIsPayoutSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Payout Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Payout Settings</DialogTitle>
                <DialogDescription>
                  Configure how and when you receive your payouts
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="schedule">Payout Schedule</Label>
                  <Select value={payoutSchedule} onValueChange={setPayoutSchedule}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Instant (fees apply)</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {payoutSchedule === "instant" && "Receive funds within minutes. Additional fees apply."}
                    {payoutSchedule === "daily" && "Funds are settled to your account every business day."}
                    {payoutSchedule === "weekly" && "Funds are settled every Friday."}
                    {payoutSchedule === "monthly" && "Funds are settled on the 1st of every month."}
                    {payoutSchedule === "manual" && "Request payouts manually when needed."}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="minimum">Minimum Payout Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                    <Input
                      id="minimum"
                      type="number"
                      value={minimumPayout}
                      onChange={(e) => setMinimumPayout(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Payouts will only be processed when balance exceeds this amount
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>Auto-retry failed payouts</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically retry failed payouts after 24 hours
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>Email notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive email alerts for successful payouts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPayoutSettingsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsPayoutSettingsOpen(false)}>
                  Save Settings
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button>
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Withdraw Funds
          </Button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(availableBalance)}</div>
            <p className="text-xs text-muted-foreground">Ready to withdraw</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Balance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{formatCurrency(pendingBalance)}</div>
            <p className="text-xs text-muted-foreground">Processing settlement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Received</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalReceived)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
            <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(availableBalance)}</div>
            <p className="text-xs text-muted-foreground">Tomorrow, 9:00 AM</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gateways" className="space-y-4">
        <TabsList>
          <TabsTrigger value="gateways">Payment Gateways</TabsTrigger>
          <TabsTrigger value="accounts">Settlement Accounts</TabsTrigger>
          <TabsTrigger value="payouts">Recent Payouts</TabsTrigger>
        </TabsList>

        {/* Payment Gateways Tab */}
        <TabsContent value="gateways" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Payment Gateways
              </CardTitle>
              <CardDescription>
                Connect payment gateways to accept payments from customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {gateways.map((gateway) => (
                  <div
                    key={gateway.id}
                    className={`rounded-lg border p-4 ${
                      gateway.isConnected ? "" : "opacity-70"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold ${
                            gateway.isConnected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {gateway.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{gateway.name}</p>
                            {gateway.isConnected && (
                              <Badge
                                variant="outline"
                                className="border-green-500 text-green-600"
                              >
                                <Check className="mr-1 h-3 w-3" />
                                Connected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Fees: {gateway.fees}
                          </p>
                        </div>
                      </div>
                      {gateway.isConnected && (
                        <Switch
                          checked={gateway.isActive}
                          onCheckedChange={() => handleToggleGateway(gateway.id)}
                        />
                      )}
                    </div>

                    {gateway.isConnected ? (
                      <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Today&apos;s Transactions</p>
                          <p className="text-lg font-semibold">{gateway.transactionsToday}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Today&apos;s Volume</p>
                          <p className="text-lg font-semibold">{formatCurrency(gateway.volumeToday)}</p>
                        </div>
                      </div>
                    ) : (
                      <Button className="mt-4 w-full" variant="outline">
                        <Zap className="mr-2 h-4 w-4" />
                        Connect {gateway.name}
                      </Button>
                    )}

                    {gateway.isConnected && (
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Settlement: {gateway.settlementTime}</span>
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                          <Settings className="mr-1 h-3 w-3" />
                          Configure
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accepted Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Accepted Payment Methods</CardTitle>
              <CardDescription>
                Payment methods your customers can use at checkout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <span className="text-sm font-bold text-blue-600">₦</span>
                    </div>
                    <div>
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-xs text-muted-foreground">Direct bank payments</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                      <span className="text-sm font-bold text-purple-600">C</span>
                    </div>
                    <div>
                      <p className="font-medium">Card Payments</p>
                      <p className="text-xs text-muted-foreground">Visa, Mastercard, Verve</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <span className="text-sm font-bold text-green-600">U</span>
                    </div>
                    <div>
                      <p className="font-medium">USSD</p>
                      <p className="text-xs text-muted-foreground">Mobile banking codes</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                      <span className="text-sm font-bold text-orange-600">Q</span>
                    </div>
                    <div>
                      <p className="font-medium">QR Code</p>
                      <p className="text-xs text-muted-foreground">Scan to pay</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settlement Accounts Tab */}
        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Settlement Accounts
                  </CardTitle>
                  <CardDescription>
                    Bank accounts where you receive your payouts
                  </CardDescription>
                </div>
                <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add Settlement Account</DialogTitle>
                      <DialogDescription>
                        Add a bank account to receive your payouts
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
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
                            <SelectItem value="fcmb">FCMB</SelectItem>
                            <SelectItem value="sterling">Sterling Bank</SelectItem>
                            <SelectItem value="wema">Wema Bank</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" placeholder="0123456789" maxLength={10} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="accountName">Account Name</Label>
                        <Input id="accountName" placeholder="Will be auto-verified" disabled />
                        <p className="text-xs text-muted-foreground">
                          Account name will be verified automatically
                        </p>
                      </div>
                      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-900 dark:bg-yellow-950">
                        <div className="flex gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                          <div className="text-sm">
                            <p className="font-medium text-yellow-800 dark:text-yellow-200">
                              Verification Required
                            </p>
                            <p className="text-yellow-700 dark:text-yellow-300">
                              New accounts require verification before payouts can be processed.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddAccountOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddAccountOpen(false)}>
                        Add Account
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {settlementAccounts.map((account) => (
                  <div
                    key={account.id}
                    className={`rounded-lg border p-4 ${
                      account.isDefault ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold">{account.bankName}</p>
                            {account.isDefault && (
                              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                                <Star className="mr-1 h-3 w-3" />
                                Primary
                              </Badge>
                            )}
                            {account.isVerified ? (
                              <Badge
                                variant="outline"
                                className="border-green-500 text-green-600"
                              >
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="border-yellow-500 text-yellow-600"
                              >
                                <Clock className="mr-1 h-3 w-3" />
                                Pending Verification
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {account.accountName}
                          </p>
                          <p className="font-mono text-sm">{account.accountNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total Received</p>
                          <p className="font-semibold">{formatCurrency(account.totalReceived)}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {!account.isDefault && (
                              <DropdownMenuItem onClick={() => handleSetDefault(account.id)}>
                                <Star className="mr-2 h-4 w-4" />
                                Set as Primary
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            {!account.isVerified && (
                              <DropdownMenuItem>
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Retry Verification
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => setDeleteId(account.id)}
                              disabled={account.isDefault}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {account.lastPayout && (
                      <div className="mt-3 text-xs text-muted-foreground">
                        Last payout: {new Date(account.lastPayout).toLocaleDateString("en-NG", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Payouts Tab */}
        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowDownToLine className="h-5 w-5" />
                    Recent Payouts
                  </CardTitle>
                  <CardDescription>
                    History of funds transferred to your settlement accounts
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All Payouts
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Reference</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Account</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPayouts.map((payout) => (
                        <tr key={payout.id} className="border-b last:border-0">
                          <td className="px-4 py-3 font-mono text-sm">{payout.reference}</td>
                          <td className="px-4 py-3 font-semibold">{formatCurrency(payout.amount)}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{payout.account}</td>
                          <td className="px-4 py-3 text-sm">
                            {new Date(payout.date).toLocaleDateString("en-NG", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-3">{getStatusBadge(payout.status)}</td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 md:hidden">
                {recentPayouts.map((payout) => (
                  <div key={payout.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono text-sm text-muted-foreground">{payout.reference}</p>
                        <p className="text-lg font-semibold">{formatCurrency(payout.amount)}</p>
                      </div>
                      {getStatusBadge(payout.status)}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{payout.account}</span>
                      <span>
                        {new Date(payout.date).toLocaleDateString("en-NG", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payout Schedule Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Payout Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Current Schedule</p>
                  <p className="text-lg font-semibold capitalize">{payoutSchedule}</p>
                  <p className="text-xs text-muted-foreground">
                    Minimum payout: {formatCurrency(parseInt(minimumPayout))}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Auto-retry enabled</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Email notifications on</span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setIsPayoutSettingsOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Security Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-4 pt-6">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h3 className="font-semibold">Secure Payment Processing</h3>
            <p className="text-sm text-muted-foreground">
              All transactions are encrypted and processed through PCI-DSS compliant payment
              gateways. Your funds are protected with bank-level security measures.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Settlement Account?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the bank account from your settlement options. Any pending
              payouts to this account will be redirected to your primary account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
