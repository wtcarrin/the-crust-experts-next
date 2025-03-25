import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase client not initialized' }, { status: 500 });
  }

  const formData = await request.formData();
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);

  const { data, error } = await supabase
    .from('products')
    .insert([{ name, description, price }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data }, { status: 201 });
}