import { Trash2, AlertCircle, Check } from "lucide-react"
import { deleteMenuItem } from "../actions/deleteMenuItem"
import { getAllMenuItems } from "../actions/getAllMenuItems"
import { Pizza } from "lucide-react"

//component for displaying all menu items to the admin changing the menu
export async function MenuItemGrid() {
  //get all menu items from the server
  const menuItems = await getAllMenuItems()

  // Group menu items by category
  const groupedMenuItems = menuItems?.reduce((acc, menuItem) => {
    const category = menuItem.category || "Uncategorized"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(menuItem)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      {/* Map through each category */}
      {groupedMenuItems &&
        Object.entries(groupedMenuItems).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">{category}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/*map each menu item*/}
              {items.map((menuItem) => (
                <div
                  key={menuItem.menu_item_id}
                  className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {/* Image section */}
                  <div className="h-40 bg-gray-100 relative flex items-center justify-center">
                    {menuItem.photo_url ? (
                      <img
                        src={menuItem.photo_url || "/placeholder.svg"}
                        alt={menuItem.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Pizza className="h-16 w-16 text-gray-300" />
                    )}

                    {/* Customizable badge */}
                    {menuItem.customizable && (
                      <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Customizable
                      </div>
                    )}

                    {/*form to handle menu item deletion*/}
                    <form
                      action={async () => {
                        "use server"
                        if (confirm(`Are you sure you want to delete ${menuItem.name}?`)) {
                          await deleteMenuItem(menuItem.menu_item_id)
                        }
                      }}
                    >
                      <button
                        type="submit"
                        className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete menu item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </div>

                  <div className="p-4">
                    {/*display each menu item's information we got from the server*/}
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-semibold">{menuItem.name}</h2>
                      <div className="text-sm font-bold text-red-600">${menuItem.price?.toFixed(2)}</div>
                    </div>

                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium mr-2">ID:</span>
                        <span>{menuItem.menu_item_id}</span>
                      </div>

                      {menuItem.description ? (
                        <div className="text-sm text-gray-600 mt-2">
                          <p className="line-clamp-2">{menuItem.description}</p>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 px-3 py-2 rounded-md flex items-center gap-2 text-xs text-yellow-700 mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <span>Missing description</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* Empty state */}
      {(!menuItems || menuItems.length === 0) && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <Pizza className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No menu items found</h3>
          <p className="text-gray-500">Add menu items using the form above.</p>
        </div>
      )}
    </div>
  )
}
