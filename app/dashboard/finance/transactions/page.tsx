"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  FileText,
  Receipt,
  Wallet,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";

// Transaction type
type TransactionType = "credit" | "debit"
type TransactionStatus = "completed" | "pending" | "failed"
type TransactionCategory = "sale" | "refund" | "expense" | "transfer" | "withdrawal"

interface Transaction {
  id: string
  reference: string
  description: string
  amount: number
  type: TransactionType
  status: TransactionStatus
  category: TransactionCategory
  customer?: string
  date: string
  time: string
}

// Sample transaction data
const transactions: Transaction[] = [
  {
    id: "TXN-001",
    reference: "REF-2024-001234",
    description: "Payment for Order #ORD-001",
    amount: 45000,
    type: "credit",
    status: "completed",
    category: "sale",
    customer: "Adebayo Johnson",
    date: "2024-01-15",
    time: "14:30",
  },
  {
    id: "TXN-002",
    reference: "REF-2024-001235",
    description: "Refund for Order #ORD-089",
    amount: 12500,
    type: "debit",
    status: "completed",
    category: "refund",
    customer: "Chioma Okafor",
    date: "2024-01-15",
    time: "13:15",
  },
  {
    id: "TXN-003",
    reference: "REF-2024-001236",
    description: "Payment for Order #ORD-002",
    amount: 78000,
    type: "credit",
    status: "pending",
    category: "sale",
    customer: "Emeka Nwosu",
    date: "2024-01-15",
    time: "11:00",
  },
  {
    id: "TXN-004",
    reference: "REF-2024-001237",
    description: "Office Supplies Purchase",
    amount: 15000,
    type: "debit",
    status: "completed",
    category: "expense",
    date: "2024-01-14",
    time: "16:45",
  },
  {
    id: "TXN-005",
    reference: "REF-2024-001238",
    description: "Payment for Order #ORD-003",
    amount: 23400,
    type: "credit",
    status: "completed",
    category: "sale",
    customer: "Fatima Ibrahim",
    date: "2024-01-14",
    time: "10:30",
  },
  {
    id: "TXN-006",
    reference: "REF-2024-001239",
    description: "Bank Transfer to Savings",
    amount: 500000,
    type: "debit",
    status: "completed",
    category: "transfer",
    date: "2024-01-14",
    time: "09:00",
  },
  {
    id: "TXN-007",
    reference: "REF-2024-001240",
    description: "Payment for Order #ORD-004",
    amount: 56700,
    type: "credit",
    status: "completed",
    category: "sale",
    customer: "Gabriel Eze",
    date: "2024-01-13",
    time: "15:20",
  },
  {
    id: "TXN-008",
    reference: "REF-2024-001241",
    description: "Withdrawal to Bank Account",
    amount: 200000,
    type: "debit",
    status: "failed",
    category: "withdrawal",
    date: "2024-01-13",
    time: "12:00",
  },
  {
    id: "TXN-009",
    reference: "REF-2024-001242",
    description: "Payment for Order #ORD-005",
    amount: 89500,
    type: "credit",
    status: "completed",
    category: "sale",
    customer: "Hauwa Mohammed",
    date: "2024-01-13",
    time: "10:15",
  },
  {
    id: "TXN-010",
    reference: "REF-2024-001243",
    description: "Marketing Campaign Payment",
    amount: 75000,
    type: "debit",
    status: "pending",
    category: "expense",
    date: "2024-01-12",
    time: "14:00",
  },
]

const stats = [
  {
    name: "Total Balance",
    value: "₦2,450,000",
    change: "+12.5%",
    trend: "up" as const,
    icon: Wallet,
    description: "Available balance",
  },
  {
    name: "Total Income",
    value: "₦3,245,600",
    change: "+8.2%",
    trend: "up" as const,
    icon: TrendingUp,
    description: "This month",
  },
  {
    name: "Total Expenses",
    value: "₦795,600",
    change: "-2.4%",
    trend: "down" as const,
    icon: TrendingDown,
    description: "This month",
  },
  {
    name: "Pending",
    value: "₦153,000",
    change: "3 transactions",
    trend: "neutral" as const,
    icon: Receipt,
    description: "Awaiting completion",
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount).replace("NGN", "₦")
}

const getStatusStyles = (status: TransactionStatus) => {
  switch (status) {
    case "completed":
      return "bg-green-500/10 text-green-600 border-green-500/20"
    case "pending":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
    case "failed":
      return "bg-red-500/10 text-red-600 border-red-500/20"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getCategoryStyles = (category: TransactionCategory) => {
  switch (category) {
    case "sale":
      return "bg-blue-500/10 text-blue-600"
    case "refund":
      return "bg-orange-500/10 text-orange-600"
    case "expense":
      return "bg-purple-500/10 text-purple-600"
    case "transfer":
      return "bg-cyan-500/10 text-cyan-600"
    case "withdrawal":
      return "bg-pink-500/10 text-pink-600"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customer?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track and manage all your financial transactions
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Calendar className="mr-2 h-4 w-4" />
            Jan 1 - Jan 31, 2024
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                {stat.trend !== "neutral" && (
                  <div
                    className={`flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                    {stat.change}
                  </div>
                )}
                {stat.trend === "neutral" && (
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="mt-3 sm:mt-4">
                <p className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                A list of all transactions including sales, refunds, expenses, and transfers
              </CardDescription>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="flex-1 sm:w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="flex-1 sm:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" className="h-8 px-2 -ml-2">
                      Transaction
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <Button variant="ghost" className="h-8 px-2 -ml-2">
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" className="h-8 px-2 -mr-2">
                      Amount
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-9 w-9 rounded-full flex items-center justify-center ${
                            transaction.type === "credit" ?"bg-green-500/10" :"bg-red-500/10"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowDownRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.reference}
                            {transaction.customer && ` · ${transaction.customer}`}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium capitalize ${getCategoryStyles(
                          transaction.category
                        )}`}
                      >
                        {transaction.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border capitalize ${getStatusStyles(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-foreground">{transaction.date}</p>
                        <p className="text-sm text-muted-foreground">{transaction.time}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-semibold ${
                          transaction.type === "credit" ?"text-green-600" :"text-red-600"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Download Receipt
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Receipt className="mr-2 h-4 w-4" />
                            Generate Invoice
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {paginatedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        transaction.type === "credit" ?"bg-green-500/10" :"bg-red-500/10"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowDownRight className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {transaction.reference}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Download Receipt
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${getCategoryStyles(
                        transaction.category
                      )}`}
                    >
                      {transaction.category}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border capitalize ${getStatusStyles(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                  <span
                    className={`font-semibold ${
                      transaction.type === "credit" ?"text-green-600" :"text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {transaction.date} at {transaction.time}
                  {transaction.customer && ` · ${transaction.customer}`}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{" "}
              {filteredTransactions.length} transactions
            </p>
            <div className="flex items-center gap-1 flex-wrap justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
