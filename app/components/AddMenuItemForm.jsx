import { addMenuItem } from '../actions/addMenuItem'
import { getAllIngredients } from '../actions/getAllIngredients';

export async function AddMenuItemForm() {
  const ingredients = await getAllIngredients();
  
  return (
    <div className="mb-8 p-4 border rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-4">Add New Menu Item</h2>
      <form action={addMenuItem} className="space-y-4">
        {/* Stacked form fields */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Item name"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            placeholder="Item description"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="category"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              <option value="Pizza">Pizza</option>
              <option value="Salad">Salad</option>
              <option value="Side">Side</option>
              <option value="Drink">Drink</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="customizable"
              id="customizable"
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              defaultChecked={false}
              value="1"
            />
            <label htmlFor="customizable" className="text-sm text-gray-700">
              Customizable
            </label>
          </div>
        </div>

        {/* Ingredients Section - Horizontal card layout */}
        <div className="mt-6">
          <h3 className="text-md font-medium mb-3">Select Ingredients:</h3>
          <div className="flex flex-wrap gap-3">
            {ingredients?.map((ingredient) => (
              <div key={ingredient.menu_item_id} className="flex-shrink-0 w-[200px] border p-3 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="ingredients"
                    value={ingredient.menu_item_id}
                    id={`ingredient-${ingredient.menu_item_id}`}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`ingredient-${ingredient.menu_item_id}`} className="ml-2 block">
                    <h2 className="text-sm font-semibold">{ingredient.name}</h2>
                    <p className="text-xs text-gray-600">ID: {ingredient.menu_item_id}</p>
                    <p className="text-xs text-gray-600">Desc: {ingredient.description}</p>
                    <p className="text-xs text-gray-600">Price: {ingredient.price}</p>
                    <p className="text-xs text-gray-600">Cat: {ingredient.category}</p>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mt-6"
        >
          Add Menu Item
        </button>
      </form>
    </div>
  );
}