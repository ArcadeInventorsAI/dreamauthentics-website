// Step 2 of the GitHub OAuth flow for the CMS. GitHub redirects here with ?code=…;
// we exchange it for an access token and hand it back to the CMS window via postMessage.
// Requires env vars GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return new Response("Missing ?code", { status: 400 });
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return new Response("CMS auth not configured: set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.", { status: 500 });
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const data = await res.json();

  const ok = !!data.access_token;
  const payload = ok
    ? JSON.stringify({ token: data.access_token, provider: "github" })
    : JSON.stringify({ error: data.error_description || data.error || "OAuth failed" });
  const msg = `authorization:github:${ok ? "success" : "error"}:${payload}`;

  const html = `<!doctype html><html><body>
<p>Completing sign-in… you can close this window.</p>
<script>
  (function () {
    function send(origin) {
      window.opener && window.opener.postMessage(${JSON.stringify(msg)}, origin || "*");
    }
    window.addEventListener("message", function (e) { send(e.origin); }, false);
    window.opener && window.opener.postMessage("authorizing:github", "*");
  })();
</script>
</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
