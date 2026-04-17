"use client";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  MonitorSmartphone,
  Globe,
  User,
  Settings,
  Bell,
  Search,
  LogOut,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface TopBarProps {
  onToggleSidebar: () => void
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 h-16 bg-card border-b border-border">
      <div className="h-full flex items-center justify-between px-4 gap-4">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search */}
          <div className={cn(
            "relative transition-all duration-200",
            searchOpen ? "w-64" : "w-10 md:w-64"
          )}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className={cn(
                "pl-9 h-10 bg-background border-border",
                !searchOpen && "w-10 md:w-full cursor-pointer md:cursor-text"
              )}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* POS Button */}
          <Link href="/dashboard/pos">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
              <MonitorSmartphone className="h-4 w-4" />
              <span>POS</span>
            </Button>
          </Link>

          {/* Online Store Button */}
          <Link href="/dashboard/online-store">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Online Store</span>
            </Button>
          </Link>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="py-4 text-center text-sm text-muted-foreground">
                No new notifications
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">Admin</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Link href="/dashboard/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
