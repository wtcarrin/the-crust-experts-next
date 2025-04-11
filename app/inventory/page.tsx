import { createClient } from '@/utils/supabase/server';
import { InventoryTrackingForm } from "../components/InventoryTrackingForm"
import { AdminNav } from '../components/AdminNav'

export default async function inventory() {
  const supabase = await createClient();
  
  const { data : inventory } = await supabase
    .from("menu items")
    .select("*")
    .ilike("name", "%Ingredient%")

  return (
    <div className="flex flex-col gap-4">
      <AdminNav/>

      <div className="w-full">
        <InventoryTrackingForm inventory = {inventory} />
      </div>
    </div>
  )
}