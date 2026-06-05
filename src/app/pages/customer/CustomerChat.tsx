import { useState } from "react";
import { useParams, Link } from "react-router";
import { Send, Shield, Home, MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { Card } from "../../components/Card";

interface Message {
  sender: "customer" | "agent";
  content: string;
  timestamp: string;
}

const propertyInfo = {
  id: "1",
  image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
  price: "$850,000",
  title: "Modern Family Home",
  location: "San Francisco, CA",
  beds: 4,
  baths: 3,
  sqft: 2500,
};

const agentInfo = {
  name: "John Doe",
  role: "Senior Real Estate Agent",
  verified: true,
};

const initialMessages: Message[] = [
  {
    sender: "agent",
    content: "Hello! I'm John, and I'll be helping you with this property. What would you like to know about it?",
    timestamp: "10:30 AM",
  },
  {
    sender: "customer",
    content: "Hi John! I'm interested in scheduling a viewing. When would be a good time?",
    timestamp: "10:32 AM",
  },
  {
    sender: "agent",
    content:
      "Great! I have availability this Thursday at 2 PM or Friday at 10 AM. Which works better for you?",
    timestamp: "10:35 AM",
  },
  {
    sender: "customer",
    content: "Thursday at 2 PM sounds perfect. Also, are there good schools nearby?",
    timestamp: "10:36 AM",
  },
  {
    sender: "agent",
    content:
      "Excellent! Thursday at 2 PM it is. Yes, there are several top-rated schools within a 5-minute walk, including Lincoln Elementary which is one of the best in the district.",
    timestamp: "10:38 AM",
  },
];

export function CustomerChat() {
  const { leadId } = useParams();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      sender: "customer",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    setTimeout(() => {
      const agentReply: Message = {
        sender: "agent",
        content: "Thank you for your message. I'll get back to you shortly with that information.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, agentReply]);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="size-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{agentInfo.name}</h2>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-600">{agentInfo.role}</p>
                  {agentInfo.verified && (
                    <Badge variant="success" size="sm">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="size-4 text-accent" />
              <span>Platform Monitored</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Privacy Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <Shield className="size-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Secure Conversation</p>
                <p className="text-xs text-gray-600 mt-1">
                  Your contact information is protected. All messages are monitored by our platform to ensure quality
                  and safety. The agent cannot see your email or phone number until you choose to share it.
                </p>
              </div>
            </div>
          </div>

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-md ${message.sender === "customer" ? "ml-12" : "mr-12"}`}>
                {message.sender === "agent" && (
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs text-gray-600">{agentInfo.name}</span>
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === "customer"
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <p className={message.sender === "customer" ? "text-white" : "text-gray-700"}>
                    {message.content}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-1">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-gray-100 rounded-xl outline-none"
            />
            <Button onClick={handleSend} size="lg">
              <Send className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Property Sidebar */}
      <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <h3 className="font-semibold text-gray-900 mb-4">Property Details</h3>
        <Link to={`/property/${propertyInfo.id}`}>
          <Card padding={false} hover>
            <img
              src={propertyInfo.image}
              alt={propertyInfo.title}
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <p className="text-xl font-semibold text-gray-900">{propertyInfo.price}</p>
              <h4 className="font-medium text-gray-900 mt-2">{propertyInfo.title}</h4>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="size-4 mr-1" />
                {propertyInfo.location}
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
                <span className="flex items-center">
                  <Bed className="size-4 mr-1" />
                  {propertyInfo.beds}
                </span>
                <span className="flex items-center">
                  <Bath className="size-4 mr-1" />
                  {propertyInfo.baths}
                </span>
                <span className="flex items-center">
                  <Maximize className="size-4 mr-1" />
                  {propertyInfo.sqft}
                </span>
              </div>
            </div>
          </Card>
        </Link>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Schedule Viewing
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Request Documents
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Make an Offer
            </Button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Conversation Status</h4>
          <Badge variant="success" size="sm">Active</Badge>
          <p className="text-xs text-gray-600 mt-2">
            This conversation is being monitored by our platform to ensure quality and transparency.
          </p>
        </div>
      </aside>
    </div>
  );
}
