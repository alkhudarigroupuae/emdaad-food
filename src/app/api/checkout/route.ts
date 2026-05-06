import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const WC_URL = process.env.WOOCOMMERCE_URL || 'https://admin.emdaadfood.com';
  const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || 'ck_59b02ac55bf485a3436e43cdd05a65e3c46ee0e3';
  const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || 'cs_53a8cbad372b52842f4f279b8c498d83094f7b27';

  try {
    const body = await request.json();
    
    const response = await fetch(`${WC_URL}/wp-json/wc/v3/orders?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Failed to create order' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
