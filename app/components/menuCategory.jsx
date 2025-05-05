import { MenuItemServerComponent } from "./NotCustomMenuItemServerComponent"

//component to abstract away different categories of the menu with their own
//headers and blurbs
export function MenuCategory({ menuItems, ingredients, sizes, category }) {
  //storing the blurbs for all categories statically... not best...
  const titleBlurbs = {
    Pizza: "Specialty Pizzas",
    Salad: "Fresh Salads",
    Drink: "Drinks",
  }
  const descriptionBlurbs = {
    Pizza: "Cooked to order in our wood-fired pizza oven",
    Salad: "Prepared with the freshest in-season produce",
    Drink: "Premium Libations",
  }

  // Icons for each category
  const categoryIcons = {
    Pizza: "🍕",
    Salad: "🥗",
    Drink: "🥤",
  }

  if (category) {
    var myMenuItems = menuItems.filter((item) => item.category === category)
  }

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{categoryIcons[category]}</span>
        <h2 className="text-3xl font-bold text-red-600">{titleBlurbs[category]}</h2>
      </div>
      <p className="text-base text-gray-700 mb-8 italic">{descriptionBlurbs[category]}</p>

      {/* Changed to a responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {myMenuItems?.map((menuItem) => (
          <div
            key={menuItem.menu_item_id}
            className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100"
          >
            <MenuItemServerComponent menuItem={menuItem} ingredients={ingredients} sizes={sizes} />
          </div>
        ))}
      </div>
    </div>
  )
}
