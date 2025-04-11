
export function AllOrdersWindow({orders}) {
    return (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">All Orders View:</h1>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders?.map((order) => (
              <div key={order.order_id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <p>Price: ${order.price}</p>
                <p>Placed by: {order.order_owner_id}</p>
                <p>STATUS: {order.order_status}</p>
                <p>Order # {order.order_id}</p>
              </div>
            ))}
          </div>
        </div>
    );
};