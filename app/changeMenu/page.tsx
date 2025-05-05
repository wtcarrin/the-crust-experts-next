import { AddMenuItemForm } from "../components/AddMenuItemForm"
import { MenuItemGrid } from "../components/MenuItemGrid"
import { AddIngredientForm } from "../components/AddIngredientForm"
import { IngredientGrid } from "../components/IngredientGrid"
import { AdminNav } from "../components/AdminNav"
import { Pizza, Salad } from "lucide-react"

//page to change aspects of the menu
//not just menu items, but the ingredients that make up menu items are changed on this page
export default function ChangeMenu() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Pizza className="h-8 w-8 text-red-600" />
        Menu Management
      </h1>

      {/*navigation bar specific to admin panel*/}
      <AdminNav />

      {/* Tabbed interface for menu items and ingredients */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mb-8">
        <div className="flex border-b border-gray-200">
          <button
            className="flex-1 px-6 py-4 text-center font-medium text-red-600 bg-white border-b-2 border-red-600"
            type="button"
          >
            Menu Items
          </button>
          <button
            className="flex-1 px-6 py-4 text-center font-medium text-gray-500 hover:text-gray-700 bg-gray-50"
            type="button"
          >
            Ingredients
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Pizza className="h-5 w-5 text-red-600" />
              Menu Items
            </h2>
            {/*add/delete the menu items*/}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="text-lg font-medium mb-4">Add New Menu Item</h3>
              <AddMenuItemForm />
            </div>
            <MenuItemGrid />
          </div>

          <div className="pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Salad className="h-5 w-5 text-red-600" />
              Ingredients
            </h2>
            {/*add/delete ingredients*/}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="text-lg font-medium mb-4">Add New Ingredient</h3>
              <AddIngredientForm />
            </div>
            <IngredientGrid />
          </div>
        </div>
      </div>
    </div>
  )
}
