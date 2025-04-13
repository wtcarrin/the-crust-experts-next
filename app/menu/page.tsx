import { getAllMenuItems } from '../actions/getAllMenuItems';
import { getAllSizes } from '../actions/getAllSizes';
import { getAllIngredientsAndSizes } from '../actions/getAllIngredientsAndSizes';
import { MenuCategory } from '../components/menuCategory'

export default async function menu() {
  const menuItems = await getAllMenuItems();
  const ingredients = await getAllIngredientsAndSizes();
  var sizes = await getAllSizes();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-extrabold text-black text-center mb-2">
          Our Menu
        </h1>
        <p className="text-sm text-gray-600 text-center max-w-2xl">
          Customize your perfect pizza or choose from our menu!
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
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
      </div>
    </div>
  );
}
