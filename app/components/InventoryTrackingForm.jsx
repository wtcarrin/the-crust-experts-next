import { addIngredientStock } from '../actions/addIngredientStock';
import { getAllIngredients } from '../actions/getAllIngredients';

export function InventoryTrackingForm(inventory) {
  const inventoryItems = inventory.inventory || [];
  var outOfStock = []
  var inStock = []
  for (const ingredient of inventoryItems) {
    if (ingredient.stock < 1 || ingredient.stock === null) {
      outOfStock.push(ingredient);
    } else {
      inStock.push(ingredient);
    }
  }

  return (
    <div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">OUT OF STOCK ITEMS</h1>
        <form action={addIngredientStock} className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {outOfStock.map((ingredient) => (
                <div 
                  key={ingredient.menu_item_id} 
                  className="w-[200px] border p-3 rounded-lg hover:shadow-md transition-shadow flex flex-col"
                >
                  <h2 className="text-sm font-semibold mb-2">{ingredient.name}</h2>
                  <input
                  type="hidden"
                  name="ingredient_id"
                  value={ingredient.menu_item_id}
                  />
                  <input
                    type="number"
                    name="stock_quantity"
                    defaultValue={ingredient.stock || 0}
                    min="0"
                    required
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
              ))}
            </div>

          <button
            type="submit"
            className="font-bold bg-red-600 hover:bg-red-700 text-white rounded px-2 py-2"
          >
            RESTOCK
          </button>
        </form>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">IN-STOCK ITEMS</h1>
        <form action={addIngredientStock} className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {inStock.map((ingredient) => (
                <div 
                  key={ingredient.menu_item_id} 
                  className="w-[200px] border p-3 rounded-lg hover:shadow-md transition-shadow flex flex-col"
                >
                  <h2 className="text-sm font-semibold mb-2">{ingredient.name}</h2>
                  <input
                  type="hidden"
                  name="ingredient_id"
                  value={ingredient.menu_item_id}
                  />
                  <input
                    type="number"
                    name="stock_quantity"
                    defaultValue={ingredient.stock || 0}
                    min="0"
                    required
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
              ))}
            </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-2"
          >
            Update In-Stock Items
          </button>
        </form>
      </div>
    </div>
  );
}