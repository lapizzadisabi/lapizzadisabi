// One-time helper: gets the GOOGLE_REFRESH_TOKEN for the Netlify function.
//
// Run:  node tools/get-refresh-token.mjs
// Needs nothing installed - plain Node 18+.

import http from "node:http";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const PORT = 8080;
const REDIRECT = `http://localhost:${PORT}`;
const SCOPE = "https://www.googleapis.com/auth/business.manage";

const rl = readline.createInterface({ input, output });
const clientId = (process.env.GOOGLE_CLIENT_ID || await rl.question("Client ID: ")).trim();
const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || await rl.question("Client secret: ")).trim();
rl.close();

if (!clientId || !clientSecret) {
  console.error("Both values are required.");
  process.exit(1);
}

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: clientId,
    redirect_uri: REDIRECT,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",   // <- this is what makes Google return a refresh token
    prompt: "consent",        // <- forces a fresh one even if you authorised before
  });

console.log("\n1. Open this URL in your browser, signed in as the Google account that owns the profile:\n");
console.log(authUrl);
console.log("\n2. Approve access. This window will pick up the result automatically.\n");

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  const code = url.searchParams.get("code");
  const err = url.searchParams.get("error");

  if (err) {
    res.end("Failed: " + err + ". You can close this tab.");
    console.error("\nAuthorisation denied:", err);
    server.close();
    process.exit(1);
  }
  if (!code) { res.end("Waiting..."); return; }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: REDIRECT,
        grant_type: "authorization_code",
      }),
    });

    const data = await tokenRes.json();
    if (!tokenRes.ok || !data.refresh_token) {
      res.end("No refresh token returned. Check the terminal.");
      console.error("\nResponse:", JSON.stringify(data, null, 2));
      console.error(
        "\nIf refresh_token is missing, revoke this app at " +
        "https://myaccount.google.com/permissions and run the script again."
      );
      server.close();
      process.exit(1);
    }

    res.end("Done. Copy the refresh token from your terminal, then close this tab.");
    console.log("\n=========================================================");
    console.log("GOOGLE_REFRESH_TOKEN =");
    console.log(data.refresh_token);
    console.log("=========================================================");
    console.log("\nPaste that into Netlify as an environment variable.");
    console.log("Treat it like a password - it grants access to your Business Profile.\n");
    server.close();
    process.exit(0);
  } catch (e) {
    res.end("Error, see terminal.");
    console.error(e);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => console.log(`Listening on ${REDIRECT} ...`));
