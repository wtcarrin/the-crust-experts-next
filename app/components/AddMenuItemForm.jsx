import { addMenuItem } from '../actions/addMenuItem'
import { getAllIngredients } from '../actions/getAllIngredients';

export async function AddMenuItemForm() {
  const ingredients = await getAllIngredients();
  
  return (
    <div className="mb-8 p-4 border rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-4">Add New Menu Item</h2>
      <form action={addMenuItem} className="space-y-4">
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
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="photo_url"
                id="photo_pizza"
                value="https://otrbpskhxvpdphfvxfgj.supabase.co/storage/v1/object/sign/menu-photos/defaultPizza.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtZW51LXBob3Rvcy9kZWZhdWx0UGl6emEuanBnIiwiaWF0IjoxNzQ0NDA2NzUwLCJleHAiOjE3NzU5NDI3NTB9._cIKp87orI5LjjFjAyTPtnyf55e3UGt7BBoKfVm9sAU"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
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
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
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
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="photo_drink" className="text-sm text-gray-700">
                Default Drink Image
              </label>
            </div>
          </div>
        </div>

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
          className=""
        >
          Add Menu Item
        </button>
      </form>
    </div>
  );
}