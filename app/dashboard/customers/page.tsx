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
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  AlertCircle,
  CheckCircle2,
  Eye,
  MessageSquare,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock customers data
const mockCustomers = [
  {
    id: "CUST-001",
    name: "Chioma Okafor",
    email: "chioma.okafor@email.com",
    phone: "+234 901 234 5678",
    location: "Lagos, Nigeria",
    status: "Active",
    joinDate: "2023-01-15",
    totalOrders: 12,
    totalSpent: "₦485,000",
    lastOrder: "2024-04-10",
    tier: "Gold",
    satisfaction: 4.8,
  },
  {
    id: "CUST-002",
    name: "Adebayo Johnson",
    email: "adebayo.j@email.com",
    phone: "+234 902 345 6789",
    location: "Abuja, Nigeria",
    status: "Active",
    joinDate: "2023-03-22",
    totalOrders: 8,
    totalSpent: "₦320,000",
    lastOrder: "2024-04-05",
    tier: "Silver",
    satisfaction: 4.5,
  },
  {
    id: "CUST-003",
    name: "Zainab Hassan",
    email: "zainab.hassan@email.com",
    phone: "+234 903 456 7890",
    location: "Kano, Nigeria",
    status: "Inactive",
    joinDate: "2022-11-10",
    totalOrders: 5,
    totalSpent: "₦180,000",
    lastOrder: "2023-12-20",
    tier: "Bronze",
    satisfaction: 4.2,
  },
  {
    id: "CUST-004",
    name: "Oluwaseun Adeyemi",
    email: "seun.adeyemi@email.com",
    phone: "+234 904 567 8901",
    location: "Ibadan, Nigeria",
    status: "Active",
    joinDate: "2024-01-05",
    totalOrders: 15,
    totalSpent: "₦625,000",
    lastOrder: "2024-04-12",
    tier: "Platinum",
    satisfaction: 4.9,
  },
  {
    id: "CUST-005",
    name: "Ngozi Eze",
    email: "ngozi.eze@email.com",
    phone: "+234 905 678 9012",
    location: "Port Harcourt, Nigeria",
    status: "Active",
    joinDate: "2023-06-18",
    totalOrders: 6,
    totalSpent: "₦245,000",
    lastOrder: "2024-04-08",
    tier: "Silver",
    satisfaction: 4.3,
  },
  {
    id: "CUST-006",
    name: "Emeka Nwankwo",
    email: "emeka.nwankwo@email.com",
    phone: "+234 906 789 0123",
    location: "Enugu, Nigeria",
    status: "At Risk",
    joinDate: "2023-02-14",
    totalOrders: 3,
    totalSpent: "₦95,000",
    lastOrder: "2024-01-15",
    tier: "Bronze",
    satisfaction: 3.8,
  },
  {
    id: "CUST-007",
    name: "Amara Eze",
    email: "amara.eze@email.com",
    phone: "+234 907 890 1234",
    location: "Lagos, Nigeria",
    status: "Active",
    joinDate: "2023-09-03",
    totalOrders: 10,
    totalSpent: "₦410,000",
    lastOrder: "2024-04-11",
    tier: "Gold",
    satisfaction: 4.7,
  },
  {
    id: "CUST-008",
    name: "David Okonkwo",
    email: "david.okonkwo@email.com",
    phone: "+234 908 901 2345",
    location: "Benin City, Nigeria",
    status: "Inactive",
    joinDate: "2022-08-22",
    totalOrders: 2,
    totalSpent: "₦65,000",
    lastOrder: "2023-11-30",
    tier: "Bronze",
    satisfaction: 4.0,
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Segment customers by status
  const getCustomersByStatus = (status: string) => {
    switch (status) {
      case "all":
        return mockCustomers
      case "active":
        return mockCustomers.filter((c) => c.status === "Active")
      case "inactive":
        return mockCustomers.filter((c) => c.status === "Inactive")
      case "at-risk":
        return mockCustomers.filter((c) => c.status === "At Risk")
      default:
        return mockCustomers
    }
  }

  const filteredCustomers = getCustomersByStatus(activeTab).filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    return matchesSearch
  })

  const totalCustomers = mockCustomers.length
  const activeCustomers = mockCustomers.filter((c) => c.status === "Active").length
  const atRiskCount = mockCustomers.filter((c) => c.status === "At Risk").length
  const totalRevenue = mockCustomers.reduce((sum, c) => {
    return sum + parseInt(c.totalSpent.replace(/[^\d]/g, ""))
  }, 0)
  const avgOrderValue =
    mockCustomers.reduce((sum, c) => sum + parseInt(c.totalSpent.replace(/[^\d]/g, "")), 0) /
    mockCustomers.length

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return "bg-purple-100 text-purple-800"
      case "Gold":
        return "bg-yellow-100 text-yellow-800"
      case "Silver":
        return "bg-gray-100 text-gray-800"
      case "Bronze":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-green-100 text-green-800 flex w-fit">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Active
          </Badge>
        )
      case "Inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 flex w-fit">
            <AlertCircle className="h-3 w-3 mr-1" /> Inactive
          </Badge>
        )
      case "At Risk":
        return (
          <Badge className="bg-orange-100 text-orange-800 flex w-fit">
            <AlertCircle className="h-3 w-3 mr-1" /> At Risk
          </Badge>
        )
      default:
        return <Badge className="flex w-fit">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track your customer base</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" /> Add Customer
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{totalCustomers}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Customers</p>
              </div>
              <Users className="h-5 w-5 text-blue-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{activeCustomers}</p>
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
                  ₦{(totalRevenue / 1000).toFixed(0)}K
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Revenue</p>
              </div>
              <DollarSign className="h-5 w-5 text-foreground/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card className="hidden sm:block">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                  ₦{(avgOrderValue / 1000).toFixed(0)}K
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Avg Value</p>
              </div>
              <TrendingUp className="h-5 w-5 text-orange-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers List */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <CardTitle>Customers</CardTitle>
            <CardDescription>
              Showing {filteredCustomers.length} of {mockCustomers.length} customers
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Search Bar */}
        <div className="px-3 sm:px-6 pb-4 border-b">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="px-3 sm:px-6 pb-4 border-b">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-auto gap-2 bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-full px-4 py-2 text-sm font-medium"
              >
                All
                <span className="ml-2 text-xs opacity-70">({mockCustomers.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Active
                <span className="ml-2 text-xs opacity-70">({activeCustomers})</span>
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="data-[state=active]:bg-gray-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Inactive
                <span className="ml-2 text-xs opacity-70">
                  ({mockCustomers.filter((c) => c.status === "Inactive").length})
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="at-risk"
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                At Risk
                <span className="ml-2 text-xs opacity-70">({atRiskCount})</span>
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
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Orders
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Total Spent
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Tier
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.id}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">{customer.email}</div>
                      <div className="text-xs text-muted-foreground">{customer.phone}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">{customer.totalOrders}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">{customer.totalSpent}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getTierColor(customer.tier)}>{customer.tier}</Badge>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(customer.status)}</td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <MessageSquare className="h-4 w-4 mr-2" /> Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden space-y-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{customer.name}</h3>
                      <p className="text-xs text-muted-foreground">{customer.id}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {getStatusBadge(customer.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate text-xs">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs">{customer.phone}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Orders</p>
                      <p className="font-semibold">{customer.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Spent</p>
                      <p className="font-semibold text-sm">{customer.totalSpent}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Tier</p>
                      <Badge className={`${getTierColor(customer.tier)} text-xs`}>
                        {customer.tier}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Eye className="h-3 w-3 mr-1" /> View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <MessageSquare className="h-4 w-4 mr-2" /> Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
