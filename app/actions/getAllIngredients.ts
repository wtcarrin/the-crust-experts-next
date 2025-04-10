import { createClient } from "@/utils/supabase/server";

export async function getAllIngredients() {
  const supabase = await createClient();
  
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
