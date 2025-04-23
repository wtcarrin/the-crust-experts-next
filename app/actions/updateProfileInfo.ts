"use server";
import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
//function to update the user's profile info
export async function updateProfileInfo(first_name : string, last_name : string, phone_number : string, address : string) {
  const supabase = await createClient();

  //get the signed in user information
  const { data: authData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }


  //update the user table (where id == authData.user.id) with the data passed as arguments
  await supabase
    .from("customers")
    .update({first_name: first_name, last_name: last_name, phone_number: phone_number, address: address})
    .eq("id", authData.user.id)
    .single();
    
  revalidateTag('menu_items');
}