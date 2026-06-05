import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { Home, Search, MessageSquare, User, Sparkles, Menu, X } from "lucide-react";

export function CustomerLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/search", label: "Search", icon: Search },
    { to: "/ai-chat", label: "AI Assistant", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="size-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Home className="size-5 text-white" />
                </div>
                <span className="font-semibold text-xl text-gray-900">AI Realty</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-50 text-primary"
                          : "text-gray-600 hover:text-primary hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="size-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/customer/dashboard"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User className="size-4" />
                <span>Dashboard</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-primary font-medium"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  <Icon className="size-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <Link
              to="/customer/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors mt-2"
            >
              <User className="size-5" />
              <span>Dashboard</span>
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Floating AI Chat Button */}
      {location.pathname !== '/ai-chat' && (
        <Link
          to="/ai-chat"
          className="fixed bottom-6 right-6 size-14 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow z-40"
        >
          <MessageSquare className="size-6 text-white" />
        </Link>
      )}
    </div>
  );
}
