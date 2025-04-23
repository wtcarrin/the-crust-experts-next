import { getAllMenuItems } from '../actions/getAllMenuItems';
import { getAllSizes } from '../actions/getAllSizes';
import { getAllIngredientsNoSizes } from '../actions/getAllIngredientsNoSizes';
import { MenuCategoryQuick } from '../components/menuCategoryQuick'
import Link from 'next/link';
//component to render the quick orders section of the homepage. 

export async function QuickOrders() {
  const menuItems = await getAllMenuItems();

  //manually filter the items we want to offer as quick orders on the homepage... not optimal
  var myMenuItems = menuItems.filter(item => item.name === 'Pepperoni Pizza' || item.name === 'Hawaiian Pizza' || item.name === 'Meat Lovers Pizza');
  const ingredients = await getAllIngredientsNoSizes();
  var sizes = await getAllSizes();
  
  return (
    <div className="mx-auto w-[80%] px-4 sm:px-6 lg:px-8 flex-wrap justify-center space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-black mb-2">
          Quick orders
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          Conveniently choose from our menu's greatest hits!
        </p>
      </div>

      {/*render the quick orders component with the selected menu items from above*/}
      <MenuCategoryQuick 
        menuItems={myMenuItems} 
        ingredients={ingredients} 
        sizes={sizes} 
        category={"Pizza"} 
      />
      
      <div className="text-center">
        {/*redirect customer to full menu*/}
        <span className="mr-2">Or...</span>
        <Link 
          href={"/home"}
          className="inline-block px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          See our Full Menu
        </Link>
      </div>
    </div>
  );
}