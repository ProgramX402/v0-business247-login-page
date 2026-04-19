"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Camera, Briefcase, Calendar, TrendingUp, ShoppingCart, DollarSign, Edit2, Check, X, Link2, Twitter, Linkedin, Globe, Clock, Shield,  } from "lucide-react";

const activityLog = [
  { action: "Updated product listing", time: "2 hours ago", type: "product" },
  { action: "Processed order #ORD-4821", time: "5 hours ago", type: "order" },
  { action: "Added new customer Chioma Okafor", time: "Yesterday, 3:45 PM", type: "customer" },
  { action: "Generated monthly finance report", time: "Yesterday, 11:00 AM", type: "finance" },
  { action: "Updated business settings", time: "2 days ago", type: "settings" },
  { action: "Launched Summer Campaign", time: "3 days ago", type: "marketing" },
  { action: "Resolved support ticket #T-0291", time: "4 days ago", type: "support" },
];

const activityColor: Record<string, string> = {
  product: "bg-blue-500",
  order: "bg-green-500",
  customer: "bg-purple-500",
  finance: "bg-amber-500",
  settings: "bg-slate-500",
  marketing: "bg-pink-500",
  support: "bg-teal-500",
};

const stats = [
  { label: "Orders Managed", value: "1,248", icon: ShoppingCart, change: "+12%" },
  { label: "Revenue Handled", value: "₦8.4M", icon: DollarSign, change: "+8.3%" },
  { label: "Customers Added", value: "342", icon: User, change: "+5.1%" },
  { label: "Campaigns Run", value: "24", icon: TrendingUp, change: "+3 this month" },
];

export default function ProfilePage() {
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@business247.com");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [location, setLocation] = useState("Lagos, Nigeria");
  const [bio, setBio] = useState("Business owner and entrepreneur with 8+ years of experience in retail and e-commerce. Passionate about building customer-centric brands.");
  const [role] = useState("Administrator");
  const [joinDate] = useState("January 2022");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and account activity.</p>
      </div>

      {/* Profile Hero Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                <AvatarImage src="/placeholder-user.jpg" alt="John Doe profile photo" />
                <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start gap-3">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{firstName} {lastName}</h2>
                  <p className="text-muted-foreground text-sm">{email}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {role}
                  </Badge>
                  <Badge className="bg-green-500/10 text-green-600 border-green-200 hover:bg-green-500/20">
                    Active
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  Business247
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {joinDate}
                </span>
              </div>
            </div>

            {/* Edit button */}
            <Button variant="outline" size="sm" className="flex-shrink-0" onClick={() => setEditingPersonal(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4.5 w-4.5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="bg-muted p-1 rounded-lg">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            Social Links
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-base">Personal Information</CardTitle>
                <CardDescription>Your basic profile details</CardDescription>
              </div>
              {!editingPersonal ? (
                <Button variant="outline" size="sm" onClick={() => setEditingPersonal(true)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setEditingPersonal(false)}>
                    <Check className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditingPersonal(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  {editingPersonal ? (
                    <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  ) : (
                    <p className="text-sm text-foreground py-2 px-3 bg-muted/40 rounded-md">{firstName}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  {editingPersonal ? (
                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  ) : (
                    <p className="text-sm text-foreground py-2 px-3 bg-muted/40 rounded-md">{lastName}</p>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                {editingPersonal ? (
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" />
                  </div>
                ) : (
                  <p className="text-sm text-foreground py-2 px-3 bg-muted/40 rounded-md flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {email}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                {editingPersonal ? (
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-9" />
                  </div>
                ) : (
                  <p className="text-sm text-foreground py-2 px-3 bg-muted/40 rounded-md flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {phone}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="location">Location</Label>
                {editingPersonal ? (
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="pl-9" />
                  </div>
                ) : (
                  <p className="text-sm text-foreground py-2 px-3 bg-muted/40 rounded-md flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {location}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                {editingPersonal ? (
                  <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
                ) : (
                  <p className="text-sm text-foreground py-2 px-3 bg-muted/40 rounded-md leading-relaxed">{bio}</p>
                )}
              </div>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Role</Label>
                  <p className="text-sm text-foreground py-2 px-3 bg-muted/40 rounded-md flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    {role}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label>Member Since</Label>
                  <p className="text-sm text-foreground py-2 px-3 bg-muted/40 rounded-md flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {joinDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <CardDescription>Your latest actions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0 ${activityColor[item.type]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Links Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Social & Web Links</CardTitle>
              <CardDescription>Connect your social profiles and website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="twitter" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-sky-500" />
                  Twitter / X
                </Label>
                <Input id="twitter" placeholder="https://twitter.com/yourhandle" defaultValue="" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  LinkedIn
                </Label>
                <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" defaultValue="" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  Personal Website
                </Label>
                <Input id="website" placeholder="https://yourwebsite.com" defaultValue="" />
              </div>
              <div className="pt-2">
                <Button>
                  <Check className="h-4 w-4 mr-2" />
                  Save Links
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
