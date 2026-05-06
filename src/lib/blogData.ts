export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'benefits-of-syrian-olive-oil',
    title: 'The Health Benefits of Authentic Syrian Olive Oil',
    excerpt: 'Discover why cold-pressed Syrian olive oil is considered one of the finest in the world and how it can improve your health.',
    content: `
      <p>Syrian olive oil has been celebrated for millennia, not just for its rich, fruity flavor, but for its incredible health benefits. Grown in the historic Levant region, these olives benefit from the perfect Mediterranean climate.</p>
      
      <h3>Rich in Antioxidants</h3>
      <p>Extra virgin olive oil is loaded with antioxidants, some of which have powerful biological effects. These antioxidants are biologically active and may reduce your risk of chronic diseases.</p>
      
      <h3>Heart Health</h3>
      <p>The Mediterranean diet, which is heavily reliant on olive oil, has been shown to significantly reduce the risk of heart disease. It lowers inflammation, protects "bad" LDL cholesterol from oxidation, improves the lining of your blood vessels, and may help prevent excessive blood clotting.</p>
      
      <h3>How to Use It</h3>
      <p>While great for cooking, authentic Syrian olive oil shines brightest when used raw. Drizzle it over hummus, labneh, salads, or simply enjoy it as a dip with fresh pita bread and za'atar.</p>
    `,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1600&auto=format&fit=crop',
    date: 'May 10, 2026',
    author: 'Emdaad Culinary Team',
    category: 'Health & Wellness'
  },
  {
    slug: 'ultimate-guide-to-levantine-cheese',
    title: 'The Ultimate Guide to Levantine Cheese',
    excerpt: 'From Halloumi to Akkawi, explore the rich and diverse world of traditional cheeses from Syria and Lebanon.',
    content: `
      <p>Cheese is a cornerstone of the Middle Eastern breakfast and mezze spread. The Levant region (Syria, Lebanon, Jordan, and Palestine) boasts a variety of unique cheeses that are beloved worldwide.</p>
      
      <h3>Akkawi Cheese</h3>
      <p>Named after the city of Akka, this soft, unripened brine cheese has a smooth texture and a mild, slightly salty taste. It is perfect for baking and is the traditional cheese used in making the famous dessert, Kunafa.</p>
      
      <h3>Halloumi</h3>
      <p>Famous for its high melting point, Halloumi can easily be fried or grilled without melting away. A staple in Lebanese and Syrian breakfasts, it's often served alongside fresh tomatoes, cucumbers, and olives.</p>
      
      <h3>Majdouleh (Braided Cheese)</h3>
      <p>This beautifully woven cheese is visually striking and deliciously salty. It is often sprinkled with nigella seeds (mahlab) which give it a distinct, aromatic flavor.</p>
      
      <p>At Emdaad Food Trading, we source the most authentic and fresh cheeses directly from traditional producers to ensure the true taste of the Levant reaches your table.</p>
    `,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1600&auto=format&fit=crop',
    date: 'April 28, 2026',
    author: 'Emdaad Culinary Team',
    category: 'Product Guides'
  },
  {
    slug: 'art-of-making-perfect-makdous',
    title: 'The Art of Making the Perfect Makdous',
    excerpt: 'Learn about the traditional process of making Makdous, the beloved oil-cured stuffed eggplants.',
    content: `
      <p>Makdous is more than just a food; it is a late-summer tradition in Levantine households. Families gather to prepare these oil-cured, stuffed baby eggplants to be consumed throughout the winter.</p>
      
      <h3>The Ingredients</h3>
      <p>The process starts with tiny, specific eggplants. Once boiled and pressed to remove moisture, they are stuffed with a rich mixture of walnuts, red pepper, garlic, and salt.</p>
      
      <h3>The Curing Process</h3>
      <p>The magic happens during the curing process. The stuffed eggplants are submerged in high-quality olive oil. As they rest, the flavors meld together, creating a tangy, nutty, and savory bite that is incredibly complex.</p>
      
      <h3>Serving Makdous</h3>
      <p>Makdous is traditionally served for breakfast or supper alongside warm flatbread, fresh vegetables, labneh, and sweet black tea. It is a testament to the preservation techniques of our ancestors.</p>
    `,
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=1600&auto=format&fit=crop',
    date: 'April 15, 2026',
    author: 'Emdaad Culinary Team',
    category: 'Traditions'
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
