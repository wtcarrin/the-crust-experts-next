import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
//function to allow admin to remove an item from the menu
export async function deleteMenuItem(menuItemId : number) {
      'use server';

      const supabase = await createClient();

      //use menu item id from the client to remove the menu item from the database
      const { error } = await supabase
        .from('menu items')
        .delete()
        .eq('menu_item_id', menuItemId)
      
      if (error) {
        console.error('Error deleting menu item: ', error);
        throw error;
      }

      //refresh the menu items list on the client
      revalidateTag('menu_items');
    }