"use server";
import { createClient } from '@/utils/supabase/server';

export async function addItemToCart(itemId : any, ingredients? : any) {
  const supabase = await createClient();

  // Check authentication
  const { data: authData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }
  // Make sure we don't accept invalid id:
  let { error: menuError } = await supabase
    .from('menu items')
    .select()
    .eq('menu_item_id', itemId)
  
  if (menuError) {
    console.error('Error deleting menu item: ', menuError);
    throw menuError;
  }

  // Get current cart
  let { data: customer_cart, error: getCartError } = await supabase
    .from('orders')
    .select("order_contents")
    .eq("order_owner_id", authData.user.id)
    .eq('order_status', 'IN_PROGRESS')
    .single();

  if (getCartError) {
    return { error: getCartError.message, customer: null };
  }

  var updatedCartContents;

  const ingredientIds = []
  if (ingredients) {
    for (const ingredient of ingredients) {
        ingredientIds.push(ingredient as number);
    }
  }
  console.log('ingredients', ingredients)
  console.log('ingredientIds', ingredientIds)

  var nonce = Date.now()
  var itemWithNonce = {itemId, nonce, ingredientIds}
  console.log('itemWithNonce', itemWithNonce)

  if (customer_cart == null || customer_cart.order_contents == null) {
    updatedCartContents = [itemWithNonce];
  } else {
    updatedCartContents = JSON.parse(customer_cart.order_contents); 
    updatedCartContents.push(itemWithNonce);
  }

  updatedCartContents = JSON.stringify(updatedCartContents);
  
  const { data, error } = await supabase
    .from('orders')
    .update({ 
      order_contents: updatedCartContents
    })
    .eq('order_owner_id', authData.user.id)
    .eq('order_status', 'IN_PROGRESS')
    .select();

  if (error) {
    console.error('Supabase error:', error);
    return { error: error.message, customer: null };
  }

  return { error: null, customer: data };
}