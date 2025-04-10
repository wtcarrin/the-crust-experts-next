import { getLiveCustomerCart } from '../actions/getLiveCustomerCart';
import { getLiveCartSubtotal } from '../actions/getLiveCartSubtotal';
import { getAllMenuItems } from '../actions/getAllMenuItems';
import { deleteItemFromCart } from '../actions/deleteItemFromCart';
import { createClient } from '@/utils/supabase/server';

import { CheckoutItemServerComponent } from '../components/CheckoutItemServerComponent'

import { SubmitOrderButton } from '../components/SubmitOrderButton'
import { Sub } from '@radix-ui/react-dropdown-menu';

export default async function Checkout() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return { error: 'User not authenticated', customer: null, userId: null };
  }

  const { data: existingOrder } = await supabase
    .from('orders')
    .select('*')
    .eq('order_owner_id', authData.user.id)
    .eq('order_status', 'IN_PROGRESS')
    .maybeSingle();

  const { cart, userId, error } = await getLiveCustomerCart();
  const menuItems = await getAllMenuItems();
  const subtotal = await getLiveCartSubtotal();

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  const JSONorderInfo = JSON.stringify(existingOrder)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout page</h1>
      <h2 className="text-xl font-semibold mt-6">Your order</h2>
      <h2>{JSONorderInfo}</h2>
        <div className="space-y-4">
        {cart.map((cartItem) => {
          var itemId = cartItem.itemId;
          var itemNonce = cartItem.nonce;
          const menuItem = menuItems.find(item => item.menu_item_id === itemId);

          if (!menuItem) {
            deleteItemFromCart(itemNonce);
            return;
          }

          return (
            <div 
              key={itemNonce}
              className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <CheckoutItemServerComponent menuItem={menuItem} cartItem={cartItem} />
            </div>
          );
        })}
          <h2 className="text-lg font-semibold">{subtotal}</h2>
          </div>
            <SubmitOrderButton orderId={existingOrder.order_id}/>
    </div>
  );
}
