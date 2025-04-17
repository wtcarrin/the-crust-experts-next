import { createClient } from "@/utils/supabase/server";

export async function getAllSizes() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("menu items")
    .select("*")
    .like("name", "%Size%")
  return data;
}
