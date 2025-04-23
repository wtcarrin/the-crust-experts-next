import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
//add ingredient to database for use in making new menu items

export async function addIngredient(formData: FormData) {
  //take formdata from form as argument
      'use server';
      //parse ingredient data
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const price = formData.get('price')
      const category = formData.get('category') as string;
      const customizable = formData.get('customizable')

      const supabase = await createClient();
      
      //insert new row for ingredient
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
      //refresh relevant part of page, it should be noted I'm not sure what 'menu_items' does but it works
      revalidateTag('menu_items')    
    }