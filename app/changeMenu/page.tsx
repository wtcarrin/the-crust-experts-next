  import { createClient } from '@/utils/supabase/server';
  import { revalidatePath, revalidateTag } from 'next/cache';
  import { Trash2 } from 'lucide-react';

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
      
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const price = formData.get('price')
      const category = formData.get('category')
      const customizable = formData.get('customizable')
      const supabase = await createClient();
      
      const { error } = await supabase
        .from('menu items')
        .insert([{ 
          name : name,
          description : description,
          price : price,
          category : category,
          customizable : customizable
      }])
        .select();
      
      if (error) {
        console.error('Error adding menu item:', error);
        throw error
      }
      
      revalidateTag('menu_items')    
    }

    async function handleDeleteMenuItem(menuItemId : number) {
      'use server';

      const supabase = await createClient();
      const { error } = await supabase
        .from('menu items')
        .delete()
        .eq('menu_item_id', menuItemId)
      
      if (error) {
        console.error('Error deleting menu item: ', error);
        throw error;
      }

      revalidateTag('menu_items');
    }

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Menu - Admin view</h1>

        {/* Add Product Form */}
        <div className="mb-8 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Add New Menu Item</h2>
          <form action={handleAddMenuItem} className="flex flex-wrap gap-2">
              <input
              type="text"
              name="name"
              placeholder="Item name"
              required
              className="flex-1 basis-[calc(50%-0.5rem)] min-w-[250px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
              type="text"
              name="description"
              placeholder="Item description"
              className="flex-1 basis-[calc(50%-0.5rem)] min-w-[250px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
              type="text"
              name="price"
              placeholder="Item price"
              required
              className="flex-1 basis-[calc(50%-0.5rem)] min-w-[250px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
              type="text"
              name="category"
              placeholder="Item category"
              className="flex-1 basis-[calc(50%-0.5rem)] min-w-[250px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
              type="text"
              name="customizable"
              placeholder="Item customizable?"
              required
              className="flex-1 basis-[calc(50%-0.5rem)] min-w-[250px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
              Add Menu Item
              </button>
          </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems?.map((menuItem) => (
          <div key={menuItem.menu_item_id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative">
            {/* Delete button */}
            <form action={async () => {
              'use server';
              await handleDeleteMenuItem(menuItem.menu_item_id);
            }}>
              <button 
                type="submit"
                className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                aria-label="Delete menu item"
              >
                <Trash2 size={18} />
              </button>
            </form>
            
            <h2 className="text-lg font-semibold pr-6">{menuItem.name}</h2>
            <p className="text-sm text-gray-600">ID: {menuItem.menu_item_id}</p>
            <p className="text-sm text-gray-600">Description: {menuItem.description}</p>
            <p className="text-sm text-gray-600">Price: {menuItem.price}</p>
            <p className="text-sm text-gray-600">Category: {menuItem.category}</p>
            <p className="text-sm text-gray-600">
              Customizable: {menuItem.customizable ? 'Yes' : 'No'}
            </p>
          </div>
        ))}
      </div>
      </div>
    );
  }