"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, CreditCard, Plug, Building2, Globe, Mail, Phone, MapPin, Camera, Key, Smartphone, AlertTriangle, CheckCircle2, Trash2, Plus,  } from "lucide-react";

const notificationSettings = [
  { id: "order_updates", label: "Order Updates", description: "Get notified when orders are placed or updated", email: true, push: true, sms: false },
  { id: "payment_received", label: "Payment Received", description: "Notifications for successful payments", email: true, push: true, sms: true },
  { id: "low_stock", label: "Low Stock Alerts", description: "Alert when product inventory is running low", email: true, push: false, sms: false },
  { id: "customer_signup", label: "New Customer Signup", description: "When a new customer registers", email: false, push: true, sms: false },
  { id: "weekly_report", label: "Weekly Reports", description: "Summary of weekly business performance", email: true, push: false, sms: false },
  { id: "security_alerts", label: "Security Alerts", description: "Login attempts and security events", email: true, push: true, sms: true },
];

const connectedApps = [
  { name: "Stripe", description: "Payment processing", icon: "💳", connected: true, status: "Active" },
  { name: "Mailchimp", description: "Email marketing", icon: "📧", connected: true, status: "Active" },
  { name: "Google Analytics", description: "Website analytics", icon: "📊", connected: false, status: "Not connected" },
  { name: "Shopify", description: "E-commerce platform", icon: "🛍️", connected: false, status: "Not connected" },
  { name: "QuickBooks", description: "Accounting software", icon: "📒", connected: true, status: "Active" },
  { name: "Slack", description: "Team communication", icon: "💬", connected: false, status: "Not connected" },
];

interface NotifState {
  [key: string]: { email: boolean; push: boolean; sms: boolean };
}

export default function SettingsPage() {
  const [notifState, setNotifState] = useState<NotifState>(
    Object.fromEntries(notificationSettings.map((n) => [n.id, { email: n.email, push: n.push, sms: n.sms }]))
  );

  const toggleNotif = (id: string, channel: "email" | "push" | "sms") => {
    setNotifState((prev) => ({
      ...prev,
      [id]: { ...prev[id], [channel]: !prev[id][channel] },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and business configuration.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="flex flex-wrap gap-1 h-auto bg-muted p-1 rounded-lg w-full sm:w-auto">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Billing</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Plug className="h-4 w-4" />
            <span>Integrations</span>
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your business details and public-facing information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" defaultValue="Business247 Ltd" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select defaultValue="retail">
                    <SelectTrigger id="business-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-email">Business Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="business-email" className="pl-9" defaultValue="contact@business247.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="business-phone" className="pl-9" defaultValue="+234 801 234 5678" />
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="business-address">Business Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea id="business-address" className="pl-9 resize-none" rows={2} defaultValue="14 Victoria Island, Lagos, Nigeria" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="website" className="pl-9" defaultValue="https://business247.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="ngn">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ngn">NGN — Nigerian Naira (₦)</SelectItem>
                      <SelectItem value="usd">USD — US Dollar ($)</SelectItem>
                      <SelectItem value="eur">EUR — Euro (€)</SelectItem>
                      <SelectItem value="gbp">GBP — British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>Configure timezone, language, and date format preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="wat">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wat">WAT — West Africa Time (UTC+1)</SelectItem>
                      <SelectItem value="utc">UTC — Coordinated Universal Time</SelectItem>
                      <SelectItem value="est">EST — Eastern Standard Time (UTC-5)</SelectItem>
                      <SelectItem value="gmt">GMT — Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="yo">Yoruba</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select defaultValue="dmy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and profile photo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-user.jpg" alt="Profile photo" />
                    <AvatarFallback className="text-xl bg-primary/10 text-primary">JD</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-foreground">John Doe</p>
                  <p className="text-sm text-muted-foreground">Admin · Business247 Ltd</p>
                  <Button variant="outline" size="sm" className="mt-2">Change Photo</Button>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@business247.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+234 801 234 5678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Administrator" disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Management" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" rows={3} className="resize-none" defaultValue="Business owner and administrator at Business247 Ltd. Passionate about growing the business and serving customers." />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {/* Header row */}
                <div className="hidden sm:grid grid-cols-[1fr_80px_80px_80px] gap-4 pb-3 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">Notification</span>
                  <span className="text-sm font-medium text-muted-foreground text-center">Email</span>
                  <span className="text-sm font-medium text-muted-foreground text-center">Push</span>
                  <span className="text-sm font-medium text-muted-foreground text-center">SMS</span>
                </div>
                {notificationSettings.map((notif, idx) => (
                  <div key={notif.id}>
                    <div className="py-4 grid grid-cols-1 sm:grid-cols-[1fr_80px_80px_80px] gap-3 sm:gap-4 items-start sm:items-center">
                      <div>
                        <p className="text-sm font-medium text-foreground">{notif.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{notif.description}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:justify-center">
                        <span className="text-xs text-muted-foreground sm:hidden w-10">Email</span>
                        <Switch
                          checked={notifState[notif.id]?.email}
                          onCheckedChange={() => toggleNotif(notif.id, "email")}
                        />
                      </div>
                      <div className="flex items-center gap-2 sm:justify-center">
                        <span className="text-xs text-muted-foreground sm:hidden w-10">Push</span>
                        <Switch
                          checked={notifState[notif.id]?.push}
                          onCheckedChange={() => toggleNotif(notif.id, "push")}
                        />
                      </div>
                      <div className="flex items-center gap-2 sm:justify-center">
                        <span className="text-xs text-muted-foreground sm:hidden w-10">SMS</span>
                        <Switch
                          checked={notifState[notif.id]?.sms}
                          onCheckedChange={() => toggleNotif(notif.id, "sms")}
                        />
                      </div>
                    </div>
                    {idx < notificationSettings.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="current-password" type="password" className="pl-9" placeholder="Enter current password" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="new-password" type="password" className="pl-9" placeholder="Enter new password" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="confirm-password" type="password" className="pl-9" placeholder="Confirm new password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Authenticator App</p>
                    <p className="text-xs text-muted-foreground">Use an authenticator app to generate codes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-900/20">Not Enabled</Badge>
                  <Button size="sm">Enable</Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">SMS Verification</p>
                    <p className="text-xs text-muted-foreground">Receive a code via SMS when signing in</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-900/20">Not Enabled</Badge>
                  <Button size="sm">Enable</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage devices currently signed in to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { device: "Chrome on Windows", location: "Lagos, Nigeria", time: "Current session", current: true },
                { device: "Safari on iPhone", location: "Lagos, Nigeria", time: "2 hours ago", current: false },
                { device: "Firefox on MacOS", location: "Abuja, Nigeria", time: "Yesterday", current: false },
              ].map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${session.current ? "bg-green-500" : "bg-muted-foreground"}`} />
                    <div>
                      <p className="text-sm font-medium">{session.device}</p>
                      <p className="text-xs text-muted-foreground">{session.location} · {session.time}</p>
                    </div>
                  </div>
                  {session.current ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0">Active</Badge>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Revoke</Button>
                  )}
                </div>
              ))}
              <div className="flex justify-end pt-2">
                <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/5">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Revoke All Other Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently on the Business Pro plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-primary/30 bg-primary/5">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground text-lg">Business Pro</p>
                    <Badge className="bg-primary/10 text-primary border-0">Current Plan</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">₦25,000 / month · Renews on May 19, 2026</p>
                  <ul className="mt-3 space-y-1">
                    {["Unlimited products", "Up to 10 staff accounts", "Advanced analytics", "Priority support"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <Button>Upgrade Plan</Button>
                  <Button variant="outline">Manage Subscription</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved payment methods for billing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-14 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 08/2027</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50 dark:bg-green-900/20">Default</Badge>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your past invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { date: "Apr 19, 2026", amount: "₦25,000", status: "Paid", invoice: "INV-2026-04" },
                  { date: "Mar 19, 2026", amount: "₦25,000", status: "Paid", invoice: "INV-2026-03" },
                  { date: "Feb 19, 2026", amount: "₦25,000", status: "Paid", invoice: "INV-2026-02" },
                  { date: "Jan 19, 2026", amount: "₦25,000", status: "Paid", invoice: "INV-2026-01" },
                ].map((item) => (
                  <div key={item.invoice} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium">{item.invoice}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{item.amount}</span>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0">{item.status}</Badge>
                      <Button variant="ghost" size="sm" className="text-primary h-8">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Apps</CardTitle>
              <CardDescription>Manage third-party integrations and connected services.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {connectedApps.map((app) => (
                  <div key={app.name} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xl">
                        {app.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{app.name}</p>
                        <p className="text-xs text-muted-foreground">{app.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {app.connected ? (
                        <>
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0 hidden sm:flex">Active</Badge>
                          <Button variant="outline" size="sm">Manage</Button>
                        </>
                      ) : (
                        <Button size="sm">
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage API keys for programmatic access to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                <div>
                  <p className="text-sm font-medium">Production API Key</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">biz247_live_••••••••••••••••••••••••••••••••</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Reveal</Button>
                  <Button variant="outline" size="sm">Regenerate</Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                <div>
                  <p className="text-sm font-medium">Test API Key</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">biz247_test_••••••••••••••••••••••••••••••••</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Reveal</Button>
                  <Button variant="outline" size="sm">Regenerate</Button>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-400">Keep your API keys secure. Never share them publicly or commit them to version control.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
