import { createClient } from "@/utils/supabase/server";
//get all ingredients from the server
export async function getAllIngredients() {

  const supabase = await createClient();
  
  //get all ingredients, excluding sizes, which are stored like ingredients
  //because they have a price and are components of menu items, but shouldn't be 
  //returned as topping options
  const { data, error } = await supabase
    .from("menu items")
    .select("*")
    .in("category", ["Pizza Ingredient", "Salad Ingredient"])
    .not("name", "like", "%Size%")

  if (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }

  return data;
}
