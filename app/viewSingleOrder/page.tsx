import { getAllMenuItems } from '../actions/getAllMenuItems';
import { deleteItemFromCart } from '../actions/deleteItemFromCart';
import { getPaidOrder } from '../actions/getPaidOrder';
import { getPaidCartSubtotal } from '../actions/getPaidCartSubtotal';

//this is the page the customer is directed to after they submit their order
//it shows them the details for the single order by the number in the url
export default async function ViewSingleOrder({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  //get order id from the url
  const { p } = await searchParams;

  if (!p) {
    return <div>No id provided . . . </div>
  }

  //read the id as a number
  const parsedP = parseInt(p, 10);

  //use actions to get more info about order
  const menuItems = await getAllMenuItems();
  const { order, orderInfo, userId, error } = await getPaidOrder(parsedP);
  const subtotal = await getPaidCartSubtotal(parsedP);

  {/*make sure the order is iterable for the map below*/}
  if (!Array.isArray(order)) {
    return <div>Error: Order data is not available or is not an array.</div>;
  }
  return (
    <div className="p-6">
      {/*display orderInfo params*/}
      <div key={orderInfo.order_id}>
        <p>Price: ${orderInfo.price}</p>
        <p>Placed by: {orderInfo.order_owner_id}</p>
        <p>STATUS: {orderInfo.order_status}</p>
        <p>Order # {orderInfo.order_id}</p>
        <p>Delivery Address: {orderInfo.order_delivery_address}</p>
        <p>Delivery Instructions: {orderInfo.order_delivery_instructions}</p>
      </div>
      {/*map each item in the order to its data in the databse*/}
      {order.map((orderItem) => {
          var itemId = orderItem.itemId;
          var itemNonce = orderItem.nonce;
          const menuItem = menuItems.find(item => item.menu_item_id === itemId);

          {/*if a menu item is here that's no longer in the database, remove it*/}
          if (!menuItem) {
            deleteItemFromCart(itemNonce);
            return;
          }

          return (
            <div 
              key={itemNonce}
              className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/*display the menuitem and subtotal for this item to the customer*/}
              <h1>{JSON.stringify(menuItem)}</h1>
              <h1>SUBTOTAL: {subtotal}</h1>
            </div>
          );
        })}
    </div>
  );
}
