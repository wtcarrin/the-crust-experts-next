import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';

export default async function MenuItems() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return <div className="p-6 text-red-600">Error: User not authenticated</div>;
  }

  // get the customer's row by uuid
  const { data: customer, error } = await supabase
    .from("customers")
    .select("first_name, last_name, phone_number, address")
    .eq("id", authData.user.id)
    .single();

  if (error || !customer) {
    return <div className="p-6 text-red-600">Error fetching customer data</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My profile</h1>

      <div className="space-y-4">
          <div 
            key={authData.user.id} 
            className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="col-span-2">
                <h2 className="text-lg font-semibold">{customer.last_name}</h2>
                <p className="text-sm text-gray-600">{customer.first_name}</p>
              </div>
              <div>
                <p className="font-medium">Phone: {customer.phone_number}</p>
                <p className="font-medium">Address: {customer.address}</p>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
}