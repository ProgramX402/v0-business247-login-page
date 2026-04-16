"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Globe,
  Eye,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Users,
  ShoppingCart,
  RefreshCw,
  Lock,
  Zap,
  Activity,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock websites data
const mockWebsites = [
  {
    id: "WEB-001",
    name: "Business247 Store",
    domain: "business247.ng",
    status: "Active",
    template: "Premium E-commerce",
    visitors: 12500,
    revenue: "₦8,450,000",
    products: 340,
    orders: 520,
    lastUpdated: "2024-07-24",
    sslStatus: "Active",
    uptime: "99.8%",
    trafficSource: "Organic",
  },
  {
    id: "WEB-002",
    name: "Secondary Store",
    domain: "shop.business247.ng",
    status: "Active",
    template: "Standard Store",
    visitors: 8200,
    revenue: "₦4,250,000",
    products: 180,
    orders: 280,
    lastUpdated: "2024-07-22",
    sslStatus: "Active",
    uptime: "99.5%",
    trafficSource: "Paid Ads",
  },
  {
    id: "WEB-003",
    name: "Blog & Resources",
    domain: "blog.business247.ng",
    status: "Active",
    template: "Blog",
    visitors: 5600,
    revenue: "₦850,000",
    products: 0,
    orders: 45,
    lastUpdated: "2024-07-23",
    sslStatus: "Active",
    uptime: "100%",
    trafficSource: "SEO",
  },
  {
    id: "WEB-004",
    name: "Landing Page Campaign",
    domain: "summer-sale.business247.ng",
    status: "Maintenance",
    template: "Landing Page",
    visitors: 2100,
    revenue: "₦320,000",
    products: 50,
    orders: 32,
    lastUpdated: "2024-07-20",
    sslStatus: "Active",
    uptime: "95.2%",
    trafficSource: "Email",
  },
  {
    id: "WEB-005",
    name: "Mobile App Landing",
    domain: "app.business247.ng",
    status: "Active",
    template: "App Showcase",
    visitors: 6800,
    revenue: "₦1,200,000",
    products: 0,
    orders: 85,
    lastUpdated: "2024-07-25",
    sslStatus: "Active",
    uptime: "99.9%",
    trafficSource: "Direct",
  },
  {
    id: "WEB-006",
    name: "Clearance Sale",
    domain: "clearance.business247.ng",
    status: "Inactive",
    template: "Promotional",
    visitors: 0,
    revenue: "₦0",
    products: 120,
    orders: 0,
    lastUpdated: "2024-06-15",
    sslStatus: "Expired",
    uptime: "0%",
    trafficSource: "None",
  },
]

export default function WebsitesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Segment websites by status
  const getWebsitesByStatus = (status: string) => {
    switch (status) {
      case "all":
        return mockWebsites
      case "active":
        return mockWebsites.filter((w) => w.status === "Active")
      case "maintenance":
        return mockWebsites.filter((w) => w.status === "Maintenance")
      case "inactive":
        return mockWebsites.filter((w) => w.status === "Inactive")
      default:
        return mockWebsites
    }
  }

  const filteredWebsites = getWebsitesByStatus(activeTab).filter((website) =>
    website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    website.domain.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalRevenue = mockWebsites.reduce(
    (sum, w) => sum + parseInt(w.revenue.replace(/[^\d]/g, "")),
    0
  )
  const totalVisitors = mockWebsites.reduce((sum, w) => sum + w.visitors, 0)
  const activeWebsites = mockWebsites.filter((w) => w.status === "Active").length
  const maintenanceCount = mockWebsites.filter((w) => w.status === "Maintenance").length
  const inactiveCount = mockWebsites.filter((w) => w.status === "Inactive").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Websites</h1>
          <p className="text-muted-foreground">Manage all your websites and landing pages</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Website
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{mockWebsites.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Websites</p>
              </div>
              <Globe className="h-5 w-5 text-blue-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{activeWebsites}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Active</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-green-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
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
        <Card className="hidden sm:block">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {(totalVisitors / 1000).toFixed(0)}K
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Visitors</p>
              </div>
              <Users className="h-5 w-5 text-foreground/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Websites List */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Websites List</CardTitle>
            <CardDescription>
              Showing {filteredWebsites.length} of {mockWebsites.length} websites
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Website Status Tabs */}
        <div className="px-3 sm:px-6 pb-4 border-b">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-auto gap-2 bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-full px-4 py-2 text-sm font-medium"
              >
                <span>All</span>
                <span className="ml-2 text-xs opacity-70">({mockWebsites.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Active
                <span className="ml-2 text-xs opacity-70">({activeWebsites})</span>
              </TabsTrigger>
              <TabsTrigger
                value="maintenance"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Maintenance
                <span className="ml-2 text-xs opacity-70">({maintenanceCount})</span>
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Inactive
                <span className="ml-2 text-xs opacity-70">({inactiveCount})</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <CardContent className="px-3 sm:px-6 pt-6">
          {/* Desktop View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">Website</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Domain</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Visitors</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Orders</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">SSL</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredWebsites.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-muted-foreground">
                      No websites found
                    </td>
                  </tr>
                ) : (
                  filteredWebsites.map((website) => (
                    <tr key={website.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-sm">{website.name}</p>
                          <p className="text-xs text-muted-foreground">{website.template}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={`https://${website.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {website.domain}
                          <Eye className="h-3 w-3" />
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium">{website.visitors.toLocaleString()}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium">{website.revenue}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium">{website.orders}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={website.sslStatus === "Active" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {website.sslStatus}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            website.status === "Active"
                              ? "default"
                              : website.status === "Maintenance"
                                ? "secondary"
                                : "outline"
                          }
                          className={`text-xs ${
                            website.status === "Active"
                              ? "bg-green-600"
                              : website.status === "Maintenance"
                                ? "bg-yellow-600"
                                : "bg-red-600"
                          } text-white`}
                        >
                          {website.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Activity className="h-4 w-4 mr-2" />
                              Monitor
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden space-y-3">
            {filteredWebsites.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">No websites found</div>
            ) : (
              filteredWebsites.map((website) => (
                <div
                  key={website.id}
                  className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">{website.name}</h3>
                      <p className="text-xs text-muted-foreground">{website.domain}</p>
                    </div>
                    <Badge
                      variant={
                        website.status === "Active"
                          ? "default"
                          : website.status === "Maintenance"
                            ? "secondary"
                            : "outline"
                      }
                      className={`text-xs ${
                        website.status === "Active"
                          ? "bg-green-600"
                          : website.status === "Maintenance"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                      } text-white`}
                    >
                      {website.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Visitors</p>
                      <p className="font-bold">{website.visitors.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-bold">{website.revenue}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Orders</p>
                      <p className="font-bold">{website.orders}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">SSL Status</p>
                      <Badge
                        variant={website.sslStatus === "Active" ? "default" : "destructive"}
                        className="text-xs mt-1"
                      >
                        {website.sslStatus}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Activity className="h-4 w-4 mr-2" />
                          Monitor
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
