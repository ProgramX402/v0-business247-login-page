"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Download,
  Calendar,
  Target,
  Megaphone,
} from "lucide-react";

// Revenue data for area chart
const revenueData = [
  { month: "Jan", revenue: 1850000, orders: 892 },
  { month: "Feb", revenue: 2100000, orders: 1023 },
  { month: "Mar", revenue: 1950000, orders: 967 },
  { month: "Apr", revenue: 2450000, orders: 1234 },
  { month: "May", revenue: 2800000, orders: 1456 },
  { month: "Jun", revenue: 3100000, orders: 1587 },
  { month: "Jul", revenue: 2900000, orders: 1423 },
  { month: "Aug", revenue: 3400000, orders: 1689 },
  { month: "Sep", revenue: 3200000, orders: 1567 },
  { month: "Oct", revenue: 3650000, orders: 1789 },
  { month: "Nov", revenue: 4100000, orders: 1956 },
  { month: "Dec", revenue: 4500000, orders: 2134 },
];

const categoryData = [
  { category: "Electronics", sales: 4500000, units: 1234 },
  { category: "Fashion", sales: 2800000, units: 2567 },
  { category: "Home & Living", sales: 1950000, units: 987 },
  { category: "Health", sales: 1200000, units: 654 },
  { category: "Food", sales: 890000, units: 1456 },
];

const trafficData = [
  { source: "Direct", visitors: 4500, fill: "var(--color-direct)" },
  { source: "Social", visitors: 3200, fill: "var(--color-social)" },
  { source: "Search", visitors: 2800, fill: "var(--color-search)" },
  { source: "Referral", visitors: 1500, fill: "var(--color-referral)" },
];

const customerData = [
  { month: "Jan", new: 120, returning: 340 },
  { month: "Feb", new: 145, returning: 356 },
  { month: "Mar", new: 132, returning: 378 },
  { month: "Apr", new: 178, returning: 412 },
  { month: "May", new: 195, returning: 445 },
  { month: "Jun", new: 210, returning: 489 },
];

const dailySalesData = [
  { day: "Mon", sales: 245000 },
  { day: "Tue", sales: 312000 },
  { day: "Wed", sales: 289000 },
  { day: "Thu", sales: 356000 },
  { day: "Fri", sales: 423000 },
  { day: "Sat", sales: 534000 },
  { day: "Sun", sales: 398000 },
];

const topProducts = [
  { name: "Premium Widget Pro", revenue: 567000, growth: 23.5 },
  { name: "Enterprise Solution", revenue: 890000, growth: 18.2 },
  { name: "Basic Starter Kit", revenue: 234500, growth: -5.3 },
  { name: "Standard Package", revenue: 178900, growth: 12.8 },
  { name: "Pro Bundle", revenue: 456000, growth: 31.2 },
];

const revenueChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  orders: { label: "Orders", color: "var(--chart-2)" },
} satisfies ChartConfig;

const customerChartConfig = {
  new: { label: "New Customers", color: "var(--chart-1)" },
  returning: { label: "Returning Customers", color: "var(--chart-4)" },
} satisfies ChartConfig;

const trafficChartConfig = {
  visitors: { label: "Visitors" },
  direct: { label: "Direct", color: "var(--chart-1)" },
  social: { label: "Social", color: "var(--chart-2)" },
  search: { label: "Search", color: "var(--chart-3)" },
  referral: { label: "Referral", color: "var(--chart-4)" },
} satisfies ChartConfig;

const categoryChartConfig = {
  sales: { label: "Sales", color: "var(--chart-1)" },
} satisfies ChartConfig;

const dailySalesChartConfig = {
  sales: { label: "Sales", color: "var(--chart-1)" },
} satisfies ChartConfig;

const stats = [
  {
    name: "Total Revenue",
    value: "₦36.05M",
    change: "+18.2%",
    trend: "up",
    description: "vs last year",
    icon: DollarSign,
  },
  {
    name: "Total Orders",
    value: "16,717",
    change: "+12.5%",
    trend: "up",
    description: "vs last year",
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    value: "8,456",
    change: "+23.1%",
    trend: "up",
    description: "vs last year",
    icon: Users,
  },
  {
    name: "Page Views",
    value: "245.9K",
    change: "+8.7%",
    trend: "up",
    description: "vs last month",
    icon: Eye,
  },
];

function formatCurrency(value: number) {
  if (value >= 1000000) return `₦${(value / 1000000).toFixed(1)}M`;
  return `₦${(value / 1000).toFixed(0)}K`;
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-5 sm:space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track your business performance and growth metrics.
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="12months">
            <SelectTrigger className="flex-1 sm:flex-none sm:w-[180px] min-w-0">
              <Calendar className="mr-2 h-4 w-4 shrink-0" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="shrink-0">
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <div
                  className={`flex items-center gap-0.5 text-xs font-semibold whitespace-nowrap ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 shrink-0" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{stat.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Overview */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue and order trends for the year</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 px-2 sm:px-6">
          <div className="w-full min-w-0 overflow-hidden">
          <ChartContainer config={revenueChartConfig} className="h-[260px] sm:h-[320px] w-full">
            <AreaChart
              data={revenueData}
              margin={{ top: 10, right: 2, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                width={52}
                tick={{ fontSize: 11 }}
                tickFormatter={formatCurrency}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => {
                      if (name === "revenue") {
                        return [`₦${Number(value).toLocaleString()}`, "Revenue"];
                      }
                      return [value, name];
                    }}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                fill="url(#fillRevenue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Charts */}
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
        {/* Customer Acquisition */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Customer Acquisition</CardTitle>
            <CardDescription>New vs returning customers over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 px-2 sm:px-6">
            <div className="w-full min-w-0 overflow-hidden">
            <ChartContainer config={customerChartConfig} className="h-[240px] sm:h-[260px] w-full">
              <BarChart
                data={customerData}
                margin={{ top: 10, right: 4, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  width={36}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="new" fill="var(--color-new)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="returning" fill="var(--color-returning)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="w-full min-w-0 overflow-hidden">
            <ChartContainer config={trafficChartConfig} className="h-[240px] sm:h-[260px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={trafficData}
                  dataKey="visitors"
                  nameKey="source"
                  cx="50%"
                  cy="48%"
                  innerRadius={55}
                  outerRadius={85}
                  strokeWidth={2}
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="source" />}
                  className="flex-wrap gap-x-4 gap-y-1 justify-center mt-1"
                />
              </PieChart>
            </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales by Category and Daily Sales */}
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
        {/* Category Performance */}
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue breakdown by product category</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 px-2 sm:px-6">
            <div className="w-full min-w-0 overflow-hidden">
            <ChartContainer config={categoryChartConfig} className="h-[260px] sm:h-[280px] w-full">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ top: 10, right: 8, left: 4, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatCurrency}
                  tick={{ fontSize: 11 }}
                  tickMargin={4}
                />
                <YAxis
                  dataKey="category"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={76}
                  tick={{ fontSize: 11 }}
                  tickMargin={4}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [
                        `₦${Number(value).toLocaleString()}`,
                        "Sales",
                      ]}
                    />
                  }
                />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Daily Sales */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>This Week</CardTitle>
            <CardDescription>Daily sales performance</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 px-2 sm:px-6">
            <div className="w-full min-w-0 overflow-hidden">
            <ChartContainer config={dailySalesChartConfig} className="h-[260px] sm:h-[280px] w-full">
              <LineChart
                data={dailySalesData}
                margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  width={46}
                  tick={{ fontSize: 11 }}
                  tickFormatter={formatCurrency}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [
                        `₦${Number(value).toLocaleString()}`,
                        "Sales",
                      ]}
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-sales)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Products with the highest revenue this period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-lg bg-muted/50"
              >
                {/* Rank + Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm sm:text-base truncate">
                      {product.name}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      ₦{product.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Growth badge */}
                <div
                  className={`flex items-center gap-1 text-xs sm:text-sm font-semibold shrink-0 px-2 py-1 rounded-md ${
                    product.growth > 0
                      ? "text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-950"
                      : "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950"
                  }`}
                >
                  {product.growth > 0 ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  {product.growth > 0 ? "+" : ""}
                  {product.growth}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights Tabs */}
      <Tabs defaultValue="insights" className="w-full">
        {/* On mobile, allow tabs to scroll horizontally rather than cramming */}
        <div className="overflow-x-auto -mx-0.5 px-0.5">
          <TabsList className="inline-flex w-full min-w-[300px] grid-cols-3 sm:grid sm:w-full">
            <TabsTrigger value="insights" className="flex-1 text-xs sm:text-sm">
              Key Insights
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex-1 text-xs sm:text-sm">
              Trends
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex-1 text-xs sm:text-sm">
              Recommendations
            </TabsTrigger>
          </TabsList>
        </div>

        {[
          {
            value: "insights",
            items: [
              {
                icon: TrendingUp,
                iconClass: "text-green-600",
                title: "Revenue Growth",
                text: "Your revenue has increased by 18.2% compared to last year, with December being your strongest month.",
              },
              {
                icon: Users,
                iconClass: "text-primary",
                title: "Customer Retention",
                text: "Returning customers account for 70% of your orders, indicating strong customer loyalty.",
              },
              {
                icon: ShoppingCart,
                iconClass: "text-chart-2",
                title: "Peak Sales Day",
                text: "Saturday is your best performing day with an average of ₦534,000 in sales.",
              },
            ],
          },
          {
            value: "trends",
            items: [
              {
                icon: TrendingUp,
                iconClass: "text-green-600",
                title: "Upward Trend",
                text: "Electronics category shows consistent month-over-month growth of 15%.",
              },
              {
                icon: Eye,
                iconClass: "text-primary",
                title: "Traffic Increase",
                text: "Social media referrals have grown by 45% since launching new campaigns.",
              },
              {
                icon: DollarSign,
                iconClass: "text-chart-4",
                title: "AOV Trend",
                text: "Average order value has increased from ₦18,500 to ₦21,200 this quarter.",
              },
            ],
          },
          {
            value: "recommendations",
            items: [
              {
                icon: Target,
                iconClass: "text-primary",
                title: "Focus on Electronics",
                text: "Expand your electronics inventory as it generates 40% of total revenue.",
              },
              {
                icon: Megaphone,
                iconClass: "text-chart-2",
                title: "Social Marketing",
                text: "Increase social media ad spend during weekends when conversion rates peak.",
              },
              {
                icon: Users,
                iconClass: "text-green-600",
                title: "Loyalty Program",
                text: "Consider a loyalty program to further increase your already strong retention rate.",
              },
            ],
          },
        ].map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tab.items.map((item) => (
                    <div
                      key={item.title}
                      className="p-4 rounded-lg border border-border bg-card"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className={`h-5 w-5 shrink-0 ${item.iconClass}`} />
                        <span className="font-medium text-foreground text-sm">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
