import { createClient } from '@/utils/supabase/server';

export default async function ViewSingleOrder({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const orderId = searchParams.q as string;
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