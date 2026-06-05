import { useState } from "react";
import { useParams } from "react-router";
import {
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Car,
  Sparkles,
  Calendar,
  CheckCircle2,
  School,
  ShoppingCart,
  Coffee,
  Train
} from "lucide-react";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { Card } from "../../components/Card";

const propertyData = {
  id: "1",
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200",
  ],
  price: "$850,000",
  title: "Modern Family Home",
  location: "123 Oak Street, San Francisco, CA 94102",
  beds: 4,
  baths: 3,
  sqft: 2500,
  garage: 2,
  yearBuilt: 2019,
  propertyType: "Single Family Home",
  aiScore: 95,
  description:
    "Beautiful modern home in a prime location. Features open floor plan, chef's kitchen with premium appliances, hardwood floors throughout, and a spacious backyard perfect for entertaining. Recently renovated with high-end finishes.",
  amenities: [
    "Central Air Conditioning",
    "Hardwood Floors",
    "Granite Countertops",
    "Stainless Steel Appliances",
    "Walk-in Closets",
    "Smart Home System",
    "Energy Efficient",
    "Private Backyard",
  ],
  nearbyPlaces: [
    { name: "Lincoln Elementary School", distance: "0.3 mi", icon: School },
    { name: "Whole Foods Market", distance: "0.5 mi", icon: ShoppingCart },
    { name: "Golden Gate Park", distance: "0.8 mi", icon: Coffee },
    { name: "BART Station", distance: "1.2 mi", icon: Train },
  ],
};

export function PropertyDetails() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Image Gallery */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-64 sm:h-[400px] lg:h-[500px]">
            <img
              src={propertyData.images[currentImage]}
              alt={propertyData.title}
              className="size-full object-cover"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setSaved(!saved)}
                className="size-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                <Heart className={`size-5 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>
              <button className="size-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                <Share2 className="size-5 text-gray-700" />
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {propertyData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`size-2 rounded-full transition-all ${
                    currentImage === index ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-2">
            {propertyData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-16 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImage === index ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={image} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{propertyData.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="size-5 mr-2" />
                    {propertyData.location}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">{propertyData.price}</p>
                  <Badge variant="info" size="sm" className="mt-2">For Sale</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Bed className="size-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                    <p className="font-semibold">{propertyData.beds}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="size-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Bathrooms</p>
                    <p className="font-semibold">{propertyData.baths}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Maximize className="size-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Sqft</p>
                    <p className="font-semibold">{propertyData.sqft}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Car className="size-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Garage</p>
                    <p className="font-semibold">{propertyData.garage}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* AI Recommendation */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <div className="flex items-start space-x-3">
                <div className="size-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="size-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">AI Match Score</h3>
                    <Badge variant="ai">{propertyData.aiScore}% Match</Badge>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Why this property suits you:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="size-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Matches your preference for modern architecture with open floor plans
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="size-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Located in a family-friendly neighborhood with top-rated schools nearby
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="size-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Within your budget range of $800K - $900K
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="size-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Features smart home technology aligned with your preferences
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">About this property</h3>
              <p className="text-gray-700 leading-relaxed">{propertyData.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Property Type</p>
                  <p className="font-medium">{propertyData.propertyType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Year Built</p>
                  <p className="font-medium">{propertyData.yearBuilt}</p>
                </div>
              </div>
            </Card>

            {/* Amenities */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {propertyData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle2 className="size-5 text-accent mr-2" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Nearby Places */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Nearby Places</h3>
              <div className="space-y-3">
                {propertyData.nearbyPlaces.map((place, index) => {
                  const Icon = place.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="size-10 bg-white rounded-lg flex items-center justify-center mr-3">
                          <Icon className="size-5 text-primary" />
                        </div>
                        <span className="text-gray-900">{place.name}</span>
                      </div>
                      <Badge variant="default" size="sm">{place.distance}</Badge>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Interested in this property?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Express your interest and our AI will connect you with a verified agent
              </p>
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <Sparkles className="size-4 mr-2" />
                  I'm Interested
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="size-4 mr-2" />
                  Schedule Visit
                </Button>
                <Button variant="ghost" className="w-full">
                  <Heart className="size-4 mr-2" />
                  Save Property
                </Button>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Sparkles className="size-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    Your contact information will remain private. All communications are monitored by our platform for your safety.
                  </p>
                </div>
              </div>
            </Card>

            {/* Agent Info */}
            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <div className="size-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-600">Verified Agent</p>
                </div>
              </div>
              <Badge variant="success" size="sm" className="mb-3">
                <CheckCircle2 className="size-3 mr-1" />
                Platform Verified
              </Badge>
              <p className="text-sm text-gray-600">
                This agent is verified and monitored by our platform for quality and transparency.
              </p>
            </Card>

            {/* Similar Properties */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">Similar Properties</h3>
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="flex space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <img
                      src={`https://images.unsplash.com/photo-160060${i}685154340-be6161a56a0c?w=200`}
                      alt=""
                      className="size-20 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Modern Home</p>
                      <p className="text-xs text-gray-600">San Francisco, CA</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">$780,000</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
