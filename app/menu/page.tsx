import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';

export default async function MenuItems() {
  const supabase = await createClient();
  const { data: menuItems } = await supabase
    .from("menu items")
    .select()
    .then((res) => {
      return res;
    });

  // function to handle form submission
  async function handleAddMenuItem(formData: FormData) {
    'use server';
    
    const menuItemId = formData.get('menu_item_id')
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price')
    const category = formData.get('category')
    const customizable = formData.get('customizable')
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('menu items')
      .insert([{ 
        menu_item_id: menuItemId,
        name: name,
        description: description,
        price: price,
        category: category,
        customizable: customizable
      }])
      .select();
    
    if (error) {
      console.error('Error adding menu item:', error);
      throw error;
    }
    
    revalidateTag('menu_items');    
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Menu - Customer view</h1>
      <h4>Sort items by type, with a default list order that makes sense -- eentrees, sides, drinks...</h4>
      <h4>Also an add to cart button on each list element... not really sure about how to do the cart for now</h4>

      {/* Full-width table/list layout */}
      <div className="space-y-4">
        {menuItems?.map((menuItem) => (
          <div 
            key={menuItem.menu_item_id} 
            className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
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
              <button 
                className="p-2 rounded-full bg-white text-black border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Add to cart"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}