import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';

export async function deleteMenuItem(menuItemId : number) {
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