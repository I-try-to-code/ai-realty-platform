import { Link } from "react-router";
import { Heart, MessageSquare, Eye, Clock, Sparkles, TrendingUp } from "lucide-react";
import { StatCard } from "../../components/StatCard";
import { PropertyCard } from "../../components/PropertyCard";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";

const savedProperties = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    price: "$850,000",
    title: "Modern Family Home",
    location: "San Francisco, CA",
    beds: 4,
    baths: 3,
    sqft: 2500,
    aiScore: 95,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    price: "$1,200,000",
    title: "Luxury Penthouse",
    location: "Los Angeles, CA",
    beds: 3,
    baths: 2,
    sqft: 1800,
    aiScore: 88,
  },
];

const recentActivity = [
  {
    type: "viewed",
    property: "Modern Family Home",
    time: "2 hours ago",
  },
  {
    type: "saved",
    property: "Luxury Penthouse",
    time: "5 hours ago",
  },
  {
    type: "interested",
    property: "Suburban Retreat",
    time: "1 day ago",
  },
  {
    type: "chat",
    property: "Beachfront Property",
    time: "2 days ago",
  },
];

const activeLeads = [
  {
    id: "1",
    property: "Modern Family Home",
    agent: "John Doe",
    status: "In Discussion",
    lastMessage: "The seller is open to negotiations",
    unread: 2,
  },
  {
    id: "2",
    property: "Luxury Penthouse",
    agent: "Jane Smith",
    status: "Viewing Scheduled",
    lastMessage: "Looking forward to showing you the property",
    unread: 0,
  },
];

export function CustomerDashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Sarah!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your property search</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            title="Saved Properties"
            value="12"
            icon={Heart}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            trend={{ value: "3 this week", positive: true }}
          />
          <StatCard
            title="Active Leads"
            value="3"
            icon={MessageSquare}
            iconBgColor="bg-blue-100"
            iconColor="text-primary"
          />
          <StatCard
            title="Properties Viewed"
            value="24"
            icon={Eye}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            title="AI Recommendations"
            value="8"
            icon={Sparkles}
            iconBgColor="bg-green-100"
            iconColor="text-accent"
          />
        </div>

        {/* AI Recommendations */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="size-6 text-primary" />
              <h2 className="text-xl font-semibold text-gray-900">AI Recommendations For You</h2>
            </div>
            <Link to="/search">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Leads */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Conversations</h2>
              <div className="space-y-4">
                {activeLeads.map((lead) => (
                  <Link key={lead.id} to={`/customer/chat/${lead.id}`}>
                    <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{lead.property}</h3>
                          <p className="text-sm text-gray-600">Agent: {lead.agent}</p>
                        </div>
                        <Badge
                          variant={lead.status === "In Discussion" ? "info" : "success"}
                          size="sm"
                        >
                          {lead.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700">{lead.lastMessage}</p>
                        {lead.unread > 0 && (
                          <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
                            {lead.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === "viewed" ? "bg-purple-100" :
                      activity.type === "saved" ? "bg-red-100" :
                      activity.type === "interested" ? "bg-green-100" :
                      "bg-blue-100"
                    }`}>
                      {activity.type === "viewed" && <Eye className="size-4 text-purple-600" />}
                      {activity.type === "saved" && <Heart className="size-4 text-red-600" />}
                      {activity.type === "interested" && <TrendingUp className="size-4 text-green-600" />}
                      {activity.type === "chat" && <MessageSquare className="size-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {activity.type === "viewed" && "Viewed"}
                        {activity.type === "saved" && "Saved"}
                        {activity.type === "interested" && "Interested in"}
                        {activity.type === "chat" && "Chatted about"}
                        <span className="font-medium"> {activity.property}</span>
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="size-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Your Preferences</h3>
              <div className="space-y-2">
                <Badge variant="ai" size="sm">Modern Architecture</Badge>
                <Badge variant="ai" size="sm">3-4 Bedrooms</Badge>
                <Badge variant="ai" size="sm">Good Schools</Badge>
                <Badge variant="ai" size="sm">$800K - $900K</Badge>
              </div>
              <Link to="/ai-chat">
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Sparkles className="size-4 mr-2" />
                  Update Preferences
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
