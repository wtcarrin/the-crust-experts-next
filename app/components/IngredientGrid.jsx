import { Trash2, AlertCircle } from "lucide-react"
import { deleteMenuItem } from "../actions/deleteMenuItem"
import { getAllIngredients } from "../actions/getAllIngredients"
import { Salad } from "lucide-react"

//component for the admin page changeMenu to display all ingredients currently
//in the database and allow the admin to delete them
export async function IngredientGrid() {
  const ingredients = await getAllIngredients()

  // Group ingredients by category
  const groupedIngredients = ingredients?.reduce((acc, ingredient) => {
    const category = ingredient.category || "Uncategorized"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(ingredient)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      {/* Map through each category */}
      {groupedIngredients &&
        Object.entries(groupedIngredients).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">{category}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/*map each ingredient*/}
              {items.map((ingredient) => (
                <div
                  key={ingredient.menu_item_id}
                  className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="p-4">
                    {/*ingredient info*/}
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-semibold">{ingredient.name}</h2>

                      {/*form using the trash icon as submit button to delete the ingredient*/}
                      <form
                        action={async () => {
                          "use server"
                          if (confirm(`Are you sure you want to delete ${ingredient.name}?`)) {
                            await deleteMenuItem(ingredient.menu_item_id)
                          }
                        }}
                      >
                        <button
                          type="submit"
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete ingredient"
                        >
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>

                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium mr-2">ID:</span>
                        <span>{ingredient.menu_item_id}</span>
                      </div>

                      {ingredient.description && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium mr-2">Description:</span>
                          <span>{ingredient.description}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm">
                          <span className="font-medium mr-2">Category:</span>
                          <span className="text-gray-600">{ingredient.category}</span>
                        </div>
                        <div className="text-sm font-bold text-red-600">${ingredient.price?.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Warning if no description */}
                  {!ingredient.description && (
                    <div className="bg-yellow-50 px-4 py-2 border-t border-yellow-100 flex items-center gap-2 text-xs text-yellow-700">
                      <AlertCircle className="h-4 w-4" />
                      <span>Missing description</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* Empty state */}
      {(!ingredients || ingredients.length === 0) && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <Salad className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No ingredients found</h3>
          <p className="text-gray-500">Add ingredients using the form above.</p>
        </div>
      )}
    </div>
  )
}
