'use client';
import { useRouter } from 'next/navigation';
import { submitCustomerOrder } from '../actions/submitCustomerOrder';
//this component takes the last information we need to complete the order:
//delivery address and delivery instructions
export function SubmitOrderButton({ orderId , subtotal, customerAddress}) {
    const router = useRouter();

    //if we don't have an address in the form, don't submit the order to the database.
    const submit = async (formData) => {
        if(!formData.get("address")) {
            return
        }
        console.log('Submitting order with ID:', orderId);
        await submitCustomerOrder(orderId, subtotal, formData.get("address"), formData.get("delivery_instructions"));
        router.push('/viewSingleOrder?p=' + orderId);
    };

    return (
        <div>
            {/*render the subtotal, tax, delivery fee to custmoer*/}
        <h2 className="text-lg font-semibold">Subtotal: {subtotal}</h2>
          <h2 className="text-lg font-semibold">Tax: {.07* subtotal}</h2>
          <h2 className="text-lg font-semibold">Delivery Fee: $5</h2>
          <h2 className="text-lg font-semibold">Total: {subtotal * 1.07 + 5}</h2>
          {/*form for the last info we need*/}
          <form action={submit} className="flex flex-col gap-2">
                <label htmlFor="address" className="text-sm font-medium">
                    Delivery Address
                </label>
                {/*make the default delivery address the customer's address if it exists*/}
                <input
                    type="text"
                    name="address"
                    defaultValue={customerAddress}
                    required
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your delivery address"
                />
                {/*offer the customer a place to specify delivery instructions*/}
                <input
                    type="text"
                    name="delivery_instructions"
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter delivery instructions"
                />
                {/*submit order button*/}
                <button type="submit">
                Submit
                </button>
            </form>
          
        </div>
        
    );
}