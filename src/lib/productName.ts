export interface ProductNameParts {
  en: string;
  ar: string;
  full: string;
}

export function parseProductName(rawName: string): ProductNameParts {
  const clean = rawName.replace(/<[^>]+>/g, '').trim();

  const separators = [' | ', ' / ', ' - ', ' — '];
  for (const sep of separators) {
    const parts = clean.split(sep);
    if (parts.length === 2) {
      const a = parts[0].trim();
      const b = parts[1].trim();
      const arabicRegex = /[\u0600-\u06FF]/;
      if (arabicRegex.test(b) && !arabicRegex.test(a)) {
        return { en: a, ar: b, full: clean };
      }
      if (arabicRegex.test(a) && !arabicRegex.test(b)) {
        return { en: b, ar: a, full: clean };
      }
    }
  }

  const arabicRegex = /[\u0600-\u06FF]/;
  if (arabicRegex.test(clean)) {
    const enPart = clean.replace(/[\u0600-\u06FF\s،؛؟!]+/g, '').trim();
    const arPart = clean.replace(/[a-zA-Z0-9\s\-|/]+/g, '').trim();
    return { en: enPart || clean, ar: arPart || clean, full: clean };
  }

  return { en: clean, ar: clean, full: clean };
}

export function buildProductSeoTitle(nameParts: ProductNameParts, category: string): string {
  if (nameParts.en && nameParts.ar && nameParts.en !== nameParts.ar) {
    return `${nameParts.en} | ${nameParts.ar} – ${category} | Emdaad Food Trading`;
  }
  return `${nameParts.en} – ${category} | Emdaad Food Trading`;
}

export function buildProductDescription(nameParts: ProductNameParts, category: string, price: string): string {
  const en = nameParts.en || nameParts.full;
  const ar = nameParts.ar !== nameParts.en ? ` (${nameParts.ar})` : '';
  return `Buy ${en}${ar} – ${category}. Price: AED ${price}. Authentic Syrian & Lebanese food products at Emdaad Food Trading, Dubai UAE. منتجات غذائية سورية ولبنانية أصيلة.`;
}
