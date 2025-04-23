import { createClient } from "@/utils/supabase/server";
//function to return all sizes
//this function will return sizes for pizzas, drinks, sides, and salads
export async function getAllSizes() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("menu items")
    .select("*")
    .like("name", "%Size%")
  return data;
}
