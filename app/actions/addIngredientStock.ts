'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
import { getSumCostOfIngredients } from './getSumCostOfIngredients';
export async function addIngredientStock(formData: FormData) {

      const supabase = await createClient();

      const ingredientIds = formData.getAll('ingredient_id') as string[];
      const stockQuantities = formData.getAll('stock_quantity') as string[];
      
      for (let i = 0; i < ingredientIds.length; i++) {
        const id = Number(ingredientIds[i]);
        const newstock = Number(stockQuantities[i]);

        if (newstock > 0) {
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