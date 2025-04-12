import { getAllMenuItems } from '../actions/getAllMenuItems';
import { getAllSizes } from '../actions/getAllSizes';
import { getAllIngredientsAndSizes } from '../actions/getAllIngredientsAndSizes';
import { MenuCategory } from '../components/menuCategory'

export default async function menu() {
  const menuItems = await getAllMenuItems();
  const ingredients = await getAllIngredientsAndSizes();
  var sizes = await getAllSizes();
  return (
    <div className="p-6">
      <div className="space-y-4">
      <h1 className="text-4xl font-extrabold text-black text-center">Our Menu</h1>
      <p className="text-sm text-gray-600 text-center mb-6">Customize your perfect pizza or choose from our menu!</p>
        <MenuCategory menuItems={menuItems} ingredients={ingredients} sizes={sizes} category={"Pizza"}/>
        <MenuCategory menuItems={menuItems} ingredients={ingredients} sizes={sizes} category={"Salad"}/>
      </div>
    </div>
  );
}
