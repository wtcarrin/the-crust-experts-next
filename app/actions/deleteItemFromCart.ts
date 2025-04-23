'use server'
import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
//function to allow the customer to remove an item from their cart
export async function deleteItemFromCart(itemNonce : number) {
  const supabase = await createClient();

  //check authentication
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }
  
  //get current cart
  let { data: customer_cart, error: getCartError } = await supabase
    .from('orders')
    .select("order_contents")
    .eq("order_owner_id", authData.user.id)
    .eq("order_status", "IN_PROGRESS")
    .single();

  if (getCartError) {
    return { error: getCartError.message, customer: null };
  }

  //initialize variable to hold new cart
  var updatedCartContents;
  if (customer_cart == null || customer_cart.order_contents == null) {
    updatedCartContents = [];
  } else {
    var cartcontents = JSON.parse(customer_cart.order_contents); 
    //remove item based on nonce value
    updatedCartContents = cartcontents.filter((member: { nonce: number }) => member.nonce !== itemNonce);
  }

  updatedCartContents = JSON.stringify(updatedCartContents);

  //update the customer's order row in the database
  const { data, error } = await supabase
    .from('orders')
    .update({ 
      order_contents: updatedCartContents
    })
    .eq('order_owner_id', authData.user.id)
    .select();

  if (error) {
    console.error('Supabase error:', error);
    return { error: error.message, customer: null };
  }  
  revalidateTag('menu_items')  
}