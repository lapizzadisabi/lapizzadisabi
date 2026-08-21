// Fetches Google reviews server-side so the API key is never exposed to visitors.
// Configure in Netlify -> Site configuration -> Environment variables:
//   GOOGLE_MAPS_API_KEY  (required)
//   GOOGLE_PLACE_ID      (required, looks like ChIJ....)
//   REVIEWS_MIN_RATING   (optional, e.g. "4" to hide anything below 4 stars)

const FIELDS = [
  "displayName",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews",
].join(",");

export default async () => {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Not configured yet -> tell the site to fall back to the CMS reviews.
  if (!key || !placeId) {
    return json({ configured: false, reviews: [] }, 200, 60);
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=nl`,
      { headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": FIELDS } }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("Places API error", res.status, detail.slice(0, 400));
      return json({ configured: true, error: "places_api_" + res.status, reviews: [] }, 200, 60);
    }

    const data = await res.json();
    const min = Number(process.env.REVIEWS_MIN_RATING || 0);

    const reviews = (data.reviews || [])
      .map((r) => ({
        name: r.authorAttribution?.displayName || "Google gebruiker",
        image: r.authorAttribution?.photoUri || null,
        profile: r.authorAttribution?.uri || null,
        rating: r.rating || 5,
        when: r.relativePublishTimeDescription || "",
        review: (r.originalText?.text || r.text?.text || "").trim(),
      }))
      .filter((r) => r.review.length > 0 && r.rating >= min);

    return json(
      {
        configured: true,
        name: data.displayName?.text || null,
        rating: data.rating || null,
        total: data.userRatingCount || 0,
        mapsUri: data.googleMapsUri || null,
        reviews,
      },
      200,
      21600
    );
  } catch (err) {
    console.error("reviews function failed", err);
    return json({ configured: true, error: "fetch_failed", reviews: [] }, 200, 60);
  }
};

function json(body, status, seconds) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      // Browser cache short, Netlify edge cache long -> only a handful of
      // Google API calls per day no matter how much traffic the site gets.
      "Cache-Control": `public, max-age=${Math.min(seconds, 600)}`,
      "Netlify-CDN-Cache-Control": `public, s-maxage=${seconds}, stale-while-revalidate=86400`,
    },
  });
}
