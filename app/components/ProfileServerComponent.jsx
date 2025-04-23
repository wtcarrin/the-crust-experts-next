'use server'
import { getCustomerProfile } from '../actions/getProfileData'
import { updateProfileInfo } from '../actions/updateProfileInfo'
import { ProfileComponent } from '../components/ProfileComponent'
import { AllOrdersWindow } from './AllOrdersWindow'
import { createClient } from '@/utils/supabase/server';

//this component gets a user's profile order histroy information from the server
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
  
    {/*if no customer, the profileComponent will see that in the customer field and tell the user they're signed in anonymously*/}
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
        {/*if the customer is logged in, show them their personal data and use myOrders info to show them their order history*/}
      <ProfileComponent customer={customer.customer} updateProfileInfo={updateProfileInfo}/>
      <h1 className="text-red-600 text-2xl font-bold mr-8">My Orders:</h1>
      <AllOrdersWindow orders={myOrders}/>
      </div>
    )
  }
  
}
