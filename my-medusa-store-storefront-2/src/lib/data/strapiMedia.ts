/* ---------------------------------------------------------
   Universal Strapi Media Resolver (Works for ANY response)
   Covers: arrays, single images, image objects, data[], formats,
   components, dynamic zones, nested attributes, etc.
---------------------------------------------------------- */

export const extractMediaArray = (input: any): any[] => {
  if (!input) return [];

  // If it's already an array of images
  if (Array.isArray(input)) return input;

  // PromotionalImages: { image: [] }
  if (input.image && Array.isArray(input.image)) return input.image;

  // PromotionalImages: { Image: [] }
  if (input.Image && Array.isArray(input.Image)) return input.Image;

  // Strapi relation: { data: [ ... ] }
  if (input.data && Array.isArray(input.data)) {
    return input.data.map((d: any) => d?.attributes ?? d);
  }

  // Single image: { data: { attributes: { ... } } }
  if (input.data?.attributes) return [input.data.attributes];

  // Single object with url / formats
  if (input.url || input.formats || input.attributes) {
    return [input.attributes ?? input];
  }

  return [];
};

/* ---------------------------------------------------------
   Resolve a single media object to a usable relative URL
---------------------------------------------------------- */
export const resolveMediaUrl = (value: any): string | null => {
  if (!value) return null;

  if (typeof value === "string") {
    const s = value.trim();
    return s === "" ? null : s;
  }

  const obj = value?.attributes ?? value;

  const formats = obj?.formats;
  if (formats?.medium?.url) return formats.medium.url;
  if (formats?.large?.url) return formats.large.url;
  if (formats?.small?.url) return formats.small.url;
  if (formats?.thumbnail?.url) return formats.thumbnail.url;

  if (obj.url) return obj.url;

  if (Array.isArray(value) && value.length > 0) return resolveMediaUrl(value[0]);
  if (value.data) return resolveMediaUrl(value.data);

  return null;
};

/* ---------------------------------------------------------
   Convert a relative URL into full absolute URL
---------------------------------------------------------- */
export const buildAbsoluteUrl = (url: string | null): string => {
  if (!url) return "";

  const clean = String(url).trim();
  if (clean.startsWith("http://") || clean.startsWith("https://")) return clean;

  const base = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

  return `${base}${clean.startsWith("/") ? clean : `/${clean}`}`;
};

/* ---------------------------------------------------------
   MAIN FUNCTION: Universal Image Getter
   Returns first valid absolute URL
---------------------------------------------------------- */
export const getStrapiImageUrl = (input: any): string => {
  const media = extractMediaArray(input);
  const url = resolveMediaUrl(media[0]);
  return buildAbsoluteUrl(url);
};

/* ---------------------------------------------------------
   MULTIPLE IMAGES: returns array of absolute URLs
---------------------------------------------------------- */
export const getStrapiImageUrls = (input: any): string[] => {
  return extractMediaArray(input)
    .map((m) => buildAbsoluteUrl(resolveMediaUrl(m)))
    .filter(Boolean);
};

