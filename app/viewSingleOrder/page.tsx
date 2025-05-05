import { getAllMenuItems } from "../actions/getAllMenuItems"
import { getAllIngredients } from "../actions/getAllIngredients"
import { deleteItemFromCart } from "../actions/deleteItemFromCart"
import { getPaidOrder } from "../actions/getPaidOrder"
import { getPaidCartSubtotal } from "../actions/getPaidCartSubtotal"
import Link from "next/link"
import { ShoppingBag, MapPin, MessageSquare, ArrowLeft, Clock, CheckCircle } from "lucide-react"

// Define types for ingredient IDs
interface OrderItem {
  itemId: number
  nonce: string
  ingredientIds: number[]
}

interface OrderInfo {
  order_id: number
  order_delivery_address: string
  order_delivery_instructions?: string
}

// This is the page the customer is directed to after they submit their order
// It shows them the details for the single order by the number in the URL
export default async function ViewSingleOrder({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  // Get order id from the URL
  const { p } = await searchParams

  if (!p) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-8 bg-red-50 border border-red-200 rounded-lg shadow-sm text-center">
        <p className="text-red-600 font-medium">No order ID provided</p>
        <Link href="/menu" className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Browse Menu
        </Link>
      </div>
    )
  }

  // Read the id as a number
  const parsedP = Number.parseInt(p, 10)

  // Use actions to get more info about order
  const menuItems = await getAllMenuItems()
  const ingredients = await getAllIngredients()
  const { order, orderInfo, userId, error } = await getPaidOrder(parsedP)
  const subtotal = await getPaidCartSubtotal(parsedP)

  // Ensure subtotal is a number
  const formattedSubtotal = typeof subtotal === "number" ? subtotal : 0

  // Calculate tax and total
  const tax = formattedSubtotal * 0.0825 // 8.25% tax rate
  const deliveryFee = 5.0 // $5 delivery fee
  const total = formattedSubtotal + tax + deliveryFee

  // Make sure the order is iterable for the map below
  if (!Array.isArray(order)) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-8 bg-red-50 border border-red-200 rounded-lg shadow-sm text-center">
        <p className="text-red-600 font-medium">Error: Order data is not available</p>
        <Link href="/menu" className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Browse Menu
        </Link>
      </div>
    )
  }

  // Function to get ingredient names
  const getIngredientNames = (ingredientIds: number[]) => {
    if (!ingredients) return []

    return ingredientIds
      .map((id) => {
        const ingredient = ingredients.find((ing) => ing.menu_item_id === id)
        return ingredient?.name
      })
      .filter((name) => name && !name.includes("Size")) // Filter out size ingredients
  }

  // Function to get size name
  const getSize = (ingredientIds: number[]) => {
    if (!ingredients) return "Medium"

    const sizeIngredient = ingredients.find(
      (ing) => ing.name.includes("Size") && ingredientIds.includes(ing.menu_item_id),
    )

    if (sizeIngredient) {
      if (sizeIngredient.name === "Small Size") return "Small"
      if (sizeIngredient.name === "Medium Size") return "Medium"
      if (sizeIngredient.name === "Large Size") return "Large"
    }

    return "Medium"
  }

  return (
    <div className="max-w-4xl mx-auto p-6 my-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ShoppingBag className="h-7 w-7" />
          Order Confirmation
        </h1>
        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Order Placed</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold">Order #{orderInfo.order_id}</h2>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Delivery Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="font-medium">{orderInfo.order_delivery_address || "Not provided"}</p>
                </div>
              </div>

              {orderInfo.order_delivery_instructions && (
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Delivery Instructions</p>
                    <p className="font-medium">{orderInfo.order_delivery_instructions}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                  <p className="font-medium">30-45 minutes</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${formattedSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8.25%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold">Order Items</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {order.map((orderItem: OrderItem) => {
            var itemId = orderItem.itemId
            var itemNonce = orderItem.nonce
            const menuItem = menuItems.find((item) => item.menu_item_id === itemId)

            if (!menuItem) {
              const nonceAsNumber = parseInt(itemNonce, 10)
              deleteItemFromCart(nonceAsNumber)
              return null
            }

            const ingredientNames = getIngredientNames(orderItem.ingredientIds)
            const size = getSize(orderItem.ingredientIds)

            return (
              <div key={itemNonce} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Item image */}
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {menuItem.photo_url ? (
                      <img
                        src={menuItem.photo_url || "/placeholder.svg"}
                        alt={menuItem.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Item details */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{menuItem.name}</h3>
                    </div>

                    {/* Size badge */}
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {size}
                      </span>
                    </div>

                    {/* Ingredients list */}
                    {ingredientNames.length > 0 && (
                      <div className="mt-1 text-sm text-gray-600">
                        <p className="line-clamp-2">{ingredientNames.join(", ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href="/menu" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
        <Link href="/profile" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
          View All Orders
        </Link>
      </div>
    </div>
  )
}
