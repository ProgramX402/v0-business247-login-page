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
  Target,
  Eye,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock campaigns data
const mockCampaigns = [
  {
    id: "CAM-001",
    name: "Summer Sale 2024",
    type: "Email",
    status: "Active",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    audience: 15000,
    impressions: 45000,
    clicks: 3200,
    conversions: 480,
    revenue: "₦7,200,000",
    ctr: "7.1%",
    roi: "320%",
  },
  {
    id: "CAM-002",
    name: "Flash Deal Week",
    type: "SMS",
    status: "Active",
    startDate: "2024-07-15",
    endDate: "2024-07-21",
    audience: 8500,
    impressions: 12000,
    clicks: 1200,
    conversions: 245,
    revenue: "₦3,675,000",
    ctr: "10%",
    roi: "425%",
  },
  {
    id: "CAM-003",
    name: "New Product Launch",
    type: "Social Media",
    status: "Active",
    startDate: "2024-07-01",
    endDate: "2024-07-30",
    audience: 25000,
    impressions: 85000,
    clicks: 5100,
    conversions: 612,
    revenue: "₦9,180,000",
    ctr: "6%",
    roi: "275%",
  },
  {
    id: "CAM-004",
    name: "Loyalty Program",
    type: "Email",
    status: "Scheduled",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    audience: 12000,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    revenue: "₦0",
    ctr: "0%",
    roi: "0%",
  },
  {
    id: "CAM-005",
    name: "Back to School",
    type: "Multi-Channel",
    status: "Completed",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    audience: 18000,
    impressions: 55000,
    clicks: 2750,
    conversions: 330,
    revenue: "₦4,950,000",
    ctr: "5%",
    roi: "200%",
  },
  {
    id: "CAM-006",
    name: "Holiday Special",
    type: "Social Media",
    status: "Completed",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    audience: 20000,
    impressions: 60000,
    clicks: 3600,
    conversions: 450,
    revenue: "₦6,750,000",
    ctr: "6%",
    roi: "260%",
  },
  {
    id: "CAM-007",
    name: "Referral Campaign",
    type: "Email",
    status: "Paused",
    startDate: "2024-06-15",
    endDate: "2024-07-15",
    audience: 10000,
    impressions: 20000,
    clicks: 1200,
    conversions: 150,
    revenue: "₦2,250,000",
    ctr: "6%",
    roi: "180%",
  },
  {
    id: "CAM-008",
    name: "Premium Tier Upsell",
    type: "SMS",
    status: "Paused",
    startDate: "2024-07-01",
    endDate: "2024-07-14",
    audience: 5000,
    impressions: 8000,
    clicks: 480,
    conversions: 96,
    revenue: "₦1,440,000",
    ctr: "6%",
    roi: "240%",
  },
]

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Segment campaigns by status
  const getCampaignsByStatus = (status: string) => {
    switch (status) {
      case "all":
        return mockCampaigns
      case "active":
        return mockCampaigns.filter((c) => c.status === "Active")
      case "scheduled":
        return mockCampaigns.filter((c) => c.status === "Scheduled")
      case "completed":
        return mockCampaigns.filter((c) => c.status === "Completed")
      case "paused":
        return mockCampaigns.filter((c) => c.status === "Paused")
      default:
        return mockCampaigns
    }
  }

  const filteredCampaigns = getCampaignsByStatus(activeTab).filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalRevenue = mockCampaigns.reduce((sum, c) => {
    return sum + parseInt(c.revenue.replace(/[^\d]/g, ""))
  }, 0)
  const activeCount = mockCampaigns.filter((c) => c.status === "Active").length
  const totalImpressions = mockCampaigns.reduce((sum, c) => sum + c.impressions, 0)
  const totalConversions = mockCampaigns.reduce((sum, c) => sum + c.conversions, 0)
  const avgROI =
    mockCampaigns.filter((c) => c.roi !== "0%").length > 0
      ? (
          mockCampaigns
            .filter((c) => c.roi !== "0%")
            .reduce((sum, c) => sum + parseInt(c.roi), 0) /
          mockCampaigns.filter((c) => c.roi !== "0%").length
        ).toFixed(0)
      : "0"

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <Zap className="h-3 w-3" />
      case "Scheduled":
        return <Clock className="h-3 w-3" />
      case "Completed":
        return <CheckCircle2 className="h-3 w-3" />
      case "Paused":
        return <AlertCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground mt-1">Manage and track your marketing campaigns</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{activeCount}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Active</p>
              </div>
              <Zap className="h-5 w-5 text-green-600/50 flex-shrink-0" />
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
                <p className="text-xs sm:text-sm text-muted-foreground">Revenue</p>
              </div>
              <TrendingUp className="h-5 w-5 text-foreground/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {(totalImpressions / 1000).toFixed(0)}K
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Impressions</p>
              </div>
              <Eye className="h-5 w-5 text-blue-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">{totalConversions}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Conversions</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-purple-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card className="hidden sm:block">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">{avgROI}%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Avg ROI</p>
              </div>
              <Target className="h-5 w-5 text-orange-600/50 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Campaigns Grid */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Campaigns List</CardTitle>
            <CardDescription>
              Showing {filteredCampaigns.length} of {mockCampaigns.length} campaigns
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Campaign Status Tabs */}
        <div className="px-3 sm:px-6 pb-4 border-b">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-auto gap-2 bg-transparent p-0 overflow-x-auto">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
              >
                <span>All</span>
                <span className="ml-2 text-xs opacity-70">({mockCampaigns.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
              >
                <Zap className="h-4 w-4 mr-2" />
                Active
                <span className="ml-2 text-xs opacity-70">
                  ({mockCampaigns.filter((c) => c.status === "Active").length})
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="scheduled"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
              >
                <Clock className="h-4 w-4 mr-2" />
                Scheduled
                <span className="ml-2 text-xs opacity-70">
                  ({mockCampaigns.filter((c) => c.status === "Scheduled").length})
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-gray-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Completed
                <span className="ml-2 text-xs opacity-70">
                  ({mockCampaigns.filter((c) => c.status === "Completed").length})
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="paused"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Paused
                <span className="ml-2 text-xs opacity-70">
                  ({mockCampaigns.filter((c) => c.status === "Paused").length})
                </span>
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
                  <th className="text-left py-3 px-4 font-semibold text-sm">Campaign Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Audience</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Conversions</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">ROI</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium">{campaign.name}</td>
                    <td className="py-4 px-4 text-sm">{campaign.type}</td>
                    <td className="py-4 px-4 text-sm">{campaign.audience.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm">{campaign.conversions}</td>
                    <td className="py-4 px-4 text-sm font-semibold">{campaign.revenue}</td>
                    <td className="py-4 px-4 text-sm font-semibold text-green-600">{campaign.roi}</td>
                    <td className="py-4 px-4">
                      <Badge className={`gap-1 ${getStatusColor(campaign.status)}`}>
                        {getStatusIcon(campaign.status)}
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
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
                            Edit Campaign
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
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{campaign.name}</h3>
                    <p className="text-xs text-muted-foreground">{campaign.type}</p>
                  </div>
                  <Badge className={`gap-1 text-xs flex-shrink-0 ${getStatusColor(campaign.status)}`}>
                    {getStatusIcon(campaign.status)}
                    {campaign.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Audience</p>
                    <p className="font-semibold">{campaign.audience.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Conversions</p>
                    <p className="font-semibold">{campaign.conversions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="font-semibold">{campaign.revenue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ROI</p>
                    <p className="font-semibold text-green-600">{campaign.roi}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No campaigns found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
