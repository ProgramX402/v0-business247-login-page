"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { CreditCard, Plus, Download, Search, AlertTriangle, CheckCircle2, MoreHorizontal, Edit, Trash2, Building2, Landmark, Briefcase, Calendar, ArrowUpRight,  } from "lucide-react";

interface Debt {
  id: string;
  name: string;
  creditor: string;
  type: "loan" | "credit-card" | "mortgage" | "line-of-credit" | "other";
  totalAmount: number;
  remainingBalance: number;
  monthlyPayment: number;
  interestRate: number;
  dueDate: string;
  nextPayment: string;
  status: "current" | "overdue" | "paid-off";
}

const debts: Debt[] = [
  {
    id: "DBT-001",
    name: "Business Term Loan",
    creditor: "First Bank Nigeria",
    type: "loan",
    totalAmount: 5000000,
    remainingBalance: 3200000,
    monthlyPayment: 180000,
    interestRate: 18.5,
    dueDate: "2026-06-15",
    nextPayment: "2024-02-15",
    status: "current",
  },
  {
    id: "DBT-002",
    name: "Corporate Credit Card",
    creditor: "GTBank",
    type: "credit-card",
    totalAmount: 1000000,
    remainingBalance: 420000,
    monthlyPayment: 50000,
    interestRate: 24.0,
    dueDate: "2024-02-28",
    nextPayment: "2024-02-28",
    status: "current",
  },
  {
    id: "DBT-003",
    name: "Office Mortgage",
    creditor: "Access Bank",
    type: "mortgage",
    totalAmount: 25000000,
    remainingBalance: 18500000,
    monthlyPayment: 350000,
    interestRate: 15.0,
    dueDate: "2035-01-01",
    nextPayment: "2024-02-01",
    status: "overdue",
  },
  {
    id: "DBT-004",
    name: "Equipment Financing",
    creditor: "Zenith Bank",
    type: "loan",
    totalAmount: 2000000,
    remainingBalance: 800000,
    monthlyPayment: 95000,
    interestRate: 20.0,
    dueDate: "2025-08-10",
    nextPayment: "2024-02-10",
    status: "current",
  },
  {
    id: "DBT-005",
    name: "Fleet Vehicle Loan",
    creditor: "UBA Nigeria",
    type: "loan",
    totalAmount: 3500000,
    remainingBalance: 0,
    monthlyPayment: 0,
    interestRate: 17.5,
    dueDate: "2024-01-01",
    nextPayment: "—",
    status: "paid-off",
  },
  {
    id: "DBT-006",
    name: "Business Line of Credit",
    creditor: "Stanbic IBTC",
    type: "line-of-credit",
    totalAmount: 4000000,
    remainingBalance: 1750000,
    monthlyPayment: 120000,
    interestRate: 22.0,
    dueDate: "2025-12-31",
    nextPayment: "2024-02-20",
    status: "current",
  },
];

const repaymentTrend = [
  { month: "Aug", paid: 620000, balance: 22800000 },
  { month: "Sep", paid: 795000, balance: 22100000 },
  { month: "Oct", paid: 795000, balance: 21350000 },
  { month: "Nov", paid: 795000, balance: 20600000 },
  { month: "Dec", paid: 795000, balance: 19850000 },
  { month: "Jan", paid: 795000, balance: 24670000 },
];

const chartConfig = {
  paid: { label: "Paid", color: "hsl(var(--primary))" },
  balance: { label: "Balance", color: "hsl(var(--chart-2))" },
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

const getTypeIcon = (type: Debt["type"]) => {
  switch (type) {
    case "loan":
      return <Briefcase className="h-4 w-4" />;
    case "credit-card":
      return <CreditCard className="h-4 w-4" />;
    case "mortgage":
      return <Building2 className="h-4 w-4" />;
    case "line-of-credit":
      return <Landmark className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

const getTypeLabel = (type: Debt["type"]) => {
  switch (type) {
    case "loan":
      return "Loan";
    case "credit-card":
      return "Credit Card";
    case "mortgage":
      return "Mortgage";
    case "line-of-credit":
      return "Line of Credit";
    default:
      return "Other";
  }
};

const getStatusBadge = (status: Debt["status"]) => {
  switch (status) {
    case "current":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
          Current
        </Badge>
      );
    case "overdue":
      return (
        <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
          Overdue
        </Badge>
      );
    case "paid-off":
      return (
        <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
          Paid Off
        </Badge>
      );
  }
};

const getProgressColor = (status: Debt["status"]) => {
  switch (status) {
    case "current":
      return "bg-emerald-500";
    case "overdue":
      return "bg-red-500";
    case "paid-off":
      return "bg-blue-500";
  }
};

export default function DebtsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredDebts = debts.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.creditor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || d.type === typeFilter;
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalDebt = debts.reduce((sum, d) => sum + d.remainingBalance, 0);
  const totalOriginal = debts.reduce((sum, d) => sum + d.totalAmount, 0);
  const totalMonthlyPayment = debts
    .filter((d) => d.status !== "paid-off")
    .reduce((sum, d) => sum + d.monthlyPayment, 0);
  const overdueCount = debts.filter((d) => d.status === "overdue").length;
  const paidOffCount = debts.filter((d) => d.status === "paid-off").length;
  const overallRepaid = totalOriginal - totalDebt;
  const repaidPercent = Math.round((overallRepaid / totalOriginal) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Debts</h1>
          <p className="text-muted-foreground">
            Track and manage all outstanding loans and liabilities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Debt
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Debt</DialogTitle>
                <DialogDescription>
                  Record a new loan or liability to track repayment.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="debt-name">Debt Name</Label>
                  <Input id="debt-name" placeholder="e.g. Business Term Loan" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="creditor">Creditor / Lender</Label>
                  <Input id="creditor" placeholder="e.g. First Bank Nigeria" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="debt-type">Type</Label>
                    <Select>
                      <SelectTrigger id="debt-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="loan">Loan</SelectItem>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="mortgage">Mortgage</SelectItem>
                        <SelectItem value="line-of-credit">Line of Credit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                    <Input id="interest-rate" type="number" placeholder="e.g. 18.5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="total-amount">Total Amount (₦)</Label>
                    <Input id="total-amount" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="remaining-balance">Remaining Balance (₦)</Label>
                    <Input id="remaining-balance" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="monthly-payment">Monthly Payment (₦)</Label>
                    <Input id="monthly-payment" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="due-date">Final Due Date</Label>
                    <Input id="due-date" type="date" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Save Debt</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDebt)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {debts.filter((d) => d.status !== "paid-off").length} active debts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalMonthlyPayment)}</div>
            <p className="text-xs text-muted-foreground mt-1">Due this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Repaid</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(overallRepaid)}</div>
            <p className="text-xs text-emerald-500 mt-1">{repaidPercent}% of total debt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{overdueCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {paidOffCount} paid off
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart + Repayment Overview */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Monthly Repayment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={repaymentTrend} barGap={4}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `₦${(v / 1000000).toFixed(1)}M`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="paid" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Debt Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {[
              { label: "Loans", amount: debts.filter((d) => d.type === "loan").reduce((s, d) => s + d.remainingBalance, 0), color: "bg-primary" },
              { label: "Mortgage", amount: debts.filter((d) => d.type === "mortgage").reduce((s, d) => s + d.remainingBalance, 0), color: "bg-chart-2" },
              { label: "Credit Card", amount: debts.filter((d) => d.type === "credit-card").reduce((s, d) => s + d.remainingBalance, 0), color: "bg-chart-3" },
              { label: "Line of Credit", amount: debts.filter((d) => d.type === "line-of-credit").reduce((s, d) => s + d.remainingBalance, 0), color: "bg-chart-4" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{formatCurrency(item.amount)}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${Math.round((item.amount / totalDebt) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Debt Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold">All Debts</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search debts..."
                  className="pl-8 h-9 w-full sm:w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-9 w-[130px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="loan">Loan</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="mortgage">Mortgage</SelectItem>
                  <SelectItem value="line-of-credit">Line of Credit</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="paid-off">Paid Off</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Debt</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">Creditor</TableHead>
                  <TableHead className="hidden sm:table-cell">Rate</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead className="hidden lg:table-cell">Progress</TableHead>
                  <TableHead className="hidden sm:table-cell">Monthly</TableHead>
                  <TableHead className="hidden md:table-cell">Next Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDebts.map((debt) => {
                  const repaidPct = Math.round(
                    ((debt.totalAmount - debt.remainingBalance) / debt.totalAmount) * 100
                  );
                  return (
                    <TableRow key={debt.id}>
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground shrink-0">
                            {getTypeIcon(debt.type)}
                          </div>
                          <div>
                            <p className="font-medium text-sm leading-tight">{debt.name}</p>
                            <p className="text-xs text-muted-foreground">{debt.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {getTypeLabel(debt.type)}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {debt.creditor}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">
                        {debt.interestRate}%
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {debt.status === "paid-off" ?"—"
                          : formatCurrency(debt.remainingBalance)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full rounded-full ${getProgressColor(debt.status)}`}
                              style={{ width: `${repaidPct}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-8 text-right">
                            {repaidPct}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">
                        {debt.status === "paid-off" ? "—" : formatCurrency(debt.monthlyPayment)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {debt.nextPayment}
                      </TableCell>
                      <TableCell>{getStatusBadge(debt.status)}</TableCell>
                      <TableCell className="pr-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <ArrowUpRight className="mr-2 h-4 w-4" />
                              Record Payment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredDebts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-10 text-muted-foreground">
                      No debts found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
