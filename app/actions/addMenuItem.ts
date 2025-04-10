import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
import { getSumCostOfIngredients } from '../actions/getSumCostOfIngredients';
export async function addMenuItem(formData: FormData) {
      'use server';
      
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const price = await getSumCostOfIngredients(
        formData.getAll('ingredients').map(item => Number(item))
      );
      const category = formData.get('category')
      const customizable = formData.get('customizable')
      
      var selectedIngredients = formData
        .getAll('ingredients')
        .map(item => typeof item === 'string' ? Number(item) : NaN)
        .filter(num => !isNaN(num));

      const supabase = await createClient();

      if (customizable) {
        selectedIngredients = []
      }
      
      const { error } = await supabase
        .from('menu items')
        .insert([{ 
          name : name,
          description : description,
          price : price,
          category : category,
          customizable : customizable,
          ingredients : selectedIngredients
      }])
        .select();
      
      if (error) {
        console.error('Error adding menu item:', error);
        throw error
      }
      
      revalidateTag('menu_items')    
    }