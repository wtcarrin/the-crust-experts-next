// app/Profile.tsx
import { getCustomerCart } from '../actions/getCustomerCart';

export default async function Profile() {
  const { cart, userId, error } = await getCustomerCart();

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My cart</h1>

      <div className="space-y-4">
        <div 
          key={userId} 
          className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="grid grid-cols-5 gap-4 items-center">
            <div className="col-span-2">
              <h2 className="text-lg font-semibold">{JSON.stringify(cart, null, 2)}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
