import { getLiveCustomerCart } from '../actions/getLiveCustomerCart';
import { getLiveCartSubtotal } from '../actions/getLiveCartSubtotal';
import { getAllMenuItems } from '../actions/getAllMenuItems';
import { deleteItemFromCart } from '../actions/deleteItemFromCart';
import { getAllIngredients } from '../actions/getAllIngredients';
import { getAllSizes } from '../actions/getAllSizes';
import { NewCartItem } from '../components/NewCartItem'

import { CartItem } from '../components/CartItem'
import Link from 'next/link';
import { getAllIngredientsNoSizes } from '../actions/getAllIngredientsNoSizes';
import { getSumCostOfIngredients } from '../actions/getSumCostOfIngredients';

export default async function Cart() {
  const { cart, userId, error } = await getLiveCustomerCart();
  const menuItems = await getAllMenuItems();
  const subtotal = await getLiveCartSubtotal();
  const allIngredients = await getAllIngredientsNoSizes();
  var sizes = await getAllSizes();

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {/* Display Cart Items */}
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
        
        {cart.map(async (cartItem) => {
          var itemId = cartItem.itemId;
          var itemNonce = cartItem.nonce;
          const smallSize = sizes?.find(ingredient => ingredient.name === "Small Size");
          const mediumSize = sizes?.find(ingredient => ingredient.name === "Medium Size");
          const largeSize = sizes?.find(ingredient => ingredient.name === "Large Size");
          const getSize = (ingredients: number[]) => {
            for (const ingredient of ingredients) {
              if (ingredient === smallSize?.menu_item_id) {
                console.log("My size: small")
                return "S";
              }
              else if (ingredient === mediumSize?.menu_item_id) {
                console.log("My size: medium")
                return "M";
              }
              else if (ingredient === largeSize?.menu_item_id) {
                console.log("My size: large")
                return "L";
              }
            }
            return "M";
          };
          const menuItem = menuItems.find(item => item.menu_item_id === itemId);

          if (!menuItem) {
            deleteItemFromCart(itemNonce);
            return;
          }

          return (
            <div 
              key={itemNonce}>
              <NewCartItem menuItem={menuItem} sizes={sizes} cartItem={cartItem} ingredients={allIngredients} mySize={getSize(cartItem.ingredientIds)}/>
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
