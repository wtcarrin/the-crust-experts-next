import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';

export async function addIngredient(formData: FormData) {
      'use server';
      
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const price = formData.get('price')
      const category = formData.get('category') as string;
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
        console.error('Error adding ingredient:', error);
        throw error
      }
      
      revalidateTag('menu_items')    
    }