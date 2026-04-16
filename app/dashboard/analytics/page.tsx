"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
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
} from "recharts"
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
} from "lucide-react"

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
]

// Product category performance
const categoryData = [
  { category: "Electronics", sales: 4500000, units: 1234 },
  { category: "Fashion", sales: 2800000, units: 2567 },
  { category: "Home & Living", sales: 1950000, units: 987 },
  { category: "Health", sales: 1200000, units: 654 },
  { category: "Food", sales: 890000, units: 1456 },
]

// Traffic sources pie chart
const trafficData = [
  { source: "Direct", visitors: 4500, fill: "var(--color-direct)" },
  { source: "Social", visitors: 3200, fill: "var(--color-social)" },
  { source: "Search", visitors: 2800, fill: "var(--color-search)" },
  { source: "Referral", visitors: 1500, fill: "var(--color-referral)" },
]

// Customer acquisition data
const customerData = [
  { month: "Jan", new: 120, returning: 340 },
  { month: "Feb", new: 145, returning: 356 },
  { month: "Mar", new: 132, returning: 378 },
  { month: "Apr", new: 178, returning: 412 },
  { month: "May", new: 195, returning: 445 },
  { month: "Jun", new: 210, returning: 489 },
]

// Daily sales data for the week
const dailySalesData = [
  { day: "Mon", sales: 245000 },
  { day: "Tue", sales: 312000 },
  { day: "Wed", sales: 289000 },
  { day: "Thu", sales: 356000 },
  { day: "Fri", sales: 423000 },
  { day: "Sat", sales: 534000 },
  { day: "Sun", sales: 398000 },
]

// Top performing products
const topProducts = [
  { name: "Premium Widget Pro", revenue: 567000, growth: 23.5 },
  { name: "Enterprise Solution", revenue: 890000, growth: 18.2 },
  { name: "Basic Starter Kit", revenue: 234500, growth: -5.3 },
  { name: "Standard Package", revenue: 178900, growth: 12.8 },
  { name: "Pro Bundle", revenue: 456000, growth: 31.2 },
]

// Chart configurations
const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  orders: {
    label: "Orders",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const customerChartConfig = {
  new: {
    label: "New Customers",
    color: "var(--chart-1)",
  },
  returning: {
    label: "Returning Customers",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const trafficChartConfig = {
  visitors: {
    label: "Visitors",
  },
  direct: {
    label: "Direct",
    color: "var(--chart-1)",
  },
  social: {
    label: "Social",
    color: "var(--chart-2)",
  },
  search: {
    label: "Search",
    color: "var(--chart-3)",
  },
  referral: {
    label: "Referral",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const categoryChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const dailySalesChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

// Stats cards data
const stats = [
  {
    name: "Total Revenue",
    value: "₦36,050,000",
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
    name: "Total Customers",
    value: "8,456",
    change: "+23.1%",
    trend: "up",
    description: "vs last year",
    icon: Users,
  },
  {
    name: "Page Views",
    value: "245,890",
    change: "+8.7%",
    trend: "up",
    description: "vs last month",
    icon: Eye,
  },
]

function formatCurrency(value: number) {
  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(1)}M`
  }
  return `₦${(value / 1000).toFixed(0)}K`
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track your business performance and growth metrics.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue="12months">
            <SelectTrigger className="w-full sm:w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
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
              </div>
              <div className="mt-3 sm:mt-4">
                <p className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue and order trends for the year</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueChartConfig} className="h-[300px] sm:h-[350px] w-full">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={formatCurrency}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => {
                      if (name === "revenue") {
                        return [`₦${Number(value).toLocaleString()}`, "Revenue"]
                      }
                      return [value, name]
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
        </CardContent>
      </Card>

      {/* Two Column Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer Acquisition */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Acquisition</CardTitle>
            <CardDescription>New vs returning customers over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={customerChartConfig} className="h-[280px] w-full">
              <BarChart data={customerData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="new" fill="var(--color-new)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="returning" fill="var(--color-returning)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trafficChartConfig} className="h-[280px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={trafficData}
                  dataKey="visitors"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  strokeWidth={2}
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="source" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales by Category and Daily Sales */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Category Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue breakdown by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={categoryChartConfig} className="h-[280px] w-full">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
                <YAxis
                  dataKey="category"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`₦${Number(value).toLocaleString()}`, "Sales"]}
                    />
                  }
                />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Daily Sales */}
        <Card>
          <CardHeader>
            <CardTitle>This Week</CardTitle>
            <CardDescription>Daily sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={dailySalesChartConfig} className="h-[280px] w-full">
              <LineChart data={dailySalesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={formatCurrency} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`₦${Number(value).toLocaleString()}`, "Sales"]}
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
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Products with the highest revenue this period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg bg-muted/50 gap-3"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Revenue: ₦{product.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    product.growth > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.growth > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {product.growth > 0 ? "+" : ""}
                  {product.growth}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights Section */}
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insights">Key Insights</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="insights" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-foreground">Revenue Growth</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your revenue has increased by 18.2% compared to last year, with December
                    being your strongest month.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Customer Retention</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Returning customers account for 70% of your orders, indicating strong
                    customer loyalty.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingCart className="h-5 w-5 text-chart-2" />
                    <span className="font-medium text-foreground">Peak Sales Day</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Saturday is your best performing day with an average of ₦534,000 in sales.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-foreground">Upward Trend</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Electronics category shows consistent month-over-month growth of 15%.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Traffic Increase</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Social media referrals have grown by 45% since launching new campaigns.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-chart-4" />
                    <span className="font-medium text-foreground">AOV Trend</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Average order value has increased from ₦18,500 to ₦21,200 this quarter.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recommendations" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Focus on Electronics</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Expand your electronics inventory as it generates 40% of total revenue.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Megaphone className="h-5 w-5 text-chart-2" />
                    <span className="font-medium text-foreground">Social Marketing</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Increase social media ad spend during weekends when conversion rates peak.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-foreground">Loyalty Program</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consider a loyalty program to further increase your already strong retention
                    rate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
