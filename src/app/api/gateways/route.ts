import { NextResponse } from 'next/server';

export async function GET() {
  const WC_URL = process.env.WOOCOMMERCE_URL || 'https://admin.emdaadfood.com';
  const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || 'ck_59b02ac55bf485a3436e43cdd05a65e3c46ee0e3';
  const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || 'cs_53a8cbad372b52842f4f279b8c498d83094f7b27';

  try {
    const response = await fetch(`${WC_URL}/wp-json/wc/v3/payment_gateways?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch gateways' }, { status: response.status });
    }

    const gateways = await response.json();
    const activeGateways = gateways.filter((g: any) => g.enabled).map((g: any) => ({
      id: g.id,
      title: g.title || g.method_title,
      description: g.description
    }));

    return NextResponse.json(activeGateways);
  } catch (error) {
    console.error('Error fetching gateways:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
