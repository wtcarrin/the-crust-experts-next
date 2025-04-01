import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
import { getAllMenuItems } from '../actions/getAllMenuItems';
import { addItemToCart } from '../actions/addItemToCart';

export default async function menu() {
  const menuItems = await getAllMenuItems()
  
return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Menu - Customer view</h1>

      {/* Full-width table/list layout */}
      <div className="space-y-4">
        {menuItems?.map((menuItem) => (
          <div 
            key={menuItem.menu_item_id} 
            className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <form action={async () => {
              'use server';
              await addItemToCart(menuItem.menu_item_id);
            }}>
              <button 
                type="submit"
                aria-label="Add to cart"
              >
                <p>Add to Cart</p>
              </button>
            </form>
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="col-span-2">
                <h2 className="text-lg font-semibold">{menuItem.name}</h2>
                <p className="text-sm text-gray-600">{menuItem.description}</p>
              </div>
              <div>
                <p className="font-medium">${menuItem.price}</p>
              </div>
              <div>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {menuItem.category}
                </span>
              </div>
              <div className="text-right">
                {menuItem.customizable ? (
                  <span className="text-green-600">Customizable</span>
                ) : (
                  <span className="text-gray-500">Standard</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}