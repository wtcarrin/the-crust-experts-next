"use server";
import { createClient } from '@/utils/supabase/server';
//function to take the currently authenticated customer's order and change its status to PAID
export async function submitCustomerOrder(orderId : number, subtotal : number, address : string, instructions : string) {
  const supabase = await createClient();

  //check user authenticated
  const { data: authData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }
  
  //search for existingOrder: where the user is the owner and the status is IN_PROGRESS
  const { data: existingOrder } = await supabase
    .from('orders')
    .select('*')
    .eq('order_owner_id', authData.user.id)
    .eq('order_status', 'IN_PROGRESS')
    .maybeSingle();

  //if existingOrder exists, update the order to PAID and create a new IN_PROGRESS order
  if (existingOrder) {
    console.log("Existing order: ", existingOrder)
    await supabase
      .from('orders')
      .update({ order_status: 'PAID' , price: subtotal, order_delivery_address : address, order_delivery_instructions : instructions})
      .eq('order_owner_id', authData.user.id)
      .eq('order_status', 'IN_PROGRESS');

    await supabase
      .from('orders')
      .insert([
        {
          order_owner_id: authData.user.id,
          order_contents: null,
          order_status: 'IN_PROGRESS',
        },
      ]);
    }
}