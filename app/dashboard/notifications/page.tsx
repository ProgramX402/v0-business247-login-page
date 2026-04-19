"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Search, CheckCheck, ShoppingCart, Users, AlertCircle, CreditCard, Megaphone, Trash2, Circle,  } from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationCategory = "all" | "orders" | "customers" | "finance" | "system" | "marketing";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  date: string;
  category: Exclude<NotificationCategory, "all">;
  read: boolean;
  priority: "high" | "medium" | "low";
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "New Order Received",
    message: "Order #ORD-2847 from Sarah Mitchell for $342.00 is awaiting processing.",
    time: "2 min ago",
    date: "Today",
    category: "orders",
    read: false,
    priority: "high",
  },
  {
    id: "n2",
    title: "Payment Failed",
    message: "Payment for Order #ORD-2841 from James Thornton failed. Card declined.",
    time: "18 min ago",
    date: "Today",
    category: "finance",
    read: false,
    priority: "high",
  },
  {
    id: "n3",
    title: "New Customer Registered",
    message: "Emily Carter just created an account and placed their first order.",
    time: "45 min ago",
    date: "Today",
    category: "customers",
    read: false,
    priority: "medium",
  },
  {
    id: "n4",
    title: "Low Stock Alert",
    message: "Product \"Wireless Headphones Pro\" has only 3 units remaining in inventory.",
    time: "1 hr ago",
    date: "Today",
    category: "system",
    read: false,
    priority: "high",
  },
  {
    id: "n5",
    title: "Campaign Performance",
    message: "Your Spring Sale campaign reached 12,400 impressions with a 4.2% click-through rate.",
    time: "3 hr ago",
    date: "Today",
    category: "marketing",
    read: true,
    priority: "low",
  },
  {
    id: "n6",
    title: "Order Shipped",
    message: "Order #ORD-2835 has been shipped via FedEx. Tracking: FX928374651.",
    time: "5 hr ago",
    date: "Today",
    category: "orders",
    read: true,
    priority: "low",
  },
  {
    id: "n7",
    title: "Monthly Revenue Report",
    message: "March 2025 revenue report is ready. Total revenue: $48,320 (+12% vs Feb).",
    time: "Yesterday",
    date: "Yesterday",
    category: "finance",
    read: true,
    priority: "medium",
  },
  {
    id: "n8",
    title: "Staff Account Created",
    message: "New staff account for \"David Nguyen\" (Manager) was created by Admin.",
    time: "Yesterday",
    date: "Yesterday",
    category: "system",
    read: true,
    priority: "low",
  },
  {
    id: "n9",
    title: "Abandoned Cart Alert",
    message: "3 customers abandoned their carts in the last 24 hours. Total value: $890.",
    time: "Yesterday",
    date: "Yesterday",
    category: "orders",
    read: true,
    priority: "medium",
  },
  {
    id: "n10",
    title: "Customer Review",
    message: "Marcus Johnson left a 5-star review: \"Excellent service and fast delivery!\"",
    time: "2 days ago",
    date: "Apr 17",
    category: "customers",
    read: true,
    priority: "low",
  },
  {
    id: "n11",
    title: "Email Campaign Sent",
    message: "\"Spring Deals\" email campaign was sent to 2,840 subscribers successfully.",
    time: "2 days ago",
    date: "Apr 17",
    category: "marketing",
    read: true,
    priority: "low",
  },
  {
    id: "n12",
    title: "Subscription Renewal",
    message: "Your Business Pro subscription renews in 7 days on April 26, 2025.",
    time: "3 days ago",
    date: "Apr 16",
    category: "system",
    read: true,
    priority: "medium",
  },
];

const categoryConfig: Record<Exclude<NotificationCategory, "all">, { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
  orders: { icon: ShoppingCart, color: "text-blue-500 bg-blue-50", label: "Orders" },
  customers: { icon: Users, color: "text-purple-500 bg-purple-50", label: "Customers" },
  finance: { icon: CreditCard, color: "text-emerald-600 bg-emerald-50", label: "Finance" },
  system: { icon: AlertCircle, color: "text-amber-500 bg-amber-50", label: "System" },
  marketing: { icon: Megaphone, color: "text-rose-500 bg-rose-50", label: "Marketing" },
};

const priorityBadge: Record<Notification["priority"], string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-slate-100 text-slate-600",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all");
  const [search, setSearch] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    const matchesTab = activeTab === "all" || n.category === activeTab;
    const matchesSearch =
      search === "" ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Group by date
  const grouped = filtered.reduce<Record<string, Notification[]>>((acc, n) => {
    if (!acc[n.date]) acc[n.date] = [];
    acc[n.date].push(n);
    return acc;
  }, {});

  const dateOrder = ["Today", "Yesterday", "Apr 17", "Apr 16"];
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => dateOrder.indexOf(a) - dateOrder.indexOf(b)
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead} className="gap-2 self-start sm:self-auto">
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: notifications.length, icon: Bell, color: "text-primary bg-primary/10" },
          { label: "Unread", value: unreadCount, icon: Circle, color: "text-red-500 bg-red-50" },
          { label: "Orders", value: notifications.filter((n) => n.category === "orders").length, icon: ShoppingCart, color: "text-blue-500 bg-blue-50" },
          { label: "High Priority", value: notifications.filter((n) => n.priority === "high").length, icon: AlertCircle, color: "text-amber-500 bg-amber-50" },
        ].map((stat) => (
          <Card key={stat.label} className="border border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={cn("p-2 rounded-lg", stat.color)}>
                <stat.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as NotificationCategory)}>
              <TabsList className="flex-wrap h-auto gap-1">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="orders" className="text-xs">Orders</TabsTrigger>
                <TabsTrigger value="customers" className="text-xs">Customers</TabsTrigger>
                <TabsTrigger value="finance" className="text-xs">Finance</TabsTrigger>
                <TabsTrigger value="system" className="text-xs">System</TabsTrigger>
                <TabsTrigger value="marketing" className="text-xs">Marketing</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                className="pl-9 h-9 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">No notifications found</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedDates.map((date) => (
                <div key={date}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{date}</p>
                  <div className="space-y-1">
                    {grouped[date].map((notification) => {
                      const catConfig = categoryConfig[notification.category];
                      const CatIcon = catConfig.icon;
                      return (
                        <div
                          key={notification.id}
                          className={cn(
                            "group flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer",
                            notification.read
                              ? "border-border bg-background hover:bg-accent/40" :"border-primary/20 bg-primary/5 hover:bg-primary/10"
                          )}
                          onClick={() => markRead(notification.id)}
                        >
                          {/* Icon */}
                          <div className={cn("p-2 rounded-lg flex-shrink-0 mt-0.5", catConfig.color)}>
                            <CatIcon className="h-4 w-4" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className={cn("text-sm font-semibold", notification.read ? "text-foreground" : "text-foreground")}>
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                )}
                                <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", priorityBadge[notification.priority])}>
                                  {notification.priority}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{notification.message}</p>
                            <div className="mt-2">
                              <Badge variant="outline" className="text-xs capitalize">
                                {catConfig.label}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
