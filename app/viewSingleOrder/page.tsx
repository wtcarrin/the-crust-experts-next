

export default async function Orders() {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>
      <h4>problems with viewsingleorder, can't query database if 'use client', can't use useSearchParams without 'use client'</h4>
    </div>
  );
}


/*
import { createClient } from '@/utils/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect  } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { useSearchParams } from 'next/navigation';

export default async function ViewSingleOrder() 
{
  const searchParams = useSearchParams()
  const orderId = searchParams.get('q') as string;
  const supabase = await createClient()

  if (!orderId) {
    return <p>No order ID provided</p>;
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_id', orderId)
    .maybeSingle();

  if (error) throw error;

  return (
    <div>
      <h1>Order Details</h1>
      {order ? (
        <pre>{JSON.stringify(order, null, 2)}</pre>
      ) : (
        <p>Order not found with id: {orderId}</p>
      )}
    </div>
  );
}
*/