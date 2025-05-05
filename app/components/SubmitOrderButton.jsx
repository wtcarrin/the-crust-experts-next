"use client"
import { useRouter } from "next/navigation"
import { submitCustomerOrder } from "../actions/submitCustomerOrder"
import { ArrowRight, MapPin, MessageSquare } from "lucide-react"

// This component takes the last information we need to complete the order:
// delivery address and delivery instructions
export function SubmitOrderButton({ orderId, subtotal, customerAddress }) {
  const router = useRouter()

  // If we don't have an address in the form, don't submit the order to the database.
  const submit = async (formData) => {
    if (!formData.get("address")) {
      return
    }
    console.log("Submitting order with ID:", orderId)
    await submitCustomerOrder(orderId, subtotal, formData.get("address"), formData.get("delivery_instructions"))
    router.push("/viewSingleOrder?p=" + orderId)
  }

  return (
    <form action={submit} className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
          <div className="flex-1">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              defaultValue={customerAddress}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your delivery address"
            />
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MessageSquare className="h-5 w-5 text-gray-400 mt-1" />
          <div className="flex-1">
            <label htmlFor="delivery_instructions" className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Instructions (Optional)
            </label>
            <textarea
              id="delivery_instructions"
              name="delivery_instructions"
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Special instructions for delivery"
            ></textarea>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        Complete Order
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  )
}
