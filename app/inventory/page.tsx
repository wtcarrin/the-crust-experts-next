import { createClient } from '@/utils/supabase/server';
import { InventoryTrackingForm } from "../components/InventoryTrackingForm"
import { AdminNav } from '../components/AdminNav'
import { getAllIngredients } from '../actions/getAllIngredients';

//admin page for tracking and updating inventory numbers
export default async function inventory() {
  const supabase = await createClient();
  
  const inventory = await getAllIngredients();
  return (
    <div className="flex flex-col gap-4">
      {/*admin-specific navbar*/}
      <AdminNav/>

      <div className="w-full">
        {/*component that provides a form for updating/viewing inventory numbers for all ingredients*/}
        <InventoryTrackingForm inventory={inventory} />
      </div>
    </div>
  )
}