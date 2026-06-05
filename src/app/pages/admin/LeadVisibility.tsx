import { useState } from "react";
import { Search, Eye, TrendingUp } from "lucide-react";
import { Badge } from "../../components/Badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const leads = [
  {
    id: "1",
    customer: "Sarah Johnson",
    property: "Modern Family Home",
    agent: "John Doe",
    status: "INTERESTED",
    createdAt: "2024-05-20",
    interactions: 12,
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    customer: "Michael Chen",
    property: "Luxury Penthouse",
    agent: "Jane Smith",
    status: "QUALIFIED",
    createdAt: "2024-05-19",
    interactions: 8,
    lastActivity: "5 hours ago",
  },
  {
    id: "3",
    customer: "Emma Wilson",
    property: "Suburban Retreat",
    agent: "Mike Johnson",
    status: "NEW",
    createdAt: "2024-05-22",
    interactions: 2,
    lastActivity: "1 day ago",
  },
  {
    id: "4",
    customer: "David Martinez",
    property: "Beachfront Property",
    agent: "John Doe",
    status: "CHAT_OPENED",
    createdAt: "2024-05-18",
    interactions: 15,
    lastActivity: "6 hours ago",
  },
  {
    id: "5",
    customer: "Lisa Anderson",
    property: "Downtown Loft",
    agent: "Jane Smith",
    status: "CLOSED",
    createdAt: "2024-05-15",
    interactions: 24,
    lastActivity: "2 days ago",
  },
];

const leadTrendData = [
  { date: "Mon", leads: 12 },
  { date: "Tue", leads: 18 },
  { date: "Wed", leads: 22 },
  { date: "Thu", leads: 28 },
  { date: "Fri", leads: 32 },
  { date: "Sat", leads: 25 },
  { date: "Sun", leads: 20 },
];

export function LeadVisibility() {
  const [filter, setFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null);

  const filteredLeads = filter === "all" ? leads : leads.filter((lead) => lead.status === filter);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Lead Visibility Dashboard</h1>
          <p className="text-gray-400 mt-1">Track all customer-agent interactions and lead ownership</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <p className="text-sm text-gray-400">Total Leads</p>
            <p className="text-3xl font-semibold text-white mt-2">{leads.length}</p>
          </div>
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <p className="text-sm text-gray-400">Active Leads</p>
            <p className="text-3xl font-semibold text-white mt-2">
              {leads.filter((l) => l.status !== "CLOSED").length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <p className="text-sm text-gray-400">Avg. Interactions</p>
            <p className="text-3xl font-semibold text-white mt-2">
              {Math.round(leads.reduce((sum, l) => sum + l.interactions, 0) / leads.length)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <p className="text-sm text-gray-400">Closed Leads</p>
            <p className="text-3xl font-semibold text-white mt-2">
              {leads.filter((l) => l.status === "CLOSED").length}
            </p>
          </div>
        </div>

        {/* Lead Trend */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Lead Creation Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={leadTrendData}>
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
              <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3">
          {[
            { key: "all", label: "All Leads" },
            { key: "NEW", label: "New" },
            { key: "INTERESTED", label: "Interested" },
            { key: "QUALIFIED", label: "Qualified" },
            { key: "CHAT_OPENED", label: "In Chat" },
            { key: "CLOSED", label: "Closed" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === tab.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Leads List */}
          <div className={`lg:col-span-2 space-y-3 ${selectedLead ? "hidden lg:block" : "block"}`}>
            {/* Search */}
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
              <Search className="size-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search by customer, agent, or property..."
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              />
            </div>

            {/* Leads */}
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className={`bg-gray-800 rounded-xl border p-4 cursor-pointer transition-all ${
                  selectedLead?.id === lead.id
                    ? "border-blue-500 ring-2 ring-blue-500/50"
                    : "border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => setSelectedLead(lead)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{lead.customer}</h3>
                    <p className="text-sm text-gray-400">{lead.property}</p>
                  </div>
                  <Badge
                    variant={
                      lead.status === "NEW" ? "info" :
                      lead.status === "INTERESTED" ? "warning" :
                      lead.status === "QUALIFIED" ? "success" :
                      lead.status === "CLOSED" ? "default" :
                      "info"
                    }
                    size="sm"
                  >
                    {lead.status.replace("_", " ")}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Agent</p>
                    <p className="text-white">{lead.agent}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Interactions</p>
                    <p className="text-white">{lead.interactions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Last Activity</p>
                    <p className="text-white">{lead.lastActivity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lead Details */}
          <div className={`bg-gray-800 rounded-xl border border-gray-700 p-6 ${selectedLead ? "block" : "hidden lg:block"}`}>
            {selectedLead ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-4">
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="lg:hidden text-sm text-primary font-medium hover:underline flex items-center mr-2"
                    >
                      ← Back
                    </button>
                    <h2 className="text-xl font-semibold text-white">Lead Details</h2>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400">Customer</p>
                      <p className="text-white font-medium">{selectedLead.customer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Property</p>
                      <p className="text-white font-medium">{selectedLead.property}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Assigned Agent</p>
                      <p className="text-white font-medium">{selectedLead.agent}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Status</p>
                      <Badge
                        variant={
                          selectedLead.status === "NEW" ? "info" :
                          selectedLead.status === "INTERESTED" ? "warning" :
                          selectedLead.status === "QUALIFIED" ? "success" :
                          selectedLead.status === "CLOSED" ? "default" :
                          "info"
                        }
                      >
                        {selectedLead.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <h3 className="font-semibold text-white mb-3">Interaction Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Total Interactions</span>
                      <span className="text-white font-semibold">{selectedLead.interactions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Created</span>
                      <span className="text-white font-semibold">{selectedLead.createdAt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Last Activity</span>
                      <span className="text-white font-semibold">{selectedLead.lastActivity}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <h3 className="font-semibold text-white mb-3">Ownership Tracking</h3>
                  <div className="p-3 bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-300">
                      This lead is owned by <span className="text-white font-medium">{selectedLead.agent}</span> and has been active for{" "}
                      {Math.floor((new Date().getTime() - new Date(selectedLead.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="size-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Select a lead to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
