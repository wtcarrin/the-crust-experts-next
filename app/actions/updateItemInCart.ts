"use server";
import { createClient } from '@/utils/supabase/server';
//function for allowing the customer to update the selected ingredients on an item in their cart
export async function updateItemInCart(orderItemNonce : any, ingredients : any) {
  const supabase = await createClient();

  // Check authentication
  const { data: authData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }

  //get current cart contents
  let { data: currentCartContents, error: getCartError } = await supabase
    .from('orders')
    .select("order_contents")
    .eq("order_owner_id", authData.user.id)
    .eq('order_status', 'IN_PROGRESS')
    .single();

  if (getCartError) {
    return { error: getCartError.message, customer: null };
  }

  var jsonCartContents
  if (currentCartContents) {
    jsonCartContents   = JSON.parse(currentCartContents.order_contents);
    //search through the items in cart for the item with a matching nonce
    //once we've found the correct item, update its selected ingredients according 
    //to the list of ingredients passed as an argument
    for (var item of jsonCartContents) {
        if (item.nonce == orderItemNonce) {
        item.ingredientIds = ingredients;
        }
    }

    //update the order_contents of the user's current IN_PROGRESS order
    const { error: updateError } = await supabase
    .from('orders')
    .update({ order_contents: JSON.stringify(jsonCartContents) })
    .eq("order_owner_id", authData.user.id)
    .eq('order_status', 'IN_PROGRESS');

    if (updateError) {
        console.error('Error updating cart:', updateError);
        return { error: updateError.message, customer: null };
      }

  }

  
}