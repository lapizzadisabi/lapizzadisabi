// Live Google reviews via the Google Business Profile API.
//
// Why this API and not Places: it identifies your business by account/location ID
// rather than by Place ID or address, so it works for a service-area business with
// no public address. It also returns ALL reviews, not the 5 that Places caps you at.
//
// Netlify environment variables:
//   GOOGLE_CLIENT_ID      required
//   GOOGLE_CLIENT_SECRET  required
//   GOOGLE_REFRESH_TOKEN  required  (from tools/get-refresh-token.mjs)
//   GBP_LOCATION_NAME     optional  "accounts/123/locations/456" - skips discovery
//   GOOGLE_MAPS_URL       optional  link used by the rating badge
//   REVIEWS_MIN_RATING    optional  e.g. "4"
//   REVIEWS_MAX           optional  default 6

const STARS = { STAR_RATING_UNSPECIFIED: 0, ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

export default async () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return json({ configured: false, reviews: [] }, 60);
  }

  try {
    const token = await getAccessToken(clientId, clientSecret, refreshToken);

    let location = process.env.GBP_LOCATION_NAME;
    let discovered = null;
    if (!location) {
      discovered = await discover(token);
      location = discovered.locations[0];
      if (!location) {
        return json(
          { configured: true, error: "no_locations", hint: "No locations on this account.",
            accounts: discovered.accounts, reviews: [] }, 60);
      }
    }

    const res = await fetch(
      `https://mybusiness.googleapis.com/v4/${location}/reviews?pageSize=50`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error("GBP reviews error", res.status, body.slice(0, 500));
      // 429 here usually means the project has zero quota, i.e. access not approved yet.
      return json({
        configured: true,
        error: `gbp_${res.status}`,
        hint: res.status === 429
          ? "Quota is 0 - the API access request has not been approved yet."
          : res.status === 403
            ? "API not enabled, or the account cannot manage this location."
            : "See Netlify function logs.",
        reviews: [],
      }, 60);
    }

    const data = await res.json();
    const min = Number(process.env.REVIEWS_MIN_RATING || 0);
    const max = Number(process.env.REVIEWS_MAX || 6);

    const reviews = (data.reviews || [])
      .map((r) => ({
        name: r.reviewer?.isAnonymous ? "Google gebruiker" : (r.reviewer?.displayName || "Google gebruiker"),
        image: r.reviewer?.profilePhotoUrl || null,
        rating: STARS[r.starRating] ?? 0,
        when: dutchAgo(r.createTime),
        review: (r.comment || "").trim(),
      }))
      .filter((r) => r.review.length > 0 && r.rating >= min)
      .slice(0, max);

    return json({
      configured: true,
      rating: data.averageRating ?? null,
      total: data.totalReviewCount ?? 0,
      mapsUri: process.env.GOOGLE_MAPS_URL || null,
      location: discovered ? location : undefined, // shown once so you can pin it in env vars
      reviews,
    }, 21600);
  } catch (err) {
    console.error("reviews function failed", err);
    return json({ configured: true, error: "fetch_failed", reviews: [] }, 60);
  }
};

async function getAccessToken(client_id, client_secret, refresh_token) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id, client_secret, refresh_token, grant_type: "refresh_token" }),
  });
  if (!res.ok) throw new Error("token refresh failed: " + res.status + " " + (await res.text()).slice(0, 300));
  return (await res.json()).access_token;
}

async function discover(token) {
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  const accRes = await fetch("https://mybusinessaccountmanagement.googleapis.com/v1/accounts", auth);
  if (!accRes.ok) throw new Error("accounts failed: " + accRes.status + " " + (await accRes.text()).slice(0, 300));
  const accounts = (await accRes.json()).accounts || [];

  const locations = [];
  for (const a of accounts) {
    const locRes = await fetch(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${a.name}/locations?readMask=name,title&pageSize=100`,
      auth
    );
    if (!locRes.ok) continue;
    for (const l of (await locRes.json()).locations || []) {
      // l.name is "locations/123"; the v4 reviews endpoint needs "accounts/X/locations/123"
      locations.push(`${a.name}/${l.name}`);
    }
  }
  return { accounts: accounts.map((a) => a.name), locations };
}

function dutchAgo(iso) {
  if (!iso) return "";
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (!Number.isFinite(days) || days < 0) return "";
  if (days < 14) return days <= 1 ? "vandaag" : `${days} dagen geleden`;
  const weeks = Math.floor(days / 7);
  if (days < 60) return weeks === 1 ? "1 week geleden" : `${weeks} weken geleden`;
  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? "1 maand geleden" : `${months} maanden geleden`;
  const years = Math.floor(days / 365);
  return years === 1 ? "1 jaar geleden" : `${years} jaar geleden`;
}

function json(body, seconds) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${Math.min(seconds, 600)}`,
      "Netlify-CDN-Cache-Control": `public, s-maxage=${seconds}, stale-while-revalidate=86400`,
    },
  });
}
