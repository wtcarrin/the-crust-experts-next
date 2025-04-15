import { getAllMenuItems } from '../actions/getAllMenuItems';
import { getAllSizes } from '../actions/getAllSizes';
import { getAllIngredientsAndSizes } from '../actions/getAllIngredientsAndSizes';
import { MenuCategory } from '../components/menuCategory'

export default async function menu() {
  const menuItems = await getAllMenuItems();
  const ingredients = await getAllIngredientsAndSizes();
  var sizes = await getAllSizes();
  
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-black mb-2">
          Our Menu
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Customize your perfect pizza or choose from our menu!
        </p>
      </div>

      <MenuCategory 
        menuItems={menuItems} 
        ingredients={ingredients} 
        sizes={sizes} 
        category={"Pizza"} 
      />

      <MenuCategory 
        menuItems={menuItems} 
        ingredients={ingredients} 
        sizes={sizes} 
        category={"Salad"} 
      />
      <MenuCategory 
        menuItems={menuItems} 
        ingredients={ingredients} 
        sizes={sizes} 
        category={"Drink"} 
      />
    </div>

  );
}
