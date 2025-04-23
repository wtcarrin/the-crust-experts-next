import { getLiveCustomerCart } from '../actions/getLiveCustomerCart';
import { getLiveCartSubtotal } from '../actions/getLiveCartSubtotal';
import { getAllMenuItems } from '../actions/getAllMenuItems';
import { deleteItemFromCart } from '../actions/deleteItemFromCart';
import { getAllSizes } from '../actions/getAllSizes';
import { NewCartItem } from '../components/NewCartItem'
import Link from 'next/link';
import { getAllIngredientsNoSizes } from '../actions/getAllIngredientsNoSizes';
//cart page
export default async function Cart() {
  //lots of server functions to make sure we have the most accurate data when we load the page
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

      {/*if cart is empty, display your cart is empty*/}
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
        {/*or return cart contents*/}
        {cart.map(async (cartItem) => {
          var itemId = cartItem.itemId;
          var itemNonce = cartItem.nonce;

          {/*get sizes data (prices)*/}
          const smallSize = sizes?.find(ingredient => ingredient.name === "Small Size");
          const mediumSize = sizes?.find(ingredient => ingredient.name === "Medium Size");
          const largeSize = sizes?.find(ingredient => ingredient.name === "Large Size");
          {/*getSize function takes in an array of size ingredientIds and returns the cart items selected size 
            at the time the page is loaded*/}
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

          {/*find menuItem information*/}
          const menuItem = menuItems.find(item => item.menu_item_id === itemId);

          {/*if the customer has a menuitem in their cart that has been removed by and administrator,
            remove it from their cart*/}
          if (!menuItem) {
            deleteItemFromCart(itemNonce);
            return;
          }

          return (
            <div 
              key={itemNonce}>
                {/*pass information to NewCartItem so that we don't have to call the server for every item we render*/}
                {/*NewCartItem replaced CustomCartItem and NonCustomCartItem...*/}
              <NewCartItem menuItem={menuItem} sizes={sizes} cartItem={cartItem} ingredients={allIngredients} mySize={getSize(cartItem.ingredientIds)}/>
            </div>
          );
        })}
        {/*if cart isn't empty, show checkout button*/}
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
