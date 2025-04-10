import { addIngredient } from '../actions/addIngredient'

export function AddIngredientForm() {
  return (
    <div className="mb-8 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Add New Ingredient</h2>
      <form action={addIngredient} className="flex:1 flex-wrap gap-2">
        <input
          type="text"
          name="name"
          placeholder="Ingredient name"
          required
          className="flex-1 basis-[calc(50%-0.5rem)] min-w-[250px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="description"
          placeholder="Allergens"
          className="flex-1 basis-[calc(50%-0.5rem)] min-w-[250px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="price"
          placeholder="Ingredient price"
          required
          className="flex-1 basis-[calc(50%-0.5rem)] min-w-[250px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="category"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select category</option>
          <option value="Pizza Ingredient">Pizza Ingredient</option>
          <option value="Salad Ingredient">Salad Ingredient</option>
        </select>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add Ingredient
        </button>
      </form>
    </div>
  );
}
