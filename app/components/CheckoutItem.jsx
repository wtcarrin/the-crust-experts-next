"use client"

// Component for the checkout string that displays the list of ingredients in each menu item
// next to the menu item's name and price
export function CheckoutItem({ menuItem, cartItem, cartItemPrice, ingredients, cartItemIDs }) {
  // Build list of ingredients in the menu item
  const getIngredientsList = () => {
    if (!ingredients) return []

    return cartItemIDs
      .map((id) => {
        const ingredient = ingredients.find((ing) => ing.menu_item_id === id)
        return ingredient?.name
      })
      .filter((name) => name && !name.includes("Size")) // Filter out size ingredients
  }

  // Get size name
  const getSize = () => {
    if (!ingredients) return "Medium"

    const sizeIngredient = ingredients.find(
      (ing) => ing.name.includes("Size") && cartItemIDs.includes(ing.menu_item_id),
    )

    if (sizeIngredient) {
      if (sizeIngredient.name === "Small Size") return "Small"
      if (sizeIngredient.name === "Medium Size") return "Medium"
      if (sizeIngredient.name === "Large Size") return "Large"
    }

    return "Medium"
  }

  const ingredientsList = getIngredientsList()
  const size = getSize()

  return (
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
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>
        )}
      </div>

      {/* Item details */}
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{menuItem.name}</h3>
          <div className="font-semibold">${Number(cartItemPrice).toFixed(2)}</div>
        </div>

        {/* Size badge */}
        <div className="mt-1">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {size}
          </span>
        </div>

        {/* Ingredients list */}
        {ingredientsList.length > 0 && (
          <div className="mt-1 text-sm text-gray-600">
            <p className="line-clamp-2">{ingredientsList.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  )
}
