"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  RotateCcw,
  Trash2,
  Eye,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for abandoned orders
const mockAbandonedOrders = [
  {
    id: "AORD-001",
    customer: "Segun Adeniyi",
    email: "segun@example.com",
    amount: "₦125,000",
    items: 4,
    cartValue: "₦125,000",
    abandonedDate: "3 days ago",
    lastViewed: "2 hours ago",
  },
  {
    id: "AORD-002",
    customer: "Grace Okafor",
    email: "grace@example.com",
    amount: "₦67,500",
    items: 2,
    cartValue: "₦67,500",
    abandonedDate: "1 week ago",
    lastViewed: "5 days ago",
  },
  {
    id: "AORD-003",
    customer: "Ibrahim Musa",
    email: "ibrahim@example.com",
    amount: "₦234,000",
    items: 7,
    cartValue: "₦234,000",
    abandonedDate: "2 days ago",
    lastViewed: "1 day ago",
  },
  {
    id: "AORD-004",
    customer: "Ameena Dada",
    email: "ameena@example.com",
    amount: "₦89,000",
    items: 3,
    cartValue: "₦89,000",
    abandonedDate: "5 days ago",
    lastViewed: "3 days ago",
  },
  {
    id: "AORD-005",
    customer: "Chukwuma Okoro",
    email: "chukwuma@example.com",
    amount: "₦156,500",
    items: 5,
    cartValue: "₦156,500",
    abandonedDate: "1 day ago",
    lastViewed: "12 hours ago",
  },
]

const AbandonedOrderCard = ({
  order,
  onAction,
}: {
  order: (typeof mockAbandonedOrders)[0]
  onAction: (action: string, orderId: string) => void
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border border-amber-500/20 bg-amber-500/5 hover:border-amber-500/50 transition-colors gap-4">
    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
      <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
        <span className="text-xs sm:text-sm font-medium text-amber-600">
          {order.customer.split(" ").map((n) => n[0]).join("")}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground text-sm sm:text-base">{order.customer}</p>
        <p className="text-xs sm:text-sm text-muted-foreground truncate">{order.email}</p>
        <p className="text-xs text-muted-foreground">
          {order.id} · {order.items} items · Abandoned {order.abandonedDate}
        </p>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="text-right">
        <p className="font-semibold text-foreground text-sm sm:text-base">{order.amount}</p>
        <p className="text-xs text-muted-foreground">Last seen {order.lastViewed}</p>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 sm:flex-none"
          onClick={() => onAction("sendReminder", order.id)}
        >
          <Mail className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Send Reminder</span>
          <span className="sm:hidden">Remind</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAction("view", order.id)}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("recover", order.id)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Recover Order
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onAction("delete", order.id)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
)

export default function AbandonedOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleOrderAction = (action: string, orderId: string) => {
    console.log(`[v0] Abandoned order action: ${action} on ${orderId}`)
    switch (action) {
      case "sendReminder":
        console.log(`[v0] Sending reminder email for ${orderId}`)
        break
      case "view":
        console.log(`[v0] Viewing details for ${orderId}`)
        break
      case "recover":
        console.log(`[v0] Recovering order ${orderId}`)
        break
      case "delete":
        console.log(`[v0] Deleting abandoned order ${orderId}`)
        break
    }
  }

  const totalAbandonedValue = mockAbandonedOrders.reduce(
    (sum, order) => sum + parseInt(order.amount.replace(/[^\d]/g, "")),
    0
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Abandoned Orders</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Recover lost revenue by reconnecting with customers who didn&apos;t complete their purchases
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search abandoned orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                {mockAbandonedOrders.length}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Abandoned</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">
                ₦{(totalAbandonedValue / 1000).toFixed(0)}K
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Potential Revenue</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                {mockAbandonedOrders.filter((o) => {
                  const daysDiff = Math.floor(Math.random() * 7)
                  return daysDiff <= 3
                }).length}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Last 3 Days</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hidden sm:block">
          <CardContent className="p-4">
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {mockAbandonedOrders.reduce((sum, order) => sum + parseInt(order.items), 0)}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Items</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Abandoned Orders List */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Abandoned Orders
            </CardTitle>
            <CardDescription>
              {mockAbandonedOrders.length} customers haven&apos;t completed their purchases
            </CardDescription>
          </div>
          <Button className="w-full sm:w-auto">
            <Mail className="mr-2 h-4 w-4" />
            Send Bulk Reminders
          </Button>
        </CardHeader>
        <CardContent>
          {mockAbandonedOrders.length > 0 ? (
            <div className="space-y-3">
              {mockAbandonedOrders.map((order) => (
                <AbandonedOrderCard
                  key={order.id}
                  order={order}
                  onAction={handleOrderAction}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
              <p className="text-muted-foreground">No abandoned orders</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recovery Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Recovery Tips</CardTitle>
          <CardDescription>Best practices to recover abandoned carts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-3 sm:p-4 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2">Send Timely Reminders</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Send a reminder email within the first hour of abandonment for best results.
              </p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2">Offer Incentives</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Include a special discount or free shipping offer to encourage completion.
              </p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2">Personalize Messages</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Use customer names and reference the specific items they left behind.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
