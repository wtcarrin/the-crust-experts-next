import { createClient } from '@/utils/supabase/server';

export async function addItemToCart(itemId : any) {
  const supabase = await createClient();

  // Check authentication
  const { data: authData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }

  // Get current cart
  let { data: customer_cart, error: getCartError } = await supabase
    .from('orders')
    .select("order_contents")
    .eq("order_owner_id", authData.user.id)
    .single();

  if (getCartError) {
    return { error: getCartError.message, customer: null };
  }

  var updatedCartContents;
  if (customer_cart == null || customer_cart.order_contents == null) {
    updatedCartContents = [itemId];
  } else {
    updatedCartContents = JSON.parse(customer_cart.order_contents); 
    updatedCartContents.push(itemId);
  }

  updatedCartContents = JSON.stringify(updatedCartContents);
  
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

  return { error: null, customer: data };
}