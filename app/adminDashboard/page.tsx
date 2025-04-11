import { createClient } from '@/utils/supabase/server';
import { AllOrdersWindow } from "../components/AllOrdersWindow"
import { AdminNav } from '../components/AdminNav';
import Link from 'next/link';

export default async function adminDashboard() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select()
    .eq("order_status", "PAID")
    .then((res) => {
      return res;
    });

  return (
    <div className="flex flex-col gap-4">
      <AdminNav/>

      <div className="w-full">
        <AllOrdersWindow orders={orders} />
      </div>
    </div>
  )
}