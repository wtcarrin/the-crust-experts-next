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

    revalidateTag('orders');
    redirect(`/viewSingleOrder?q=${newOrderId}`);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>
      <h4>The cart is updated in supabase when the customer adds anything to their cart. Here we'll get the customer's cart from the table and fill out their order, subtotal, tax. And a delivery address field that can have a logged-in customer's address as placeholder.</h4>
    </div>
  );
}