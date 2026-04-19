"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserCog, Search, Plus, MoreHorizontal, ShieldCheck, ShieldOff, KeyRound, UserX, UserCheck, Users, CheckCircle2, XCircle, Clock, Edit,  } from "lucide-react";

interface Permission {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface StaffAccount {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: "Admin" | "Manager" | "Staff" | "Viewer";
  status: "Active" | "Inactive" | "Suspended";
  lastLogin: string;
  createdAt: string;
  avatar: string;
  permissions: Permission[];
}

const defaultPermissions = (role: StaffAccount["role"]): Permission[] => {
  const isAdmin = role === "Admin";
  const isManager = role === "Manager";
  const isStaff = role === "Staff";
  return [
    {
      module: "Dashboard",
      view: true,
      create: isAdmin || isManager,
      edit: isAdmin || isManager,
      delete: isAdmin,
    },
    {
      module: "Orders",
      view: true,
      create: isAdmin || isManager || isStaff,
      edit: isAdmin || isManager || isStaff,
      delete: isAdmin || isManager,
    },
    {
      module: "Products",
      view: true,
      create: isAdmin || isManager,
      edit: isAdmin || isManager || isStaff,
      delete: isAdmin,
    },
    {
      module: "Customers",
      view: isAdmin || isManager || isStaff,
      create: isAdmin || isManager,
      edit: isAdmin || isManager,
      delete: isAdmin,
    },
    {
      module: "Finance",
      view: isAdmin || isManager,
      create: isAdmin,
      edit: isAdmin,
      delete: isAdmin,
    },
    {
      module: "Employees",
      view: isAdmin || isManager,
      create: isAdmin,
      edit: isAdmin || isManager,
      delete: isAdmin,
    },
    {
      module: "Analytics",
      view: isAdmin || isManager,
      create: false,
      edit: false,
      delete: false,
    },
    {
      module: "Settings",
      view: isAdmin,
      create: isAdmin,
      edit: isAdmin,
      delete: isAdmin,
    },
  ];
};

const mockStaff: StaffAccount[] = [
  {
    id: "SA-001",
    username: "admin.chioma",
    fullName: "Chioma Okafor",
    email: "chioma.okafor@company.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2025-04-19 09:14",
    createdAt: "2022-03-15",
    avatar: "CO",
    permissions: defaultPermissions("Admin"),
  },
  {
    id: "SA-002",
    username: "mgr.adebayo",
    fullName: "Adebayo Johnson",
    email: "adebayo.j@company.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2025-04-18 16:42",
    createdAt: "2021-07-22",
    avatar: "AJ",
    permissions: defaultPermissions("Manager"),
  },
  {
    id: "SA-003",
    username: "zainab.h",
    fullName: "Zainab Hassan",
    email: "zainab.hassan@company.com",
    role: "Staff",
    status: "Inactive",
    lastLogin: "2025-03-30 11:05",
    createdAt: "2020-11-10",
    avatar: "ZH",
    permissions: defaultPermissions("Staff"),
  },
  {
    id: "SA-004",
    username: "seun.adeyemi",
    fullName: "Oluwaseun Adeyemi",
    email: "seun.adeyemi@company.com",
    role: "Staff",
    status: "Active",
    lastLogin: "2025-04-19 08:30",
    createdAt: "2023-01-05",
    avatar: "OA",
    permissions: defaultPermissions("Staff"),
  },
  {
    id: "SA-005",
    username: "ngozi.eze",
    fullName: "Ngozi Eze",
    email: "ngozi.eze@company.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2025-04-17 14:20",
    createdAt: "2022-06-18",
    avatar: "NE",
    permissions: defaultPermissions("Manager"),
  },
  {
    id: "SA-006",
    username: "emeka.nw",
    fullName: "Emeka Nwankwo",
    email: "emeka.nwankwo@company.com",
    role: "Viewer",
    status: "Suspended",
    lastLogin: "2025-02-14 10:00",
    createdAt: "2021-02-14",
    avatar: "EN",
    permissions: defaultPermissions("Viewer"),
  },
  {
    id: "SA-007",
    username: "amara.eze",
    fullName: "Amara Eze",
    email: "amara.eze@company.com",
    role: "Staff",
    status: "Active",
    lastLogin: "2025-04-18 13:55",
    createdAt: "2023-09-03",
    avatar: "AE",
    permissions: defaultPermissions("Staff"),
  },
];

const roleColors: Record<StaffAccount["role"], string> = {
  Admin: "bg-red-100 text-red-700 border-red-200",
  Manager: "bg-blue-100 text-blue-700 border-blue-200",
  Staff: "bg-green-100 text-green-700 border-green-200",
  Viewer: "bg-gray-100 text-gray-600 border-gray-200",
};

const statusConfig: Record<StaffAccount["status"], { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  Active: { color: "text-green-600", icon: CheckCircle2 },
  Inactive: { color: "text-yellow-600", icon: Clock },
  Suspended: { color: "text-red-600", icon: XCircle },
};

const avatarBg: Record<string, string> = {
  CO: "bg-purple-500",
  AJ: "bg-blue-500",
  ZH: "bg-pink-500",
  OA: "bg-green-500",
  NE: "bg-yellow-500",
  EN: "bg-orange-500",
  AE: "bg-teal-500",
};

export default function StaffAccountsPage() {
  const [staff, setStaff] = useState<StaffAccount[]>(mockStaff);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [selectedStaff, setSelectedStaff] = useState<StaffAccount | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "permissions">("details");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [editTarget, setEditTarget] = useState<StaffAccount | null>(null);
  const [newAccount, setNewAccount] = useState({ fullName: "", username: "", email: "", role: "Staff" as StaffAccount["role"] });

  const filtered = staff.filter((s) => {
    const matchSearch =
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.username.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || s.role === roleFilter;
    return matchSearch && matchRole;
  });

  const stats = {
    total: staff.length,
    active: staff.filter((s) => s.status === "Active").length,
    inactive: staff.filter((s) => s.status === "Inactive").length,
    suspended: staff.filter((s) => s.status === "Suspended").length,
  };

  const handleDeactivate = (id: string) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s))
    );
  };

  const handleSuspend = (id: string) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Suspended" } : s))
    );
  };

  const handleCreate = () => {
    if (!newAccount.fullName || !newAccount.username || !newAccount.email) return;
    const created: StaffAccount = {
      id: `SA-${String(staff.length + 1).padStart(3, "0")}`,
      username: newAccount.username,
      fullName: newAccount.fullName,
      email: newAccount.email,
      role: newAccount.role,
      status: "Active",
      lastLogin: "Never",
      createdAt: new Date().toISOString().split("T")[0],
      avatar: newAccount.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
      permissions: defaultPermissions(newAccount.role),
    };
    setStaff((prev) => [...prev, created]);
    setNewAccount({ fullName: "", username: "", email: "", role: "Staff" });
    setShowCreateDialog(false);
  };

  const handleEdit = () => {
    if (!editTarget) return;
    setStaff((prev) => prev.map((s) => (s.id === editTarget.id ? editTarget : s)));
    setShowEditDialog(false);
    setEditTarget(null);
  };

  const togglePermission = (staffId: string, module: string, action: keyof Omit<Permission, "module">) => {
    setStaff((prev) =>
      prev.map((s) =>
        s.id === staffId
          ? {
              ...s,
              permissions: s.permissions.map((p) =>
                p.module === module ? { ...p, [action]: !p[action] } : p
              ),
            }
          : s
      )
    );
    if (selectedStaff?.id === staffId) {
      setSelectedStaff((prev) =>
        prev
          ? {
              ...prev,
              permissions: prev.permissions.map((p) =>
                p.module === module ? { ...p, [action]: !p[action] } : p
              ),
            }
          : prev
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Staff Accounts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage staff access, roles, and permissions</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="gap-2 w-fit">
          <Plus className="h-4 w-4" />
          Add Staff Account
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Accounts", value: stats.total, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active", value: stats.active, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
          { label: "Inactive", value: stats.inactive, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "Suspended", value: stats.suspended, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
        ].map((stat) => (
          <Card key={stat.label} className="border border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="Staff">Staff</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Staff Table */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <UserCog className="h-4 w-4 text-primary" />
            Account Directory
            <span className="ml-auto text-sm font-normal text-muted-foreground">{filtered.length} accounts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Staff Member</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Username</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden xl:table-cell">Last Login</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((account) => {
                  const StatusIcon = statusConfig[account.status].icon;
                  return (
                    <tr key={account.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${avatarBg[account.avatar] ?? "bg-primary"}`}>
                            {account.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{account.fullName}</p>
                            <p className="text-xs text-muted-foreground">{account.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-muted-foreground font-mono text-xs">{account.username}</td>
                      <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{account.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${roleColors[account.role]}`}>
                          {account.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${statusConfig[account.status].color}`}>
                          <StatusIcon className="h-3.5 w-3.5" />
                          {account.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell text-muted-foreground text-xs">{account.lastLogin}</td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedStaff(account);
                                setActiveTab("details");
                              }}
                              className="gap-2"
                            >
                              <UserCog className="h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedStaff(account);
                                setActiveTab("permissions");
                                setShowPermissionsDialog(true);
                              }}
                              className="gap-2"
                            >
                              <ShieldCheck className="h-4 w-4" /> Manage Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setEditTarget({ ...account });
                                setShowEditDialog(true);
                              }}
                              className="gap-2"
                            >
                              <Edit className="h-4 w-4" /> Edit Account
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-blue-600">
                              <KeyRound className="h-4 w-4" /> Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeactivate(account.id)}
                              className="gap-2 text-yellow-600"
                            >
                              {account.status === "Active" ? (
                                <><UserX className="h-4 w-4" /> Deactivate</>
                              ) : (
                                <><UserCheck className="h-4 w-4" /> Activate</>
                              )}
                            </DropdownMenuItem>
                            {account.status !== "Suspended" && (
                              <DropdownMenuItem
                                onClick={() => handleSuspend(account.id)}
                                className="gap-2 text-red-600"
                              >
                                <ShieldOff className="h-4 w-4" /> Suspend Account
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                <UserCog className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No staff accounts found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Permissions Overview Card */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Access &amp; Permissions Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-medium text-muted-foreground w-32">Module</th>
                  {(["Admin", "Manager", "Staff", "Viewer"] as const).map((role) => (
                    <th key={role} className="text-center py-2 px-3 font-medium">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${roleColors[role]}`}>
                        {role}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {defaultPermissions("Admin").map((perm) => (
                  <tr key={perm.module} className="border-b border-border last:border-0">
                    <td className="py-2.5 pr-4 font-medium text-foreground">{perm.module}</td>
                    {(["Admin", "Manager", "Staff", "Viewer"] as const).map((role) => {
                      const rolePerm = defaultPermissions(role).find((p) => p.module === perm.module);
                      const actions = rolePerm
                        ? [
                            rolePerm.view && "View",
                            rolePerm.create && "Create",
                            rolePerm.edit && "Edit",
                            rolePerm.delete && "Delete",
                          ].filter(Boolean)
                        : [];
                      return (
                        <td key={role} className="py-2.5 px-3 text-center">
                          {actions.length > 0 ? (
                            <div className="flex flex-wrap gap-1 justify-center">
                              {actions.map((a) => (
                                <span key={String(a)} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-medium">
                                  {a}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <XCircle className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create Account Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" /> Create Staff Account
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input
                placeholder="e.g. Amara Eze"
                value={newAccount.fullName}
                onChange={(e) => setNewAccount((p) => ({ ...p, fullName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Username</Label>
              <Input
                placeholder="e.g. amara.eze"
                value={newAccount.username}
                onChange={(e) => setNewAccount((p) => ({ ...p, username: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="e.g. amara@company.com"
                value={newAccount.email}
                onChange={(e) => setNewAccount((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select value={newAccount.role} onValueChange={(v) => setNewAccount((p) => ({ ...p, role: v as StaffAccount["role"] }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!newAccount.fullName || !newAccount.username || !newAccount.email}>
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Account Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-primary" /> Edit Account
            </DialogTitle>
          </DialogHeader>
          {editTarget && (
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label>Full Name</Label>
                <Input
                  value={editTarget.fullName}
                  onChange={(e) => setEditTarget((p) => p ? { ...p, fullName: e.target.value } : p)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Username</Label>
                <Input
                  value={editTarget.username}
                  onChange={(e) => setEditTarget((p) => p ? { ...p, username: e.target.value } : p)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={editTarget.email}
                  onChange={(e) => setEditTarget((p) => p ? { ...p, email: e.target.value } : p)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Role</Label>
                <Select
                  value={editTarget.role}
                  onValueChange={(v) => setEditTarget((p) => p ? { ...p, role: v as StaffAccount["role"] } : p)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select
                  value={editTarget.status}
                  onValueChange={(v) => setEditTarget((p) => p ? { ...p, status: v as StaffAccount["status"] } : p)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={showPermissionsDialog} onOpenChange={setShowPermissionsDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Manage Permissions
              {selectedStaff && (
                <span className="text-sm font-normal text-muted-foreground ml-1">— {selectedStaff.fullName}</span>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedStaff && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-3 font-medium text-muted-foreground">Module</th>
                    {(["view", "create", "edit", "delete"] as const).map((action) => (
                      <th key={action} className="text-center py-2 px-2 font-medium text-muted-foreground capitalize">{action}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedStaff.permissions.map((perm) => (
                    <tr key={perm.module} className="border-b border-border last:border-0">
                      <td className="py-2.5 pr-3 font-medium text-foreground">{perm.module}</td>
                      {(["view", "create", "edit", "delete"] as const).map((action) => (
                        <td key={action} className="py-2.5 px-2 text-center">
                          <Switch
                            checked={perm[action]}
                            onCheckedChange={() => togglePermission(selectedStaff.id, perm.module, action)}
                            className="scale-75"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowPermissionsDialog(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
