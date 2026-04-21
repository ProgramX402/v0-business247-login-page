"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Search,
  Filter,
  MoreHorizontal,
  TrendingUp,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
};

// Shared avatar initials helper
function Initials({ name, className }: { name: string; className?: string }) {
  return (
    <span className={`text-xs font-semibold ${className}`}>
      {name.split(" ").map((n) => n[0]).join("")}
    </span>
  );
}

// Shared customer info block
function CustomerInfo({ order }: { order: (typeof mockOrders.pending)[0] }) {
  return (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Initials name={order.customer} className="text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground text-sm truncate">{order.customer}</p>
        <p className="text-xs text-muted-foreground truncate">{order.email}</p>
        <p className="text-xs text-muted-foreground">
          {order.id} · {order.items} item{order.items !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

// Amount + date block
function AmountBlock({ order }: { order: (typeof mockOrders.pending)[0] }) {
  return (
    <div className="text-right shrink-0">
      <p className="font-semibold text-foreground text-sm">{order.amount}</p>
      <p className="text-xs text-muted-foreground">{order.date}</p>
    </div>
  );
}

// Base card shell
function OrderShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-3 p-3 sm:p-4 rounded-lg border border-border transition-colors ${className}`}
    >
      {children}
    </div>
  );
}

// --- Card variants ---

const PendingOrderCard = ({
  order,
  onAction,
}: {
  order: (typeof mockOrders.pending)[0];
  onAction: (action: string, orderId: string) => void;
}) => (
  <OrderShell className="hover:border-yellow-500/40">
    {/* Row 1: avatar + info + amount */}
    <div className="flex items-start justify-between gap-3">
      <CustomerInfo order={order} />
      <AmountBlock order={order} />
    </div>
    {/* Row 2: action buttons — always full-width on mobile, auto on sm+ */}
    <div className="flex gap-2 sm:justify-end">
      <Button
        size="sm"
        variant="outline"
        className="flex-1 sm:flex-none"
        onClick={() => onAction("reject", order.id)}
      >
        <XCircle className="h-4 w-4 mr-1.5" />
        Reject
      </Button>
      <Button
        size="sm"
        className="flex-1 sm:flex-none"
        onClick={() => onAction("accept", order.id)}
      >
        <CheckCircle2 className="h-4 w-4 mr-1.5" />
        Accept
      </Button>
    </div>
  </OrderShell>
);

const ProcessingOrderCard = ({
  order,
  onAction,
}: {
  order: (typeof mockOrders.processing)[0];
  onAction: (action: string, orderId: string) => void;
}) => (
  <OrderShell className="hover:border-blue-500/40">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
          <Initials name={order.customer} className="text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground text-sm truncate">{order.customer}</p>
          <p className="text-xs text-muted-foreground truncate">{order.email}</p>
          <p className="text-xs text-muted-foreground">
            {order.id} · {order.items} item{order.items !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <AmountBlock order={order} />
    </div>
    <div className="flex sm:justify-end">
      <Button
        size="sm"
        className="flex-1 sm:flex-none"
        onClick={() => onAction("complete", order.id)}
      >
        <CheckCircle2 className="h-4 w-4 mr-1.5" />
        Mark Complete
      </Button>
    </div>
  </OrderShell>
);

const CompletedOrderCard = ({
  order,
  onAction,
}: {
  order: (typeof mockOrders.completed)[0];
  onAction: (action: string, orderId: string) => void;
}) => (
  <OrderShell className="bg-green-500/5 hover:border-green-500/40">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground text-sm truncate">{order.customer}</p>
          <p className="text-xs text-muted-foreground truncate">{order.email}</p>
          <p className="text-xs text-muted-foreground">
            {order.id} · {order.items} item{order.items !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      {/* Amount + menu side by side */}
      <div className="flex items-center gap-1 shrink-0">
        <AmountBlock order={order} />
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
  </OrderShell>
);

// Total revenue calc
const totalRevenue =
  [...mockOrders.pending, ...mockOrders.processing, ...mockOrders.completed].reduce(
    (sum, order) => sum + parseInt(order.amount.replace(/[^\d]/g, ""), 10),
    0
  ) / 1000;

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleOrderAction = (action: string, orderId: string) => {
    console.log(`Order action: ${action} on ${orderId}`);
  };

  return (
    <div className="space-y-5 p-4 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage and track all your customer orders
          </p>
        </div>

        {/* Search + actions row */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Filter className="h-4 w-4 sm:mr-2" />
              <span className="sm:inline hidden">Filters</span>
            </Button>
            <Button className="flex-1 sm:flex-none">
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="sm:inline hidden">Create Order</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats — 2×2 on mobile, 4-col on sm+ */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">{mockOrders.pending.length}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Pending</p>
              </div>
              <Clock className="h-5 w-5 text-yellow-600/40 shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{mockOrders.processing.length}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Processing</p>
              </div>
              <ArrowRight className="h-5 w-5 text-blue-600/40 shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{mockOrders.completed.length}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Completed</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-green-600/40 shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">₦{totalRevenue.toFixed(0)}K</p>
                <p className="text-xs text-muted-foreground mt-0.5">Revenue</p>
              </div>
              <TrendingUp className="h-5 w-5 text-foreground/30 shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Tabs */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>All Orders</CardTitle>
          <CardDescription>View and manage orders by status</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            {/* Tabs scroll on very small screens */}
            <div className="overflow-x-auto -mx-1 px-1 mb-5">
              <TabsList className="inline-flex w-full min-w-[280px] grid-cols-3 sm:grid sm:w-full">
                <TabsTrigger value="pending" className="flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm">
                  <Clock className="h-3.5 w-3.5 hidden sm:block shrink-0" />
                  Pending
                  <Badge variant="secondary" className="ml-0.5 text-xs px-1.5 py-0 min-w-[20px]">
                    {mockOrders.pending.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="processing" className="flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm">
                  <ArrowRight className="h-3.5 w-3.5 hidden sm:block shrink-0" />
                  Processing
                  <Badge variant="secondary" className="ml-0.5 text-xs px-1.5 py-0 min-w-[20px]">
                    {mockOrders.processing.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 hidden sm:block shrink-0" />
                  Completed
                  <Badge variant="secondary" className="ml-0.5 text-xs px-1.5 py-0 min-w-[20px]">
                    {mockOrders.completed.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="pending" className="space-y-3 mt-0">
              {mockOrders.pending.length > 0 ? (
                mockOrders.pending.map((order) => (
                  <PendingOrderCard key={order.id} order={order} onAction={handleOrderAction} />
                ))
              ) : (
                <EmptyState icon={Clock} message="No pending orders" />
              )}
            </TabsContent>

            <TabsContent value="processing" className="space-y-3 mt-0">
              {mockOrders.processing.length > 0 ? (
                mockOrders.processing.map((order) => (
                  <ProcessingOrderCard key={order.id} order={order} onAction={handleOrderAction} />
                ))
              ) : (
                <EmptyState icon={ArrowRight} message="No orders being processed" />
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3 mt-0">
              {mockOrders.completed.length > 0 ? (
                mockOrders.completed.map((order) => (
                  <CompletedOrderCard key={order.id} order={order} onAction={handleOrderAction} />
                ))
              ) : (
                <EmptyState icon={CheckCircle2} message="No completed orders" />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  message,
}: {
  icon: React.ElementType;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="h-10 w-10 text-muted-foreground/30 mb-3" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
