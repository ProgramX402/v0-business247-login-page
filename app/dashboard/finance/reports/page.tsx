"use client"

import { useState } from "react"
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  FileSpreadsheet,
  FilePlus,
  Clock,
  CheckCircle,
  Loader2,
  Eye,
  MoreHorizontal,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Wallet,
  CreditCard,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

// Report types
const reportTypes = [
  {
    id: "profit-loss",
    name: "Profit & Loss Statement",
    description: "Income, expenses, and net profit over a period",
    icon: TrendingUp,
    category: "Financial",
  },
  {
    id: "balance-sheet",
    name: "Balance Sheet",
    description: "Assets, liabilities, and equity snapshot",
    icon: BarChart3,
    category: "Financial",
  },
  {
    id: "cash-flow",
    name: "Cash Flow Statement",
    description: "Cash inflows and outflows analysis",
    icon: DollarSign,
    category: "Financial",
  },
  {
    id: "sales-report",
    name: "Sales Report",
    description: "Revenue breakdown by product and channel",
    icon: Receipt,
    category: "Sales",
  },
  {
    id: "expense-report",
    name: "Expense Report",
    description: "Detailed expense categorization",
    icon: CreditCard,
    category: "Expense",
  },
  {
    id: "tax-summary",
    name: "Tax Summary",
    description: "Tax obligations and deductions",
    icon: FileSpreadsheet,
    category: "Tax",
  },
]

// Generated reports history
const generatedReports = [
  {
    id: 1,
    name: "Profit & Loss Statement",
    type: "profit-loss",
    period: "January 2024 - March 2024",
    generatedAt: "2024-03-15T10:30:00",
    status: "completed",
    format: "PDF",
    size: "245 KB",
  },
  {
    id: 2,
    name: "Sales Report",
    type: "sales-report",
    period: "March 2024",
    generatedAt: "2024-03-14T14:20:00",
    status: "completed",
    format: "Excel",
    size: "1.2 MB",
  },
  {
    id: 3,
    name: "Expense Report",
    type: "expense-report",
    period: "Q1 2024",
    generatedAt: "2024-03-13T09:15:00",
    status: "completed",
    format: "PDF",
    size: "189 KB",
  },
  {
    id: 4,
    name: "Cash Flow Statement",
    type: "cash-flow",
    period: "February 2024",
    generatedAt: "2024-03-12T16:45:00",
    status: "processing",
    format: "PDF",
    size: "-",
  },
  {
    id: 5,
    name: "Balance Sheet",
    type: "balance-sheet",
    period: "Q4 2023",
    generatedAt: "2024-01-05T11:00:00",
    status: "completed",
    format: "PDF",
    size: "312 KB",
  },
]

// Monthly revenue vs expenses data
const revenueExpenseData = [
  { month: "Jan", revenue: 4250000, expenses: 2850000 },
  { month: "Feb", revenue: 3980000, expenses: 2650000 },
  { month: "Mar", revenue: 5120000, expenses: 3100000 },
  { month: "Apr", revenue: 4750000, expenses: 2900000 },
  { month: "May", revenue: 5450000, expenses: 3250000 },
  { month: "Jun", revenue: 6100000, expenses: 3500000 },
]

// Profit trend data
const profitTrendData = [
  { month: "Jan", profit: 1400000 },
  { month: "Feb", profit: 1330000 },
  { month: "Mar", profit: 2020000 },
  { month: "Apr", profit: 1850000 },
  { month: "May", profit: 2200000 },
  { month: "Jun", profit: 2600000 },
]

// Expense breakdown
const expenseBreakdown = [
  { name: "Salaries", value: 45, amount: 4500000 },
  { name: "Inventory", value: 25, amount: 2500000 },
  { name: "Marketing", value: 15, amount: 1500000 },
  { name: "Operations", value: 10, amount: 1000000 },
  { name: "Other", value: 5, amount: 500000 },
]

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]

// Financial summary
const financialSummary = {
  totalRevenue: 29650000,
  revenueChange: 12.5,
  totalExpenses: 18250000,
  expenseChange: 8.3,
  netProfit: 11400000,
  profitChange: 18.2,
  profitMargin: 38.4,
  marginChange: 2.1,
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatCompactCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `₦${(amount / 1000).toFixed(0)}K`
  }
  return formatCurrency(amount)
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("q1-2024")
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false)
  const [selectedReportType, setSelectedReportType] = useState("")
  const [reportFormat, setReportFormat] = useState("pdf")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Processing
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getReportIcon = (type: string) => {
    const report = reportTypes.find((r) => r.id === type)
    if (report) {
      const Icon = report.icon
      return <Icon className="h-4 w-4" />
    }
    return <FileText className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financial Reports</h1>
          <p className="text-muted-foreground">
            Generate and download financial reports for your business
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="q4-2023">Q4 2023</SelectItem>
              <SelectItem value="2023">Full Year 2023</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={generateDialogOpen} onOpenChange={setGenerateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <FilePlus className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Generate New Report</DialogTitle>
                <DialogDescription>
                  Select a report type and configure options to generate
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((report) => (
                        <SelectItem key={report.id} value={report.id}>
                          <div className="flex items-center gap-2">
                            <report.icon className="h-4 w-4" />
                            {report.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" defaultValue="2024-01-01" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" defaultValue="2024-03-31" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setGenerateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setGenerateDialogOpen(false)}>
                  Generate Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCompactCurrency(financialSummary.totalRevenue)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-600 font-medium">+{financialSummary.revenueChange}%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold">{formatCompactCurrency(financialSummary.totalExpenses)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-red-600" />
              <span className="text-red-600 font-medium">+{financialSummary.expenseChange}%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p className="text-2xl font-bold">{formatCompactCurrency(financialSummary.netProfit)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-600 font-medium">+{financialSummary.profitChange}%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-2xl font-bold">{financialSummary.profitMargin}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <PieChart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-600 font-medium">+{financialSummary.marginChange}%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue vs Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison of income and spending</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
                expenses: { label: "Expenses", color: "hsl(var(--chart-2))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueExpenseData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis 
                    className="text-xs" 
                    tickFormatter={(value) => formatCompactCurrency(value)}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Profit Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Profit Trend</CardTitle>
            <CardDescription>Net profit over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                profit: { label: "Profit", color: "hsl(var(--chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis 
                    className="text-xs" 
                    tickFormatter={(value) => formatCompactCurrency(value)}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <defs>
                    <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="hsl(var(--chart-1))"
                    fill="url(#profitGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Expense Breakdown and Quick Reports */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {expenseBreakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    formatter={(value: number, name: string, props: { payload: { amount: number } }) => [
                      `${value}% (${formatCurrency(props.payload.amount)})`,
                      name
                    ]}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {expenseBreakdown.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Report Generation */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Report Generation</CardTitle>
            <CardDescription>Generate common financial reports instantly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  className="flex flex-col items-start gap-2 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors text-left"
                  onClick={() => {
                    setSelectedReportType(report.id)
                    setGenerateDialogOpen(true)
                  }}
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{report.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {report.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {report.category}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Reports History */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Your report generation history</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="tax">Tax</SelectItem>
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
                  <TableHead>Report Name</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generatedReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                          {getReportIcon(report.type)}
                        </div>
                        <span className="font-medium">{report.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{report.period}</TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(report.generatedAt).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.format}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{report.size}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem disabled={report.status !== "completed"}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Report
                          </DropdownMenuItem>
                          <DropdownMenuItem disabled={report.status !== "completed"}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Delete
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
            {generatedReports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-lg border border-border space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      {getReportIcon(report.type)}
                    </div>
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.period}</p>
                    </div>
                  </div>
                  {getStatusBadge(report.status)}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(report.generatedAt).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                    <Badge variant="outline">{report.format}</Badge>
                    <span className="text-muted-foreground">{report.size}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={report.status !== "completed"}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={report.status !== "completed"}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
