import { createClient } from "@/utils/supabase/server";
//function to allow client to get all menu items
export async function getAllMenuItems() {
  const supabase = await createClient();
  
  //select menu items in categories pizza, salad, side, drink
  const { data, error } = await supabase
    .from("menu items")
    .select("*")
    .in("category", ["Pizza", "Salad", "Side", "Drink"]);

  if (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }

  return data;
}
