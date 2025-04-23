'use client'

import { useState } from "react";
//component to allow the customer to view and change their personal information used to complete orders

export function ProfileComponent({customer, updateProfileInfo}) {
    //usestate to control edit information window appearing
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    //use the submitted formdata to update the customer's info in the database
    async function handleUpdatedInfo(formData) {
        if(formData.get('first_name') != first_name || formData.get('last_name') != last_name || formData.get('phone_number') != phone_number || formData.get('address') != address){
            await updateProfileInfo(formData.get('first_name'), formData.get('last_name'), formData.get('phone_number'), formData.get('address'))
            setIsPopupOpen(false)
        }
        
    }

    //if we don't get a customer (user does not have any data) we know they're authenticated anonymously
    if (!customer) {
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">You're signed in as a guest!</h1>
          </div>
            );
      }
    
      if (isPopupOpen) {
        {/*render the personal information editing form*/}
        return (
            <div className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                {/*button to close the form without making changes*/}
                <button 
                onClick={() => {
                    setIsPopupOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
                type="button"
                >
                ✕
                </button>
                {/*form that takes new info and saves to database on submission*/}
                <form action={handleUpdatedInfo} className="space-y-4">
                    <div className="space-y-4">
                        {/*first name field*/}
                        <input
                        type="text"
                        name="first_name"
                        defaultValue={customer.first_name}
                        required
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/*last name field*/}
                        <input
                        type="text"
                        name="last_name"
                        defaultValue={customer.last_name}
                        required
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/*phone number field*/}
                        <input
                        type="text"
                        name="phone_number"
                        defaultValue={customer.phone_number}
                        required
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/*address field*/}
                        <input
                        type="text"
                        name="address"
                        defaultValue={customer.address}
                        required
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>
            
                    {/*submit form button*/}
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
        {/*if the customer isn't changing their data, just display it with a button to open the form to change it*/}
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
