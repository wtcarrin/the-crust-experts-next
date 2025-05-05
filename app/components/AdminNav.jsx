import Link from "next/link"
import { Clipboard, Edit, Package, LayoutDashboard, ChevronRight } from "lucide-react"

export async function AdminNav() {
  //component for admin navbar, to link to all admin functionality pages
  return (
    <div className="bg-white shadow-sm rounded-lg mb-8 border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <LayoutDashboard className="h-5 w-5 mr-2 text-red-600" />
          Admin Dashboard
        </h2>
      </div>

      <nav className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        <Link
          href="/adminDashboard"
          className="flex items-center gap-2 px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
        >
          <Clipboard className="h-5 w-5" />
          <span>All Orders</span>
          <ChevronRight className="h-4 w-4 ml-auto sm:hidden" />
        </Link>

        <Link
          href="/changeMenu"
          className="flex items-center gap-2 px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
        >
          <Edit className="h-5 w-5" />
          <span>Edit Menu</span>
          <ChevronRight className="h-4 w-4 ml-auto sm:hidden" />
        </Link>

        <Link
          href="/inventory"
          className="flex items-center gap-2 px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
        >
          <Package className="h-5 w-5" />
          <span>Inventory</span>
          <ChevronRight className="h-4 w-4 ml-auto sm:hidden" />
        </Link>
      </nav>
    </div>
  )
}
