import { createClient } from '@/utils/supabase/server';

export async function addItemToCart() {
  const supabase = await createClient();

  let { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }

  const userId = authData.user.id;

  // Get current cart
  let { data: current_cart, error: getCartError } = await supabase
    .from("customers")
    .select("cart_contents")
    .eq("id", userId)
    .single();

  if (getCartError) {
    return { error: getCartError.message, customer: null, userId };
  }

  // Append 'pizza' to the current cart contents
  const updatedCartContents = current_cart ? current_cart.cart_contents + ' pizza' : 'pizza'

  // Update the cart contents in the database
  const { data, error } = await supabase
    .from('customers')
    .update({
      cart_contents: updatedCartContents
    })
    .eq('id', userId)
    .select();

  if (error) {
    return { error: error.message, customer: null, userId };
  }

  return { data, userId };
}
