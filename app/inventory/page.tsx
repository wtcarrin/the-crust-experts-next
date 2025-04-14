import { createClient } from '@/utils/supabase/server';
import { InventoryTrackingForm } from "../components/InventoryTrackingForm"
import { AdminNav } from '../components/AdminNav'
import { getAllIngredients } from '../actions/getAllIngredients';

export default async function inventory() {
  const supabase = await createClient();
  
  const inventory = await getAllIngredients();
  return (
    <div className="flex flex-col gap-4">
      <AdminNav/>

      <div className="w-full">
        <InventoryTrackingForm inventory={inventory} />
      </div>
    </div>
  )
}