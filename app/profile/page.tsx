// app/Profile.tsx
import { getCustomerProfile } from '../actions/getProfileData';

export default async function Profile() {
  const { customer, userId, error } = await getCustomerProfile();

  if (!customer) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">You're signed in as a guest!</h1>
      </div>
        );
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My profile</h1>

      <div className="space-y-4">
        <div 
          key={userId} 
          className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="grid grid-cols-5 gap-4 items-center">
            <div className="col-span-2">
              <h2 className="text-lg font-semibold">{customer.last_name}</h2>
              <p className="text-sm text-gray-600">{customer.first_name}</p>
            </div>
            <div>
              <p className="font-medium">Phone: {customer.phone_number}</p>
              <p className="font-medium">Address: {customer.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
