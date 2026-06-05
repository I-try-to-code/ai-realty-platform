import { useState } from "react";
import { CheckCircle, X, Flag, Eye } from "lucide-react";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";

const properties = [
  {
    id: "1",
    title: "Modern Family Home",
    price: "$850,000",
    location: "San Francisco, CA",
    agent: "John Doe",
    status: "pending",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    submittedAt: "2 hours ago",
    beds: 4,
    baths: 3,
    sqft: 2500,
    description: "Beautiful modern home in a prime location...",
    flagReason: null,
  },
  {
    id: "2",
    title: "Luxury Penthouse",
    price: "$1,200,000",
    location: "Los Angeles, CA",
    agent: "Jane Smith",
    status: "flagged",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    submittedAt: "5 hours ago",
    beds: 3,
    baths: 2,
    sqft: 1800,
    description: "Stunning penthouse with city views...",
    flagReason: "Price seems unusually low for the location",
  },
  {
    id: "3",
    title: "Suburban Retreat",
    price: "$650,000",
    location: "Austin, TX",
    agent: "Mike Johnson",
    status: "pending",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
    submittedAt: "1 day ago",
    beds: 3,
    baths: 2,
    sqft: 2200,
    description: "Quiet neighborhood with excellent schools...",
    flagReason: null,
  },
];

export function PropertyModeration() {
  const [filter, setFilter] = useState<"all" | "pending" | "flagged">("all");
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);

  const filteredProperties = filter === "all" ? properties : properties.filter((p) => p.status === filter);

  const handleApprove = (id: string) => {
    alert(`Approved property ${id}`);
  };

  const handleReject = (id: string) => {
    alert(`Rejected property ${id}`);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Property Moderation</h1>
          <p className="text-gray-400 mt-1">Review and approve property listings</p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3">
          {[
            { key: "all", label: "All Properties" },
            { key: "pending", label: "Pending" },
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
              {tab.label} ({tab.key === "all" ? properties.length : properties.filter((p) => p.status === tab.key).length})
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Properties List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className={`bg-gray-800 rounded-xl border overflow-hidden cursor-pointer transition-all ${
                  selectedProperty?.id === property.id
                    ? "border-blue-500 ring-2 ring-blue-500/50"
                    : "border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => setSelectedProperty(property)}
              >
                <div className="flex">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-48 h-48 object-cover"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{property.title}</h3>
                        <p className="text-sm text-gray-400">{property.location}</p>
                      </div>
                      <Badge variant={property.status === "flagged" ? "danger" : "warning"} size="sm">
                        {property.status === "flagged" && <Flag className="size-3 mr-1" />}
                        {property.status}
                      </Badge>
                    </div>

                    <p className="text-2xl font-bold text-white mb-3">{property.price}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <span>{property.beds} beds</span>
                      <span>{property.baths} baths</span>
                      <span>{property.sqft} sqft</span>
                    </div>

                    {property.flagReason && (
                      <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg mb-3">
                        <p className="text-xs text-red-400">{property.flagReason}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                      <div>
                        <p className="text-xs text-gray-400">Listed by {property.agent}</p>
                        <p className="text-xs text-gray-500">{property.submittedAt}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(property.id);
                          }}
                        >
                          <CheckCircle className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(property.id);
                          }}
                          className="text-red-400 border-red-400 hover:bg-red-400/10"
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Property Details */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            {selectedProperty ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Property Details</h2>
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-white text-lg mb-2">{selectedProperty.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{selectedProperty.location}</p>
                  <p className="text-3xl font-bold text-white mb-4">{selectedProperty.price}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 pb-4 border-b border-gray-700">
                  <div>
                    <p className="text-xs text-gray-400">Bedrooms</p>
                    <p className="text-lg font-semibold text-white">{selectedProperty.beds}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Bathrooms</p>
                    <p className="text-lg font-semibold text-white">{selectedProperty.baths}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Sqft</p>
                    <p className="text-lg font-semibold text-white">{selectedProperty.sqft}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Description</h4>
                  <p className="text-sm text-gray-400">{selectedProperty.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Listed By</h4>
                  <p className="text-sm text-gray-400">{selectedProperty.agent}</p>
                  <p className="text-xs text-gray-500">{selectedProperty.submittedAt}</p>
                </div>

                {selectedProperty.flagReason && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <h4 className="font-semibold text-red-400 mb-1">Flagged Reason</h4>
                    <p className="text-sm text-red-300">{selectedProperty.flagReason}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-700">
                  <h4 className="font-semibold text-white mb-3">Moderation Notes</h4>
                  <textarea
                    placeholder="Add notes about this property..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Button
                    variant="success"
                    className="w-full"
                    onClick={() => handleApprove(selectedProperty.id)}
                  >
                    <CheckCircle className="size-4 mr-2" />
                    Approve Property
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-400 border-red-400 hover:bg-red-400/10"
                    onClick={() => handleReject(selectedProperty.id)}
                  >
                    <X className="size-4 mr-2" />
                    Reject Listing
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Eye className="size-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Select a property to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
