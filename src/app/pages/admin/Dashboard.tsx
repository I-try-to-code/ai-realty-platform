import { Users, Building2, MessageSquare, Clock, TrendingUp, Eye, Shield, CheckCircle } from "lucide-react";
import { StatCard } from "../../components/StatCard";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const activityData = [
  { date: "Mon", users: 45, properties: 12, leads: 28 },
  { date: "Tue", users: 52, properties: 15, leads: 35 },
  { date: "Wed", users: 48, properties: 18, leads: 42 },
  { date: "Thu", users: 61, properties: 22, leads: 38 },
  { date: "Fri", users: 55, properties: 19, leads: 45 },
  { date: "Sat", users: 67, properties: 25, leads: 52 },
  { date: "Sun", users: 58, properties: 20, leads: 48 },
];

const statusData = [
  { name: "Approved", value: 125, color: "#10B981" },
  { name: "Pending", value: 23, color: "#F59E0B" },
  { name: "Rejected", value: 8, color: "#EF4444" },
];

const recentActivity = [
  {
    type: "subagent_approval",
    message: "New subagent verification request from John Doe",
    time: "5 minutes ago",
  },
  {
    type: "property_moderation",
    message: "Property 'Modern Family Home' submitted for approval",
    time: "12 minutes ago",
  },
  {
    type: "chat_flagged",
    message: "Chat conversation flagged for review",
    time: "1 hour ago",
  },
  {
    type: "lead_created",
    message: "New lead created: Sarah Johnson interested in Luxury Penthouse",
    time: "2 hours ago",
  },
];

const pendingApprovals = [
  {
    type: "Subagent",
    name: "Emily Rodriguez",
    submitted: "2 hours ago",
  },
  {
    type: "Property",
    name: "Beachfront Villa - $2.5M",
    submitted: "5 hours ago",
  },
  {
    type: "Property",
    name: "Downtown Loft - $850K",
    submitted: "1 day ago",
  },
];

export function AdminDashboard() {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Platform overview and management</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-3xl font-semibold text-white mt-2">2,847</p>
                <p className="text-sm text-green-400 mt-2">↑ +12% this month</p>
              </div>
              <div className="size-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="size-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Properties</p>
                <p className="text-3xl font-semibold text-white mt-2">1,234</p>
                <p className="text-sm text-green-400 mt-2">↑ +8% this month</p>
              </div>
              <div className="size-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Building2 className="size-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Subagents</p>
                <p className="text-3xl font-semibold text-white mt-2">456</p>
              </div>
              <div className="size-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Shield className="size-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending Approvals</p>
                <p className="text-3xl font-semibold text-white mt-2">23</p>
              </div>
              <div className="size-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="size-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Platform Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="properties" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="leads" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="size-3 bg-blue-500 rounded mr-2" />
                <span className="text-sm text-gray-400">Users</span>
              </div>
              <div className="flex items-center">
                <div className="size-3 bg-green-500 rounded mr-2" />
                <span className="text-sm text-gray-400">Properties</span>
              </div>
              <div className="flex items-center">
                <div className="size-3 bg-purple-500 rounded mr-2" />
                <span className="text-sm text-gray-400">Leads</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Approval Status</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="size-3 rounded mr-2" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-400">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-700 last:border-0">
                  <div className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === "subagent_approval" ? "bg-blue-500/20" :
                    activity.type === "property_moderation" ? "bg-green-500/20" :
                    activity.type === "chat_flagged" ? "bg-red-500/20" :
                    "bg-purple-500/20"
                  }`}>
                    {activity.type === "subagent_approval" && <Shield className="size-4 text-blue-400" />}
                    {activity.type === "property_moderation" && <Building2 className="size-4 text-green-400" />}
                    {activity.type === "chat_flagged" && <MessageSquare className="size-4 text-red-400" />}
                    {activity.type === "lead_created" && <TrendingUp className="size-4 text-purple-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Pending Approvals</h2>
            <div className="space-y-3">
              {pendingApprovals.map((item, index) => (
                <div key={index} className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={item.type === "Subagent" ? "info" : "warning"} size="sm">
                      {item.type}
                    </Badge>
                    <span className="text-xs text-gray-400">{item.submitted}</span>
                  </div>
                  <p className="text-sm text-white">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
