import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    const { data: product, error: fetchError } = await supabaseAdmin
      .from('products')
      .select('clicks, affiliate_url, original_url, store')
      .eq('id', productId)
      .single();

    if (fetchError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const { error: updateError } = await supabaseAdmin
      .from('products')
      .update({ clicks: (product.clicks || 0) + 1 })
      .eq('id', productId);

    if (updateError) {
      console.error('Click tracking error:', updateError);
    }

    return NextResponse.json({ 
      success: true, 
      redirectUrl: product.affiliate_url || product.original_url 
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
