import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
import { getSumCostOfIngredients } from '../actions/getSumCostOfIngredients';
//function to allow admin to add a new menu item to the menu
export async function addMenuItem(formData: FormData) {
      'use server';
      //get data from the clientside form
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const price = await getSumCostOfIngredients(
        formData.getAll('ingredients').map(item => Number(item))
      );
      const category = formData.get('category')
      const customizable = formData.get('customizable')
      const photo_url = formData.get('photo_url')
      
      //including selected ingredients
      var selectedIngredients = formData
        .getAll('ingredients')
        .map(item => typeof item === 'string' ? Number(item) : NaN)
        .filter(num => !isNaN(num));

      const supabase = await createClient();

      //if the item is specified to be a build-your-own item, override any ingredients
      //the admin has selected
      if (customizable) {
        selectedIngredients = []
      }
      
      //push new menu item to a new row in the database
      const { error } = await supabase
        .from('menu items')
        .insert([{ 
          name : name,
          description : description,
          price : price,
          category : category,
          customizable : customizable,
          ingredients : selectedIngredients,
          photo_url : photo_url
      }])
        .select();
      
      if (error) {
        console.error('Error adding menu item:', error);
        throw error
      }
      
      //refresh relevant part of client, again i'm not sure about 'menu_items' here...
      revalidateTag('menu_items')    
    }