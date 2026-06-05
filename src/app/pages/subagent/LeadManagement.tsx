import { useState } from "react";
import { Search, Filter, MessageSquare, Phone, Mail, Clock } from "lucide-react";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";

const leads = [
  {
    id: "1",
    customer: "Sarah Johnson",
    property: "Modern Family Home",
    status: "INTERESTED",
    createdAt: "2 hours ago",
    lastContact: "1 hour ago",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    unread: 2,
    timeline: [
      { event: "Expressed interest", time: "2 hours ago" },
      { event: "Requested more info", time: "1.5 hours ago" },
      { event: "Agent responded", time: "1 hour ago" },
    ],
  },
  {
    id: "2",
    customer: "Michael Chen",
    property: "Luxury Penthouse",
    status: "QUALIFIED",
    createdAt: "5 hours ago",
    lastContact: "3 hours ago",
    email: "m.chen@example.com",
    phone: "+1 (555) 234-5678",
    unread: 0,
    timeline: [
      { event: "Initial inquiry", time: "5 hours ago" },
      { event: "Budget verified", time: "4 hours ago" },
      { event: "Viewing scheduled", time: "3 hours ago" },
    ],
  },
  {
    id: "3",
    customer: "Emma Wilson",
    property: "Suburban Retreat",
    status: "NEW",
    createdAt: "1 day ago",
    lastContact: "1 day ago",
    email: "emma.w@example.com",
    phone: "+1 (555) 345-6789",
    unread: 1,
    timeline: [
      { event: "Lead created", time: "1 day ago" },
    ],
  },
  {
    id: "4",
    customer: "David Martinez",
    property: "Modern Family Home",
    status: "CHAT_OPENED",
    createdAt: "2 days ago",
    lastContact: "6 hours ago",
    email: "d.martinez@example.com",
    phone: "+1 (555) 456-7890",
    unread: 0,
    timeline: [
      { event: "Chat initiated", time: "2 days ago" },
      { event: "Property details shared", time: "1 day ago" },
      { event: "Follow-up message", time: "6 hours ago" },
    ],
  },
  {
    id: "5",
    customer: "Lisa Anderson",
    property: "Beachfront Property",
    status: "CLOSED",
    createdAt: "1 week ago",
    lastContact: "2 days ago",
    email: "lisa.a@example.com",
    phone: "+1 (555) 567-8901",
    unread: 0,
    timeline: [
      { event: "Initial contact", time: "1 week ago" },
      { event: "Multiple viewings", time: "5 days ago" },
      { event: "Offer accepted", time: "2 days ago" },
    ],
  },
];

export function LeadManagement() {
  const [filter, setFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null);

  const filteredLeads = filter === "all" ? leads : leads.filter((lead) => lead.status === filter);

  const statusCounts = {
    all: leads.length,
    NEW: leads.filter((l) => l.status === "NEW").length,
    INTERESTED: leads.filter((l) => l.status === "INTERESTED").length,
    QUALIFIED: leads.filter((l) => l.status === "QUALIFIED").length,
    CHAT_OPENED: leads.filter((l) => l.status === "CHAT_OPENED").length,
    CLOSED: leads.filter((l) => l.status === "CLOSED").length,
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your customer leads</p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-2">
          {[
            { key: "all", label: "All Leads" },
            { key: "NEW", label: "New" },
            { key: "INTERESTED", label: "Interested" },
            { key: "QUALIFIED", label: "Qualified" },
            { key: "CHAT_OPENED", label: "In Chat" },
            { key: "CLOSED", label: "Closed" },
          ].map((status) => (
            <button
              key={status.key}
              onClick={() => setFilter(status.key)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filter === status.key
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {status.label} ({statusCounts[status.key as keyof typeof statusCounts]})
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Leads List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search */}
            <div className="flex items-center space-x-3">
              <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2">
                <Search className="size-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search leads by name or property..."
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
              <Button variant="outline">
                <Filter className="size-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Leads */}
            <div className="space-y-3">
              {filteredLeads.map((lead) => (
                <Card
                  key={lead.id}
                  padding={false}
                  hover
                  className={`cursor-pointer ${
                    selectedLead?.id === lead.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedLead(lead)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="size-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {lead.customer.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{lead.customer}</h3>
                          <p className="text-sm text-gray-600">{lead.property}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
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
                        {lead.unread > 0 && (
                          <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
                            {lead.unread}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="size-4 mr-2" />
                        Created {lead.createdAt}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MessageSquare className="size-4 mr-2" />
                        Last contact {lead.lastContact}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Lead Details Sidebar */}
          <div>
            {selectedLead ? (
              <Card>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">Lead Details</h2>
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
                    <div className="flex items-center space-x-3">
                      <div className="size-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                        {selectedLead.customer.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{selectedLead.customer}</h3>
                        <p className="text-sm text-gray-600">{selectedLead.property}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="size-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Email</p>
                        <p className="text-sm text-gray-900">{selectedLead.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="size-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Phone</p>
                        <p className="text-sm text-gray-900">{selectedLead.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
                    <div className="space-y-3">
                      {selectedLead.timeline.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="size-2 bg-primary rounded-full mt-2" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{item.event}</p>
                            <p className="text-xs text-gray-500">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
                    <Button className="w-full" size="sm">
                      <MessageSquare className="size-4 mr-2" />
                      Open Chat
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Change Status
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Add Note
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="text-center py-12">
                  <MessageSquare className="size-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">Select a lead to view details</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
