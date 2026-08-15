# DreamAuthentics — AI Phone Receptionist ("Anna")

The AI voice agent for **800-789-8424** (`+18007898424`), ported from Grasshopper to **Twilio**.
Voice + conversation by **ElevenLabs**. The agent is **Anna** — the same warm voice DreamAuthentics
callers have heard for 20+ years, **cloned** so returning customers instantly recognize her, and the
old press-1/press-2 dial-tree converted into a **natural conversation**.

## What's here
| File | What it is |
|---|---|
| `agent-system-prompt.md` | **The agent's brain** — paste as the ElevenLabs agent System Prompt. |
| `preview.html` | Review page: every line in Anna's voice + the full script (open in a browser). |
| `audio/` | Anna's generated voice segments (greeting, discovery, products, quote, credibility, FAQ…). |
| `audio/_original-anna-greeting.mp3` | The original 20-year Grasshopper greeting (clone source, for reference). |
| `source/800-script-2016.txt` | The authoritative original 2016 phone script. |
| `config.json` | Voice id, TTS settings, phone number, and the ElevenLabs/Twilio wiring notes. |

## Voice
- **Name:** DreamAuthentics - Anna · **voice_id:** `WXCY5NCSGsMq1On2Figj` (ElevenLabs Instant Voice Clone
  from the original 2016 recordings).
- **Delivery (approved "Take B"):** model `eleven_multilingual_v2`, `stability 0.28`, `similarity_boost 0.88`,
  `style 0.6`, `use_speaker_boost true` — warm + energetic to match the iconic first-6-seconds.

## Build / wire-up (ElevenLabs Conversational AI + Twilio)
1. **Create the agent** in ElevenLabs Conversational AI. Voice = the Anna clone above. System Prompt =
   `agent-system-prompt.md`. First message = the greeting from that file.
2. **Attach the phone number:** import the Twilio number `+18007898424` via ElevenLabs
   `POST /v1/convai/phone-numbers` (Twilio SID/Auth from `~/.pcos-secrets/twilio.env`), then assign the agent.
3. **Test** by calling — verify the greeting, discovery flow, the custom-quote offer, and message-taking.
4. **Go live** only after sign-off (until then, keep it on a test number).

## The conversation arc
Greet → invite their **dream** → quick **discovery** (favorite game? 2- vs 4-player?) → present the
**Excalibur** (Ultra Extreme 42″ / HD Extreme 32″) or **Eladius** (4-player) → **offer to email a custom
quote** → back it with **global shipping**, the **client list**, and the **Hall-of-Fame** story → answer
**FAQ** → take a message or connect a **rep**. Family of brands / book / charity / Video Games Live are
light, on-request touches. See `agent-system-prompt.md` for the full knowledge.

## Status (2026-08-15)
Voice cloned ✅ · full script + all audio approved ✅ · **next: create the ElevenLabs agent + wire Twilio +
test call.** Small open item: whether the Hall of Fame gets its own dedicated segment (currently woven into
the founder section).

_Powered by CyberHope AI / PrecognitionOS · part of the Arcade Inventors family._
