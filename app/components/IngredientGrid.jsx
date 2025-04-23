import { Trash2 } from 'lucide-react'
import { deleteMenuItem } from '../actions/deleteMenuItem'
import { getAllIngredients } from '../actions/getAllIngredients';
//component for the admin page changeMenu to display all ingredients currently
//in the database and allow the admin to delete them
export async function IngredientGrid() {
    const ingredients = await getAllIngredients()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/*map each ingredient*/}
      {ingredients?.map((ingredients) => (
        <div
          key={ingredients.menu_item_id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md relative"
        >
          {/*form using the trash icon as submit button to delete the ingredient*/}
          <form
            action={async () => {
              'use server'
              await deleteMenuItem(ingredients.menu_item_id)
            }}
          >
            <button
              type="submit"
              className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </form>
          {/*ingredient info*/}
          <h2 className="text-lg font-semibold pr-6">{ingredients.name}</h2>
          <p className="text-sm text-gray-600">ID: {ingredients.menu_item_id}</p>
          <p className="text-sm text-gray-600">Description: {ingredients.description}</p>
          <p className="text-sm text-gray-600">Price: {ingredients.price}</p>
          <p className="text-sm text-gray-600">Category: {ingredients.category}</p>
        </div>
      ))}
    </div>
  )
}
