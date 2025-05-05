import { getLiveCustomerCart } from "../actions/getLiveCustomerCart"
import { getLiveCartSubtotal } from "../actions/getLiveCartSubtotal"
import { getAllMenuItems } from "../actions/getAllMenuItems"
import { deleteItemFromCart } from "../actions/deleteItemFromCart"
import { createClient } from "@/utils/supabase/server"
import { getCustomerProfile } from "../actions/getProfileData"
import { CheckoutItemServerComponent } from "../components/CheckoutItemServerComponent"
import { SubmitOrderButton } from "../components/SubmitOrderButton"
import { ShoppingBag, AlertCircle, ArrowLeft, Truck } from "lucide-react"
import Link from "next/link"

//checkout page which displays customer's cart info
//and allows them to change status of their order from IN_PROGRESS to PAID
export default async function Checkout() {
  //check that user is authenticated
  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData?.user) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-8 bg-red-50 border border-red-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <p className="font-medium">User not authenticated. Please sign in to continue.</p>
        </div>
        <Link href="/login" className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Sign In
        </Link>
      </div>
    )
  }

  //get info about the customer's current order
  const { data: existingOrder } = await supabase
    .from("orders")
    .select("*")
    .eq("order_owner_id", authData.user.id)
    .eq("order_status", "IN_PROGRESS")
    .maybeSingle()

  //ask the server for most current information about customer's cart
  const { cart, userId, error } = await getLiveCustomerCart()
  const menuItems = await getAllMenuItems()
  const subtotal = (await getLiveCartSubtotal()) as number
  const tax = subtotal * 0.0825 // 8.25% tax rate
  const deliveryFee = 5.0 // $5 delivery fee
  const total = subtotal + tax + deliveryFee

  var customer = await getCustomerProfile()

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-8 bg-red-50 border border-red-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <p className="font-medium">{error}</p>
        </div>
        <Link href="/cart" className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Return to Cart
        </Link>
      </div>
    )
  }

  //check that there are any items in the cart
  if (subtotal <= 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-8 text-center">
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-lg border border-gray-200">
          <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Add items to your cart to proceed with checkout.</p>
          <Link
            href="/menu"
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 my-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <ShoppingBag className="h-7 w-7" />
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items - Takes up 2/3 of the space on large screens */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold">Order Details</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {cart.map((cartItem) => {
                var itemId = cartItem.itemId
                var itemNonce = cartItem.nonce
                const menuItem = menuItems.find((item) => item.menu_item_id === itemId)
                if (!menuItem) {
                  deleteItemFromCart(itemNonce)
                  return null
                }

                return (
                  <div key={itemNonce} className="p-4 hover:bg-gray-50 transition-colors">
                    <CheckoutItemServerComponent menuItem={menuItem} cartItem={cartItem} />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6">
            <Link href="/cart" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Return to Cart
            </Link>
          </div>
        </div>

        {/* Order Summary - Takes up 1/3 of the space on large screens */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm sticky top-6">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${Number(subtotal).toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-600">Tax (8.25%)</span>
                <span className="font-medium">${Number(tax).toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-600 flex items-center gap-1">
                  <Truck className="h-4 w-4" />
                  Delivery Fee
                </span>
                <span className="font-medium">${deliveryFee.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">${Number(total).toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4">
                {/* Submit Order Button */}
                <SubmitOrderButton
                  orderId={existingOrder?.order_id}
                  subtotal={subtotal}
                  customerAddress={customer?.customer?.address || ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
