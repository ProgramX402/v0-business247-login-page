"use client";
import { useState } from "react";
import {
  FileText, Download, Calendar, TrendingUp, DollarSign, PieChart,
  BarChart3, FileSpreadsheet, FilePlus, Clock, CheckCircle, Loader2,
  Eye, MoreHorizontal, Filter, ArrowUpRight, Receipt, Wallet, CreditCard,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  Area, AreaChart, PieChart as RechartsPieChart, Pie, Cell,
} from "recharts";

// ── Data ─────────────────────────────────────────────────────────────────────

const reportTypes = [
  { id: "profit-loss",   name: "Profit & Loss",    description: "Income, expenses, and net profit over a period", icon: TrendingUp,     category: "Financial" },
  { id: "balance-sheet", name: "Balance Sheet",     description: "Assets, liabilities, and equity snapshot",      icon: BarChart3,      category: "Financial" },
  { id: "cash-flow",     name: "Cash Flow",         description: "Cash inflows and outflows analysis",            icon: DollarSign,     category: "Financial" },
  { id: "sales-report",  name: "Sales Report",      description: "Revenue breakdown by product and channel",      icon: Receipt,        category: "Sales"     },
  { id: "expense-report",name: "Expense Report",    description: "Detailed expense categorisation",               icon: CreditCard,     category: "Expense"   },
  { id: "tax-summary",   name: "Tax Summary",       description: "Tax obligations and deductions",                icon: FileSpreadsheet,category: "Tax"       },
];

const generatedReports = [
  { id: 1, name: "Profit & Loss Statement", type: "profit-loss",    period: "Jan – Mar 2024",  generatedAt: "2024-03-15T10:30:00", status: "completed",  format: "PDF",   size: "245 KB" },
  { id: 2, name: "Sales Report",            type: "sales-report",   period: "March 2024",      generatedAt: "2024-03-14T14:20:00", status: "completed",  format: "Excel", size: "1.2 MB" },
  { id: 3, name: "Expense Report",          type: "expense-report", period: "Q1 2024",          generatedAt: "2024-03-13T09:15:00", status: "completed",  format: "PDF",   size: "189 KB" },
  { id: 4, name: "Cash Flow Statement",     type: "cash-flow",      period: "February 2024",    generatedAt: "2024-03-12T16:45:00", status: "processing", format: "PDF",   size: "—"      },
  { id: 5, name: "Balance Sheet",           type: "balance-sheet",  period: "Q4 2023",          generatedAt: "2024-01-05T11:00:00", status: "completed",  format: "PDF",   size: "312 KB" },
];

const revenueExpenseData = [
  { month: "Jan", revenue: 4250000, salaries: 1282500, inventory: 712500, marketing: 427500, operations: 285000, other: 142500 },
  { month: "Feb", revenue: 3980000, salaries: 1192500, inventory: 662500, marketing: 397500, operations: 265000, other: 132500 },
  { month: "Mar", revenue: 5120000, salaries: 1395000, inventory: 775000, marketing: 465000, operations: 310000, other: 155000 },
  { month: "Apr", revenue: 4750000, salaries: 1305000, inventory: 725000, marketing: 435000, operations: 290000, other: 145000 },
  { month: "May", revenue: 5450000, salaries: 1462500, inventory: 812500, marketing: 487500, operations: 325000, other: 162500 },
  { month: "Jun", revenue: 6100000, salaries: 1575000, inventory: 875000, marketing: 525000, operations: 350000, other: 175000 },
];

const profitTrendData = [
  { month: "Jan", profit: 1400000 },
  { month: "Feb", profit: 1330000 },
  { month: "Mar", profit: 2020000 },
  { month: "Apr", profit: 1850000 },
  { month: "May", profit: 2200000 },
  { month: "Jun", profit: 2600000 },
];

const expenseBreakdown = [
  { name: "Salaries",    value: 45, amount: 4500000 },
  { name: "Inventory",   value: 25, amount: 2500000 },
  { name: "Marketing",   value: 15, amount: 1500000 },
  { name: "Operations",  value: 10, amount: 1000000 },
  { name: "Other",       value:  5, amount:  500000 },
];

const COLORS = [
  "hsl(0, 84%, 60%)",
  "hsl(25, 95%, 53%)",
  "hsl(262, 83%, 58%)",
  "hsl(199, 89%, 48%)",
  "hsl(142, 71%, 45%)",
];

const financialSummary = {
  totalRevenue:  29650000, revenueChange:  12.5,
  totalExpenses: 18250000, expenseChange:   8.3,
  netProfit:     11400000, profitChange:   18.2,
  profitMargin:      38.4, marginChange:    2.1,
};

// ── Formatters ───────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);

const fmtCompact = (n: number) =>
  n >= 1_000_000 ? `₦${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000   ? `₦${(n / 1_000).toFixed(0)}K`
  : fmt(n);

// ── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  if (status === "completed")
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1 whitespace-nowrap">
        <CheckCircle className="h-3 w-3" /> Completed
      </Badge>
    );
  if (status === "processing")
    return (
      <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1 whitespace-nowrap">
        <Loader2 className="h-3 w-3 animate-spin" /> Processing
      </Badge>
    );
  return <Badge variant="secondary">{status}</Badge>;
}

function ReportIcon({ type }: { type: string }) {
  const report = reportTypes.find((r) => r.id === type);
  const Icon = report?.icon ?? FileText;
  return <Icon className="h-4 w-4" />;
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("q1-2024");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [reportFormat, setReportFormat] = useState("pdf");

  return (
    <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Financial Reports</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Generate and download financial reports for your business
          </p>
        </div>

        {/* Controls row — stacks on mobile, inline on sm+ */}
        <div className="flex flex-col xs:flex-row gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full xs:w-44 h-9 text-sm">
              <Calendar className="h-3.5 w-3.5 mr-2 shrink-0" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="q4-2023">Q4 2023</SelectItem>
              <SelectItem value="2023">Full Year 2023</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-9 text-sm xs:ml-auto w-full xs:w-auto">
                <FilePlus className="h-3.5 w-3.5 mr-2" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-2rem)] max-w-md rounded-xl">
              <DialogHeader>
                <DialogTitle>Generate New Report</DialogTitle>
                <DialogDescription>Select a report type and configure options.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-3">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          <div className="flex items-center gap-2">
                            <r.icon className="h-4 w-4" />
                            {r.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
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
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button className="w-full sm:w-auto" onClick={() => setDialogOpen(false)}>Generate Report</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Revenue",  value: fmtCompact(financialSummary.totalRevenue),  change: `+${financialSummary.revenueChange}%`,  up: true,  Icon: TrendingUp, bg: "bg-emerald-500/10", ic: "text-emerald-600" },
          { label: "Total Expenses", value: fmtCompact(financialSummary.totalExpenses), change: `+${financialSummary.expenseChange}%`,  up: false, Icon: CreditCard,  bg: "bg-red-500/10",     ic: "text-red-600"     },
          { label: "Net Profit",     value: fmtCompact(financialSummary.netProfit),     change: `+${financialSummary.profitChange}%`,   up: true,  Icon: Wallet,      bg: "bg-primary/10",     ic: "text-primary"     },
          { label: "Profit Margin",  value: `${financialSummary.profitMargin}%`,        change: `+${financialSummary.marginChange}%`,   up: true,  Icon: PieChart,    bg: "bg-blue-500/10",    ic: "text-blue-600"    },
        ].map(({ label, value, change, up, Icon, bg, ic }) => (
          <Card key={label}>
            <CardContent className="p-3 sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs text-muted-foreground truncate">{label}</p>
                  <p className="text-base sm:text-2xl font-bold mt-0.5 truncate">{value}</p>
                </div>
                <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${ic}`} />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] sm:text-xs">
                <ArrowUpRight className={`h-3 w-3 ${up ? "text-emerald-600" : "text-red-600"}`} />
                <span className={`font-medium ${up ? "text-emerald-600" : "text-red-600"}`}>{change}</span>
                <span className="text-muted-foreground hidden sm:inline">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">

        {/* Revenue vs Expenses */}
        <Card className="min-w-0">
          <CardHeader className="pb-1 px-4 sm:px-6">
            <CardTitle className="text-sm sm:text-base">Revenue vs Expenses</CardTitle>
            <CardDescription className="text-xs">Monthly comparison by category</CardDescription>
          </CardHeader>
          <CardContent className="px-1 sm:px-4 pb-4">
            <ChartContainer
              config={{
                revenue:    { label: "Revenue",    color: "hsl(142, 71%, 45%)" },
                salaries:   { label: "Salaries",   color: "hsl(0, 84%, 60%)"   },
                inventory:  { label: "Inventory",  color: "hsl(25, 95%, 53%)"  },
                marketing:  { label: "Marketing",  color: "hsl(262, 83%, 58%)" },
                operations: { label: "Operations", color: "hsl(199, 89%, 48%)" },
                other:      { label: "Other",      color: "hsl(330, 81%, 60%)" },
              }}
              className="h-56 sm:h-72 w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueExpenseData} barGap={2} barCategoryGap="25%" margin={{ left: 0, right: 4, top: 4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={fmtCompact} width={52} />
                  <ChartTooltip content={<ChartTooltipContent />} formatter={(v: number) => fmt(v)} />
                  <Bar dataKey="revenue"    name="Revenue"    fill="hsl(142, 71%, 45%)" radius={[3,3,0,0]} />
                  <Bar dataKey="salaries"   name="Salaries"   fill="hsl(0, 84%, 60%)"   stackId="e" />
                  <Bar dataKey="inventory"  name="Inventory"  fill="hsl(25, 95%, 53%)"  stackId="e" />
                  <Bar dataKey="marketing"  name="Marketing"  fill="hsl(262, 83%, 58%)" stackId="e" />
                  <Bar dataKey="operations" name="Operations" fill="hsl(199, 89%, 48%)" stackId="e" />
                  <Bar dataKey="other"      name="Other"      fill="hsl(330, 81%, 60%)" stackId="e" radius={[3,3,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            {/* Legend — wraps naturally */}
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 px-1">
              {[
                ["Revenue",    "hsl(142, 71%, 45%)"],
                ["Salaries",   "hsl(0, 84%, 60%)"],
                ["Inventory",  "hsl(25, 95%, 53%)"],
                ["Marketing",  "hsl(262, 83%, 58%)"],
                ["Operations", "hsl(199, 89%, 48%)"],
                ["Other",      "hsl(330, 81%, 60%)"],
              ].map(([name, color]) => (
                <div key={name} className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profit Trend */}
        <Card className="min-w-0">
          <CardHeader className="pb-1 px-4 sm:px-6">
            <CardTitle className="text-sm sm:text-base">Profit Trend</CardTitle>
            <CardDescription className="text-xs">Net profit over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="px-1 sm:px-4 pb-4">
            <ChartContainer
              config={{ profit: { label: "Profit", color: "hsl(var(--chart-1))" } }}
              className="h-56 sm:h-72 w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitTrendData} margin={{ left: 0, right: 4, top: 4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={fmtCompact} width={52} />
                  <ChartTooltip content={<ChartTooltipContent />} formatter={(v: number) => fmt(v)} />
                  <defs>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="profit" stroke="hsl(var(--chart-1))" fill="url(#profitGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── Expense Breakdown + Quick Reports ── */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {/* Donut */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-1 px-4 sm:px-6">
            <CardTitle className="text-sm sm:text-base">Expense Breakdown</CardTitle>
            <CardDescription className="text-xs">Distribution by category</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="h-44 sm:h-52">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius="40%" outerRadius="65%" paddingAngle={2} dataKey="value">
                    {expenseBreakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip formatter={(v: number, _: string, p: { payload: { amount: number } }) =>
                    [`${v}% (${fmt(p.payload.amount)})`, p.payload.name]
                  } />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-2.5">
              {expenseBreakdown.map((item, i) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 tabular-nums">
                      <span className="text-muted-foreground">{fmtCompact(item.amount)}</span>
                      <span className="font-semibold w-7 text-right">{item.value}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: COLORS[i] }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Report Grid */}
        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader className="pb-1 px-4 sm:px-6">
            <CardTitle className="text-sm sm:text-base">Quick Report Generation</CardTitle>
            <CardDescription className="text-xs">Generate common financial reports instantly</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {reportTypes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setSelectedType(r.id); setDialogOpen(true); }}
                  className="flex flex-col items-start gap-2 p-3 sm:p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent active:scale-[0.98] transition-all text-left min-w-0"
                >
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <r.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary" />
                  </div>
                  <div className="min-w-0 w-full">
                    <p className="font-medium text-xs sm:text-sm leading-tight truncate">{r.name}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 mt-0.5 hidden sm:block">{r.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-[9px] sm:text-[10px] px-1.5 py-0">{r.category}</Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Generated Reports History ── */}
      <Card>
        <CardHeader className="pb-2 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-sm sm:text-base">Generated Reports</CardTitle>
              <CardDescription className="text-xs mt-0.5">Your report generation history</CardDescription>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40 h-8 text-xs">
                <Filter className="h-3 w-3 mr-1.5 shrink-0" />
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
        </CardHeader>

        <CardContent className="px-0 sm:px-6">
          {/* Desktop table — hidden below md */}
          <div className="hidden md:block overflow-x-auto">
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
                {generatedReports.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <ReportIcon type={r.type} />
                        </div>
                        <span className="font-medium text-sm">{r.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{r.period}</TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 shrink-0" />
                        {new Date(r.generatedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{r.format}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.size}</TableCell>
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem disabled={r.status !== "completed"}><Eye className="h-4 w-4 mr-2" />View</DropdownMenuItem>
                          <DropdownMenuItem disabled={r.status !== "completed"}><Download className="h-4 w-4 mr-2" />Download</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards — shown below md */}
          <div className="md:hidden divide-y divide-border">
            {generatedReports.map((r) => (
              <div key={r.id} className="px-4 py-3.5 space-y-2.5">
                {/* Top row */}
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <ReportIcon type={r.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight truncate">{r.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.period}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                {/* Bottom row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 shrink-0" />
                      {new Date(r.generatedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                    </div>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">{r.format}</Badge>
                    <span>{r.size}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled={r.status !== "completed"}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled={r.status !== "completed"}>
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
