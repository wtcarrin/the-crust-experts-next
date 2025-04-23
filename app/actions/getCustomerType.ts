import { createClient } from '@/utils/supabase/server';
//function to determine the type of the customer (column user_type)
export async function getCustomerType() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }


  const { data: customer, error } = await supabase
    .from("customers")
    .select("first_name, last_name, phone_number, address, user_type")
    .eq("id", authData.user.id)
    .single();
  //customer.user_type is returned on customer object
  return { customer, userId: authData.user.id, error: null };
}
