import { addMenuItem } from "../actions/addMenuItem"
import { getAllIngredients } from "../actions/getAllIngredients"
import { DollarSign } from "lucide-react"

//form for admin to add menu items to database
export async function AddMenuItemForm() {
  //get all ingredients for the admin to choose from when creating this item
  const ingredients = await getAllIngredients()

  return (
    <div className="w-full">
      {/*begin form for menu item info*/}
      <form action={addMenuItem} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/*name field*/}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Margherita Pizza"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/*price field*/}
          <div className="space-y-1">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Base Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                id="price"
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

        {/*description field*/}
        <div className="space-y-1">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="2"
            placeholder="Describe the menu item"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          ></textarea>
        </div>

        {/*category field (dropdown)*/}
        <div className="space-y-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Select category</option>
            <option value="Pizza">Pizza</option>
            <option value="Salad">Salad</option>
            <option value="Drink">Drink</option>
          </select>
        </div>

        {/*customizable field (checkbox)*/}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="customizable"
            id="customizable"
            className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
            defaultChecked={false}
            value="1"
          />
          <label htmlFor="customizable" className="text-sm text-gray-700">
            Customizable by customers
          </label>
        </div>

        {/*radio input for selecting product image*/}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="photo_url"
                id="photo_pizza"
                value="https://otrbpskhxvpdphfvxfgj.supabase.co/storage/v1/object/sign/menu-photos/defaultPizza.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtZW51LXBob3Rvcy9kZWZhdWx0UGl6emEuanBnIiwiaWF0IjoxNzQ0NDA2NzUwLCJleHAiOjE3NzU5NDI3NTB9._cIKp87orI5LjjFjAyTPtnyf55e3UGt7BBoKfVm9sAU"
                className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                defaultChecked
              />
              <label htmlFor="photo_pizza" className="text-sm text-gray-700">
                Default Pizza Image
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="photo_url"
                id="photo_salad"
                value="https://otrbpskhxvpdphfvxfgj.supabase.co/storage/v1/object/sign/menu-photos/defaultSalad.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtZW51LXBob3Rvcy9kZWZhdWx0U2FsYWQuanBnIiwiaWF0IjoxNzQ0NDA2NzM5LCJleHAiOjE3NzU5NDI3Mzl9.HUAkQKinhLvB71SbzWbg0DLy8MPwmWWnD-QRIMYso7M"
                className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <label htmlFor="photo_salad" className="text-sm text-gray-700">
                Default Salad Image
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="photo_url"
                id="photo_drink"
                value="https://otrbpskhxvpdphfvxfgj.supabase.co/storage/v1/object/sign/menu-photos/defaultSoda.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtZW51LXBob3Rvcy9kZWZhdWx0U29kYS5qcGciLCJpYXQiOjE3NDQ0MDY3MzMsImV4cCI6MTc3NTk0MjczM30.vMPdzrnNcxzR5OMq5-UMEOFAxyEMeIj9udnA8A8ZsTA"
                className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <label htmlFor="photo_drink" className="text-sm text-gray-700">
                Default Drink Image
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {/*display for selecting ingredients for this menu item*/}
          <div className="space-y-1 mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Ingredients</label>
            <p className="text-sm text-gray-500">Choose the ingredients that make up this menu item</p>
          </div>

          <div className="border border-gray-200 rounded-md p-4 max-h-[400px] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/*map each ingredient to a checkbox*/}
              {ingredients?.map((ingredient) => (
                <div key={ingredient.menu_item_id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="ingredients"
                      value={ingredient.menu_item_id}
                      id={`ingredient-${ingredient.menu_item_id}`}
                      className="mt-1 h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label htmlFor={`ingredient-${ingredient.menu_item_id}`} className="ml-2 block">
                      <h2 className="text-sm font-semibold">{ingredient.name}</h2>
                      <p className="text-xs text-gray-600">${ingredient.price?.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 truncate">{ingredient.description}</p>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*submit button*/}
        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Add Menu Item
          </button>
        </div>
      </form>
    </div>
  )
}
