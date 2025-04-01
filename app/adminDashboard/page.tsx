import { createClient } from '@/utils/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect  } from 'next/navigation';

export default async function Orders() {
  const supabase = await createClient();
  const { data: orders } = await supabase
  .from("orders")
  .select()
  .then((res) => {
    return res;
  });


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <h4>All orders:</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders?.map((order) => (
          <div key={order.order_id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold">{order.order_id}</h2>
            <p className="text-sm text-gray-600">order_date: {order.order_date}</p>
            <p className="text-sm text-gray-600">total_amount: {order.total_amount}</p>
            <p className="text-sm text-gray-600">status: {order.status}</p>
            <p className="text-sm text-gray-600">delivery_time: {order.delivery_time}</p>
            <p className="text-sm text-gray-600">delivery_address: {order.delivery_address}</p>
            <p className="text-sm text-gray-600">payment_status: {order.payment_status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}