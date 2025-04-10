import { getAllMenuItems } from '../actions/getAllMenuItems';
import { deleteItemFromCart } from '../actions/deleteItemFromCart';
import { getPaidOrder } from '../actions/getPaidOrder';
import { getPaidCartSubtotal } from '../actions/getPaidCartSubtotal';

export default async function ViewSingleOrder({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const { p } = await searchParams;

  if (!p) {
    return <div>No id provided . . . </div>
  }

  const parsedP = parseInt(p, 10);

  const menuItems = await getAllMenuItems();
  const { order, orderInfo, userId, error } = await getPaidOrder(parsedP);
  const subtotal = await getPaidCartSubtotal(parsedP);

  if (!Array.isArray(order)) {
    return <div>Error: Order data is not available or is not an array.</div>;
  }
  return (
    <div className="p-6">
      <h1>{JSON.stringify(orderInfo)}</h1>
      <h1>ORDER_STATUS: {orderInfo.order_status}</h1>
      {order.map((orderItem) => {
          var itemId = orderItem.itemId;
          var itemNonce = orderItem.nonce;
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
              <h1>{JSON.stringify(menuItem)}</h1>
              <h1>SUBTOTAL: {subtotal}</h1>
            </div>
          );
        })}
    </div>
  );
}
