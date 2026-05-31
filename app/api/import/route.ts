import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const API_KEY = process.env.API_SECRET_KEY || 'dev-key';

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([{
        title: body.title?.substring(0, 255),
        price: body.price || 0,
        currency: body.currency || 'EUR',
        category: body.category || 'Geral',
        image_url: body.image_url,
        original_url: body.original_url,
        store: body.store || 'generic',
        store_domain: body.store_domain,
        product_id: body.product_id,
        affiliate_url: body.affiliate_url || body.original_url,
        status: body.status || 'active',
        clicks: 0,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id, product: data }, { status: 201 });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
