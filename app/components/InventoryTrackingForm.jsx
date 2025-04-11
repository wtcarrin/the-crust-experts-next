import { addMenuItem } from '../actions/addMenuItem'
import { getAllIngredients } from '../actions/getAllIngredients';

export async function InventoryTrackingForm(inventory) {
  
  return (
    <div className="mb-8 p-4 border rounded-lg w-full">
      <h2>Inventory tracking: see current inventory with a form to add new stock</h2>
    </div>
  );
}