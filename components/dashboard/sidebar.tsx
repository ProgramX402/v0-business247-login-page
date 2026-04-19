"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Megaphone,
  ChevronDown,
  ChevronRight,
  Briefcase,
  Users,
  BarChart3,
  Wallet,
  UserCog,
  Palette,
  Globe,
  Target,
  Store,
  Receipt,
  CreditCard,
  Landmark,
  FileText,
  PiggyBank,
  AlertCircle,
  CheckSquare,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  isMobile?: boolean
}

interface NavItem {
  name: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  children?: { name: string; href: string }[]
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Orders",
    icon: ShoppingCart,
    children: [
      { name: "All Orders", href: "/dashboard/orders" },
      { name: "Abandoned Orders", href: "/dashboard/orders/abandoned" },
    ],
  },
  { name: "Products", href: "/dashboard/products", icon: Package },
  {
    name: "Sales & Marketing",
    icon: Megaphone,
    children: [
      { name: "Campaigns", href: "/dashboard/sales-marketing/campaigns" },
      { name: "Sales Channels", href: "/dashboard/sales-marketing/channels" },
      { name: "Brand Designs", href: "/dashboard/sales-marketing/brand-designs" },
      { name: "Website", href: "/dashboard/sales-marketing/website" },
    ],
  },
  { name: "Services", href: "/dashboard/services", icon: Briefcase },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  {
    name: "Finance",
    icon: Wallet,
    children: [
      { name: "Transactions", href: "/dashboard/finance/transactions" },
      { name: "Expenses", href: "/dashboard/finance/expenses" },
      { name: "Payment Methods", href: "/dashboard/finance/payment-methods" },
      { name: "Banking", href: "/dashboard/finance/banking" },
      { name: "Reports", href: "/dashboard/finance/reports" },
      { name: "Budgets", href: "/dashboard/finance/budgets" },
      { name: "Debts", href: "/dashboard/finance/debts" },
      { name: "Tax", href: "/dashboard/finance/tax" },
    ],
  },
  { name: "Employees", href: "/dashboard/employees", icon: Users },
  { name: "Staff Accounts", href: "/dashboard/staff", icon: UserCog },
]

const getIconForChild = (name: string) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    "All Orders": ShoppingCart,
    "Abandoned Orders": AlertCircle,
    Campaigns: Target,
    "Sales Channels": Store,
    "Brand Designs": Palette,
    Website: Globe,
    Transactions: Receipt,
    Expenses: CreditCard,
    "Payment Methods": CreditCard,
    Banking: Landmark,
    Reports: FileText,
    Budgets: PiggyBank,
    Debts: AlertCircle,
    Tax: Receipt,
    Tasks: CheckSquare,
  }
  return icons[name] || FileText
}

export function Sidebar({ collapsed, onToggleCollapse, isMobile = false }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Orders", "Sales & Marketing", "Finance"])

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    )
  }

  const isActive = (href?: string) => {
    if (!href) return false
    // Exact match or match with trailing slash
    if (pathname === href || pathname === href + "/") return true
    // For nested routes, only match if it's a direct child
    if (href.includes("/orders")) {
      // Exact match for /dashboard/orders or /dashboard/orders/abandoned
      return pathname === href || pathname === href + "/"
    }
    // For other routes, allow prefix matching
    return pathname.startsWith(href + "/")
  }

  const isParentActive = (children?: { href: string }[]) => {
    if (!children) return false
    // Check if any child route matches the current pathname exactly
    return children.some((child) => pathname === child.href || pathname === child.href + "/")
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm transition-opacity",
            collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          onClick={onToggleCollapse}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-card border-r border-border transition-all duration-300 flex flex-col",
          isMobile 
            ? (collapsed ? "w-64 -translate-x-full" : "w-64 translate-x-0")
            : (collapsed ? "w-20" : "w-64")
        )}
      >
        {/* Logo */}
        <div className={cn(
          "h-16 flex items-center border-b border-border px-4",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {collapsed ? (
            <span className="font-logo font-bold text-primary text-xl">B</span>
          ) : (
            <Logo href="/dashboard" size="md" />
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn("hidden lg:flex h-8 w-8", collapsed && "hidden")}
            onClick={onToggleCollapse}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => !collapsed && toggleExpand(item.name)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isParentActive(item.children)
                          ? "bg-primary/10 text-primary" :"text-muted-foreground hover:bg-accent hover:text-foreground",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{item.name}</span>
                          {expandedItems.includes(item.name) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </button>
                    {!collapsed && expandedItems.includes(item.name) && (
                      <ul className="mt-1 ml-4 pl-4 border-l border-border space-y-1">
                        {item.children.map((child) => {
                          const ChildIcon = getIconForChild(child.name)
                          return (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                                  isActive(child.href)
                                    ? "bg-primary/10 text-primary font-medium" :"text-muted-foreground hover:bg-accent hover:text-foreground"
                                )}
                              >
                                <ChildIcon className="h-4 w-4 flex-shrink-0" />
                                <span>{child.name}</span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary" :"text-muted-foreground hover:bg-accent hover:text-foreground",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse button for expanded state on desktop */}
        {collapsed && (
          <div className="hidden lg:flex p-3 border-t border-border justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onToggleCollapse}
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          </div>
        )}
      </aside>
    </>
  )
}
