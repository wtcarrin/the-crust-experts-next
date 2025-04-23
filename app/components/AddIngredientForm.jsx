import { addIngredient } from '../actions/addIngredient'
//component for the form for adding an ingredient to the database
export function AddIngredientForm() {
  return (
    <div className="mb-8 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Add New Ingredient</h2>
      {/*flex container for aligning the input fields*/}
      <form action={addIngredient} className="flex:1 flex-wrap gap-2">
        {/*input fields for the formData submitted to actions/addIngredient*/}

        {/*name input*/}
        <input
          type="text"
          name="name"
          placeholder="Ingredient name"
          required
          className="flex-1 basis-[calc(50%-0.5rem)] min-w-[250px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/*allergen input*/}
        <input
          type="text"
          name="description"
          placeholder="Allergens"
          className="flex-1 basis-[calc(50%-0.5rem)] min-w-[250px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/*price input*/}
        <input
          type="text"
          name="price"
          placeholder="Ingredient price"
          required
          className="flex-1 basis-[calc(50%-0.5rem)] min-w-[250px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/*category input (dropdown)*/}
        <select
          name="category"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select category</option>
          <option value="Pizza Ingredient">Pizza Ingredient</option>
          <option value="Salad Ingredient">Salad Ingredient</option>
          <option value="Drink Ingredient">Drink Size</option>
        </select>
        {/*submit button*/}
        <button
          type="submit"
          className=""
        >
          Add Ingredient
        </button>
      </form>
    </div>
  );
}
