import { getLiveCustomerCart } from "../actions/getLiveCustomerCart"
import { getLiveCartSubtotal } from "../actions/getLiveCartSubtotal"
import { getAllMenuItems } from "../actions/getAllMenuItems"
import { deleteItemFromCart } from "../actions/deleteItemFromCart"
import { getAllSizes } from "../actions/getAllSizes"
import { NewCartItem } from "../components/NewCartItem"
import Link from "next/link"
import { getAllIngredientsNoSizes } from "../actions/getAllIngredientsNoSizes"
import { ShoppingCart, ArrowRight, ShoppingBasket } from "lucide-react"

//cart page
export default async function Cart() {
  //lots of server functions to make sure we have the most accurate data when we load the page
  const { cart, userId, error } = await getLiveCustomerCart()
  const menuItems = await getAllMenuItems()
  const subtotal = await getLiveCartSubtotal()
  const allIngredients = await getAllIngredientsNoSizes()
  var sizes = await getAllSizes()

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-8 bg-red-50 border border-red-200 rounded-lg shadow-sm">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    )
  }

  // Ensure subtotal is a number
  const formattedSubtotal = typeof subtotal === "number" ? subtotal : 0

  return (
    <div className="max-w-4xl mx-auto p-6 my-8">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="h-7 w-7" />
        <h1 className="text-3xl font-bold">My Cart</h1>
      </div>

      {/*if cart is empty, display your cart is empty*/}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-lg border border-gray-200">
          <ShoppingBasket className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
          <Link
            href="/menu"
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Browse Menu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Items ({cart.length})</span>
              <span className="text-xl font-bold">${formattedSubtotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            {/*or return cart contents*/}
            {cart.map(async (cartItem) => {
              var itemId = cartItem.itemId
              var itemNonce = cartItem.nonce
              const smallSize = sizes?.find((ingredient) => ingredient.name === "Small Size")
              const mediumSize = sizes?.find((ingredient) => ingredient.name === "Medium Size")
              const largeSize = sizes?.find((ingredient) => ingredient.name === "Large Size")
              const getSize = (ingredients: number[]) => {
                for (const ingredient of ingredients) {
                  if (ingredient === smallSize?.menu_item_id) {
                    console.log("My size: small")
                    return "S"
                  } else if (ingredient === mediumSize?.menu_item_id) {
                    console.log("My size: medium")
                    return "M"
                  } else if (ingredient === largeSize?.menu_item_id) {
                    console.log("My size: large")
                    return "L"
                  }
                }
                return "M"
              }
              const menuItem = menuItems.find((item) => item.menu_item_id === itemId)
              if (!menuItem) {
                deleteItemFromCart(itemNonce)
                return
              }

              return (
                <div key={itemNonce} className="p-4">
                  {/*pass information to NewCartItem so that we don't have to call the server for every item we render*/}
                  {/*NewCartItem replaced CustomCartItem and NonCustomCartItem...*/}
                  <NewCartItem
                    menuItem={menuItem}
                    sizes={sizes}
                    cartItem={cartItem}
                    ingredients={allIngredients}
                    mySize={getSize(cartItem.ingredientIds)}
                  />
                </div>
              )
            })}
          </div>

          {/*if cart isn't empty, show checkout button*/}
          {cart.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
              <Link href="/menu" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ArrowRight className="h-4 w-4 rotate-180" />
                Continue Shopping
              </Link>

              <Link
                href="/checkout"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
