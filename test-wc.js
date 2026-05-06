const https = require('https');
const url = new URL('https://admin.emdaadfood.com/wp-json/wc/v3/payment_gateways');
url.searchParams.append('consumer_key', process.env.WC_KEY || 'ck_59b02ac55bf485a3436e43cdd05a65e3c46ee0e3');
url.searchParams.append('consumer_secret', process.env.WC_SECRET || 'cs_53a8cbad372b52842f4f279b8c498d83094f7b27');

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const gateways = JSON.parse(data);
      const active = gateways.filter(g => g.enabled).map(g => ({ id: g.id, title: g.title }));
      console.log('Active gateways:', active);
    } catch(e) {
      console.log('Error parsing:', data);
    }
  });
});
