"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for orders
const mockOrders = {
  pending: [
    {
      id: "ORD-001",
      customer: "Adebayo Johnson",
      email: "adebayo@example.com",
      amount: "₦45,000",
      items: 3,
      date: "Today, 2:30 PM",
      status: "Pending",
    },
    {
      id: "ORD-003",
      customer: "Emeka Nwosu",
      email: "emeka@example.com",
      amount: "₦78,000",
      items: 5,
      date: "Today, 11:00 AM",
      status: "Pending",
    },
    {
      id: "ORD-006",
      customer: "Zainab Hassan",
      email: "zainab@example.com",
      amount: "₦34,500",
      items: 2,
      date: "Yesterday, 4:20 PM",
      status: "Pending",
    },
  ],
  processing: [
    {
      id: "ORD-002",
      customer: "Chioma Okafor",
      email: "chioma@example.com",
      amount: "₦12,500",
      items: 1,
      date: "Today, 1:15 PM",
      status: "Processing",
    },
    {
      id: "ORD-004",
      customer: "Fatima Ibrahim",
      email: "fatima@example.com",
      amount: "₦23,400",
      items: 4,
      date: "Yesterday, 3:10 PM",
      status: "Processing",
    },
  ],
  completed: [
    {
      id: "ORD-005",
      customer: "Gabriel Eze",
      email: "gabriel@example.com",
      amount: "₦56,700",
      items: 3,
      date: "2 days ago",
      status: "Completed",
    },
    {
      id: "ORD-007",
      customer: "Victoria Obi",
      email: "victoria@example.com",
      amount: "₦89,200",
      items: 6,
      date: "3 days ago",
      status: "Completed",
    },
    {
      id: "ORD-008",
      customer: "Kunle Adeyemi",
      email: "kunle@example.com",
      amount: "₦41,100",
      items: 2,
      date: "5 days ago",
      status: "Completed",
    },
  ],
}

const OrderCard = ({ order, onAction }: { order: (typeof mockOrders.pending)[0]; onAction: (action: string, orderId: string) => void }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border border-border hover:border-primary/50 transition-colors gap-4">
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-xs sm:text-sm font-medium text-primary">
          {order.customer.split(" ").map((n) => n[0]).join("")}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground text-sm sm:text-base">{order.customer}</p>
        <p className="text-xs sm:text-sm text-muted-foreground truncate">{order.email}</p>
        <p className="text-xs text-muted-foreground">{order.id} · {order.items} items</p>
      </div>
    </div>
    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-13 sm:pl-0">
      <div className="text-right">
        <p className="font-semibold text-foreground text-sm sm:text-base">{order.amount}</p>
        <p className="text-xs text-muted-foreground">{order.date}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onAction("view", order.id)}>
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction("edit", order.id)}>
            Edit Order
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction("download", order.id)}>
            Download Invoice
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
)

const PendingOrderCard = ({ order, onAction }: { order: (typeof mockOrders.pending)[0]; onAction: (action: string, orderId: string) => void }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border border-border hover:border-primary/50 transition-colors gap-4">
    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-xs sm:text-sm font-medium text-primary">
          {order.customer.split(" ").map((n) => n[0]).join("")}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground text-sm sm:text-base">{order.customer}</p>
        <p className="text-xs sm:text-sm text-muted-foreground truncate">{order.email}</p>
        <p className="text-xs text-muted-foreground">{order.id} · {order.items} items</p>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <div className="text-right">
        <p className="font-semibold text-foreground text-sm sm:text-base">{order.amount}</p>
        <p className="text-xs text-muted-foreground">{order.date}</p>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 sm:flex-none"
          onClick={() => onAction("reject", order.id)}
        >
          <XCircle className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Reject</span>
        </Button>
        <Button
          size="sm"
          className="flex-1 sm:flex-none"
          onClick={() => onAction("accept", order.id)}
        >
          <CheckCircle2 className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Accept</span>
        </Button>
      </div>
    </div>
  </div>
)

const ProcessingOrderCard = ({ order, onAction }: { order: (typeof mockOrders.processing)[0]; onAction: (action: string, orderId: string) => void }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border border-border hover:border-primary/50 transition-colors gap-4">
    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
      <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
        <span className="text-xs sm:text-sm font-medium text-blue-600">
          {order.customer.split(" ").map((n) => n[0]).join("")}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground text-sm sm:text-base">{order.customer}</p>
        <p className="text-xs sm:text-sm text-muted-foreground truncate">{order.email}</p>
        <p className="text-xs text-muted-foreground">{order.id} · {order.items} items</p>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <div className="text-right">
        <p className="font-semibold text-foreground text-sm sm:text-base">{order.amount}</p>
        <p className="text-xs text-muted-foreground">{order.date}</p>
      </div>
      <Button
        size="sm"
        className="w-full sm:w-auto"
        onClick={() => onAction("complete", order.id)}
      >
        <CheckCircle2 className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Mark Complete</span>
        <span className="sm:hidden">Complete</span>
      </Button>
    </div>
  </div>
)

const CompletedOrderCard = ({ order, onAction }: { order: (typeof mockOrders.completed)[0]; onAction: (action: string, orderId: string) => void }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border border-border bg-green-500/5 hover:border-green-500/50 transition-colors gap-4">
    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
      <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground text-sm sm:text-base">{order.customer}</p>
        <p className="text-xs sm:text-sm text-muted-foreground truncate">{order.email}</p>
        <p className="text-xs text-muted-foreground">{order.id} · {order.items} items</p>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <div className="text-right">
        <p className="font-semibold text-foreground text-sm sm:text-base">{order.amount}</p>
        <p className="text-xs text-muted-foreground">{order.date}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onAction("view", order.id)}>
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction("download", order.id)}>
            Download Invoice
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
)

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleOrderAction = (action: string, orderId: string) => {
    console.log(`[v0] Order action: ${action} on ${orderId}`)
    // Handle the action
    switch (action) {
      case "accept":
        console.log(`[v0] Accepting order ${orderId}`)
        break
      case "reject":
        console.log(`[v0] Rejecting order ${orderId}`)
        break
      case "complete":
        console.log(`[v0] Marking order ${orderId} as complete`)
        break
      case "view":
        console.log(`[v0] Viewing details for order ${orderId}`)
        break
      case "edit":
        console.log(`[v0] Editing order ${orderId}`)
        break
      case "download":
        console.log(`[v0] Downloading invoice for order ${orderId}`)
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage and track all your customer orders</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="w-full sm:w-auto">Create Order</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-3 sm:gap-4 grid-cols-3 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{mockOrders.pending.length}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">{mockOrders.processing.length}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Processing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold text-green-600">{mockOrders.completed.length}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hidden sm:block">
          <CardContent className="p-4">
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">
                ₦{(
                  [...mockOrders.pending, ...mockOrders.processing, ...mockOrders.completed]
                    .reduce((sum, order) => sum + parseInt(order.amount.replace(/[^\d]/g, "")), 0) / 1000
                ).toFixed(0)}K
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>View and manage orders by status</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4 hidden sm:block" />
                <span>Pending</span>
                <Badge variant="secondary" className="ml-1">{mockOrders.pending.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="processing" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 hidden sm:block" />
                <span>Processing</span>
                <Badge variant="secondary" className="ml-1">{mockOrders.processing.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 hidden sm:block" />
                <span>Completed</span>
                <Badge variant="secondary" className="ml-1">{mockOrders.completed.length}</Badge>
              </TabsTrigger>
            </TabsList>

            {/* Pending Tab */}
            <TabsContent value="pending" className="space-y-3">
              {mockOrders.pending.length > 0 ? (
                <>
                  {mockOrders.pending.map((order) => (
                    <PendingOrderCard
                      key={order.id}
                      order={order}
                      onAction={handleOrderAction}
                    />
                  ))}
                </>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
                  <p className="text-muted-foreground">No pending orders</p>
                </div>
              )}
            </TabsContent>

            {/* Processing Tab */}
            <TabsContent value="processing" className="space-y-3">
              {mockOrders.processing.length > 0 ? (
                <>
                  {mockOrders.processing.map((order) => (
                    <ProcessingOrderCard
                      key={order.id}
                      order={order}
                      onAction={handleOrderAction}
                    />
                  ))}
                </>
              ) : (
                <div className="text-center py-8">
                  <ArrowRight className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
                  <p className="text-muted-foreground">No orders being processed</p>
                </div>
              )}
            </TabsContent>

            {/* Completed Tab */}
            <TabsContent value="completed" className="space-y-3">
              {mockOrders.completed.length > 0 ? (
                <>
                  {mockOrders.completed.map((order) => (
                    <CompletedOrderCard
                      key={order.id}
                      order={order}
                      onAction={handleOrderAction}
                    />
                  ))}
                </>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
                  <p className="text-muted-foreground">No completed orders</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
