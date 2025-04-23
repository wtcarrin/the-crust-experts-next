import { createClient } from "@/utils/supabase/server";
//function to get everything in the menu items table
//like getallingredients but we don't filter out sizes
export async function getAllIngredientsAndSizes() {

  const supabase = await createClient();
  
  //grab all menu items, including sizes
  const { data, error } = await supabase
    .from("menu items")
    .select("*")

  return data;
}