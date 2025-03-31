import { createClient } from '@/utils/supabase/server';

export async function getCustomerCart() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return { cart: [], userId: null, error: 'User not authenticated' };
  }

  const { data: cart, error } = await supabase
    .from("orders")
    .select("order_contents")
    .eq("order_owner_id", authData.user.id)
    .single();

  if (error || !cart) {
    return { cart: [], userId: authData.user.id, error: 'Error fetching customer data' };
  }
  // Ensure cart_contents is always returned as an array
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
