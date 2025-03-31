'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {

  const supabase = await createClient();

  //get all data from the signup form
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    phone_number: formData.get('phone_number') as string,
    address: formData.get('address') as string,
  };

  //store email and password in supabase's dedicated auth table
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) {
    redirect('/error');
  }

  //store the rest of the data (metadata) in our customer data table
  if (authData.user) {
    const { error: insertError } = await supabase
      .from('customers')
      .insert([
        {
          id: authData.user.id,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          address: data.address,
        }
      ]);

    if (insertError) {
      redirect('/error');
    }
  }

  if (authData.user) {
    const { error: insertError } = await supabase
      .from('orders')
      .insert([
        {
          order_owner_id: authData.user.id,
          order_contents : null
        }
      ]);

    if (insertError) {
      redirect('/error');
    }
  }

  redirect('/');
}
