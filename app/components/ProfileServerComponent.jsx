'use server'
import { getCustomerProfile } from '../actions/getProfileData'
import { updateProfileInfo } from '../actions/updateProfileInfo'
import { ProfileComponent } from '../components/ProfileComponent'
import { AllOrdersWindow } from './AllOrdersWindow'
import { createClient } from '@/utils/supabase/server';



export async function ProfileServerComponent() {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    //get my order history
    const { data: myOrders } = await supabase
    .from("orders")
    .select()
    .eq("order_status", "PAID")
    .eq("order_owner_id", authData.user.id)
    .then((res) => {
        return res;
    });

    const customer = await getCustomerProfile()
  if(!customer.customer) {
    return (
      <div>
    <ProfileComponent customer={customer.customer} updateProfileInfo={updateProfileInfo}/>
      </div>
    )
  }
  else {
    return (
      <div>
      <ProfileComponent customer={customer.customer} updateProfileInfo={updateProfileInfo}/>
      <h1 className="text-red-600 text-2xl font-bold mr-8">My Orders:</h1>
      <AllOrdersWindow orders={myOrders}/>
      </div>
    )
  }
  
}
