import { createClient } from "@/utils/supabase/server";

export async function getAllIngredientsNoSizes() {

  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("menu items")
    .select("*")
    .in("category", ["Pizza Ingredient", "Salad Ingredient"]);

  return data;
}