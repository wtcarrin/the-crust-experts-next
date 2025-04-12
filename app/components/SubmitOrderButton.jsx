'use client';
import { useRouter } from 'next/navigation';
import { submitCustomerOrder } from '../actions/submitCustomerOrder';

export function SubmitOrderButton({ orderId , subtotal, customerAddress}) {
    const router = useRouter();


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
        <h2 className="text-lg font-semibold">Subtotal: {subtotal}</h2>
          <h2 className="text-lg font-semibold">Tax: {.07* subtotal}</h2>
          <h2 className="text-lg font-semibold">Delivery Fee: $5</h2>
          <h2 className="text-lg font-semibold">Total: {subtotal * 1.07 + 5}</h2>
          <form action={submit} className="flex flex-col gap-2">
                <label htmlFor="address" className="text-sm font-medium">
                    Delivery Address
                </label>
                <input
                    type="text"
                    name="address"
                    defaultValue={customerAddress}
                    required
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your delivery address"
                />
                <input
                    type="text"
                    name="delivery_instructions"
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter delivery instructions"
                />
                <button type="submit">
                Submit
                </button>
            </form>
          
        </div>
        
    );
}