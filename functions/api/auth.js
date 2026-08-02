// Step 1 of the GitHub OAuth flow for the Sveltia/Decap CMS at /admin/.
// Redirects the login popup to GitHub. Requires env var GITHUB_CLIENT_ID.
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  if (!env.GITHUB_CLIENT_ID) {
    return new Response("CMS auth not configured: set GITHUB_CLIENT_ID (and GITHUB_CLIENT_SECRET).", { status: 500 });
  }
  const gh = new URL("https://github.com/login/oauth/authorize");
  gh.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  gh.searchParams.set("redirect_uri", `${url.origin}/api/callback`);
  gh.searchParams.set("scope", "repo,user");
  gh.searchParams.set("state", crypto.randomUUID());
  return Response.redirect(gh.toString(), 302);
}
