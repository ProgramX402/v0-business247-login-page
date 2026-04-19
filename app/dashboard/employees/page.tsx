"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Calendar,
  Download,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: "Active" | "On Leave" | "Inactive";
  joinDate: string;
  avatar: string;
}

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  payPeriod: string;
  status: "Paid" | "Pending" | "Processing";
}

const mockEmployees: Employee[] = [
  {
    id: "EMP-001",
    name: "Chioma Okafor",
    role: "Senior Product Designer",
    department: "Design",
    email: "chioma.okafor@company.com",
    phone: "+234 901 234 5678",
    status: "Active",
    joinDate: "2022-03-15",
    avatar: "CO",
  },
  {
    id: "EMP-002",
    name: "Adebayo Johnson",
    role: "Software Engineer",
    department: "Engineering",
    email: "adebayo.j@company.com",
    phone: "+234 902 345 6789",
    status: "Active",
    joinDate: "2021-07-22",
    avatar: "AJ",
  },
  {
    id: "EMP-003",
    name: "Zainab Hassan",
    role: "Marketing Manager",
    department: "Marketing",
    email: "zainab.hassan@company.com",
    phone: "+234 903 456 7890",
    status: "On Leave",
    joinDate: "2020-11-10",
    avatar: "ZH",
  },
  {
    id: "EMP-004",
    name: "Oluwaseun Adeyemi",
    role: "Finance Analyst",
    department: "Finance",
    email: "seun.adeyemi@company.com",
    phone: "+234 904 567 8901",
    status: "Active",
    joinDate: "2023-01-05",
    avatar: "OA",
  },
  {
    id: "EMP-005",
    name: "Ngozi Eze",
    role: "HR Specialist",
    department: "Human Resources",
    email: "ngozi.eze@company.com",
    phone: "+234 905 678 9012",
    status: "Active",
    joinDate: "2022-06-18",
    avatar: "NE",
  },
  {
    id: "EMP-006",
    name: "Emeka Nwankwo",
    role: "Sales Executive",
    department: "Sales",
    email: "emeka.nwankwo@company.com",
    phone: "+234 906 789 0123",
    status: "Inactive",
    joinDate: "2021-02-14",
    avatar: "EN",
  },
  {
    id: "EMP-007",
    name: "Amara Eze",
    role: "Backend Engineer",
    department: "Engineering",
    email: "amara.eze@company.com",
    phone: "+234 907 890 1234",
    status: "Active",
    joinDate: "2023-09-03",
    avatar: "AE",
  },
  {
    id: "EMP-008",
    name: "David Okonkwo",
    role: "Operations Lead",
    department: "Operations",
    email: "david.okonkwo@company.com",
    phone: "+234 908 901 2345",
    status: "Active",
    joinDate: "2020-08-22",
    avatar: "DO",
  },
];

const mockPayroll: PayrollRecord[] = [
  {
    id: "PAY-001",
    employeeId: "EMP-001",
    employeeName: "Chioma Okafor",
    department: "Design",
    baseSalary: 450000,
    bonus: 45000,
    deductions: 52000,
    netPay: 443000,
    payPeriod: "April 2025",
    status: "Paid",
  },
  {
    id: "PAY-002",
    employeeId: "EMP-002",
    employeeName: "Adebayo Johnson",
    department: "Engineering",
    baseSalary: 520000,
    bonus: 60000,
    deductions: 65000,
    netPay: 515000,
    payPeriod: "April 2025",
    status: "Paid",
  },
  {
    id: "PAY-003",
    employeeId: "EMP-003",
    employeeName: "Zainab Hassan",
    department: "Marketing",
    baseSalary: 380000,
    bonus: 0,
    deductions: 42000,
    netPay: 338000,
    payPeriod: "April 2025",
    status: "Pending",
  },
  {
    id: "PAY-004",
    employeeId: "EMP-004",
    employeeName: "Oluwaseun Adeyemi",
    department: "Finance",
    baseSalary: 400000,
    bonus: 30000,
    deductions: 48000,
    netPay: 382000,
    payPeriod: "April 2025",
    status: "Processing",
  },
  {
    id: "PAY-005",
    employeeId: "EMP-005",
    employeeName: "Ngozi Eze",
    department: "Human Resources",
    baseSalary: 350000,
    bonus: 20000,
    deductions: 40000,
    netPay: 330000,
    payPeriod: "April 2025",
    status: "Paid",
  },
  {
    id: "PAY-006",
    employeeId: "EMP-007",
    employeeName: "Amara Eze",
    department: "Engineering",
    baseSalary: 490000,
    bonus: 50000,
    deductions: 58000,
    netPay: 482000,
    payPeriod: "April 2025",
    status: "Paid",
  },
  {
    id: "PAY-007",
    employeeId: "EMP-008",
    employeeName: "David Okonkwo",
    department: "Operations",
    baseSalary: 420000,
    bonus: 35000,
    deductions: 50000,
    netPay: 405000,
    payPeriod: "April 2025",
    status: "Processing",
  },
];

const departmentColors: Record<string, string> = {
  Design: "bg-purple-100 text-purple-800",
  Engineering: "bg-blue-100 text-blue-800",
  Marketing: "bg-pink-100 text-pink-800",
  Finance: "bg-green-100 text-green-800",
  "Human Resources": "bg-yellow-100 text-yellow-800",
  Sales: "bg-orange-100 text-orange-800",
  Operations: "bg-teal-100 text-teal-800",
};

const avatarColors: Record<string, string> = {
  Design: "bg-purple-500",
  Engineering: "bg-blue-500",
  Marketing: "bg-pink-500",
  Finance: "bg-green-500",
  "Human Resources": "bg-yellow-500",
  Sales: "bg-orange-500",
  Operations: "bg-teal-500",
};

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

function getStatusBadge(status: Employee["status"]) {
  switch (status) {
    case "Active":
      return (
        <Badge className="bg-green-100 text-green-800 border-0 gap-1">
          <CheckCircle2 className="h-3 w-3" /> Active
        </Badge>
      );
    case "On Leave":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-0 gap-1">
          <Clock className="h-3 w-3" /> On Leave
        </Badge>
      );
    case "Inactive":
      return (
        <Badge className="bg-gray-100 text-gray-600 border-0 gap-1">
          <AlertCircle className="h-3 w-3" /> Inactive
        </Badge>
      );
  }
}

function getPayrollStatusBadge(status: PayrollRecord["status"]) {
  switch (status) {
    case "Paid":
      return (
        <Badge className="bg-green-100 text-green-800 border-0 gap-1">
          <CheckCircle2 className="h-3 w-3" /> Paid
        </Badge>
      );
    case "Pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-0 gap-1">
          <Clock className="h-3 w-3" /> Pending
        </Badge>
      );
    case "Processing":
      return (
        <Badge className="bg-blue-100 text-blue-800 border-0 gap-1">
          <TrendingUp className="h-3 w-3" /> Processing
        </Badge>
      );
  }
}

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [payrollSearch, setPayrollSearch] = useState("");

  const filteredEmployees = mockEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayroll = mockPayroll.filter(
    (rec) =>
      rec.employeeName.toLowerCase().includes(payrollSearch.toLowerCase()) ||
      rec.department.toLowerCase().includes(payrollSearch.toLowerCase())
  );

  const totalEmployees = mockEmployees.length;
  const activeCount = mockEmployees.filter((e) => e.status === "Active").length;
  const onLeaveCount = mockEmployees.filter((e) => e.status === "On Leave").length;
  const totalPayroll = mockPayroll.reduce((sum, r) => sum + r.netPay, 0);
  const paidCount = mockPayroll.filter((r) => r.status === "Paid").length;
  const pendingCount = mockPayroll.filter((r) => r.status === "Pending" || r.status === "Processing").length;

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your team and payroll in one place
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" /> Add Employee
        </Button>
      </div>

      {/* ─── SECTION 1: Employee Directory ─── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Employee Directory</h2>
        </div>

        {/* Directory Stats */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{totalEmployees}</p>
                  <p className="text-xs text-muted-foreground">Total Employees</p>
                </div>
                <Users className="h-5 w-5 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">{activeCount}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{onLeaveCount}</p>
                  <p className="text-xs text-muted-foreground">On Leave</p>
                </div>
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {[...new Set(mockEmployees.map((e) => e.department))].length}
                  </p>
                  <p className="text-xs text-muted-foreground">Departments</p>
                </div>
                <Building2 className="h-5 w-5 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Employee Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 ${
                      avatarColors[employee.department] || "bg-gray-500"
                    }`}
                  >
                    {employee.avatar}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1 mb-3">
                  <p className="font-semibold text-sm leading-tight">{employee.name}</p>
                  <p className="text-xs text-muted-foreground">{employee.role}</p>
                </div>

                <div className="mb-3">
                  <Badge
                    className={`text-xs border-0 ${
                      departmentColors[employee.department] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {employee.department}
                  </Badge>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3 flex-shrink-0" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span>Joined {new Date(employee.joinDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  {getStatusBadge(employee.status)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No employees found matching your search.</p>
          </div>
        )}
      </section>

      {/* ─── SECTION 2: Payroll Management ─── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Payroll Management</h2>
        </div>

        {/* Payroll Stats */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">
                    {formatCurrency(totalPayroll)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Net Payroll</p>
                </div>
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{paidCount}</p>
                  <p className="text-xs text-muted-foreground">Paid This Month</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-2 sm:col-span-1">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                  <p className="text-xs text-muted-foreground">Pending / Processing</p>
                </div>
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payroll Table Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search payroll records..."
              value={payrollSearch}
              onChange={(e) => setPayrollSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" /> Export Payroll
          </Button>
        </div>

        {/* Payroll Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">April 2025 Payroll</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Employee</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Department</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Base Salary</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Bonus</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Deductions</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Net Pay</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayroll.map((record, idx) => (
                    <tr
                      key={record.id}
                      className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${
                        idx % 2 === 0 ? "" : "bg-muted/10"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${
                              avatarColors[record.department] || "bg-gray-500"
                            }`}
                          >
                            {record.employeeName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-medium leading-tight">{record.employeeName}</p>
                            <p className="text-xs text-muted-foreground sm:hidden">{record.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge
                          className={`text-xs border-0 ${
                            departmentColors[record.department] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {record.department}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right hidden md:table-cell text-muted-foreground">
                        {formatCurrency(record.baseSalary)}
                      </td>
                      <td className="px-4 py-3 text-right hidden lg:table-cell text-green-600">
                        {record.bonus > 0 ? `+${formatCurrency(record.bonus)}` : "—"}
                      </td>
                      <td className="px-4 py-3 text-right hidden lg:table-cell text-red-500">
                        -{formatCurrency(record.deductions)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        {formatCurrency(record.netPay)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {getPayrollStatusBadge(record.status)}
                      </td>
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Slip</DropdownMenuItem>
                            <DropdownMenuItem>Edit Record</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredPayroll.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <DollarSign className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No payroll records found.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
