import { createClient } from '@/utils/supabase/server';

export async function getCustomerCart() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }

  const { data: cart, error } = await supabase
    .from("customers")
    .select("cart_contents")
    .eq("id", authData.user.id)
    .single();

  if (error || !cart) {
    return { error: 'Error fetching customer data', customer: null, userId: authData.user.id };
  }

  // Check if cart_contents is null
  if (cart.cart_contents === null) {
    return { error: 'Cart is empty', customer: null, userId: authData.user.id };
  }

  return { cart, userId: authData.user.id, error: null };
}
