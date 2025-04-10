import { createClient } from '@/utils/supabase/server';

export async function getPaidCustomerCart(order_id: number) {
    
  console.log("Order ID: ", order_id)
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return { cart: [], userId: null, error: 'User not authenticated' };
  }

  let { data: cart, error } = await supabase
  .from("orders")
  .select("order_contents")
  .eq("order_owner_id", authData.user.id)
    .eq("order_id", order_id)
  .eq("order_status", "PAID")
  .single();

  if (error || !cart) {
    console.log(error)
    return { cart: [], userId: authData.user.id, error: 'Error fetching customer data' };
  }
  let cartContents;
  try {
    cartContents = JSON.parse(cart.order_contents);
    if (!Array.isArray(cartContents)) {
      cartContents = [];
    }
  } catch (err) {
    cartContents = [];
  }

  return { 
    cart: cartContents,
    userId: authData.user.id, 
    error: null 
  };
}
