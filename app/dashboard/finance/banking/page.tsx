"use client";
import { useState } from "react";
import {
  Landmark,
  Plus,
  Eye,
  EyeOff,
  MoreVertical,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  Wallet,
  TrendingUp,
  RefreshCw,
  Trash2,
  Pencil,
  CheckCircle2,
  Clock,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

type AccountType = "current" | "savings" | "investment"
type AccountStatus = "verified" | "pending" | "unverified"

interface BankAccount {
  id: string
  bankName: string
  bankLogo: string
  accountName: string
  accountNumber: string
  accountType: AccountType
  balance: number
  currency: string
  status: AccountStatus
  isPrimary: boolean
  lastSynced: string
  color: string
}

const bankAccounts: BankAccount[] = [
  {
    id: "1",
    bankName: "First Bank of Nigeria",
    bankLogo: "FB",
    accountName: "Business247 Enterprises",
    accountNumber: "3058492716",
    accountType: "current",
    balance: 2847500.0,
    currency: "NGN",
    status: "verified",
    isPrimary: true,
    lastSynced: "2 mins ago",
    color: "bg-blue-600",
  },
  {
    id: "2",
    bankName: "GTBank",
    bankLogo: "GT",
    accountName: "Business247 Enterprises",
    accountNumber: "0285746193",
    accountType: "current",
    balance: 1523840.5,
    currency: "NGN",
    status: "verified",
    isPrimary: false,
    lastSynced: "5 mins ago",
    color: "bg-orange-500",
  },
  {
    id: "3",
    bankName: "Access Bank",
    bankLogo: "AC",
    accountName: "Business247 Savings",
    accountNumber: "1472583690",
    accountType: "savings",
    balance: 5000000.0,
    currency: "NGN",
    status: "verified",
    isPrimary: false,
    lastSynced: "10 mins ago",
    color: "bg-green-600",
  },
  {
    id: "4",
    bankName: "Stanbic IBTC",
    bankLogo: "SI",
    accountName: "Business247 Investment",
    accountNumber: "0019283746",
    accountType: "investment",
    balance: 15750000.0,
    currency: "NGN",
    status: "verified",
    isPrimary: false,
    lastSynced: "1 hour ago",
    color: "bg-purple-600",
  },
  {
    id: "5",
    bankName: "Zenith Bank",
    bankLogo: "ZB",
    accountName: "Business247 Enterprises",
    accountNumber: "2093847561",
    accountType: "current",
    balance: 892350.75,
    currency: "NGN",
    status: "pending",
    isPrimary: false,
    lastSynced: "Pending verification",
    color: "bg-red-600",
  },
]

const recentTransactions = [
  {
    id: "1",
    type: "credit",
    description: "Payment from Customer - Order #1234",
    amount: 125000,
    date: "Today, 2:30 PM",
    accountId: "1",
  },
  {
    id: "2",
    type: "debit",
    description: "Supplier Payment - Inventory",
    amount: 450000,
    date: "Today, 11:15 AM",
    accountId: "1",
  },
  {
    id: "3",
    type: "credit",
    description: "Interest Earned",
    amount: 12500,
    date: "Yesterday, 6:00 PM",
    accountId: "3",
  },
  {
    id: "4",
    type: "transfer",
    description: "Transfer to Savings",
    amount: 500000,
    date: "Yesterday, 3:45 PM",
    accountId: "1",
  },
  {
    id: "5",
    type: "credit",
    description: "Investment Returns",
    amount: 250000,
    date: "Apr 14, 2026",
    accountId: "4",
  },
]

const nigerianBanks = [
  "Access Bank",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank (FCMB)",
  "Globus Bank",
  "Guaranty Trust Bank (GTBank)",
  "Heritage Bank",
  "Keystone Bank",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "SunTrust Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
]

export default function BankingPage() {
  const [accounts, setAccounts] = useState(bankAccounts)
  const [showBalances, setShowBalances] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [deleteAccountId, setDeleteAccountId] = useState<string | null>(null)
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [newAccount, setNewAccount] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    accountType: "current" as AccountType,
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const maskAccountNumber = (number: string) => {
    return "****" + number.slice(-4)
  }

  const getTotalBalance = () => {
    return accounts
      .filter((acc) => acc.status === "verified")
      .reduce((sum, acc) => sum + acc.balance, 0)
  }

  const getBalanceByType = (type: AccountType) => {
    return accounts
      .filter((acc) => acc.accountType === type && acc.status === "verified")
      .reduce((sum, acc) => sum + acc.balance, 0)
  }

  const getAccountsByType = (type: AccountType | "all") => {
    if (type === "all") return accounts
    return accounts.filter((acc) => acc.accountType === type)
  }

  const getAccountTypeLabel = (type: AccountType) => {
    const labels: Record<AccountType, string> = {
      current: "Current",
      savings: "Savings",
      investment: "Investment",
    }
    return labels[type]
  }

  const getAccountTypeIcon = (type: AccountType) => {
    switch (type) {
      case "current":
        return <Building2 className="h-4 w-4" />
      case "savings":
        return <Wallet className="h-4 w-4" />
      case "investment":
        return <TrendingUp className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: AccountStatus) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "unverified":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
            Unverified
          </Badge>
        )
    }
  }

  const handleCopyAccount = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber)
    setCopiedAccount(accountNumber)
    setTimeout(() => setCopiedAccount(null), 2000)
  }

  const handleAddAccount = () => {
    const newAcc: BankAccount = {
      id: Date.now().toString(),
      bankName: newAccount.bankName,
      bankLogo: newAccount.bankName.substring(0, 2).toUpperCase(),
      accountName: newAccount.accountName,
      accountNumber: newAccount.accountNumber,
      accountType: newAccount.accountType,
      balance: 0,
      currency: "NGN",
      status: "pending",
      isPrimary: false,
      lastSynced: "Pending verification",
      color: "bg-gray-600",
    }
    setAccounts([...accounts, newAcc])
    setIsAddDialogOpen(false)
    setNewAccount({
      bankName: "",
      accountNumber: "",
      accountName: "",
      accountType: "current",
    })
  }

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((acc) => acc.id !== id))
    setDeleteAccountId(null)
  }

  const handleSetPrimary = (id: string) => {
    setAccounts(
      accounts.map((acc) => ({
        ...acc,
        isPrimary: acc.id === id,
      }))
    )
  }

  const filteredAccounts = getAccountsByType(activeTab as AccountType | "all")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Banking</h1>
          <p className="text-muted-foreground">
            Manage your connected bank accounts and track balances
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
          >
            {showBalances ? (
              <EyeOff className="h-4 w-4 mr-2" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            {showBalances ? "Hide Balances" : "Show Balances"}
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect Bank Account</DialogTitle>
                <DialogDescription>
                  Add a new bank account to track your finances
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="bank">Bank</Label>
                  <Select
                    value={newAccount.bankName}
                    onValueChange={(value) =>
                      setNewAccount({ ...newAccount, bankName: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {nigerianBanks.map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select
                    value={newAccount.accountType}
                    onValueChange={(value) =>
                      setNewAccount({
                        ...newAccount,
                        accountType: value as AccountType,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          Current Account
                        </div>
                      </SelectItem>
                      <SelectItem value="savings">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          Savings Account
                        </div>
                      </SelectItem>
                      <SelectItem value="investment">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Investment Account
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter 10-digit account number"
                    maxLength={10}
                    value={newAccount.accountNumber}
                    onChange={(e) =>
                      setNewAccount({
                        ...newAccount,
                        accountNumber: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    placeholder="Enter account name"
                    value={newAccount.accountName}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, accountName: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAccount}
                  disabled={
                    !newAccount.bankName ||
                    !newAccount.accountNumber ||
                    !newAccount.accountName ||
                    newAccount.accountNumber.length !== 10
                  }
                >
                  Connect Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Balance Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {showBalances ? formatCurrency(getTotalBalance()) : "****"}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {accounts.filter((a) => a.status === "verified").length} verified accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Accounts</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {showBalances ? formatCurrency(getBalanceByType("current")) : "****"}
            </div>
            <p className="text-xs text-muted-foreground">
              {accounts.filter((a) => a.accountType === "current").length} accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Accounts</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {showBalances ? formatCurrency(getBalanceByType("savings")) : "****"}
            </div>
            <p className="text-xs text-muted-foreground">
              {accounts.filter((a) => a.accountType === "savings").length} accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investment Accounts</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {showBalances ? formatCurrency(getBalanceByType("investment")) : "****"}
            </div>
            <p className="text-xs text-muted-foreground">
              {accounts.filter((a) => a.accountType === "investment").length} accounts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts List */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>
                    Manage your linked bank accounts
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 w-full overflow-x-auto flex flex-nowrap">
                  <TabsTrigger value="all" className="flex-shrink-0">All</TabsTrigger>
                  <TabsTrigger value="current" className="flex-shrink-0">Current</TabsTrigger>
                  <TabsTrigger value="savings" className="flex-shrink-0">Savings</TabsTrigger>
                  <TabsTrigger value="investment" className="flex-shrink-0">Investment</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  <div className="space-y-4">
                    {filteredAccounts.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No {activeTab !== "all" ? activeTab : ""} accounts found
                      </div>
                    ) : (
                      filteredAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="flex flex-col gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors sm:flex-row sm:items-center sm:gap-4"
                        >
                          {/* Top row on mobile: logo + name + dropdown */}
                          <div className="flex items-center gap-3 sm:contents">
                            <div
                              className={`h-12 w-12 rounded-lg ${account.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                            >
                              {account.bankLogo}
                            </div>
                            <div className="flex-1 min-w-0 sm:flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold truncate">
                                  {account.bankName}
                                </h3>
                                {account.isPrimary && (
                                  <Badge variant="secondary" className="text-xs">
                                    Primary
                                  </Badge>
                                )}
                                {getStatusBadge(account.status)}
                              </div>
                              <div className="flex items-center gap-1 mt-1 flex-wrap">
                                <p className="text-sm text-muted-foreground truncate max-w-[160px] sm:max-w-none">
                                  {account.accountName}
                                </p>
                                <span className="text-muted-foreground">•</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm text-muted-foreground font-mono">
                                    {showBalances
                                      ? account.accountNumber
                                      : maskAccountNumber(account.accountNumber)}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() =>
                                      handleCopyAccount(account.accountNumber)
                                    }
                                  >
                                    {copiedAccount === account.accountNumber ? (
                                      <Check className="h-3 w-3 text-green-500" />
                                    ) : (
                                      <Copy className="h-3 w-3" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                {getAccountTypeIcon(account.accountType)}
                                <span className="text-xs text-muted-foreground">
                                  {getAccountTypeLabel(account.accountType)}
                                </span>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">
                                  Synced: {account.lastSynced}
                                </span>
                              </div>
                            </div>
                            {/* Dropdown visible on mobile inline */}
                            <div className="sm:hidden flex-shrink-0">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Sync Account
                                  </DropdownMenuItem>
                                  {!account.isPrimary && (
                                    <DropdownMenuItem
                                      onClick={() => handleSetPrimary(account.id)}
                                    >
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Set as Primary
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => setDeleteAccountId(account.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Remove
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          {/* Balance row on mobile */}
                          <div className="flex items-center justify-between sm:contents">
                            <div className="text-left sm:text-right flex-shrink-0">
                              <p className="font-bold text-base">
                                {showBalances
                                  ? formatCurrency(account.balance)
                                  : "****"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {account.currency}
                              </p>
                            </div>
                            {/* Dropdown hidden on mobile (shown above), visible on sm+ */}
                            <div className="hidden sm:block flex-shrink-0">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Sync Account
                                  </DropdownMenuItem>
                                  {!account.isPrimary && (
                                    <DropdownMenuItem
                                      onClick={() => handleSetPrimary(account.id)}
                                    >
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Set as Primary
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => setDeleteAccountId(account.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Remove
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest activity across accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => {
                  const account = accounts.find(
                    (a) => a.id === transaction.accountId
                  )
                  return (
                    <div
                      key={transaction.id}
                      className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          transaction.type === "credit" ?"bg-green-500/10 text-green-600"
                            : transaction.type === "debit" ?"bg-red-500/10 text-red-600" :"bg-blue-500/10 text-blue-600"
                        }`}
                      >
                        {transaction.type === "credit" ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {account?.bankName} • {transaction.date}
                        </p>
                      </div>
                      <p
                        className={`text-sm font-semibold ${
                          transaction.type === "credit" ?"text-green-600"
                            : transaction.type === "debit" ?"text-red-600" :"text-blue-600"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {showBalances
                          ? formatCurrency(transaction.amount)
                          : "****"}
                      </p>
                    </div>
                  )
                })}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteAccountId}
        onOpenChange={() => setDeleteAccountId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Bank Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this bank account? This action
              cannot be undone and you will need to reconnect the account to
              track its balance again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteAccountId && handleDeleteAccount(deleteAccountId)}
            >
              Remove Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
