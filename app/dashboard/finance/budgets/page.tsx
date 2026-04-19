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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { PiggyBank, Plus, Download, Search, TrendingUp, AlertTriangle, MoreHorizontal, Edit, Trash2, Building2, Truck, Megaphone, Users, Wrench, FileText, CreditCard, Wallet,  } from "lucide-react";

interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  period: string;
  status: "on-track" | "warning" | "exceeded";
}

const budgets: Budget[] = [
  {
    id: "BDG-001",
    category: "Operations",
    allocated: 500000,
    spent: 221000,
    period: "January 2024",
    status: "on-track",
  },
  {
    id: "BDG-002",
    category: "Marketing",
    allocated: 300000,
    spent: 250000,
    period: "January 2024",
    status: "warning",
  },
  {
    id: "BDG-003",
    category: "Personnel",
    allocated: 800000,
    spent: 245000,
    period: "January 2024",
    status: "on-track",
  },
  {
    id: "BDG-004",
    category: "Transportation",
    allocated: 150000,
    spent: 120000,
    period: "January 2024",
    status: "warning",
  },
  {
    id: "BDG-005",
    category: "Utilities",
    allocated: 100000,
    spent: 75000,
    period: "January 2024",
    status: "on-track",
  },
  {
    id: "BDG-006",
    category: "Maintenance",
    allocated: 80000,
    spent: 95000,
    period: "January 2024",
    status: "exceeded",
  },
  {
    id: "BDG-007",
    category: "Rent",
    allocated: 500000,
    spent: 500000,
    period: "January 2024",
    status: "on-track",
  },
  {
    id: "BDG-008",
    category: "Software",
    allocated: 60000,
    spent: 35000,
    period: "January 2024",
    status: "on-track",
  },
];

const monthlyComparison = [
  { month: "Aug", allocated: 2200000, spent: 1800000 },
  { month: "Sep", allocated: 2200000, spent: 1950000 },
  { month: "Oct", allocated: 2400000, spent: 2100000 },
  { month: "Nov", allocated: 2400000, spent: 2050000 },
  { month: "Dec", allocated: 2600000, spent: 2400000 },
  { month: "Jan", allocated: 2490000, spent: 1541000 },
];

const chartConfig = {
  allocated: { label: "Allocated", color: "hsl(var(--primary))" },
  spent: { label: "Spent", color: "hsl(var(--chart-2))" },
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

const getCategoryIcon = (category: string) => {
  const map: Record<string, React.ReactNode> = {
    Operations: <Building2 className="h-4 w-4" />,
    Marketing: <Megaphone className="h-4 w-4" />,
    Personnel: <Users className="h-4 w-4" />,
    Transportation: <Truck className="h-4 w-4" />,
    Utilities: <Wrench className="h-4 w-4" />,
    Maintenance: <Wrench className="h-4 w-4" />,
    Rent: <Building2 className="h-4 w-4" />,
    Software: <FileText className="h-4 w-4" />,
  };
  return map[category] ?? <CreditCard className="h-4 w-4" />;
};

const getStatusBadge = (status: Budget["status"]) => {
  switch (status) {
    case "on-track":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
          On Track
        </Badge>
      );
    case "warning":
      return (
        <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
          Warning
        </Badge>
      );
    case "exceeded":
      return (
        <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
          Exceeded
        </Badge>
      );
  }
};

const getProgressColor = (status: Budget["status"]) => {
  switch (status) {
    case "on-track":
      return "bg-emerald-500";
    case "warning":
      return "bg-amber-500";
    case "exceeded":
      return "bg-red-500";
  }
};

export default function BudgetsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("january-2024");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredBudgets = budgets.filter((b) => {
    const matchesSearch = b.category
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;
  const overallPercent = Math.round((totalSpent / totalAllocated) * 100);

  const exceededCount = budgets.filter((b) => b.status === "exceeded").length;
  const warningCount = budgets.filter((b) => b.status === "warning").length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground">
            Plan and monitor your spending across categories
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
                New Budget
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle>Create New Budget</DialogTitle>
                <DialogDescription>
                  Set a spending limit for a category and period.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="personnel">Personnel</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Budget Amount (₦)</Label>
                    <Input id="amount" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="period">Period</Label>
                    <Select>
                      <SelectTrigger id="period">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="january-2024">January 2024</SelectItem>
                        <SelectItem value="february-2024">February 2024</SelectItem>
                        <SelectItem value="march-2024">March 2024</SelectItem>
                        <SelectItem value="q1-2024">Q1 2024</SelectItem>
                        <SelectItem value="annual-2024">Annual 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Create Budget
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Allocated</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAllocated)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {budgets.length} categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>{overallPercent}% of total budget used</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <PiggyBank className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRemaining)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Available to spend this period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exceededCount + warningCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {exceededCount} exceeded · {warningCount} near limit
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart + Overview */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Budget vs. Spending</CardTitle>
            <p className="text-sm text-muted-foreground">
              Monthly allocated vs. actual spend
            </p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyComparison}
                  barCategoryGap="30%"
                  barGap={4}
                >
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(v) => `₦${(v / 1000000).toFixed(1)}M`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                    }
                  />
                  <Bar
                    dataKey="allocated"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    opacity={0.4}
                  />
                  <Bar
                    dataKey="spent"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary opacity-40" />
                Allocated
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary" />
                Spent
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Overall Budget Health</CardTitle>
            <p className="text-sm text-muted-foreground">January 2024</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative flex items-center justify-center">
                <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallPercent / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold">{overallPercent}%</span>
                  <span className="text-xs text-muted-foreground">used</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Allocated</span>
                <span className="font-medium">{formatCurrency(totalAllocated)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Spent</span>
                <span className="font-medium">{formatCurrency(totalSpent)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted-foreground">Remaining</span>
                <span className="font-medium text-emerald-500">
                  {formatCurrency(totalRemaining)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">Budget Categories</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Spending breakdown by category
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search category..."
                  className="pl-8 h-9 w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="on-track">On Track</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="exceeded">Exceeded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="h-9 w-40">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january-2024">January 2024</SelectItem>
                  <SelectItem value="february-2024">February 2024</SelectItem>
                  <SelectItem value="q1-2024">Q1 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">
                    Allocated
                  </th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">
                    Spent
                  </th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">
                    Remaining
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground min-w-[160px]">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBudgets.map((budget) => {
                  const percent = Math.min(
                    Math.round((budget.spent / budget.allocated) * 100),
                    100
                  );
                  const remaining = budget.allocated - budget.spent;
                  return (
                    <tr
                      key={budget.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            {getCategoryIcon(budget.category)}
                          </span>
                          <div>
                            <p className="font-medium">{budget.category}</p>
                            <p className="text-xs text-muted-foreground">
                              {budget.period}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        {formatCurrency(budget.allocated)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {formatCurrency(budget.spent)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={
                            remaining < 0
                              ? "text-red-500 font-medium" :"text-emerald-500 font-medium"
                          }
                        >
                          {remaining < 0
                            ? `-${formatCurrency(Math.abs(remaining))}`
                            : formatCurrency(remaining)}
                        </span>
                      </td>
                      <td className="px-6 py-4 min-w-[160px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${getProgressColor(budget.status)}`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-8 text-right">
                            {percent}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(budget.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Budget
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredBudgets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <PiggyBank className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="font-medium">No budgets found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters or create a new budget.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
