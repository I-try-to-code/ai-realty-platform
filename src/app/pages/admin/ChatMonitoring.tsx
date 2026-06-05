import { useState } from "react";
import { MessageSquare, Flag, Shield, Eye, AlertTriangle } from "lucide-react";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";

interface Message {
  sender: "customer" | "agent";
  content: string;
  timestamp: string;
  flagged?: boolean;
}

const conversations = [
  {
    id: "1",
    customer: "Sarah Johnson",
    agent: "John Doe",
    property: "Modern Family Home",
    status: "active",
    messageCount: 24,
    lastMessage: "5 minutes ago",
    flagged: false,
    messages: [
      { sender: "customer" as const, content: "Hi, I'm interested in this property", timestamp: "10:30 AM" },
      { sender: "agent" as const, content: "Hello! I'd be happy to help. When would you like to schedule a viewing?", timestamp: "10:32 AM" },
      { sender: "customer" as const, content: "How about Thursday at 2 PM?", timestamp: "10:35 AM" },
      { sender: "agent" as const, content: "Thursday at 2 PM works perfectly. I'll send you the confirmation.", timestamp: "10:36 AM" },
    ],
  },
  {
    id: "2",
    customer: "Michael Chen",
    agent: "Jane Smith",
    property: "Luxury Penthouse",
    status: "flagged",
    messageCount: 12,
    lastMessage: "2 hours ago",
    flagged: true,
    flagReason: "Possible contact information exchange",
    messages: [
      { sender: "customer" as const, content: "Can I get your direct number?", timestamp: "2:15 PM", flagged: true },
      { sender: "agent" as const, content: "Please continue our conversation through the platform for your security", timestamp: "2:16 PM" },
      { sender: "customer" as const, content: "Understood, thanks", timestamp: "2:17 PM" },
    ],
  },
  {
    id: "3",
    customer: "Emma Wilson",
    agent: "Mike Johnson",
    property: "Suburban Retreat",
    status: "active",
    messageCount: 8,
    lastMessage: "1 day ago",
    flagged: false,
    messages: [
      { sender: "customer" as const, content: "Are pets allowed in this property?", timestamp: "9:20 AM" },
      { sender: "agent" as const, content: "Yes, pets are welcome! The property has a fenced backyard.", timestamp: "9:25 AM" },
      { sender: "customer" as const, content: "Perfect! That's exactly what I need.", timestamp: "9:30 AM" },
    ],
  },
];

export function ChatMonitoring() {
  const [filter, setFilter] = useState<"all" | "active" | "flagged">("all");
  const [selectedConversation, setSelectedConversation] = useState<typeof conversations[0] | null>(null);

  const filteredConversations = filter === "all"
    ? conversations
    : conversations.filter((c) => c.status === filter);

  const handleResolveFlag = (id: string) => {
    alert(`Resolved flag for conversation ${id}`);
  };

  const handleTakeAction = (id: string) => {
    alert(`Taking action on conversation ${id}`);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Chat Monitoring</h1>
          <p className="text-gray-400 mt-1">Monitor customer-agent conversations and ensure platform safety</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Conversations</p>
                <p className="text-3xl font-semibold text-white mt-2">{conversations.length}</p>
              </div>
              <MessageSquare className="size-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Chats</p>
                <p className="text-3xl font-semibold text-white mt-2">
                  {conversations.filter((c) => c.status === "active").length}
                </p>
              </div>
              <Eye className="size-8 text-green-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Flagged</p>
                <p className="text-3xl font-semibold text-white mt-2">
                  {conversations.filter((c) => c.flagged).length}
                </p>
              </div>
              <Flag className="size-8 text-red-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Messages</p>
                <p className="text-3xl font-semibold text-white mt-2">
                  {conversations.reduce((sum, c) => sum + c.messageCount, 0)}
                </p>
              </div>
              <MessageSquare className="size-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Shield className="size-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white mb-1">Privacy Protection Active</h3>
              <p className="text-sm text-blue-200">
                All conversations are monitored to protect customer contact information. The platform automatically flags
                potential violations and prevents sharing of phone numbers, emails, and addresses.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3">
          {[
            { key: "all", label: "All Conversations" },
            { key: "active", label: "Active" },
            { key: "flagged", label: "Flagged" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
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
          {/* Conversations List */}
          <div className="lg:col-span-2 space-y-3">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`bg-gray-800 rounded-xl border p-4 cursor-pointer transition-all ${
                  selectedConversation?.id === conversation.id
                    ? "border-blue-500 ring-2 ring-blue-500/50"
                    : conversation.flagged
                      ? "border-red-500/50"
                      : "border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-white">{conversation.customer}</h3>
                      {conversation.flagged && (
                        <Badge variant="danger" size="sm">
                          <Flag className="size-3 mr-1" />
                          Flagged
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">
                      with {conversation.agent} • {conversation.property}
                    </p>
                  </div>
                  <MessageSquare className="size-5 text-gray-500" />
                </div>

                {conversation.flagged && conversation.flagReason && (
                  <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg mb-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="size-4 text-red-400" />
                      <p className="text-xs text-red-400">{conversation.flagReason}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{conversation.messageCount} messages</span>
                  <span>Last message {conversation.lastMessage}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Conversation Details */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 flex flex-col h-[600px]">
            {selectedConversation ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-white">Conversation Details</h2>
                    {selectedConversation.flagged && (
                      <Badge variant="danger">
                        <Flag className="size-3 mr-1" />
                        Flagged
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">
                    {selectedConversation.customer} ↔ {selectedConversation.agent}
                  </p>
                  <p className="text-xs text-gray-500">{selectedConversation.property}</p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selectedConversation.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] ${message.flagged ? "ring-2 ring-red-500/50 rounded-xl" : ""}`}>
                        {message.sender === "agent" && (
                          <p className="text-xs text-gray-400 mb-1 px-1">{selectedConversation.agent}</p>
                        )}
                        <div
                          className={`rounded-xl px-3 py-2 ${
                            message.sender === "customer"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-700 text-white"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-gray-700 space-y-2">
                  {selectedConversation.flagged ? (
                    <>
                      <Button
                        variant="success"
                        className="w-full"
                        size="sm"
                        onClick={() => handleResolveFlag(selectedConversation.id)}
                      >
                        Resolve Flag
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-red-400 border-red-400 hover:bg-red-400/10"
                        size="sm"
                        onClick={() => handleTakeAction(selectedConversation.id)}
                      >
                        Take Action
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      size="sm"
                      onClick={() => alert("Flagging conversation")}
                    >
                      <Flag className="size-4 mr-2" />
                      Flag Conversation
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="size-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">Select a conversation to view messages</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
