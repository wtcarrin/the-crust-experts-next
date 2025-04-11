import { getLiveCustomerCart } from '../actions/getLiveCustomerCart';
import { getLiveCartSubtotal } from '../actions/getLiveCartSubtotal';
import { getAllMenuItems } from '../actions/getAllMenuItems';
import { deleteItemFromCart } from '../actions/deleteItemFromCart';
import { getAllIngredients } from '../actions/getAllIngredients';
import { getAllSizes } from '../actions/getAllSizes';

import { CartItem } from '../components/CartItem'
import Link from 'next/link';
import { getAllIngredientsAndSizes } from '../actions/getAllIngredientsAndSizes';

export default async function Cart() {
  const { cart, userId, error } = await getLiveCustomerCart();
  const menuItems = await getAllMenuItems();
  const subtotal = await getLiveCartSubtotal();
  const allIngredients = await getAllIngredientsAndSizes();
  var sizes = await getAllSizes();

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  const JSONcart = JSON.stringify(cart)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {/* Display Cart Items */}
      
      <h2 className="text-xl font-semibold mt-6">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
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
              {JSON.stringify(cartItem)}
              <CartItem menuItem={menuItem} cartItem={cartItem} allIngredients={allIngredients} sizes={sizes}/>
            </div>
          );
        })}
            {cart.length > 0 && (
            <div className="mt-6">
              <Link href={"/checkout"}>Proceed to Checkout</Link>
            </div>
            )}
          </div>
      )}
    </div>
  );
}
