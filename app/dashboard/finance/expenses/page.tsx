"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search, Plus, Download, Filter, ChevronLeft, ChevronRight,
  Receipt, TrendingUp, TrendingDown, Wallet, Building2, Truck,
  Megaphone, Users, Wrench, MoreHorizontal, Calendar, FileText,
  Edit, Trash2,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
  PieChart, Pie, Cell, TooltipProps,
} from "recharts";

// ── Colour palette — one colour per category, shared everywhere ───────────────

const CATEGORY_COLORS: Record<string, string> = {
  Operations:     "hsl(199, 89%, 48%)",
  Utilities:      "hsl(262, 83%, 58%)",
  Transportation: "hsl(25,  95%, 53%)",
  Marketing:      "hsl(330, 81%, 60%)",
  Personnel:      "hsl(142, 71%, 45%)",
  Maintenance:    "hsl(0,   84%, 60%)",
  Rent:           "hsl(45,  93%, 47%)",
  Software:       "hsl(220, 70%, 56%)",
};

// ── Data ─────────────────────────────────────────────────────────────────────

const expenses = [
  { id: "EXP-001", description: "Office Supplies",         category: "Operations",     vendor: "Staples Nigeria",      amount:  45000, date: "2024-01-15", status: "approved",  receipt: true  },
  { id: "EXP-002", description: "Monthly Internet Bill",   category: "Utilities",      vendor: "MTN Business",         amount:  75000, date: "2024-01-14", status: "approved",  receipt: true  },
  { id: "EXP-003", description: "Delivery Vehicle Fuel",   category: "Transportation", vendor: "NNPC Filling Station", amount: 120000, date: "2024-01-13", status: "pending",   receipt: true  },
  { id: "EXP-004", description: "Facebook Ads Campaign",   category: "Marketing",      vendor: "Meta Platforms",       amount: 250000, date: "2024-01-12", status: "approved",  receipt: true  },
  { id: "EXP-005", description: "Staff Training Workshop", category: "Personnel",      vendor: "Business Academy NG",  amount: 180000, date: "2024-01-11", status: "approved",  receipt: false },
  { id: "EXP-006", description: "Equipment Maintenance",   category: "Maintenance",    vendor: "TechFix Services",     amount:  95000, date: "2024-01-10", status: "rejected",  receipt: true  },
  { id: "EXP-007", description: "Office Rent - January",   category: "Rent",           vendor: "Lagos Properties Ltd", amount: 500000, date: "2024-01-01", status: "approved",  receipt: true  },
  { id: "EXP-008", description: "Google Workspace Sub",    category: "Software",       vendor: "Google LLC",           amount:  35000, date: "2024-01-09", status: "approved",  receipt: true  },
  { id: "EXP-009", description: "Packaging Materials",     category: "Operations",     vendor: "PackRight NG",         amount:  88000, date: "2024-01-08", status: "pending",   receipt: true  },
  { id: "EXP-010", description: "Team Lunch Meeting",      category: "Personnel",      vendor: "The Place Restaurant", amount:  65000, date: "2024-01-07", status: "approved",  receipt: true  },
];

// Each bar has its own category so they each get a distinct colour
const monthlyExpenses = [
  { month: "Aug", amount: 1200000, category: "Operations"     },
  { month: "Sep", amount:  980000, category: "Personnel"      },
  { month: "Oct", amount: 1450000, category: "Marketing"      },
  { month: "Nov", amount: 1100000, category: "Rent"           },
  { month: "Dec", amount: 1680000, category: "Transportation" },
  { month: "Jan", amount: 1453000, category: "Utilities"      },
];

const categoryBreakdown = [
  { name: "Operations",     value: 133000 },
  { name: "Utilities",      value:  75000 },
  { name: "Transportation", value: 120000 },
  { name: "Marketing",      value: 250000 },
  { name: "Personnel",      value: 245000 },
  { name: "Rent",           value: 500000 },
  { name: "Software",       value:  35000 },
  { name: "Maintenance",    value:  95000 },
];

const chartConfig = { amount: { label: "Amount", color: "hsl(var(--primary))" } };

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);

const fmtCompact = (n: number) =>
  n >= 1_000_000 ? `₦${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `₦${(n / 1_000).toFixed(0)}K` : fmt(n);

function CategoryIcon({ category }: { category: string }) {
  const cls = "h-3.5 w-3.5 shrink-0";
  switch (category) {
    case "Transportation": return <Truck      className={cls} />;
    case "Marketing":      return <Megaphone  className={cls} />;
    case "Personnel":      return <Users      className={cls} />;
    case "Maintenance":
    case "Utilities":      return <Wrench     className={cls} />;
    case "Rent":
    case "Operations":     return <Building2  className={cls} />;
    case "Software":       return <FileText   className={cls} />;
    default:               return <Receipt    className={cls} />;
  }
}

function StatusBadge({ status }: { status: string }) {
  if (status === "approved") return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 whitespace-nowrap text-[10px] sm:text-xs px-1.5">Approved</Badge>;
  if (status === "pending")  return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 whitespace-nowrap text-[10px] sm:text-xs px-1.5">Pending</Badge>;
  if (status === "rejected") return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 whitespace-nowrap text-[10px] sm:text-xs px-1.5">Rejected</Badge>;
  return <Badge variant="outline">{status}</Badge>;
}

// Custom bar shape — reads `category` from the data point to pick the colour
function ColoredBar(props: {
  x?: number; y?: number; width?: number; height?: number; category?: string;
}) {
  const { x = 0, y = 0, width = 0, height = 0, category = "" } = props;
  if (!height || height <= 0) return null;
  const fill = CATEGORY_COLORS[category] ?? "hsl(var(--primary))";
  const r = Math.min(4, width / 2);
  return (
    <path
      d={`M${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height} L${x},${y + height} Z`}
      fill={fill}
    />
  );
}

// Custom tooltip for the bar chart
function BarTooltipContent({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as { month: string; amount: number; category: string };
  const color = CATEGORY_COLORS[d.category] ?? "hsl(var(--primary))";
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-md text-xs space-y-1">
      <p className="font-semibold text-foreground">{d.month}</p>
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: color }} />
        <span className="text-muted-foreground">{d.category}</span>
      </div>
      <p className="font-medium tabular-nums">{fmt(d.amount)}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ExpensesPage() {
  const [search, setSearch]           = useState("");
  const [categoryFilter, setCategory] = useState("all");
  const [statusFilter, setStatus]     = useState("all");
  const [page, setPage]               = useState(1);
  const [dialogOpen, setDialogOpen]   = useState(false);
  const PER_PAGE = 5;

  const filtered = expenses.filter((e) => {
    const q = search.toLowerCase();
    return (
      (e.description.toLowerCase().includes(q) || e.vendor.toLowerCase().includes(q) || e.id.toLowerCase().includes(q)) &&
      (categoryFilter === "all" || e.category === categoryFilter) &&
      (statusFilter   === "all" || e.status   === statusFilter)
    );
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const start      = (page - 1) * PER_PAGE;
  const paginated  = filtered.slice(start, start + PER_PAGE);

  const totalAmt    = expenses.reduce((s, e) => s + e.amount, 0);
  const approvedAmt = expenses.filter((e) => e.status === "approved").reduce((s, e) => s + e.amount, 0);
  const pendingAmt  = expenses.filter((e) => e.status === "pending").reduce((s, e) => s + e.amount, 0);
  const approvedCnt = expenses.filter((e) => e.status === "approved").length;
  const pendingCnt  = expenses.filter((e) => e.status === "pending").length;

  return (
    <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Expenses</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Track and manage your business expenses</p>
        </div>
        <div className="flex gap-2 sm:shrink-0">
          <Button variant="outline" size="sm" className="h-9 text-xs sm:text-sm flex-1 sm:flex-none">
            <Download className="mr-1.5 h-3.5 w-3.5" />Export
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 text-xs sm:text-sm flex-1 sm:flex-none">
                <Plus className="mr-1.5 h-3.5 w-3.5" />Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-2rem)] max-w-md rounded-xl">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>Record a new business expense.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3.5 py-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="desc">Description</Label>
                  <Input id="desc" placeholder="Enter expense description" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {Object.keys(CATEGORY_COLORS).map((c) => (
                          <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="amt">Amount (₦)</Label>
                    <Input id="amt" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="vendor">Vendor</Label>
                    <Input id="vendor" placeholder="Vendor name" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Additional notes" className="resize-none" rows={3} />
                </div>
              </div>
              <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button className="w-full sm:w-auto" onClick={() => setDialogOpen(false)}>Save Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4">
            <CardTitle className="text-[11px] sm:text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-base sm:text-2xl font-bold truncate">{fmtCompact(totalAmt)}</div>
            <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground mt-1 gap-0.5">
              <TrendingUp className="h-3 w-3 text-red-500 shrink-0" />
              <span className="text-red-500 font-medium">+12.5%</span>
              <span className="hidden sm:inline ml-0.5">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4">
            <CardTitle className="text-[11px] sm:text-sm font-medium text-muted-foreground">Approved</CardTitle>
            <Receipt className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500 shrink-0" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-base sm:text-2xl font-bold truncate">{fmtCompact(approvedAmt)}</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{approvedCnt} expenses</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4">
            <CardTitle className="text-[11px] sm:text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 shrink-0" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-base sm:text-2xl font-bold truncate">{fmtCompact(pendingAmt)}</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{pendingCnt} awaiting review</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4">
            <CardTitle className="text-[11px] sm:text-sm font-medium text-muted-foreground">Budget Used</CardTitle>
            <TrendingDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-base sm:text-2xl font-bold">68%</div>
            <div className="mt-2 h-1.5 sm:h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[68%] rounded-full bg-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Charts ── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">

        {/* Monthly bar chart — each bar coloured by its category */}
        <Card className="min-w-0">
          <CardHeader className="px-4 sm:px-6 pb-1">
            <CardTitle className="text-sm sm:text-base">Monthly Expenses</CardTitle>
            <CardDescription className="text-xs">Expense trend over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="px-1 sm:px-4 pb-4">
            <ChartContainer config={chartConfig} className="h-52 sm:h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyExpenses} margin={{ left: 0, right: 4, top: 4, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={fmtCompact} width={52} />
                  <ChartTooltip content={<BarTooltipContent />} />
                  {/* shape prop renders our custom coloured bar per data point */}
                  <Bar dataKey="amount" shape={<ColoredBar />} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            {/* Per-bar legend */}
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 px-1">
              {monthlyExpenses.map((d) => (
                <div key={d.month} className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: CATEGORY_COLORS[d.category] }} />
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{d.month} · {d.category}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pie chart — same colours */}
        <Card className="min-w-0">
          <CardHeader className="px-4 sm:px-6 pb-1">
            <CardTitle className="text-sm sm:text-base">Expenses by Category</CardTitle>
            <CardDescription className="text-xs">Breakdown of expenses this month</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4">
            <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-4">
              <div className="w-full xs:w-auto shrink-0">
                <ChartContainer config={chartConfig} className="h-44 w-full xs:h-[180px] xs:w-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius="38%" outerRadius="62%" paddingAngle={2} dataKey="value">
                        {categoryBreakdown.map((e) => (
                          <Cell key={e.name} fill={CATEGORY_COLORS[e.name] ?? "hsl(var(--muted-foreground))"} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0].payload as { name: string; value: number };
                          return (
                            <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-md text-xs space-y-1">
                              <div className="flex items-center gap-2">
                                <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: CATEGORY_COLORS[d.name] }} />
                                <span className="font-semibold">{d.name}</span>
                              </div>
                              <p className="tabular-nums">{fmt(d.value)}</p>
                            </div>
                          );
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="flex flex-col gap-1.5 w-full min-w-0">
                {categoryBreakdown.slice(0, 6).map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[cat.name] ?? "hsl(var(--muted-foreground))" }} />
                      <span className="text-muted-foreground truncate">{cat.name}</span>
                    </div>
                    <span className="font-medium tabular-nums shrink-0">{fmtCompact(cat.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Table Card ── */}
      <Card>
        <CardHeader className="px-4 sm:px-6 pb-2">
          <CardTitle className="text-sm sm:text-base">Expense Records</CardTitle>
          <CardDescription className="text-xs">View and manage all expense entries</CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 h-9 text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-0.5 shrink-0 scrollbar-none">
              <Select value={categoryFilter} onValueChange={(v) => { setCategory(v); setPage(1); }}>
                <SelectTrigger className="w-36 h-9 text-xs shrink-0">
                  <Filter className="mr-1.5 h-3 w-3 shrink-0" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.keys(CATEGORY_COLORS).map((c) => (
                    <SelectItem key={c} value={c}>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[c] }} />
                        {c}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(v) => { setStatus(v); setPage(1); }}>
                <SelectTrigger className="w-32 h-9 text-xs shrink-0">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium text-sm">{e.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm">
                        {e.description}
                        {e.receipt && <FileText className="h-3 w-3 text-muted-foreground shrink-0" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[e.category] }} />
                        <CategoryIcon category={e.category} />
                        {e.category}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{e.vendor}</TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(e.date).toLocaleDateString("en-NG")}
                    </TableCell>
                    <TableCell><StatusBadge status={e.status} /></TableCell>
                    <TableCell className="text-right font-medium text-sm tabular-nums">{fmt(e.amount)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><FileText className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                          <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-border -mx-3">
            {paginated.map((e) => (
              <div key={e.id} className="px-3 py-3.5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-sm font-medium leading-tight">
                      <span className="truncate">{e.description}</span>
                      {e.receipt && <FileText className="h-3 w-3 text-muted-foreground shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{e.vendor}</p>
                  </div>
                  <span className="font-bold text-sm tabular-nums shrink-0">{fmtCompact(e.amount)}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[e.category] }} />
                      <CategoryIcon category={e.category} />
                      <span>{e.category}</span>
                    </div>
                    <span className="text-border">·</span>
                    <span className="shrink-0">{new Date(e.date).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <StatusBadge status={e.status} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><FileText className="mr-2 h-4 w-4" />View</DropdownMenuItem>
                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col xs:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-muted-foreground">
            <span>{start + 1}–{Math.min(start + PER_PAGE, filtered.length)} of {filtered.length} expenses</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0"
                onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>Page {page} of {totalPages}</span>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
