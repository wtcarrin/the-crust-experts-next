"use server";
import { createClient } from '@/utils/supabase/server';
//function to allow a customer to add a menu item to their cart

export async function addItemToCart(itemId : any, ingredients? : any) {
  const supabase = await createClient();

  //check that the user is logged in (even as guest)
  const { data: authData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }
  //make sure menu item exists
  let { error: menuError } = await supabase
    .from('menu items')
    .select()
    .eq('menu_item_id', itemId)
  
  if (menuError) {
    console.error('Error adding menu item to cart: ', menuError);
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

  //initialize variable to store the new cart after the item is added
  var updatedCartContents;

  //initialize array of all ingredients on the selected item
  const ingredientIds = []
  if (ingredients) {
    for (const ingredient of ingredients) {
        //take each member of ingredients passed from client and push them to the array
        ingredientIds.push(ingredient as number);
    }
  }

  //use a nonce value to differentiate between cart items with the same menu item id value
  var nonce = Date.now()

  //create new menu item
  var itemWithNonce = {itemId, nonce, ingredientIds}

  if (customer_cart == null || customer_cart.order_contents == null) {
    //if the customer's cart is empty, just set it to be this new item
    updatedCartContents = [itemWithNonce];
  } else {
    //if the customer already has something in their cart, append the new item to the list
    updatedCartContents = JSON.parse(customer_cart.order_contents); 
    updatedCartContents.push(itemWithNonce);
  }

  updatedCartContents = JSON.stringify(updatedCartContents);
  
  //send updatedCartContents to the database 
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