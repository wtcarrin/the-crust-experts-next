import { createClient } from "@/utils/supabase/server";
//function to get all ingredients except for sizes
export async function getAllIngredientsNoSizes() {

  const supabase = await createClient();
  
  //select all ingredients, excluding sizes. sizes are ingredients because they have
  //a price and are parts of a pizza
  const { data, error } = await supabase
    .from("menu items")
    .select("*")
    .in("category", ["Pizza Ingredient", "Salad Ingredient"]);

  return data;
}