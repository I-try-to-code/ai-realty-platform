import { Outlet, Link, useLocation } from "react-router";
import { Home, Search, MessageSquare, User, Sparkles } from "lucide-react";

export function CustomerLayout() {
  const location = useLocation();

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
                <Link
                  to="/search"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/search'
                      ? 'bg-blue-50 text-primary'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  <Search className="size-4" />
                  <span>Search</span>
                </Link>
                <Link
                  to="/ai-chat"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/ai-chat'
                      ? 'bg-blue-50 text-primary'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  <Sparkles className="size-4" />
                  <span>AI Assistant</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/customer/dashboard"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User className="size-4" />
                <span>Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
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
