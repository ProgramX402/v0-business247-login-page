"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Package,
  DollarSign,
  ShoppingCart,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock products data
const mockProducts = [
  {
    id: "PRD-001",
    name: "Premium Widget Pro",
    category: "Electronics",
    price: "₦45,000",
    cost: "₦22,500",
    stock: 156,
    sold: 234,
    revenue: "₦10,530,000",
    status: "Active",
    rating: 4.8,
    image: "🔧",
  },
  {
    id: "PRD-002",
    name: "Basic Starter Kit",
    category: "Bundles",
    price: "₦12,500",
    cost: "₦5,000",
    stock: 289,
    sold: 189,
    revenue: "₦2,362,500",
    status: "Active",
    rating: 4.5,
    image: "📦",
  },
  {
    id: "PRD-003",
    name: "Enterprise Solution",
    category: "Services",
    price: "₦125,000",
    cost: "₦50,000",
    stock: 12,
    sold: 156,
    revenue: "₦19,500,000",
    status: "Active",
    rating: 4.9,
    image: "🏢",
  },
  {
    id: "PRD-004",
    name: "Standard Package",
    category: "Software",
    price: "₦8,900",
    cost: "₦3,500",
    stock: 0,
    sold: 134,
    revenue: "₦1,192,600",
    status: "Out of Stock",
    rating: 4.3,
    image: "💾",
  },
  {
    id: "PRD-005",
    name: "Deluxe Bundle",
    category: "Bundles",
    price: "₦67,500",
    cost: "₦27,000",
    stock: 45,
    sold: 98,
    revenue: "₦6,615,000",
    status: "Active",
    rating: 4.7,
    image: "🎁",
  },
  {
    id: "PRD-006",
    name: "Compact Edition",
    category: "Electronics",
    price: "₦23,400",
    cost: "₦9,360",
    stock: 234,
    sold: 156,
    revenue: "₦3,650,400",
    status: "Active",
    rating: 4.4,
    image: "⚙️",
  },
  {
    id: "PRD-007",
    name: "Premium Plus",
    category: "Services",
    price: "₦89,200",
    cost: "₦35,680",
    stock: 67,
    sold: 145,
    revenue: "₦12,934,000",
    status: "Active",
    rating: 4.6,
    image: "✨",
  },
  {
    id: "PRD-008",
    name: "Essential Toolkit",
    category: "Bundles",
    price: "₦34,500",
    cost: "₦13,800",
    stock: 156,
    sold: 112,
    revenue: "₦3,864,000",
    status: "Active",
    rating: 4.2,
    image: "🛠️",
  },
]

const statusColors: Record<string, string> = {
  Active: "bg-green-500/10 text-green-600",
  "Out of Stock": "bg-red-500/10 text-red-600",
  Discontinued: "bg-gray-500/10 text-gray-600",
}

const categoryColors: Record<string, string> = {
  Electronics: "bg-blue-500/10 text-blue-600",
  Bundles: "bg-purple-500/10 text-purple-600",
  Services: "bg-orange-500/10 text-orange-600",
  Software: "bg-cyan-500/10 text-cyan-600",
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("all")

  // Segment products by stock status
  const getProductsByStatus = (status: string) => {
    switch (status) {
      case "all":
        return mockProducts
      case "available":
        return mockProducts.filter((p) => p.stock > 20)
      case "low-stock":
        return mockProducts.filter((p) => p.stock > 0 && p.stock <= 20)
      case "stock-out":
        return mockProducts.filter((p) => p.stock === 0)
      default:
        return mockProducts
    }
  }

  const filteredProducts = getProductsByStatus(activeTab).filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["All", ...new Set(mockProducts.map((p) => p.category))]
  const totalRevenue = mockProducts.reduce((sum, p) => {
    return sum + parseInt(p.revenue.replace(/[^\d]/g, ""))
  }, 0)
  const totalProducts = mockProducts.length
  const totalStock = mockProducts.reduce((sum, p) => sum + p.stock, 0)
  const totalSold = mockProducts.reduce((sum, p) => sum + p.sold, 0)
  const lowStockCount = mockProducts.filter((p) => p.stock > 0 && p.stock <= 20).length
  const stockOutCount = mockProducts.filter((p) => p.stock === 0).length

  const handleAction = (action: string, productId: string) => {
    console.log(`[v0] Action: ${action}, Product: ${productId}`)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage and track all your products in one place.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{totalProducts}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Products</p>
              </div>
              <Package className="h-5 w-5 text-foreground/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">₦{(totalRevenue / 1000000).toFixed(1)}M</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Revenue</p>
              </div>
              <DollarSign className="h-5 w-5 text-foreground/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{totalStock}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total in Stock</p>
              </div>
              <ShoppingCart className="h-5 w-5 text-blue-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card className="hidden sm:block">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{totalSold}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Sold</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs sm:text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Products List</CardTitle>
            <CardDescription>
              Showing {filteredProducts.length} of {mockProducts.length} products
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Stock Status Tabs */}
        <div className="px-3 sm:px-6 pb-4 border-b">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-auto gap-2 bg-transparent p-0 overflow-x-auto flex-nowrap">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
              >
                <span>All</span>
                <span className="ml-2 text-xs opacity-70">({mockProducts.length})</span>
              </TabsTrigger>
              <TabsTrigger 
                value="available" 
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Available
                <span className="ml-2 text-xs opacity-70">({mockProducts.filter((p) => p.stock > 20).length})</span>
              </TabsTrigger>
              <TabsTrigger 
                value="low-stock" 
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Low Stock
                <span className="ml-2 text-xs opacity-70">({lowStockCount})</span>
              </TabsTrigger>
              <TabsTrigger 
                value="stock-out" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Stock Out
                <span className="ml-2 text-xs opacity-70">({stockOutCount})</span>
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
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Sold</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{product.image}</div>
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`${categoryColors[product.category]} border-0`}>
                        {product.category}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 font-semibold text-foreground">{product.price}</td>
                    <td className="py-4 px-4">
                      <span className={`${product.stock === 0 ? "text-red-600 font-semibold" : "text-foreground"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-foreground">{product.sold}</td>
                    <td className="py-4 px-4 font-semibold text-foreground">{product.revenue}</td>
                    <td className="py-4 px-4">
                      <Badge className={`${statusColors[product.status]} border-0`}>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAction("view", product.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("edit", product.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("delete", product.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
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
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="text-3xl flex-shrink-0">{product.image}</div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground text-sm truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.id}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction("view", product.id)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("edit", product.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("delete", product.id)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <Badge className={`${categoryColors[product.category]} border-0`}>
                      {product.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-semibold">{product.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Stock</span>
                    <span className={`${product.stock === 0 ? "text-red-600 font-semibold" : "font-semibold"}`}>
                      {product.stock}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sold</span>
                    <span className="font-semibold">{product.sold}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-semibold">{product.revenue}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className={`${statusColors[product.status]} border-0`}>
                      {product.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
