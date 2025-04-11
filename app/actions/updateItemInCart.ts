"use server";
import { createClient } from '@/utils/supabase/server';

export async function updateItemInCart(orderItemNonce : any, ingredients : any) {
  const supabase = await createClient();

  // Check authentication
  const { data: authData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }

  // Get current cart
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

    for (var item of jsonCartContents) {
        if (item.nonce == orderItemNonce) {
        item.ingredientIds = ingredients;
        }
    }

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