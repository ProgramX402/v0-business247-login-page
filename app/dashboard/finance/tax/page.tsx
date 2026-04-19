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
import { Receipt, Plus, Download, Search, AlertTriangle, CheckCircle2, MoreHorizontal, Edit, Trash2, Calendar, FileText, Clock,  } from "lucide-react";

interface TaxRecord {
  id: string;
  name: string;
  type: "vat" | "income-tax" | "withholding" | "payroll" | "custom-duty" | "other";
  taxAuthority: string;
  amount: number;
  amountPaid: number;
  dueDate: string;
  filingPeriod: string;
  status: "paid" | "pending" | "overdue" | "filed";
}

const taxRecords: TaxRecord[] = [
  {
    id: "TAX-001",
    name: "Value Added Tax (VAT)",
    type: "vat",
    taxAuthority: "FIRS",
    amount: 850000,
    amountPaid: 850000,
    dueDate: "2024-01-21",
    filingPeriod: "December 2023",
    status: "paid",
  },
  {
    id: "TAX-002",
    name: "Company Income Tax",
    type: "income-tax",
    taxAuthority: "FIRS",
    amount: 3200000,
    amountPaid: 0,
    dueDate: "2024-06-30",
    filingPeriod: "FY 2023",
    status: "pending",
  },
  {
    id: "TAX-003",
    name: "Withholding Tax",
    type: "withholding",
    taxAuthority: "FIRS",
    amount: 420000,
    amountPaid: 420000,
    dueDate: "2024-01-21",
    filingPeriod: "December 2023",
    status: "paid",
  },
  {
    id: "TAX-004",
    name: "PAYE (Payroll Tax)",
    type: "payroll",
    taxAuthority: "LIRS",
    amount: 680000,
    amountPaid: 0,
    dueDate: "2024-01-10",
    filingPeriod: "December 2023",
    status: "overdue",
  },
  {
    id: "TAX-005",
    name: "Value Added Tax (VAT)",
    type: "vat",
    taxAuthority: "FIRS",
    amount: 920000,
    amountPaid: 0,
    dueDate: "2024-02-21",
    filingPeriod: "January 2024",
    status: "pending",
  },
  {
    id: "TAX-006",
    name: "Custom Duty",
    type: "custom-duty",
    taxAuthority: "NCS",
    amount: 1150000,
    amountPaid: 1150000,
    dueDate: "2023-12-15",
    filingPeriod: "Q4 2023",
    status: "paid",
  },
  {
    id: "TAX-007",
    name: "PAYE (Payroll Tax)",
    type: "payroll",
    taxAuthority: "LIRS",
    amount: 680000,
    amountPaid: 680000,
    dueDate: "2024-02-10",
    filingPeriod: "January 2024",
    status: "filed",
  },
];

const monthlyTaxData = [
  { month: "Aug", paid: 1200000, pending: 400000 },
  { month: "Sep", paid: 1450000, pending: 300000 },
  { month: "Oct", paid: 1100000, pending: 600000 },
  { month: "Nov", paid: 1600000, pending: 200000 },
  { month: "Dec", paid: 1270000, pending: 500000 },
  { month: "Jan", paid: 850000, pending: 1600000 },
];

const chartConfig = {
  paid: { label: "Paid", color: "hsl(var(--primary))" },
  pending: { label: "Pending", color: "hsl(var(--chart-2))" },
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

const getTypeLabel = (type: TaxRecord["type"]) => {
  switch (type) {
    case "vat":
      return "VAT";
    case "income-tax":
      return "Income Tax";
    case "withholding":
      return "Withholding";
    case "payroll":
      return "Payroll Tax";
    case "custom-duty":
      return "Custom Duty";
    default:
      return "Other";
  }
};

const getStatusBadge = (status: TaxRecord["status"]) => {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
          Paid
        </Badge>
      );
    case "filed":
      return (
        <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
          Filed
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
          Pending
        </Badge>
      );
    case "overdue":
      return (
        <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
          Overdue
        </Badge>
      );
  }
};

const taxBreakdown = [
  { label: "VAT", amount: 1770000, color: "bg-primary" },
  { label: "Income Tax", amount: 3200000, color: "bg-blue-500" },
  { label: "Withholding", amount: 420000, color: "bg-amber-500" },
  { label: "Payroll Tax", amount: 1360000, color: "bg-purple-500" },
  { label: "Custom Duty", amount: 1150000, color: "bg-emerald-500" },
];

export default function TaxPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredRecords = taxRecords.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.taxAuthority.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || t.type === typeFilter;
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalLiability = taxRecords.reduce((sum, t) => sum + t.amount, 0);
  const totalPaid = taxRecords.reduce((sum, t) => sum + t.amountPaid, 0);
  const totalOutstanding = totalLiability - totalPaid;
  const overdueCount = taxRecords.filter((t) => t.status === "overdue").length;
  const paidPercent = Math.round((totalPaid / totalLiability) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tax</h1>
          <p className="text-muted-foreground">
            Track and manage your tax obligations and filings
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
                Add Tax Record
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle>Add Tax Record</DialogTitle>
                <DialogDescription>
                  Record a new tax obligation or payment.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="tax-name">Tax Name</Label>
                  <Input id="tax-name" placeholder="e.g. Value Added Tax" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tax-type">Tax Type</Label>
                  <Select>
                    <SelectTrigger id="tax-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vat">VAT</SelectItem>
                      <SelectItem value="income-tax">Income Tax</SelectItem>
                      <SelectItem value="withholding">Withholding Tax</SelectItem>
                      <SelectItem value="payroll">Payroll Tax (PAYE)</SelectItem>
                      <SelectItem value="custom-duty">Custom Duty</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tax-authority">Tax Authority</Label>
                  <Select>
                    <SelectTrigger id="tax-authority">
                      <SelectValue placeholder="Select authority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="firs">FIRS</SelectItem>
                      <SelectItem value="lirs">LIRS</SelectItem>
                      <SelectItem value="ncs">NCS</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount (₦)</Label>
                    <Input id="amount" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount-paid">Amount Paid (₦)</Label>
                    <Input id="amount-paid" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="filing-period">Filing Period</Label>
                    <Input id="filing-period" placeholder="e.g. January 2024" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="filed">Filed</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Save Record</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Liability</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalLiability)}</p>
                <p className="text-xs text-muted-foreground mt-1">Current fiscal year</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalPaid)}</p>
                <p className="text-xs text-emerald-500 mt-1">{paidPercent}% of total liability</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalOutstanding)}</p>
                <p className="text-xs text-muted-foreground mt-1">Unpaid obligations</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold mt-1">{overdueCount}</p>
                <p className="text-xs text-red-500 mt-1">
                  {overdueCount > 0 ? "Requires immediate attention" : "All obligations current"}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Monthly Tax Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Monthly Tax Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTaxData} barGap={4}>
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
                  <Bar dataKey="pending" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Tax Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Tax Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taxBreakdown.map((item) => {
                const total = taxBreakdown.reduce((s, i) => s + i.amount, 0);
                const pct = Math.round((item.amount / total) * 100);
                return (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{pct}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{formatCurrency(item.amount)}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Records Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold">Tax Obligations</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 h-9 w-full sm:w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-9 w-full sm:w-36">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="vat">VAT</SelectItem>
                  <SelectItem value="income-tax">Income Tax</SelectItem>
                  <SelectItem value="withholding">Withholding</SelectItem>
                  <SelectItem value="payroll">Payroll Tax</SelectItem>
                  <SelectItem value="custom-duty">Custom Duty</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-full sm:w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="filed">Filed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
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
                  <TableHead>Tax Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Authority</TableHead>
                  <TableHead>Filing Period</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => {
                  const paidPct =
                    record.amount > 0
                      ? Math.min(100, Math.round((record.amountPaid / record.amount) * 100))
                      : 100;
                  const progressColor =
                    record.status === "paid" || record.status === "filed" ?"bg-emerald-500"
                      : record.status === "overdue" ?"bg-red-500" :"bg-amber-500";
                  return (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{record.name}</p>
                            <p className="text-xs text-muted-foreground">{record.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{getTypeLabel(record.type)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{record.taxAuthority}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {record.filingPeriod}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-sm ${
                            record.status === "overdue" ? "text-red-500 font-medium" : "text-muted-foreground"
                          }`}
                        >
                          {record.dueDate}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{formatCurrency(record.amount)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{formatCurrency(record.amountPaid)}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full rounded-full ${progressColor}`}
                              style={{ width: `${paidPct}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-8 text-right">
                            {paidPct}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500 focus:text-red-500">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
