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

  // function to handle form submission
async function handleAddOrder(formData: FormData) {
'use server';

const totalAmount = formData.get('total_amount') as string;
const deliveryAddress = formData.get('delivery_address') as string;
const supabase = await createClient();

const { data, error } = await supabase
    .from('orders')
    .insert([{ 
    total_amount : totalAmount,
    status : "PENDING PAYMENT",
    delivery_address : deliveryAddress,
    order_date : new Date(),
    delivery_time : new Date()
}])
    .select();

if (error) {
    console.error('Error adding order:', error);
    throw error;
}

const newOrderId = data?.[0]?.order_id;

if (!newOrderId) {
    throw new Error('Failed to get the new order ID');
}

redirect(`/viewSingleOrder?q=${newOrderId}`);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Just functionality, not a page in PRD</h1>
      <h4>All orders:</h4>
      
      {/* Add Product Form */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Add New Order</h2>
        <form action={handleAddOrder} className="flex gap-2">
          <input
            type="text"
            name="total_amount"
            placeholder="Order total"
            required
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="delivery_address"
            placeholder="Customer address"
            required
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Add Order
          </button>
        </form>
      </div>
    </div>
  );
}