import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, Sparkles, Shield, TrendingUp, MessageSquare, Star, ArrowRight, Building, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/Button";
import { PropertyCard } from "../../components/PropertyCard";
import { Badge } from "../../components/Badge";

const featuredPropertiesFallback = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    price: "₹8,50,00,000",
    title: "Modern Luxury Villa",
    location: "Andheri West, Mumbai",
    beds: 4,
    baths: 3,
    sqft: 2500,
    aiScore: 95,
    aiReason: "Matches your preference for premium architecture and central family-friendly neighborhoods"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    price: "₹12,00,00,000",
    title: "Sea Facing Premium Apartment",
    location: "Bandra West, Mumbai",
    beds: 3,
    baths: 2,
    sqft: 1800,
    aiScore: 88,
    aiReason: "Breathtaking Arabian sea views and proximity to Bandstand match your luxury lifestyle"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    price: "₹6,50,00,000",
    title: "Suburban Heights Penthouse",
    location: "Goregaon East, Mumbai",
    beds: 3,
    baths: 2,
    sqft: 2200,
    aiScore: 82,
    aiReason: "Quiet luxury penthouse overlooking Aarey Colony greens with high-end amenities"
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Home Buyer",
    content: "The AI assistant understood exactly what I was looking for. Found my dream home in Bandra in just 2 weeks!",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "First-time Buyer",
    content: "The platform made the entire process transparent and easy. Love the AI recommendations and verified agents!",
    rating: 5,
    avatar: "MC"
  },
];

export function CustomerLanding() {
  const token = localStorage.getItem("token");
  const searchPath = token ? "/customer/search" : "/search";
  const aiChatPath = token ? "/customer/ai-chat" : "/ai-chat";
  
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties");
        if (res.ok) {
          const data = await res.json();
          // Filter to show active listings only
          const activeOnly = data.filter((p: any) => p.status === "ACTIVE");
          setProperties(activeOnly.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching featured properties:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const handleAISearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    navigate(aiChatPath, { state: { initialQuery: searchVal } });
  };

  const displayProperties = properties.length > 0 ? properties.map(p => ({
    id: p.id,
    image: p.media && p.media[0] ? p.media[0].url : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    price: p.price ? `₹${p.price.toLocaleString("en-IN")}` : "Contact Agent",
    title: p.title,
    location: p.address || (p.locality ? `${p.locality.name}, ${p.locality.city}` : "Unknown Locality"),
    beds: p.beds || 0,
    baths: p.baths || 0,
    sqft: p.sqft || 0,
    aiScore: p.beds && p.beds >= 3 ? 92 : 85,
    aiReason: p.description ? (p.description.length > 120 ? p.description.slice(0, 120) + "..." : p.description) : "Premium residential structure with customized features."
  })) : featuredPropertiesFallback;

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-indigo-500 selection:text-white antialiased text-slate-800">
      {/* Hero Section with dotted radial grid background */}
      <section 
        className="relative pt-24 pb-20 overflow-hidden bg-white border-b border-slate-200/80"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      >
        {/* Soft blur visual decor */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-200/30 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-100/30 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100/80 px-4 py-1.5 rounded-full shadow-sm">
              <Sparkles className="size-4 text-indigo-600 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-indigo-800 uppercase">AI-Powered Real Estate Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-none">
              Find Your Next Home With <br />
              <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                Conversational Intelligence
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Skip the endless filtering. Tell our AI assistant what you need in natural language, and let us scan premium verified listings to match your lifestyle.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link to={aiChatPath}>
                <Button size="lg" className="shadow-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 transition-transform hover:-translate-y-0.5">
                  <Sparkles className="size-4 mr-2" />
                  Start AI Assistant
                </Button>
              </Link>
              <Link to={searchPath}>
                <Button variant="outline" size="lg" className="border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-8 transition-transform hover:-translate-y-0.5">
                  <Search className="size-4 mr-2" />
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>

          {/* Fully Functional AI Search Bar Form */}
          <div className="max-w-3xl mx-auto mt-16 px-4">
            <form 
              onSubmit={handleAISearchSubmit}
              className="bg-white rounded-2xl shadow-xl p-2.5 border border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 transition-shadow focus-within:shadow-2xl focus-within:ring-2 focus-within:ring-indigo-500/10"
            >
              <div className="flex items-center flex-1 min-w-0">
                <Sparkles className="size-5 text-indigo-500 ml-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Ask our AI... (e.g., modern 3 BHK in Andheri West under 3 Crore)"
                  className="flex-1 px-4 py-3 bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm sm:text-base w-full font-medium"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 cursor-pointer"
              >
                Search
              </Button>
            </form>
            <div className="flex flex-wrap gap-2 justify-center mt-4 text-xs text-slate-500 font-medium">
              <span>Try:</span>
              <button onClick={() => setSearchVal("3 BHK flat in Bandra West")} className="underline hover:text-indigo-600 transition-colors">3 BHK flat in Bandra West</button>
              <span>•</span>
              <button onClick={() => setSearchVal("Office space in Andheri East")} className="underline hover:text-indigo-600 transition-colors">Office space in Andheri East</button>
              <span>•</span>
              <button onClick={() => setSearchVal("Penthouse near Goregaon East")} className="underline hover:text-indigo-600 transition-colors">Penthouse near Goregaon East</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with premium minimalist design */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Built to Modern Brokerage Standards</h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">We combine artificial intelligence matching with deep security and real-time connectivity.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 pt-4">
            <div className="bg-slate-50/50 rounded-2xl p-8 border border-slate-100 hover:border-indigo-100 transition-all duration-300 group">
              <div className="size-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="size-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Intent-Based Matchmaking</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our model extracts budget limits, room counts, and target neighborhoods from chat messages to score listings dynamically.
              </p>
            </div>
            
            <div className="bg-slate-50/50 rounded-2xl p-8 border border-slate-100 hover:border-emerald-100 transition-all duration-300 group">
              <div className="size-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="size-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Verified Agents & Auditing</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                All listed properties require manual KYC registration and approval, and conversations are audited to ensure buyer security.
              </p>
            </div>
            
            <div className="bg-slate-50/50 rounded-2xl p-8 border border-slate-100 hover:border-amber-100 transition-all duration-300 group">
              <div className="size-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="size-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Smart Locality Insights</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Explore calculated market sentiment ratings, average price per square foot, and nearby transit POIs parsed by database integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-slate-50/60 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Featured Properties</h2>
              <p className="text-slate-600 text-sm sm:text-base">Handpicked active properties dynamically synchronized from our database</p>
            </div>
            <Link to={searchPath} className="hidden sm:block">
              <Button variant="outline" className="border-slate-300 text-slate-700 bg-white font-medium flex items-center gap-1.5 hover:bg-slate-50">
                View All Listings <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              displayProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))
            )}
          </div>

          <div className="sm:hidden text-center pt-4">
            <Link to={searchPath}>
              <Button variant="outline" className="w-full border-slate-300 text-slate-700 bg-white">
                View All Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Assistant CTA Mockup Widget layout */}
      <section className="py-20 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12 border border-slate-800">
            {/* Background design */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-radial-gradient from-indigo-500/10 to-transparent pointer-events-none" />
            
            <div className="space-y-6 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-indigo-400">
                <Building className="size-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">AI Recommendation Engine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Get Matched in Seconds With Our Smart Assistant
              </h2>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                Log in to save preferences, calculate custom property match rates, run radius filters, and initiate monitored chat lines directly with licensed agents.
              </p>
              <div className="pt-2 flex justify-center lg:justify-start">
                <Link to={aiChatPath}>
                  <Button size="lg" className="bg-white hover:bg-slate-100 text-slate-950 font-semibold px-8 py-3 transition-transform hover:-translate-y-0.5">
                    Start AI Chat Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Simulated Chat Interface Mockup */}
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden self-stretch flex flex-col justify-between min-h-[300px]">
              <div className="bg-slate-950 border-b border-slate-850 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="size-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-semibold tracking-wider text-slate-300">AI AGENT ASSISTANT</span>
                </div>
                <Badge variant="success" size="sm" className="bg-emerald-950/80 text-emerald-400 border border-emerald-900/50">ONLINE</Badge>
              </div>
              
              <div className="p-4 space-y-4 flex-1 text-xs">
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-3 max-w-[85%]">
                  <p className="text-slate-400">What are you looking for in Mumbai?</p>
                </div>
                <div className="bg-indigo-600 rounded-2xl p-3 max-w-[85%] self-end ml-auto text-right">
                  <p className="text-white">Looking for a sea-facing 3 BHK in Bandra West around 10 to 12 Cr.</p>
                </div>
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-3 max-w-[85%]">
                  <div className="flex items-center space-x-1.5 text-indigo-400 mb-1.5 font-semibold">
                    <Sparkles className="size-3.5" />
                    <span>AI MATCH FOUND (88%)</span>
                  </div>
                  <p className="text-slate-300 font-medium">Sea Facing Premium Apartment, Carter Road</p>
                  <p className="text-slate-400 mt-1">Direct sea views, secure garage, custom modular kitchen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">What Our Customers Say</h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">Real stories from buyers who skipped traditional filters.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic mb-6">"{t.content}"</p>
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                  <div className="size-10 bg-indigo-50 rounded-full flex items-center justify-center font-bold text-indigo-600 text-sm border border-indigo-100">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500 font-semibold">{t.role}</p>
                  </div>
                  <div className="ml-auto flex items-center space-x-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="size-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-slate-900">
            <div className="space-y-4 col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 text-white">
                <Sparkles className="size-6 text-indigo-500" />
                <span className="font-bold text-lg tracking-wider">AI Realty</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                A premium, modern AI-enabled real estate brokerage offering secure verification, agent KYC, and custom lead tracking matching your lifestyle.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Search</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to={searchPath} className="hover:text-white transition-colors">Browse Listings</Link></li>
                <li><Link to={aiChatPath} className="hover:text-white transition-colors">AI Match Assistant</Link></li>
                <li><span className="text-slate-600 cursor-not-allowed">Interactive Maps</span></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Portals</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/login" className="hover:text-white transition-colors">Buyer Portal</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Subagent Workspace</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-xs">
                <li><span className="text-slate-600">Privacy Policy</span></li>
                <li><span className="text-slate-600">Terms of Service</span></li>
                <li><span className="text-slate-600">KYC Guidelines</span></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-slate-600 font-medium gap-4">
            <p>© 2026 AI Realty Brokerage. All rights reserved.</p>
            <p className="flex items-center gap-1"><CheckCircle2 className="size-4 text-emerald-500" /> Platform Verified and Audited</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
