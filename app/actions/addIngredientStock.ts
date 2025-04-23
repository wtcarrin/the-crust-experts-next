'use server'
//function to allow admin to update stock of ingredients 
import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
export async function addIngredientStock(formData: FormData) {

      const supabase = await createClient();

      //get ids of all ingredients in the form (all ingredients)
      const ingredientIds = formData.getAll('ingredient_id') as string[];
      //get stock_quantity from the form
      const stockQuantities = formData.getAll('stock_quantity') as string[];
      
      for (let i = 0; i < ingredientIds.length; i++) {
        //get values for current ingredient
        const id = Number(ingredientIds[i]);
        const newstock = Number(stockQuantities[i]);

        //make sure negative stocks won't exist
        if (newstock > -1) {
          console.log("NEWSTOCK: ", newstock, "\tID: -", id,"-")
          const { error } = await supabase
          .from('menu items')
          .update({ stock: newstock })
          .eq('menu_item_id', id);

          if (error) {
            console.log("ERROR: ", error)
          };
        }
      }
      revalidateTag('menu_items')    
    }