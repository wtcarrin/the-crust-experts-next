import { createClient } from '@/utils/supabase/server';
//helper function to get the logged-in customer's cart from the database
export async function getLiveCustomerCart() {
  const supabase = await createClient();

  //make sure the user is authenticated (can be anonymous)
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return { cart: [], userId: null, error: 'User not authenticated' };
  }

  //fetch current cart contents
  let { data: cart, error } = await supabase
  .from("orders")
  .select("order_contents")
  .eq("order_owner_id", authData.user.id)
  .eq("order_status", "IN_PROGRESS")
  .single();


  if (error || !cart) {
    console.log(error)
    return { cart: [], userId: authData.user.id, error: 'Error fetching customer data' };
  }

  let cartContents;
  try {
    cartContents = JSON.parse(cart.order_contents);
    //handle non-array cartContents (once parsed)
    if (!Array.isArray(cartContents)) {
      cartContents = [];
    }
  } catch (err) {
    cartContents = [];
  }

  //return cart contents
  return { 
    cart: cartContents,
    userId: authData.user.id, 
    error: null 
  };
}
