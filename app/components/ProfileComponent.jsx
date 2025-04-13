'use client'

import { useState } from "react";

export function ProfileComponent({customer, updateProfileInfo}) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    if(customer) {
        const first_name = customer.first_name
        const last_name = customer.last_name
        const phone_number = customer.phone_number
        const address = customer.address
    }
    

    async function handleUpdatedInfo(formData) {
        if(formData.get('first_name') != first_name || formData.get('last_name') != last_name || formData.get('phone_number') != phone_number || formData.get('address') != address){
            await updateProfileInfo(formData.get('first_name'), formData.get('last_name'), formData.get('phone_number'), formData.get('address'))
            setIsPopupOpen(false)
        }
        
    }
    if (!customer) {
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">You're signed in as a guest!</h1>
          </div>
            );
      }
    
      if (isPopupOpen) {
        return (
            <div className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <button 
                onClick={() => {
                    setIsPopupOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
                type="button"
                >
                ✕
                </button>
                <form action={handleUpdatedInfo} className="space-y-4">
                    <div className="space-y-4">
                        <input
                        type="text"
                        name="first_name"
                        defaultValue={customer.first_name}
                        required
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                        type="text"
                        name="last_name"
                        defaultValue={customer.last_name}
                        required
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                        type="text"
                        name="phone_number"
                        defaultValue={customer.phone_number}
                        required
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                        type="text"
                        name="address"
                        defaultValue={customer.address}
                        required
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>
            
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mt-6"
                    >
                        Save
                    </button>
                    </form>
            </div>
        );
    }
    else {
        return (
            <div>
            <h1>{customer.first_name} {customer.last_name}</h1>
            <h1>Phone: {customer.phone_number}</h1>
            <h1>Address: {customer.address}</h1>
            <button onClick={() => setIsPopupOpen(true)} className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700" type="button">Edit profile</button>
          </div>
        );
    }
}
