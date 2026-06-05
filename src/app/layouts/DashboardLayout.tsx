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
  LogOut
} from "lucide-react";

export function DashboardLayout() {
  const location = useLocation();
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`w-64 ${bgColor} border-r border-gray-200 flex flex-col`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="size-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Home className="size-5 text-white" />
            </div>
            <div>
              <h1 className={`font-semibold ${textColor}`}>AI Realty</h1>
              <p className={`text-xs ${mutedColor}`}>{title}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
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
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            to="/"
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
              isAdmin ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LogOut className="size-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
