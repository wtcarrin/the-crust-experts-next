import { addIngredient } from "../actions/addIngredient"
import { DollarSign, AlertCircle } from "lucide-react"

//component for the form for adding an ingredient to the database
export function AddIngredientForm() {
  return (
    <div className="w-full">
      {/*form with proper grid layout*/}
      <form action={addIngredient} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/*name input*/}
          <div className="space-y-1">
            <label htmlFor="ingredient-name" className="block text-sm font-medium text-gray-700">
              Ingredient Name
            </label>
            <input
              type="text"
              id="ingredient-name"
              name="name"
              placeholder="e.g. Mozzarella Cheese"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/*price input*/}
          <div className="space-y-1">
            <label htmlFor="ingredient-price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                id="ingredient-price"
                name="price"
                step="0.01"
                min="0"
                placeholder="0.00"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/*description/allergen input*/}
        <div className="space-y-1">
          <label htmlFor="ingredient-description" className="block text-sm font-medium text-gray-700">
            Description/Allergens
          </label>
          <div className="relative">
            <textarea
              id="ingredient-description"
              name="description"
              rows="2"
              placeholder="Describe the ingredient and list any allergens"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            ></textarea>
            <div className="mt-1 flex items-center text-xs text-amber-600">
              <AlertCircle className="h-3 w-3 mr-1" />
              <span>Important: Always include allergen information</span>
            </div>
          </div>
        </div>

        {/*category input (dropdown)*/}
        <div className="space-y-1">
          <label htmlFor="ingredient-category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="ingredient-category"
            name="category"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Select category</option>
            <option value="Pizza Ingredient">Pizza Ingredient</option>
            <option value="Salad Ingredient">Salad Ingredient</option>
            <option value="Drink Ingredient">Drink Ingredient</option>
          </select>
        </div>

        {/*submit button*/}
        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Add Ingredient
          </button>
        </div>
      </form>
    </div>
  )
}
