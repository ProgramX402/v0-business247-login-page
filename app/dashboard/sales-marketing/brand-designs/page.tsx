"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Palette,
  Plus,
  Search,
  MoreHorizontal,
  Download,
  Edit2,
  Trash2,
  Copy,
  Eye,
  Image,
  FileText,
  Layout,
  Star,
  StarOff,
  Grid3X3,
  List,
  Upload,
  Layers,
  Type,
  Brush,
} from "lucide-react";

type DesignAsset = {
  id: string;
  name: string;
  type: "logo" | "banner" | "template" | "icon" | "social";
  category: string;
  status: "active" | "draft" | "archived";
  starred: boolean;
  lastModified: string;
  dimensions: string;
  format: string;
  color: string;
};

const mockAssets: DesignAsset[] = [
  { id: "D-001", name: "Primary Logo (Full)", type: "logo", category: "Logos", status: "active", starred: true, lastModified: "Apr 15, 2026", dimensions: "1200×400", format: "SVG", color: "#6366f1" },
  { id: "D-002", name: "Logo Mark (Icon)", type: "logo", category: "Logos", status: "active", starred: true, lastModified: "Apr 15, 2026", dimensions: "400×400", format: "SVG", color: "#6366f1" },
  { id: "D-003", name: "Dark Logo Variant", type: "logo", category: "Logos", status: "active", starred: false, lastModified: "Apr 10, 2026", dimensions: "1200×400", format: "PNG", color: "#1e293b" },
  { id: "D-004", name: "Summer Sale Banner", type: "banner", category: "Banners", status: "active", starred: false, lastModified: "Apr 12, 2026", dimensions: "1920×600", format: "PNG", color: "#f59e0b" },
  { id: "D-005", name: "Promo Banner – Mobile", type: "banner", category: "Banners", status: "draft", starred: false, lastModified: "Apr 8, 2026", dimensions: "750×1334", format: "JPG", color: "#ec4899" },
  { id: "D-006", name: "Email Newsletter Template", type: "template", category: "Templates", status: "active", starred: true, lastModified: "Apr 5, 2026", dimensions: "600×auto", format: "HTML", color: "#10b981" },
  { id: "D-007", name: "Instagram Post Template", type: "social", category: "Social Media", status: "active", starred: false, lastModified: "Apr 3, 2026", dimensions: "1080×1080", format: "PSD", color: "#8b5cf6" },
  { id: "D-008", name: "Facebook Cover Photo", type: "social", category: "Social Media", status: "active", starred: false, lastModified: "Mar 28, 2026", dimensions: "820×312", format: "PNG", color: "#3b82f6" },
  { id: "D-009", name: "Product Card Template", type: "template", category: "Templates", status: "draft", starred: false, lastModified: "Mar 25, 2026", dimensions: "400×500", format: "PSD", color: "#f97316" },
  { id: "D-010", name: "App Icon Set", type: "icon", category: "Icons", status: "active", starred: false, lastModified: "Mar 20, 2026", dimensions: "Various", format: "SVG", color: "#14b8a6" },
  { id: "D-011", name: "Twitter/X Header", type: "social", category: "Social Media", status: "archived", starred: false, lastModified: "Mar 10, 2026", dimensions: "1500×500", format: "PNG", color: "#64748b" },
  { id: "D-012", name: "Business Card Design", type: "template", category: "Templates", status: "active", starred: true, lastModified: "Mar 5, 2026", dimensions: "3.5×2 in", format: "PDF", color: "#6366f1" },
];

const brandColors = [
  { name: "Primary", hex: "#6366f1", usage: "Buttons, links, highlights" },
  { name: "Secondary", hex: "#8b5cf6", usage: "Accents, gradients" },
  { name: "Success", hex: "#10b981", usage: "Positive states, confirmations" },
  { name: "Warning", hex: "#f59e0b", usage: "Alerts, caution states" },
  { name: "Danger", hex: "#ef4444", usage: "Errors, destructive actions" },
  { name: "Neutral Dark", hex: "#1e293b", usage: "Text, dark backgrounds" },
  { name: "Neutral Light", hex: "#f1f5f9", usage: "Backgrounds, dividers" },
  { name: "White", hex: "#ffffff", usage: "Surfaces, cards" },
];

const typefaces = [
  { name: "DM Sans", role: "Primary / UI", weights: "400, 500, 600, 700", usage: "Body text, UI labels, navigation" },
  { name: "Manrope", role: "Headings", weights: "600, 700, 800", usage: "Page titles, section headers" },
  { name: "JetBrains Mono", role: "Monospace", weights: "400, 500", usage: "Code snippets, IDs, technical data" },
];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  logo: Layers,
  banner: Image,
  template: Layout,
  icon: Grid3X3,
  social: Star,
};

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-600 border-green-200",
  draft: "bg-amber-500/10 text-amber-600 border-amber-200",
  archived: "bg-slate-500/10 text-slate-500 border-slate-200",
};

export default function BrandDesignsPage() {
  const [assets, setAssets] = useState<DesignAsset[]>(mockAssets);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterType, setFilterType] = useState("all");
  const [uploadOpen, setUploadOpen] = useState(false);

  const toggleStar = (id: string) => {
    setAssets((prev) => prev.map((a) => a.id === id ? { ...a, starred: !a.starred } : a));
  };

  const filtered = assets.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || a.type === filterType;
    return matchSearch && matchType;
  });

  const stats = [
    { label: "Total Assets", value: assets.length, icon: Palette },
    { label: "Active", value: assets.filter((a) => a.status === "active").length, icon: Eye },
    { label: "Starred", value: assets.filter((a) => a.starred).length, icon: Star },
    { label: "Drafts", value: assets.filter((a) => a.status === "draft").length, icon: Edit2 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Brand Designs</h1>
          <p className="text-muted-foreground mt-1">Manage your brand assets, design templates, and visual identity.</p>
        </div>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Upload Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Brand Asset</DialogTitle>
              <DialogDescription>Add a new design asset to your brand library.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="assetName">Asset Name</Label>
                <Input id="assetName" placeholder="e.g. Primary Logo" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="assetType">Asset Type</Label>
                <Select>
                  <SelectTrigger id="assetType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="logo">Logo</SelectItem>
                    <SelectItem value="banner">Banner</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="icon">Icon</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-2 cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag & drop files here, or click to browse</p>
                <p className="text-xs text-muted-foreground">SVG, PNG, JPG, PDF up to 50MB</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
              <Button onClick={() => setUploadOpen(false)}>Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="assets" className="space-y-4">
        <TabsList className="bg-muted p-1 rounded-lg">
          <TabsTrigger value="assets" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Assets
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Brush className="h-4 w-4" />
            Brand Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Typography
          </TabsTrigger>
        </TabsList>

        {/* Assets Tab */}
        <TabsContent value="assets" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="logo">Logos</SelectItem>
                <SelectItem value="banner">Banners</SelectItem>
                <SelectItem value="template">Templates</SelectItem>
                <SelectItem value="icon">Icons</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-1 border border-border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((asset) => {
                const TypeIcon = typeIcons[asset.type] || FileText;
                return (
                  <Card key={asset.id} className="group overflow-hidden hover:shadow-md transition-shadow">
                    {/* Preview area */}
                    <div
                      className="h-36 flex items-center justify-center relative"
                      style={{ backgroundColor: asset.color + "18" }}
                    >
                      <TypeIcon className="h-12 w-12" style={{ color: asset.color }} />
                      {/* Hover actions */}
                      <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      {/* Star */}
                      <button
                        onClick={() => toggleStar(asset.id)}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-amber-500 transition-colors"
                      >
                        {asset.starred ? (
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <CardContent className="pt-3 pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{asset.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{asset.dimensions} · {asset.format}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />Preview</DropdownMenuItem>
                            <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download</DropdownMenuItem>
                            <DropdownMenuItem><Copy className="mr-2 h-4 w-4" />Duplicate</DropdownMenuItem>
                            <DropdownMenuItem><Edit2 className="mr-2 h-4 w-4" />Rename</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className={`text-xs ${statusColors[asset.status]}`}>
                          {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{asset.lastModified}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* List View */
            <Card>
              <div className="divide-y divide-border">
                {filtered.map((asset) => {
                  const TypeIcon = typeIcons[asset.type] || FileText;
                  return (
                    <div key={asset.id} className="flex items-center gap-4 px-4 py-3 hover:bg-muted/40 transition-colors">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: asset.color + "18" }}
                      >
                        <TypeIcon className="h-5 w-5" style={{ color: asset.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">{asset.category} · {asset.dimensions} · {asset.format}</p>
                      </div>
                      <Badge variant="outline" className={`text-xs hidden sm:flex ${statusColors[asset.status]}`}>
                        {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                      </Badge>
                      <span className="text-xs text-muted-foreground hidden md:block w-28 text-right">{asset.lastModified}</span>
                      <button onClick={() => toggleStar(asset.id)} className="text-muted-foreground hover:text-amber-500 transition-colors">
                        {asset.starred ? (
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />Preview</DropdownMenuItem>
                          <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download</DropdownMenuItem>
                          <DropdownMenuItem><Copy className="mr-2 h-4 w-4" />Duplicate</DropdownMenuItem>
                          <DropdownMenuItem><Edit2 className="mr-2 h-4 w-4" />Rename</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Palette className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No assets found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters.</p>
            </div>
          )}
        </TabsContent>

        {/* Brand Colors Tab */}
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Brand Color Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {brandColors.map((color) => (
                  <div key={color.name} className="space-y-2">
                    <div
                      className="h-20 rounded-lg border border-border shadow-sm cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{color.name}</p>
                        <button
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                          onClick={() => navigator.clipboard?.writeText(color.hex)}
                        >
                          <Copy className="h-3 w-3" />
                          {color.hex}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{color.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Typography Tab */}
        <TabsContent value="typography">
          <div className="space-y-4">
            {typefaces.map((font) => (
              <Card key={font.name}>
                <CardContent className="pt-5 pb-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-semibold text-foreground">{font.name}</p>
                        <Badge variant="secondary" className="text-xs">{font.role}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Weights: {font.weights}</p>
                      <p className="text-xs text-muted-foreground">Usage: {font.usage}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-3xl font-bold text-foreground" style={{ fontFamily: font.name }}>Aa</p>
                      <p className="text-xs text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                      <p className="text-xs text-muted-foreground">abcdefghijklmnopqrstuvwxyz 0–9</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
