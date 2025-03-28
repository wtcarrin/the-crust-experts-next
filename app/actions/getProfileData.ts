// utils/profileData.ts
import { createClient } from '@/utils/supabase/server';

export async function getCustomerProfile() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }

  const { data: customer, error } = await supabase
    .from("customers")
    .select("first_name, last_name, phone_number, address")
    .eq("id", authData.user.id)
    .single();

  if (error || !customer) {
    return { error: 'Error fetching customer data', customer: null, userId: authData.user.id };
  }

  return { customer, userId: authData.user.id, error: null };
}
