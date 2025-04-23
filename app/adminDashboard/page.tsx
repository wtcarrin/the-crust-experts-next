import { createClient } from '@/utils/supabase/server';
import { AllOrdersWindow } from "../components/AllOrdersWindow"
import { AdminNav } from '../components/AdminNav';
import Link from 'next/link';
//the admin dashboard landing page
export default async function adminDashboard() {
  const supabase = await createClient();
  //fetch all paid orders from server
  //(do server functions at base level and pass them later to components)
  const { data: orders } = await supabase
    .from("orders")
    .select()
    .eq("order_status", "PAID")
    .then((res) => {
      return res;
    });

  return (
    <div className="flex flex-col gap-4">
      {/*navbar for within admin dashboard*/}
      <AdminNav/>

      <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">All Orders View:</h1>
        {/*pass the orders we got from supabase as argument to AllOrdersWindow component*/}
        <AllOrdersWindow orders={orders} />
      </div>
    </div>
  )
}