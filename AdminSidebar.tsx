import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Wrench,
  Layout as LayoutIcon,
  Settings as SettingsIcon,
  Layers,
} from "lucide-react";
import SignOutButton from "./SignOutButton";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", Icon: FileText },
  { href: "/admin/tools", label: "Tools", Icon: Wrench },
  { href: "/admin/footer", label: "Footer", Icon: LayoutIcon },
  { href: "/admin/settings", label: "Settings", Icon: SettingsIcon },
];

export default function AdminSidebar() {
  return (
    <aside className="w-full sm:w-56 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-gray-100 bg-white">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
          <Layers className="h-5 w-5 text-brand-600" />
          CuratedStack
        </Link>
      </div>
      <nav className="flex sm:flex-col gap-1 px-3 pb-4 overflow-x-auto">
        {links.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-600 transition-colors"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="hidden sm:block px-6 py-4 border-t border-gray-100">
        <SignOutButton />
      </div>
    </aside>
  );
}
