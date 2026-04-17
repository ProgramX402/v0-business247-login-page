"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MoreHorizontal, Plus, Edit, Trash2, TrendingUp, Store, Eye, AlertCircle, CheckCircle2, BarChart, Users, ShoppingBag,  } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock sales channels data
const mockChannels = [
  {
    id: "CH-001",
    name: "Amazon",
    type: "Marketplace",
    status: "Active",
    revenue: "₦45,320,000",
    orders: 1250,
    products: 340,
    customers: 8500,
    avgOrderValue: "₦36,256",
    conversionRate: "8.5%",
    growthRate: "+12.3%",
    lastSync: "2024-07-25",
  },
  {
    id: "CH-002",
    name: "Shopify Store",
    type: "Direct",
    status: "Active",
    revenue: "₦32,150,000",
    orders: 920,
    products: 420,
    customers: 6200,
    avgOrderValue: "₦34,945",
    conversionRate: "6.2%",
    growthRate: "+8.7%",
    lastSync: "2024-07-25",
  },
  {
    id: "CH-003",
    name: "eBay",
    type: "Marketplace",
    status: "Active",
    revenue: "₦28,750,000",
    orders: 850,
    products: 285,
    customers: 5400,
    avgOrderValue: "₦33,824",
    conversionRate: "7.1%",
    growthRate: "+5.4%",
    lastSync: "2024-07-25",
  },
  {
    id: "CH-004",
    name: "Instagram Shop",
    type: "Social",
    status: "Active",
    revenue: "₦18,900,000",
    orders: 520,
    products: 150,
    customers: 3200,
    avgOrderValue: "₦36,346",
    conversionRate: "4.8%",
    growthRate: "+15.2%",
    lastSync: "2024-07-24",
  },
  {
    id: "CH-005",
    name: "Facebook Shop",
    type: "Social",
    status: "Active",
    revenue: "₦15,680,000",
    orders: 420,
    products: 200,
    customers: 2800,
    avgOrderValue: "₦37,333",
    conversionRate: "3.9%",
    growthRate: "+9.1%",
    lastSync: "2024-07-24",
  },
  {
    id: "CH-006",
    name: "Jumia",
    type: "Marketplace",
    status: "Active",
    revenue: "₦22,560,000",
    orders: 680,
    products: 380,
    customers: 4200,
    avgOrderValue: "₦33,176",
    conversionRate: "5.7%",
    growthRate: "+3.2%",
    lastSync: "2024-07-25",
  },
  {
    id: "CH-007",
    name: "TikTok Shop",
    type: "Social",
    status: "Pending",
    revenue: "₦0",
    orders: 0,
    products: 120,
    customers: 0,
    avgOrderValue: "₦0",
    conversionRate: "0%",
    growthRate: "0%",
    lastSync: "2024-07-20",
  },
  {
    id: "CH-008",
    name: "Google Shopping",
    type: "Ads",
    status: "Active",
    revenue: "₦19,240,000",
    orders: 580,
    products: 420,
    customers: 3800,
    avgOrderValue: "₦33,172",
    conversionRate: "6.4%",
    growthRate: "+11.8%",
    lastSync: "2024-07-25",
  },
]

export default function SalesChannelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Segment channels by status
  const getChannelsByStatus = (status: string) => {
    switch (status) {
      case "all":
        return mockChannels
      case "active":
        return mockChannels.filter((c) => c.status === "Active")
      case "pending":
        return mockChannels.filter((c) => c.status === "Pending")
      case "inactive":
        return mockChannels.filter((c) => c.status === "Inactive")
      default:
        return mockChannels
    }
  }

  const filteredChannels = getChannelsByStatus(activeTab).filter((channel) => {
    return channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const channelTypes = ["All", ...new Set(mockChannels.map((c) => c.type))]
  const totalRevenue = mockChannels.reduce((sum, c) => {
    return sum + parseInt(c.revenue.replace(/[^\d]/g, ""))
  }, 0)
  const totalOrders = mockChannels.reduce((sum, c) => sum + c.orders, 0)
  const totalCustomers = mockChannels.reduce((sum, c) => sum + c.customers, 0)
  const activeChannels = mockChannels.filter((c) => c.status === "Active").length

  const ChannelRow = ({ channel }: { channel: typeof mockChannels[0] }) => (
    <tr className="border-b hover:bg-muted/50 transition-colors">
      <td className="px-3 sm:px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Store className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{channel.name}</p>
            <p className="text-xs text-muted-foreground">{channel.id}</p>
          </div>
        </div>
      </td>
      <td className="px-3 sm:px-6 py-4 hidden sm:table-cell text-sm">
        <Badge variant="outline">{channel.type}</Badge>
      </td>
      <td className="px-3 sm:px-6 py-4 hidden md:table-cell text-sm text-muted-foreground">
        {channel.orders}
      </td>
      <td className="px-3 sm:px-6 py-4 hidden lg:table-cell text-sm text-muted-foreground">
        {channel.customers}
      </td>
      <td className="px-3 sm:px-6 py-4 text-sm font-medium">{channel.revenue}</td>
      <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
        <Badge
          variant={channel.status === "Active" ? "default" : channel.status === "Pending" ? "secondary" : "outline"}
          className={
            channel.status === "Active"
              ? "bg-green-600 hover:bg-green-700"
              : channel.status === "Pending"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : ""
          }
        >
          {channel.status}
        </Badge>
      </td>
      <td className="px-3 sm:px-6 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <Eye className="h-4 w-4 mr-2" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <BarChart className="h-4 w-4 mr-2" /> Analytics
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-600">
              <Trash2 className="h-4 w-4 mr-2" /> Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )

  const ChannelCard = ({ channel }: { channel: typeof mockChannels[0] }) => (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{channel.name}</p>
              <p className="text-xs text-muted-foreground">{channel.type}</p>
            </div>
          </div>
          <Badge
            variant={channel.status === "Active" ? "default" : channel.status === "Pending" ? "secondary" : "outline"}
            className={
              channel.status === "Active"
                ? "bg-green-600 hover:bg-green-700"
                : channel.status === "Pending"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : ""
            }
          >
            {channel.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Revenue</p>
            <p className="font-semibold text-sm">{channel.revenue}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Orders</p>
            <p className="font-semibold text-sm">{channel.orders}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Customers</p>
            <p className="font-semibold text-sm">{channel.customers}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conversion</p>
            <p className="font-semibold text-sm text-green-600">{channel.conversionRate}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t">
          <Button size="sm" variant="ghost" className="text-xs">
            <BarChart className="h-3 w-3 mr-1" /> Analytics
          </Button>
          <Button size="sm" variant="ghost" className="text-xs">
            <Edit className="h-3 w-3 mr-1" /> Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sales Channels</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your sales channels</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Channel</span>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  ₦{(totalRevenue / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Revenue</p>
              </div>
              <TrendingUp className="h-5 w-5 text-foreground/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{activeChannels}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Active Channels</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-blue-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{totalOrders}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Orders</p>
              </div>
              <ShoppingBag className="h-5 w-5 text-green-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card className="hidden sm:block">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">{totalCustomers}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Customers</p>
              </div>
              <Users className="h-5 w-5 text-purple-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Channels Grid */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Sales Channels</CardTitle>
            <CardDescription>
              Showing {filteredChannels.length} of {mockChannels.length} channels
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Status Tabs */}
        <div className="px-3 sm:px-6 pb-4 border-b">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-auto gap-2 bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-full px-4 py-2 text-sm font-medium"
              >
                <span>All</span>
                <span className="ml-2 text-xs opacity-70">({mockChannels.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Active
                <span className="ml-2 text-xs opacity-70">({mockChannels.filter((c) => c.status === "Active").length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Pending
                <span className="ml-2 text-xs opacity-70">({mockChannels.filter((c) => c.status === "Pending").length})</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <CardContent className="px-3 sm:px-6 pt-6">
          {/* Desktop View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-sm font-medium text-muted-foreground">
                  <th className="text-left py-3 px-3 sm:px-0">Channel</th>
                  <th className="text-left py-3 px-3 sm:px-0 hidden sm:table-cell">Type</th>
                  <th className="text-left py-3 px-3 sm:px-0 hidden md:table-cell">Orders</th>
                  <th className="text-left py-3 px-3 sm:px-0 hidden lg:table-cell">Customers</th>
                  <th className="text-left py-3 px-3 sm:px-0">Revenue</th>
                  <th className="text-left py-3 px-3 sm:px-0 hidden sm:table-cell">Status</th>
                  <th className="text-left py-3 px-3 sm:px-0 w-10">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredChannels.length > 0 ? (
                  filteredChannels.map((channel) => <ChannelRow key={channel.id} channel={channel} />)
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-muted-foreground">
                      No channels found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden grid gap-3">
            {filteredChannels.length > 0 ? (
              filteredChannels.map((channel) => <ChannelCard key={channel.id} channel={channel} />)
            ) : (
              <div className="text-center py-8 text-muted-foreground">No channels found</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
