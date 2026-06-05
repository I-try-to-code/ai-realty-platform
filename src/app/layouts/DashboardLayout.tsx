import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  Home,
  LayoutDashboard,
  Building2,
  Users,
  MessageSquare,
  Settings,
  FileCheck,
  Shield,
  Eye,
  CheckCircle,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Badge } from "../components/Badge";

export function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isCustomer = location.pathname.startsWith('/customer');
  const isSubagent = location.pathname.startsWith('/subagent');
  const isAdmin = location.pathname.startsWith('/admin');

  const customerLinks = [
    { path: '/customer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/search', label: 'Search Properties', icon: Home },
    { path: '/ai-chat', label: 'AI Assistant', icon: MessageSquare },
  ];

  const subagentLinks = [
    { path: '/subagent/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/subagent/properties/add', label: 'Add Property', icon: Building2 },
    { path: '/subagent/leads', label: 'Leads', icon: Users },
    { path: '/subagent/kyc', label: 'KYC Verification', icon: FileCheck },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/approvals', label: 'Subagent Approvals', icon: CheckCircle },
    { path: '/admin/moderation', label: 'Property Moderation', icon: Shield },
    { path: '/admin/leads', label: 'Lead Visibility', icon: Eye },
    { path: '/admin/monitoring', label: 'Chat Monitoring', icon: MessageSquare },
  ];

  const links = isCustomer ? customerLinks : isSubagent ? subagentLinks : adminLinks;
  const title = isCustomer ? 'Customer Portal' : isSubagent ? 'Subagent Portal' : 'Admin Portal';
  const bgColor = isAdmin ? 'bg-gray-900' : 'bg-white';
  const textColor = isAdmin ? 'text-gray-100' : 'text-gray-900';
  const mutedColor = isAdmin ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isAdmin ? 'border-gray-800' : 'border-gray-200';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 ${bgColor} border-r ${borderColor} flex flex-col transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className={`p-6 border-b ${borderColor} flex items-center justify-between`}>
          <div className="flex items-center space-x-2">
            <div className="size-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Home className="size-5 text-white" />
            </div>
            <div>
              <h1 className={`font-semibold ${textColor}`}>AI Realty</h1>
              <p className={`text-xs ${mutedColor}`}>{title}</p>
            </div>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? isAdmin
                      ? 'bg-primary text-white'
                      : 'bg-blue-50 text-primary'
                    : isAdmin
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="size-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className={`pt-4 mt-4 border-t ${isAdmin ? 'border-gray-800/80' : 'border-gray-200/80'}`}>
            <p className={`px-3 mb-2 text-xs font-semibold uppercase tracking-wider ${isAdmin ? 'text-gray-500' : 'text-gray-400'}`}>
              Switch Portal
            </p>
            {!isCustomer && (
              <Link
                to="/customer/dashboard"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isAdmin ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                }`}
              >
                <Users className="size-4" />
                <span>Customer Portal</span>
              </Link>
            )}
            {!isSubagent && (
              <Link
                to="/subagent/dashboard"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isAdmin ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                }`}
              >
                <Building2 className="size-4" />
                <span>Subagent Portal</span>
              </Link>
            )}
            {!isAdmin && (
              <Link
                to="/admin/dashboard"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isAdmin ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                }`}
              >
                <Shield className="size-4" />
                <span>Admin Portal</span>
              </Link>
            )}
          </div>
        </nav>

        <div className={`p-4 border-t ${borderColor}`}>
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
              isAdmin ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LogOut className="size-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 flex-shrink-0 z-30">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <Menu className="size-6" />
            </button>
            <span className="font-semibold text-gray-900">AI Realty</span>
            <Badge variant="info" size="sm">
              {title}
            </Badge>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
