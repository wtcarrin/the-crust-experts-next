// app/Profile.tsx
import { getCustomerCart } from '../actions/getCustomerCart';
import { addItemToCart } from '../actions/addItemToCart';
import { getAllMenuItems } from '../actions/getAllMenuItems';
import { deleteItemFromCart } from '../actions/deleteItemFromCart';
import { Trash2 } from 'lucide-react';

export default async function Cart() {
  const { cart, userId, error } = await getCustomerCart();
  const menuItems = await getAllMenuItems();

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
            return <div key={itemNonce}>Cart item not found: {itemId} , {itemNonce}</div>;
          }

          return (
            <div 
              key={itemNonce}
              className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="col-span-2">
                  <h2 className="text-lg font-semibold">{menuItem.name}</h2>
                  <p className="text-sm text-gray-600">{menuItem.description}</p>
                </div>
                <div>
                  <p className="font-medium">${menuItem.price}</p>
                </div>
                <div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    {menuItem.category}
                  </span>
                </div>
                <div className="text-right">
                  {menuItem.customizable ? (
                    <span className="text-green-600">Customizable</span>
                  ) : (
                    <span className="text-gray-500">Standard</span>
                  )}
                </div>
                <div className="flex justify-end">
                  <form action={async () => {
                    'use server';
                    await deleteItemFromCart(itemNonce);
                  }}>
                    <button 
                      type="submit"
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Delete menu item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}

          </div>
      )}
    </div>
  );
}
