import { createClient } from "@/utils/supabase/server"
import { AllOrdersWindow } from "../components/AllOrdersWindow"
import { AdminNav } from "../components/AdminNav"
import { ShoppingBag, BarChart } from "lucide-react"

// The admin dashboard landing page
export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch all paid orders from server
  const { data: orders } = await supabase
    .from("orders")
    .select()
    .eq("order_status", "PAID")
    .then((res) => {
      return res
    })

  // Calculate some basic stats
  const totalOrders = orders?.length || 0
  const totalRevenue = orders?.reduce((sum, order) => sum + (order.price || 0), 0) || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin navigation */}
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage orders and restaurant operations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-full">
                <ShoppingBag className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-full">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Recent Orders
            </h2>
          </div>

          <div className="p-6">
            {/* Pass the orders we got from supabase as argument to AllOrdersWindow component */}
            {orders && orders.length > 0 ? (
              <AllOrdersWindow orders={orders} />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No orders found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
