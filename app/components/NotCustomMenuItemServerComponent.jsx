import { MenuItem } from "./MenuItem"
import { addItemToCart } from "../actions/addItemToCart"

/**
 * Server component that wraps menu items and handles ingredient filtering and price calculation
 * @param {Object} props - Component props
 * @param {Object} props.menuItem - The menu item data
 * @param {Array} props.ingredients - All available ingredients
 * @param {Array} props.sizes - All available sizes
 */
export function MenuItemServerComponent({ menuItem, ingredients, sizes }) {
  // Calculate the base price of the menu item from its default ingredients
  const calculateMenuItemPrice = (ingredientIds) => {
    if (!ingredients) return 0

    let totalPrice = 0

    for (const id of ingredientIds) {
      const ingredient = ingredients.find((item) => item.menu_item_id === Number(id))

      if (ingredient) {
        totalPrice += ingredient.price
      } else {
        console.log(`Ingredient with ID ${id} not found`)
      }
    }

    return totalPrice
  }

  // Get the base price for this menu item
  const menuItemPrice = calculateMenuItemPrice(menuItem.ingredients)

  // Filter ingredients and sizes based on menu item category
  let categoryIngredients = []
  let categorySizes = []

  switch (menuItem.category) {
    case "Pizza":
      categoryIngredients = ingredients.filter((ingredient) => ingredient.category === "Pizza Ingredient")
      categorySizes = sizes.filter((size) => size.category === "Pizza Ingredient")
      break
    case "Salad":
      categoryIngredients = ingredients.filter((ingredient) => ingredient.category === "Salad Ingredient")
      categorySizes = sizes.filter((size) => size.category === "Salad Ingredient")
      break
    case "Drink":
      categoryIngredients = ingredients.filter((ingredient) => ingredient.category === "Drink Ingredient")
      categorySizes = sizes.filter((size) => size.category === "Drink Ingredient")
      break
    default:
      // Default case if category doesn't match
      categoryIngredients = ingredients
      categorySizes = sizes
  }

  return (
    <MenuItem
      menuItem={menuItem}
      ingredients={categoryIngredients}
      menuItemPrice={menuItemPrice}
      sizes={categorySizes}
      addItemToCart={addItemToCart}
    />
  )
}
