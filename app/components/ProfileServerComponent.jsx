"use server"
import { getCustomerProfile } from "../actions/getProfileData"
import { updateProfileInfo } from "../actions/updateProfileInfo"
import { ProfileComponent } from "../components/ProfileComponent"
import { AllOrdersWindow } from "./AllOrdersWindow"
import { createClient } from "@/utils/supabase/server"
import { User, ShoppingBag, AlertCircle } from "lucide-react"

//this component gets a user's profile order histroy information from the server
export async function ProfileServerComponent() {
  const supabase = await createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()

  //get my order history
  const { data: myOrders } = await supabase
    .from("orders")
    .select()
    .eq("order_status", "PAID")
    .eq("order_owner_id", authData.user.id)
    .then((res) => {
      return res
    })

  const customer = await getCustomerProfile()
  if (!customer.customer) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-6 text-red-600">
          <AlertCircle className="h-6 w-6" />
          <h2 className="text-xl font-semibold">Anonymous Session</h2>
        </div>
        <ProfileComponent customer={customer.customer} updateProfileInfo={updateProfileInfo} />
      </div>
    )
  } else {
    return (
      <div className="space-y-8">
        {/* Profile Information Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-red-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Personal Information</h2>
            </div>
          </div>
          <div className="p-6">
            <ProfileComponent customer={customer.customer} updateProfileInfo={updateProfileInfo} />
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-red-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-6 w-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Order History</h2>
            </div>
          </div>
          <div className="p-6">
            {myOrders && myOrders.length > 0 ? (
              <AllOrdersWindow orders={myOrders} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>You haven't placed any orders yet.</p>
                <a href="/menu" className="text-red-600 hover:text-red-700 font-medium mt-2 inline-block">
                  Browse our menu to place your first order
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
