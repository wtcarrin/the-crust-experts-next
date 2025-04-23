import { getAllMenuItems } from '../actions/getAllMenuItems';
import { getAllSizes } from '../actions/getAllSizes';
import { getAllIngredientsNoSizes } from '../actions/getAllIngredientsNoSizes';
import { MenuCategory } from '../components/menuCategory'

//menu page for displaying all menu categories to the user
export default async function menu() {
  const menuItems = await getAllMenuItems();
  const ingredients = await getAllIngredientsNoSizes();
  var sizes = await getAllSizes();
  
  return (
    <div className="mx-auto w-[80%] px-4 sm:px-6 lg:px-8 flex-wrap justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-black mb-2">
          Our Menu
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Customize your perfect pizza or choose from our menu!
        </p>
      </div>
      {/*display the menu categories one by one*/}

      {/*pizza category*/}
      <MenuCategory 
        menuItems={menuItems} 
        ingredients={ingredients} 
        sizes={sizes} 
        category={"Pizza"} 
      />

      {/*salad category*/}
      <MenuCategory 
        menuItems={menuItems} 
        ingredients={ingredients} 
        sizes={sizes} 
        category={"Salad"} 
      />

      {/*drink category*/}
      <MenuCategory 
        menuItems={menuItems} 
        ingredients={ingredients} 
        sizes={sizes} 
        category={"Drink"} 
      />
    </div>

  );
}
