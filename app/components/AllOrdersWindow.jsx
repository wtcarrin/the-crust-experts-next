import { ShoppingBag, DollarSign, User, Truck, MessageSquare } from "lucide-react"

//admin component to display the orders information passed as an argument
//this is used in the profile page to see currently authenticated user's orders
//and in the admin dashboard view ALL orders view.
export function AllOrdersWindow({ orders }) {
  //take orders as argument
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/*map each order to simply display its properties*/}
        {orders?.map((order) => (
          <div
            key={order.order_id}
            className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Order header with status badge */}
            <div className="border-b px-4 py-3 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-700">Order #{order.order_id}</span>
              </div>
              <div
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  order.order_status === "PAID"
                    ? "bg-green-100 text-green-800"
                    : order.order_status === "IN_PROGRESS"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {order.order_status}
              </div>
            </div>

            {/* Order details */}
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-2">
                <DollarSign className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium">${order.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <User className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Customer ID</p>
                  <p className="font-medium text-sm break-all">{order.order_owner_id}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Truck className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="font-medium">{order.order_delivery_address || "Not provided"}</p>
                </div>
              </div>

              {order.order_delivery_instructions && (
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Instructions</p>
                    <p className="font-medium">{order.order_delivery_instructions}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {(!orders || orders.length === 0) && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
          <p className="text-gray-500">There are no orders to display at this time.</p>
        </div>
      )}
    </div>
  )
}
