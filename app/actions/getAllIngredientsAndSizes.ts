import { createClient } from "@/utils/supabase/server";

export async function getAllIngredientsAndSizes() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("menu items")
    .select("*")
    .in("category", ["Pizza Ingredient", "Salad Ingredient"])

  if (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }

  return data;
}
