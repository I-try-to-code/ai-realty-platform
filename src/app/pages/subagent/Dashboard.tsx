import { Link } from "react-router";
import { Building2, Users, MessageSquare, TrendingUp, Eye, CheckCircle, Clock } from "lucide-react";
import { StatCard } from "../../components/StatCard";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { month: "Jan", leads: 12, views: 45 },
  { month: "Feb", leads: 18, views: 62 },
  { month: "Mar", leads: 22, views: 78 },
  { month: "Apr", leads: 28, views: 95 },
  { month: "May", leads: 32, views: 108 },
];

const recentLeads = [
  {
    id: "1",
    customer: "Sarah Johnson",
    property: "Modern Family Home",
    status: "INTERESTED",
    time: "2 hours ago",
    unread: 2,
  },
  {
    id: "2",
    customer: "Michael Chen",
    property: "Luxury Penthouse",
    status: "QUALIFIED",
    time: "5 hours ago",
    unread: 0,
  },
  {
    id: "3",
    customer: "Emma Wilson",
    property: "Suburban Retreat",
    status: "NEW",
    time: "1 day ago",
    unread: 1,
  },
];

const topProperties = [
  {
    id: "1",
    title: "Modern Family Home",
    views: 245,
    leads: 18,
    status: "Active",
  },
  {
    id: "2",
    title: "Luxury Penthouse",
    views: 189,
    leads: 12,
    status: "Active",
  },
  {
    id: "3",
    title: "Suburban Retreat",
    views: 156,
    leads: 9,
    status: "Active",
  },
];

export function SubagentDashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your property listings and leads</p>
          </div>
          <Link to="/subagent/properties/add">
            <Button size="lg">
              <Building2 className="size-4 mr-2" />
              Add Property
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            title="Total Properties"
            value="12"
            icon={Building2}
            iconBgColor="bg-blue-100"
            iconColor="text-primary"
            trend={{ value: "+2 this month", positive: true }}
          />
          <StatCard
            title="Active Leads"
            value="28"
            icon={Users}
            iconBgColor="bg-green-100"
            iconColor="text-accent"
            trend={{ value: "+8 this week", positive: true }}
          />
          <StatCard
            title="Pending Approvals"
            value="3"
            icon={Clock}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <StatCard
            title="Total Views"
            value="1,245"
            icon={Eye}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            trend={{ value: "+18% vs last month", positive: true }}
          />
        </div>

        {/* Performance Chart */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="leads" fill="#2563EB" radius={[8, 8, 0, 0]} />
              <Bar dataKey="views" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="size-3 bg-primary rounded mr-2" />
              <span className="text-sm text-gray-600">Leads</span>
            </div>
            <div className="flex items-center">
              <div className="size-3 bg-accent rounded mr-2" />
              <span className="text-sm text-gray-600">Views</span>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Leads */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Leads</h2>
                <Link to="/subagent/leads">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="size-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {lead.customer.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{lead.customer}</p>
                        <p className="text-sm text-gray-600">{lead.property}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={
                          lead.status === "NEW" ? "info" :
                          lead.status === "INTERESTED" ? "warning" :
                          "success"
                        }
                        size="sm"
                      >
                        {lead.status}
                      </Badge>
                      {lead.unread > 0 && (
                        <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
                          {lead.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Top Performing Properties */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Properties</h2>
              <div className="space-y-4">
                {topProperties.map((property, index) => (
                  <div key={property.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{property.title}</span>
                      <Badge variant="success" size="sm">{property.status}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Eye className="size-4 mr-1" />
                        {property.views}
                      </div>
                      <div className="flex items-center">
                        <Users className="size-4 mr-1" />
                        {property.leads} leads
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/subagent/properties/add">
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer text-center">
                <Building2 className="size-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Add New Property</p>
                <p className="text-sm text-gray-600">List a new property</p>
              </div>
            </Link>
            <Link to="/subagent/leads">
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer text-center">
                <MessageSquare className="size-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-900">View All Leads</p>
                <p className="text-sm text-gray-600">Manage your leads</p>
              </div>
            </Link>
            <Link to="/subagent/kyc">
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer text-center">
                <CheckCircle className="size-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Complete KYC</p>
                <p className="text-sm text-gray-600">Verify your account</p>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
