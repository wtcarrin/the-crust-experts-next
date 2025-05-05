"use client"

import { useState, useEffect } from "react"
import { clientGetSumCostOfIngredients } from "../actions/clientGetSumCostOfIngredients"
import { useCart } from "../context/CartContext"

/**
 * Menu item component that displays item details and handles add to cart functionality
 */
export function MenuItem({ menuItem, ingredients, menuItemPrice, sizes, addItemToCart }) {
  // Get cart context
  const { incrementCart } = useCart()

  // Get size objects
  const smallSize = sizes?.find((ingredient) => ingredient.name === "Small Size")
  const mediumSize = sizes?.find((ingredient) => ingredient.name === "Medium Size")
  const largeSize = sizes?.find((ingredient) => ingredient.name === "Large Size")

  // State variables
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState(menuItem.ingredients)
  const [totalPrice, setTotalPrice] = useState(menuItemPrice)
  const [selectedSize, setSelectedSize] = useState("M")
  const [showSizeOptions, setShowSizeOptions] = useState(false)

  // Size prices dictionary
  const sizePrices = {
    S: smallSize?.price || 0,
    M: mediumSize?.price || 0,
    L: largeSize?.price || 0,
  }

  // Initialize with medium size
  useEffect(() => {
    handleSizeChange("M")
  }, [])

  // Update price when ingredients or size changes
  useEffect(() => {
    const calculatePrice = async () => {
      const baseIngredients = selectedIngredients.filter(
        (ingredient) =>
          ingredient !== smallSize?.menu_item_id &&
          ingredient !== mediumSize?.menu_item_id &&
          ingredient !== largeSize?.menu_item_id,
      )

      let basePrice = menuItemPrice
      if (ingredients && baseIngredients.length > 0) {
        try {
          basePrice = await clientGetSumCostOfIngredients(baseIngredients, ingredients)
        } catch (error) {
          console.error("Error calculating price:", error)
        }
      }

      const newPrice = basePrice + sizePrices[selectedSize]
      setTotalPrice(newPrice)
    }

    calculatePrice()
  }, [selectedSize, selectedIngredients])

  // Handle ingredient selection
  const handleIngredientChange = (ingredient, isChecked) => {
    if (isChecked) {
      // Add ingredient if checked
      setSelectedIngredients((prev) => [...prev, ingredient.menu_item_id])
    } else {
      // Remove ingredient if unchecked
      setSelectedIngredients((prev) => prev.filter((item) => item !== ingredient.menu_item_id))
    }
  }

  // Handle size change
  const handleSizeChange = (size) => {
    setSelectedSize(size)

    const newIngredients = selectedIngredients.filter(
      (ingredient) =>
        ingredient !== smallSize?.menu_item_id &&
        ingredient !== mediumSize?.menu_item_id &&
        ingredient !== largeSize?.menu_item_id,
    )

    let itemSize
    switch (size) {
      case "S":
        itemSize = smallSize
        break
      case "M":
        itemSize = mediumSize
        break
      case "L":
        itemSize = largeSize
        break
      default:
        itemSize = mediumSize
    }

    if (itemSize) {
      setSelectedIngredients([...newIngredients, itemSize.menu_item_id])
    } else {
      setSelectedIngredients(newIngredients)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    await addItemToCart(menuItem.menu_item_id, selectedIngredients)

    // Update cart count immediately
    incrementCart()

    if (menuItem.customizable) {
      setIsPopupOpen(false)
    } else {
      setShowSizeOptions(false)
    }
  }

  // Handle quick add to cart with size selection
  const handleQuickAddToCart = async (sizeId) => {
    const ingredientIds = [...menuItem.ingredients]

    if (sizeId) {
      ingredientIds.push(sizeId)
    }

    await addItemToCart(menuItem.menu_item_id, ingredientIds)

    // Update cart count immediately
    incrementCart()

    setShowSizeOptions(false)
  }

  // Render customization popup
  if (isPopupOpen) {
    return (
      <div className="w-full border rounded-lg p-4 shadow-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Customize {menuItem.name}</h3>

          {/* Size selection */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="size"
                value="S"
                checked={selectedSize === "S"}
                onChange={() => handleSizeChange("S")}
                className="accent-red-600"
              />
              <span>S</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="size"
                value="M"
                checked={selectedSize === "M"}
                onChange={() => handleSizeChange("M")}
                className="accent-red-600"
              />
              <span>M</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="size"
                value="L"
                checked={selectedSize === "L"}
                onChange={() => handleSizeChange("L")}
                className="accent-red-600"
              />
              <span>L</span>
            </label>
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              setIsPopupOpen(false)
              setSelectedIngredients(menuItem.ingredients)
            }}
            className="text-gray-500 hover:text-gray-700"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Ingredient selection form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-md font-medium">Select Ingredients:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
            {ingredients
              ?.filter((ing) => !["Small Size", "Medium Size", "Large Size"].includes(ing.name))
              ?.map((ingredient) => (
                <div key={ingredient.menu_item_id} className="border p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={selectedIngredients.some((id) => id === ingredient.menu_item_id)}
                      onChange={(e) => handleIngredientChange(ingredient, e.target.checked)}
                      className="mt-1 w-5 h-5 accent-red-600 border-gray-300 rounded"
                    />
                    <div className="ml-2 block">
                      <h2 className="text-lg font-semibold pr-6">{ingredient.name}</h2>
                      <p className="text-sm text-gray-600">+${ingredient.price?.toFixed(2)}</p>
                      {ingredient.description && <p className="text-sm text-gray-600">{ingredient.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="pt-4 border-t">
            <p className="font-semibold text-lg">Total: ${totalPrice?.toFixed(2)}</p>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
          >
            Add to Cart
          </button>
        </form>
      </div>
    )
  }

  // Render regular menu item
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {/* Photo display - using menuItem.photo_url for each specific item */}
        <div
          className="mb-4 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden"
          style={{ height: "120px" }}
        >
          {menuItem.photo_url ? (
            <img
              src={menuItem.photo_url || "/placeholder.svg"}
              alt={menuItem.name}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-gray-400 text-sm text-center">
              <span>No image</span>
            </div>
          )}
        </div>

        <h3 className="font-bold text-lg mb-1">{menuItem.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{menuItem.description}</p>
        <p className="font-medium">${totalPrice?.toFixed(2)}</p>
      </div>

      <div className="mt-4">
        {menuItem.customizable ? (
          <button
            onClick={() => setIsPopupOpen(true)}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
          >
            Customize
          </button>
        ) : !showSizeOptions ? (
          <button
            onClick={() => setShowSizeOptions(true)}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
          >
            Add to Cart
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Select Size:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleQuickAddToCart(smallSize?.menu_item_id)}
                className="py-2 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-md border border-gray-300 transition-colors text-sm"
              >
                Small
              </button>
              <button
                onClick={() => handleQuickAddToCart(mediumSize?.menu_item_id)}
                className="py-2 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-md border border-gray-300 transition-colors text-sm"
              >
                Medium
              </button>
              <button
                onClick={() => handleQuickAddToCart(largeSize?.menu_item_id)}
                className="py-2 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-md border border-gray-300 transition-colors text-sm"
              >
                Large
              </button>
            </div>
            <button
              onClick={() => setShowSizeOptions(false)}
              className="mt-2 py-2 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-md border border-gray-300 transition-colors text-sm w-full"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
