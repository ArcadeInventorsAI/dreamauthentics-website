// Cloudflare Pages Function — receives the quote form and emails it via Resend.
// Env vars (set as Pages secrets): RESEND_API_KEY, QUOTE_TO, QUOTE_FROM
export async function onRequestPost({ request, env }) {
  const cors = { 'content-type': 'application/json' };
  try {
    const data = await request.json();
    const name = (data.name || '').toString().slice(0, 200).trim();
    const email = (data.email || '').toString().slice(0, 200).trim();
    const phone = (data.phone || '').toString().slice(0, 60).trim();
    const cabinet = (data.cabinet || '').toString().slice(0, 80).trim();
    const message = (data.message || '').toString().slice(0, 4000).trim();
    if (data.company) return new Response(JSON.stringify({ ok: true }), { headers: cors }); // honeypot
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: 'Please fill in your name, email, and message.' }), { status: 400, headers: cors });
    }
    const to = env.QUOTE_TO || 'rick@cyberhopeai.com';
    const from = env.QUOTE_FROM || 'DreamAuthentics <quotes@cyberhopeai.com>';
    const html = `<h2>New DreamAuthentics quote request</h2>
      <p><b>Name:</b> ${esc(name)}</p><p><b>Email:</b> ${esc(email)}</p>
      <p><b>Phone:</b> ${esc(phone) || '—'}</p><p><b>Cabinet:</b> ${esc(cabinet) || '—'}</p>
      <p><b>Message:</b></p><p>${esc(message).replace(/\n/g, '<br>')}</p>`;
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Quote request — ${name}${cabinet ? ' · ' + cabinet : ''}`, html }),
    });
    if (!r.ok) {
      const t = await r.text();
      return new Response(JSON.stringify({ ok: false, error: 'Email service error.', detail: t.slice(0,200) }), { status: 502, headers: cors });
    }
    return new Response(JSON.stringify({ ok: true }), { headers: cors });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'Bad request.' }), { status: 400, headers: cors });
  }
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
