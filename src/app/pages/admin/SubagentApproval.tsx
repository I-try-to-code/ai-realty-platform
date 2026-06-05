import { useState } from "react";
import { CheckCircle, X, FileText, Shield, Eye } from "lucide-react";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";

const pendingSubagents = [
  {
    id: "1",
    name: "Emily Rodriguez",
    email: "emily.r@realty.com",
    phone: "+1 (555) 123-4567",
    license: "RE-2024-5678",
    submittedAt: "2 hours ago",
    documents: {
      idProof: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      license: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      addressProof: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    },
    experience: "5 years",
    specialization: "Residential Properties",
  },
  {
    id: "2",
    name: "Marcus Thompson",
    email: "marcus.t@realty.com",
    phone: "+1 (555) 234-5678",
    license: "RE-2024-9012",
    submittedAt: "5 hours ago",
    documents: {
      idProof: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      license: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    },
    experience: "8 years",
    specialization: "Commercial Real Estate",
  },
  {
    id: "3",
    name: "Lisa Chen",
    email: "lisa.c@realty.com",
    phone: "+1 (555) 345-6789",
    license: "RE-2024-3456",
    submittedAt: "1 day ago",
    documents: {
      idProof: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      license: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      addressProof: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    },
    experience: "3 years",
    specialization: "Luxury Properties",
  },
];

export function SubagentApproval() {
  const [selectedAgent, setSelectedAgent] = useState<typeof pendingSubagents[0] | null>(null);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    alert(`Approved subagent ${id}`);
  };

  const handleReject = (id: string) => {
    alert(`Rejected subagent ${id}`);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Subagent Approvals</h1>
          <p className="text-gray-400 mt-1">Review and approve subagent verification requests</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Subagents List */}
          <div className="lg:col-span-2 space-y-4">
            {pendingSubagents.map((agent) => (
              <div
                key={agent.id}
                className={`bg-gray-800 rounded-xl border p-6 cursor-pointer transition-all ${
                  selectedAgent?.id === agent.id
                    ? "border-blue-500 ring-2 ring-blue-500/50"
                    : "border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="size-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {agent.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{agent.name}</h3>
                      <p className="text-sm text-gray-400">{agent.email}</p>
                    </div>
                  </div>
                  <Badge variant="warning" size="sm">Pending</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-sm text-white">{agent.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">License</p>
                    <p className="text-sm text-white">{agent.license}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Experience</p>
                    <p className="text-sm text-white">{agent.experience}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Specialization</p>
                    <p className="text-sm text-white">{agent.specialization}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <span className="text-xs text-gray-400">Submitted {agent.submittedAt}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(agent.id);
                      }}
                    >
                      <CheckCircle className="size-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(agent.id);
                      }}
                      className="text-red-400 border-red-400 hover:bg-red-400/10"
                    >
                      <X className="size-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Document Viewer */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            {selectedAgent ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Documents</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">ID Proof</label>
                      <button
                        onClick={() => setViewingDocument(selectedAgent.documents.idProof)}
                        className="w-full relative group"
                      >
                        <img
                          src={selectedAgent.documents.idProof}
                          alt="ID Proof"
                          className="w-full h-32 object-cover rounded-lg border border-gray-600"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="size-8 text-white" />
                        </div>
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Real Estate License</label>
                      <button
                        onClick={() => setViewingDocument(selectedAgent.documents.license)}
                        className="w-full relative group"
                      >
                        <img
                          src={selectedAgent.documents.license}
                          alt="License"
                          className="w-full h-32 object-cover rounded-lg border border-gray-600"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="size-8 text-white" />
                        </div>
                      </button>
                    </div>

                    {selectedAgent.documents.addressProof && (
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Address Proof</label>
                        <button
                          onClick={() => setViewingDocument(selectedAgent.documents.addressProof!)}
                          className="w-full relative group"
                        >
                          <img
                            src={selectedAgent.documents.addressProof}
                            alt="Address Proof"
                            className="w-full h-32 object-cover rounded-lg border border-gray-600"
                          />
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="size-8 text-white" />
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <h3 className="font-semibold text-white mb-3">Verification Notes</h3>
                  <textarea
                    placeholder="Add notes about this verification..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Button
                    variant="success"
                    className="w-full"
                    onClick={() => handleApprove(selectedAgent.id)}
                  >
                    <CheckCircle className="size-4 mr-2" />
                    Approve Subagent
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-400 border-red-400 hover:bg-red-400/10"
                    onClick={() => handleReject(selectedAgent.id)}
                  >
                    <X className="size-4 mr-2" />
                    Reject Application
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Shield className="size-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Select a subagent to view documents</p>
              </div>
            )}
          </div>
        </div>

        {/* Document Modal */}
        {viewingDocument && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setViewingDocument(null)}
          >
            <div className="max-w-4xl w-full">
              <img
                src={viewingDocument}
                alt="Document"
                className="w-full rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
