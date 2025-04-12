"use server";
import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';

export async function updateProfileInfo(first_name : string, last_name : string, phone_number : string, address : string) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }

  console.log("FIRST NAME: ", first_name)
  const updatedProfileInfo = {
    first_name,
    last_name,
    phone_number,
    address
  }

  const { data: customer, error } = await supabase
    .from("customers")
    .update({first_name: first_name, last_name: last_name, phone_number: phone_number, address: address})
    .eq("id", authData.user.id)
    .single();
    
  revalidateTag('menu_items');
}