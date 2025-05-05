"use client"

import { useState } from "react"
import { User, Phone, MapPin, Edit, X, Save } from "lucide-react"

//component to allow the customer to view and change their personal information used to complete orders
export function ProfileComponent({ customer, updateProfileInfo }) {
  //usestate to control edit information window appearing
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  //use the submitted formdata to update the customer's info in the database
  async function handleUpdatedInfo(formData) {
    const first_name = customer?.first_name || ""
    const last_name = customer?.last_name || ""
    const phone_number = customer?.phone_number || ""
    const address = customer?.address || ""

    if (
      formData.get("first_name") != first_name ||
      formData.get("last_name") != last_name ||
      formData.get("phone_number") != phone_number ||
      formData.get("address") != address
    ) {
      await updateProfileInfo(
        formData.get("first_name"),
        formData.get("last_name"),
        formData.get("phone_number"),
        formData.get("address"),
      )
      setIsPopupOpen(false)
    }
  }

  //if we don't get a customer (user does not have any data) we know they're authenticated anonymously
  if (!customer) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <User className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        <h1 className="text-xl font-semibold text-gray-800 mb-2">You're signed in as a guest!</h1>
        <p className="text-gray-600">Create an account to save your information for future orders.</p>
      </div>
    )
  }

  if (isPopupOpen) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Edit Profile Information</h2>
          {/*button to close the form without making changes*/}
          <button
            onClick={() => {
              setIsPopupOpen(false)
            }}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            type="button"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/*form that takes new info and saves to database on submission*/}
        <form action={handleUpdatedInfo} className="space-y-4">
          <div className="space-y-4">
            {/* First name field */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                defaultValue={customer.first_name}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Last name field */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                defaultValue={customer.last_name}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Phone number field */}
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone_number"
                type="text"
                name="phone_number"
                defaultValue={customer.phone_number}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Address field */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                defaultValue={customer.address}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Submit form button */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => setIsPopupOpen(false)}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <div className="bg-white rounded-lg border p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">
                {customer.first_name} {customer.last_name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{customer.phone_number}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{customer.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            type="button"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </button>
        </div>
      </div>
    )
  }
}
