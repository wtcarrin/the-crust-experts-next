'use client';
import { useRouter } from 'next/navigation';
import { submitCustomerOrder } from '../actions/submitCustomerOrder';

export function SubmitOrderButton({ orderId }) {
    const router = useRouter();

    const submit = async () => {
        console.log('Submitting order with ID:', orderId);
        await submitCustomerOrder(orderId);
        router.push('/viewSingleOrder?p=' + orderId);
    };

    return (
        <button onClick={submit}>
            Submit
        </button>
    );
}