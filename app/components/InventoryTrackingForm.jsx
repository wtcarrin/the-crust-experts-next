import { addIngredientStock } from '../actions/addIngredientStock';
//component to allow admin to control inventory numbers

export function InventoryTrackingForm(inventory) {
  //takes all ingredients as inventory
  //each ingredient has stock property

  //use the stock property to make two lists:
  //ingredients that are out of stock, ingredients that are in stock
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
        {/*form for adding stock to out of stock items*/}
        <form action={addIngredientStock} className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {/*map each out of stock item...*/}
              {outOfStock.map((ingredient) => (
                <div 
                  key={ingredient.menu_item_id} 
                  className="w-[200px] border p-3 rounded-lg hover:shadow-md transition-shadow flex flex-col"
                >
                  <h2 className="text-sm font-semibold mb-2">{ingredient.name}</h2>
                  {/*hidden form field so we can identify the ingredient in the formData after submission*/}
                  <input
                  type="hidden"
                  name="ingredient_id"
                  value={ingredient.menu_item_id}
                  />
                  {/*new quantity value input field, with up/down arrow*/}
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
          {/*submit button for restocking ingredients*/}
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
        {/*you can also update the stock on in-stock items with this form*/}
        <form action={addIngredientStock} className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {inStock.map((ingredient) => (
                <div 
                  key={ingredient.menu_item_id} 
                  className="w-[200px] border p-3 rounded-lg hover:shadow-md transition-shadow flex flex-col"
                >
                  <h2 className="text-sm font-semibold mb-2">{ingredient.name}</h2>
                  {/*again a hidden field so we can id the ingredient once the form is submitted*/}
                  <input
                  type="hidden"
                  name="ingredient_id"
                  value={ingredient.menu_item_id}
                  />
                  {/*stock quantity input with up/down arrows*/}
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

          {/*button for saving stock numbers of non-out-of-stock items*/}
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