"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    name: "Total Revenue",
    value: "₦2,450,000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    name: "Total Customers",
    value: "856",
    change: "+23.1%",
    trend: "up",
    icon: Users,
  },
  {
    name: "Products Sold",
    value: "3,421",
    change: "-2.4%",
    trend: "down",
    icon: Package,
  },
]

const recentOrders = [
  { id: "ORD-001", customer: "Adebayo Johnson", amount: "₦45,000", status: "Completed", date: "Today, 2:30 PM" },
  { id: "ORD-002", customer: "Chioma Okafor", amount: "₦12,500", status: "Processing", date: "Today, 1:15 PM" },
  { id: "ORD-003", customer: "Emeka Nwosu", amount: "₦78,000", status: "Pending", date: "Today, 11:00 AM" },
  { id: "ORD-004", customer: "Fatima Ibrahim", amount: "₦23,400", status: "Completed", date: "Yesterday" },
  { id: "ORD-005", customer: "Gabriel Eze", amount: "₦56,700", status: "Completed", date: "Yesterday" },
]

const topProducts = [
  { name: "Premium Widget Pro", sold: 234, revenue: "₦567,000" },
  { name: "Basic Starter Kit", sold: 189, revenue: "₦234,500" },
  { name: "Enterprise Solution", sold: 156, revenue: "₦890,000" },
  { name: "Standard Package", sold: 134, revenue: "₦178,900" },
]

const statusColors = {
  Completed: "bg-green-500/10 text-green-600",
  Processing: "bg-blue-500/10 text-blue-600",
  Pending: "bg-yellow-500/10 text-yellow-600",
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with your business.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>
            <TrendingUp className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest customer orders</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {order.customer.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.id} · {order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      statusColors[order.status as keyof typeof statusColors]
                    }`}>
                      {order.status}
                    </span>
                    <span className="font-semibold text-foreground">{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/orders">
              <Button variant="ghost" className="w-full mt-4">
                View all orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling this month</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4"
                >
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-sm font-bold text-muted-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sold} sold</p>
                  </div>
                  <p className="font-semibold text-foreground">{product.revenue}</p>
                </div>
              ))}
            </div>
            <Link href="/dashboard/products">
              <Button variant="ghost" className="w-full mt-4">
                View all products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/orders">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <ShoppingCart className="h-6 w-6" />
                <span>New Order</span>
              </Button>
            </Link>
            <Link href="/dashboard/products">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <Package className="h-6 w-6" />
                <span>Add Product</span>
              </Button>
            </Link>
            <Link href="/dashboard/customers">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Add Customer</span>
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                <span>View Reports</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
