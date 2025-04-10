'use server';
import { createClient } from '@/utils/supabase/server';

export async function getPaidOrder(order_id : number) {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();
  
    if (authError || !authData?.user) {
      return { cart: [], userId: null, error: 'User not authenticated' };
    }
  
    let { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("order_owner_id", authData.user.id)
    .eq("order_id", order_id)
    .eq("order_status", "PAID")
    .single();
    
    var cart = order;
    var orderInfo = order
    var cartContents = []
    
    try {
      cartContents = JSON.parse(cart.order_contents);
      if (!Array.isArray(cartContents)) {
        cartContents = [];
      }
    } catch (err) {
      console.log("Cart contents: " , cartContents)
      cartContents = [];
    }
  
    return { 
      order: cartContents,
      orderInfo: orderInfo,
      userId: authData.user.id, 
      error: null 
    };
  }
