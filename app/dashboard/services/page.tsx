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
  Briefcase,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Star,
  Clock,
  MapPin,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock services data
const mockServices = [
  {
    id: "SRV-001",
    name: "Website Development",
    category: "Development",
    price: "₦250,000",
    duration: "4 weeks",
    status: "Active",
    rating: 4.8,
    reviews: 24,
    bookings: 45,
    revenue: "₦11,250,000",
    description: "Custom website development services",
    availability: "Available",
  },
  {
    id: "SRV-002",
    name: "Mobile App Development",
    category: "Development",
    price: "₦500,000",
    duration: "8 weeks",
    status: "Active",
    rating: 4.9,
    reviews: 18,
    bookings: 32,
    revenue: "₦16,000,000",
    description: "iOS and Android app development",
    availability: "Available",
  },
  {
    id: "SRV-003",
    name: "UI/UX Design",
    category: "Design",
    price: "₦150,000",
    duration: "3 weeks",
    status: "Active",
    rating: 4.7,
    reviews: 31,
    bookings: 58,
    revenue: "₦8,700,000",
    description: "Professional UI/UX design services",
    availability: "Available",
  },
  {
    id: "SRV-004",
    name: "SEO Optimization",
    category: "Marketing",
    price: "₦80,000",
    duration: "30 days",
    status: "Active",
    rating: 4.6,
    reviews: 42,
    bookings: 89,
    revenue: "₦7,120,000",
    description: "Search engine optimization",
    availability: "Available",
  },
  {
    id: "SRV-005",
    name: "Content Writing",
    category: "Marketing",
    price: "₦50,000",
    duration: "2 weeks",
    status: "Inactive",
    rating: 4.5,
    reviews: 15,
    bookings: 22,
    revenue: "₦1,100,000",
    description: "Professional content writing services",
    availability: "Unavailable",
  },
  {
    id: "SRV-006",
    name: "Social Media Management",
    category: "Marketing",
    price: "₦120,000",
    duration: "30 days",
    status: "Active",
    rating: 4.8,
    reviews: 28,
    bookings: 41,
    revenue: "₦4,920,000",
    description: "Social media strategy and management",
    availability: "Available",
  },
  {
    id: "SRV-007",
    name: "Branding Consultation",
    category: "Design",
    price: "₦200,000",
    duration: "2 weeks",
    status: "Active",
    rating: 4.9,
    reviews: 19,
    bookings: 28,
    revenue: "₦5,600,000",
    description: "Complete branding strategy",
    availability: "Available",
  },
  {
    id: "SRV-008",
    name: "Email Marketing Setup",
    category: "Marketing",
    price: "₦100,000",
    duration: "1 week",
    status: "Active",
    rating: 4.7,
    reviews: 36,
    bookings: 67,
    revenue: "₦6,700,000",
    description: "Email campaign setup and optimization",
    availability: "Available",
  },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("all")

  // Segment services by status
  const getServicesByStatus = (status: string) => {
    switch (status) {
      case "all":
        return mockServices
      case "active":
        return mockServices.filter((s) => s.status === "Active")
      case "inactive":
        return mockServices.filter((s) => s.status === "Inactive")
      case "popular":
        return mockServices.filter((s) => s.rating >= 4.8)
      default:
        return mockServices
    }
  }

  const filteredServices = getServicesByStatus(activeTab).filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["All", ...new Set(mockServices.map((s) => s.category))]
  const totalRevenue = mockServices.reduce((sum, s) => {
    return sum + parseInt(s.revenue.replace(/[^\d]/g, ""))
  }, 0)
  const totalServices = mockServices.length
  const activeServices = mockServices.filter((s) => s.status === "Active").length
  const totalBookings = mockServices.reduce((sum, s) => sum + s.bookings, 0)
  const avgRating = (
    mockServices.reduce((sum, s) => sum + s.rating, 0) / mockServices.length
  ).toFixed(1)
  const popularServices = mockServices.filter((s) => s.rating >= 4.8).length

  return (
    <div className="flex flex-col gap-6 p-3 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Services</h1>
          <p className="text-sm text-muted-foreground">Manage and track your business services</p>
        </div>
        <Button className="w-full sm:w-auto" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{totalServices}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Services</p>
              </div>
              <Briefcase className="h-5 w-5 text-blue-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{activeServices}</p>
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
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">{avgRating}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Avg Rating</p>
              </div>
              <Star className="h-5 w-5 text-purple-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card className="hidden sm:block">
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
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Services Grid */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Services List</CardTitle>
            <CardDescription>
              Showing {filteredServices.length} of {mockServices.length} services
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Service Status Tabs */}
        <div className="px-3 sm:px-6 pb-4 border-b">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-auto gap-2 bg-transparent p-0 flex-wrap">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-full px-4 py-2 text-sm font-medium"
              >
                <span>All</span>
                <span className="ml-2 text-xs opacity-70">({mockServices.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Active
                <span className="ml-2 text-xs opacity-70">({activeServices})</span>
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="data-[state=active]:bg-gray-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Inactive
                <span className="ml-2 text-xs opacity-70">({mockServices.filter((s) => s.status === "Inactive").length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium"
              >
                <Star className="h-4 w-4 mr-2" />
                Popular
                <span className="ml-2 text-xs opacity-70">({popularServices})</span>
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
                  <th className="text-left py-3 px-4 font-semibold text-sm">Service Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Bookings</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr key={service.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-sm">{service.name}</div>
                      <div className="text-xs text-muted-foreground">{service.id}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">
                        {service.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">{service.price}</td>
                    <td className="py-3 px-4 text-sm">{service.bookings}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium">{service.rating}</span>
                        <span className="text-xs text-muted-foreground">({service.reviews})</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">{service.revenue}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={service.status === "Active" ? "default" : "secondary"}
                        className={`text-xs ${
                          service.status === "Active" ? "bg-green-100 text-green-800" : ""
                        }`}
                      >
                        {service.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Service
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
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
          <div className="sm:hidden space-y-3">
            {filteredServices.map((service) => (
              <Card key={service.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-sm">{service.name}</h3>
                      <p className="text-xs text-muted-foreground">{service.id}</p>
                    </div>
                    <Badge
                      variant={service.status === "Active" ? "default" : "secondary"}
                      className={`text-xs ${
                        service.status === "Active" ? "bg-green-100 text-green-800" : ""
                      }`}
                    >
                      {service.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <Badge variant="outline" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">{service.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bookings:</span>
                      <span className="font-medium">{service.bookings}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="font-medium">{service.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Revenue:</span>
                      <span className="font-medium">{service.revenue}</span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        <MoreHorizontal className="h-4 w-4 mr-2" />
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Service
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
