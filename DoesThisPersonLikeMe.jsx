import { useState, useEffect, useRef } from “react”;

const styles = `
@import url(‘https://emea01.safelinks.protection.outlook.com/?url=https%3A%2F%2Ffonts.googleapis.com%2Fcss2%3Ffamily%3DPlayfair%2BDisplay%3Aital%2Cwght%400%2C700%3B1%2C400%26family%3DDM%2BSans%3Awght%40300%3B400%3B500%26display%3Dswap%25E2%2580%2599&data=05%7C02%7C%7Cbf7dfb12a1e243c26e1008dead321e0d%7C84df9e7fe9f640afb435aaaaaaaaaaaa%7C1%7C0%7C639138627925319726%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=xw8siSOmzkmvEfHz%2BjMinu85OA3DHtIQ%2B%2FAO2yeVPbs%3D&reserved=0);

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
–pink: #ff6b9d;
–rose: #ff4d7d;
–lilac: #c084fc;
–deep: #1a0a2e;
–card: rgba(255,255,255,0.06);
–border: rgba(255,255,255,0.1);
–text: #f5e6ff;
–muted: rgba(245,230,255,0.5);
}

.app {
min-height: 100vh;
background: var(–deep);
font-family: ‘DM Sans’, sans-serif;
color: var(–text);
position: relative;
overflow-x: hidden;
}

/* Animated gradient background */
.bg {
position: fixed; inset: 0; z-index: 0; pointer-events: none;
background:
radial-gradient(ellipse 80% 60% at 20% 10%, rgba(192,132,252,0.18) 0%, transparent 60%),
radial-gradient(ellipse 60% 50% at 80% 80%, rgba(255,107,157,0.15) 0%, transparent 60%),
radial-gradient(ellipse 100% 80% at 50% 50%, rgba(26,10,46,1) 0%, transparent 100%);
animation: bgshift 8s ease-in-out infinite alternate;
}
@keyframes bgshift {
from { opacity: 1; }
to { opacity: 0.85; filter: hue-rotate(15deg); }
}

/* Floating hearts */
.hearts {
position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
}
.heart {
position: absolute; bottom: -40px; font-size: 20px;
animation: floatup linear infinite;
opacity: 0;
}
@keyframes floatup {
0% { transform: translateY(0) rotate(-10deg) scale(0.8); opacity: 0; }
10% { opacity: 0.4; }
90% { opacity: 0.15; }
100% { transform: translateY(-110vh) rotate(10deg) scale(1.1); opacity: 0; }
}

.container {
position: relative; z-index: 10;
max-width: 680px;
margin: 0 auto;
padding: 48px 24px 80px;
}

/* Header */
.header { text-align: center; margin-bottom: 48px; animation: fadein 0.8s ease; }
@keyframes fadein { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }

.logo-emoji { font-size: 48px; display: block; margin-bottom: 12px;
animation: heartbeat 2s ease-in-out infinite; }
@keyframes heartbeat {
0%,100% { transform: scale(1); }
14% { transform: scale(1.15); }
28% { transform: scale(1); }
42% { transform: scale(1.08); }
56% { transform: scale(1); }
}

h1 {
font-family: ‘Playfair Display’, serif;
font-size: clamp(28px, 6vw, 42px);
font-weight: 700;
line-height: 1.15;
margin-bottom: 12px;
}
h1 em { font-style: italic; color: var(–pink); }

.subtitle {
font-size: 14px; color: var(–muted); line-height: 1.7;
max-width: 440px; margin: 0 auto;
}

/* Card */
.card {
background: var(–card);
border: 1px solid var(–border);
border-radius: 20px;
padding: 32px;
backdrop-filter: blur(20px);
margin-bottom: 20px;
animation: fadein 0.8s ease 0.2s both;
}

.card-label {
font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
color: var(–muted); margin-bottom: 12px; display: block;
}

/* Name inputs */
.names-row {
display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px;
align-items: center; margin-bottom: 24px;
}
.names-row .heart-divider { color: var(–pink); font-size: 20px; text-align: center; }

input[type=“text”] {
width: 100%;
background: rgba(255,255,255,0.05);
border: 1px solid var(–border);
border-radius: 10px;
color: var(–text);
font-family: ‘DM Sans’, sans-serif;
font-size: 14px;
padding: 12px 16px;
outline: none;
transition: border-color 0.2s, background 0.2s;
}
input[type=“text”]:focus {
border-color: var(–pink);
background: rgba(255,107,157,0.06);
}
input[type=“text”]::placeholder { color: rgba(245,230,255,0.25); }

/* Textarea */
textarea {
width: 100%;
background: rgba(255,255,255,0.04);
border: 1px solid var(–border);
border-radius: 12px;
color: var(–text);
font-family: ‘DM Sans’, sans-serif;
font-size: 13px;
line-height: 1.8;
padding: 16px;
resize: vertical;
min-height: 180px;
outline: none;
transition: border-color 0.2s;
}
textarea:focus { border-color: var(–lilac); }
textarea::placeholder { color: rgba(245,230,255,0.2); }

.char-count {
text-align: right; font-size: 11px; color: var(–muted); margin-top: 6px;
}

/* Vibe selector */
.vibe-row {
display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px;
}
.vibe-btn {
background: rgba(255,255,255,0.05);
border: 1px solid var(–border);
border-radius: 20px;
color: var(–muted);
font-family: ‘DM Sans’, sans-serif;
font-size: 12px;
padding: 6px 14px;
cursor: pointer;
transition: all 0.15s;
}
.vibe-btn:hover { border-color: var(–pink); color: var(–text); }
.vibe-btn.selected {
background: rgba(255,107,157,0.15);
border-color: var(–pink);
color: var(–pink);
}

/* Submit button */
.submit-btn {
width: 100%;
background: linear-gradient(135deg, var(–rose), var(–lilac));
border: none;
border-radius: 14px;
color: #fff;
font-family: ‘DM Sans’, sans-serif;
font-weight: 500;
font-size: 16px;
padding: 18px;
cursor: pointer;
margin-top: 4px;
transition: opacity 0.2s, transform 0.1s, box-shadow 0.2s;
box-shadow: 0 8px 32px rgba(255,77,125,0.3);
letter-spacing: 0.3px;
}
.submit-btn:hover:not(:disabled) {
opacity: 0.92; transform: translateY(-2px);
box-shadow: 0 12px 40px rgba(255,77,125,0.4);
}
.submit-btn:active { transform: translateY(0); }
.submit-btn:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }

/* Loading */
.loading {
text-align: center; padding: 48px 32px;
animation: fadein 0.4s ease;
}
.loading-emoji {
font-size: 48px; display: block; margin-bottom: 20px;
animation: spin 3s linear infinite;
}
@keyframes spin {
0%,100% { transform: rotate(-10deg) scale(1); }
25% { transform: rotate(10deg) scale(1.1); }
50% { transform: rotate(-5deg) scale(0.95); }
75% { transform: rotate(8deg) scale(1.05); }
}
.loading-msg {
font-family: ‘Playfair Display’, serif;
font-size: 18px; font-style: italic;
color: var(–pink); margin-bottom: 8px;
}
.loading-sub { font-size: 12px; color: var(–muted); }
.loading-dots span {
display: inline-block; width: 6px; height: 6px; border-radius: 50%;
background: var(–pink); margin: 0 3px;
animation: bounce 1.2s ease-in-out infinite;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} }

/* Result */
.result { animation: fadein 0.6s ease; }

.meter-card {
background: var(–card);
border: 1px solid var(–border);
border-radius: 20px;
padding: 36px 32px;
backdrop-filter: blur(20px);
text-align: center;
margin-bottom: 16px;
position: relative; overflow: hidden;
}
.meter-card::before {
content: ‘’;
position: absolute; inset: 0;
background: radial-gradient(ellipse at 50% 0%, rgba(255,107,157,0.12), transparent 70%);
pointer-events: none;
}

.verdict-emoji { font-size: 56px; display: block; margin-bottom: 16px; }
.verdict-title {
font-family: ‘Playfair Display’, serif;
font-size: clamp(22px, 5vw, 32px);
font-weight: 700; margin-bottom: 8px;
}

/* Score meter */
.score-wrap { margin: 28px 0 20px; }
.score-label-row {
display: flex; justify-content: space-between;
font-size: 11px; color: var(–muted); margin-bottom: 10px; letter-spacing: 1px;
}
.meter-track {
height: 10px; background: rgba(255,255,255,0.08);
border-radius: 99px; overflow: hidden;
}
.meter-fill {
height: 100%; border-radius: 99px;
background: linear-gradient(90deg, var(–rose), var(–lilac));
transition: width 1.5s cubic-bezier(0.16,1,0.3,1);
box-shadow: 0 0 12px rgba(255,107,157,0.5);
}
.score-number {
font-family: ‘Playfair Display’, serif;
font-size: 64px; font-weight: 700;
background: linear-gradient(135deg, var(–pink), var(–lilac));
-webkit-background-clip: text; -webkit-text-fill-color: transparent;
background-clip: text;
line-height: 1; margin: 16px 0 4px;
}
.score-suffix { font-size: 13px; color: var(–muted); }

.verdict-text {
font-size: 15px; line-height: 1.7; color: var(–muted);
max-width: 480px; margin: 0 auto;
font-style: italic;
}

/* Signals */
.signals-card {
background: var(–card);
border: 1px solid var(–border);
border-radius: 20px;
padding: 28px 32px;
backdrop-filter: blur(20px);
margin-bottom: 16px;
}
.signals-title {
font-family: ‘Playfair Display’, serif;
font-size: 18px; margin-bottom: 20px;
}
.signal {
display: flex; gap: 14px; margin-bottom: 16px; align-items: flex-start;
}
.signal-icon { font-size: 18px; min-width: 24px; margin-top: 1px; }
.signal-content {}
.signal-label {
font-size: 13px; font-weight: 500; margin-bottom: 3px;
}
.signal-label.green { color: #86efac; }
.signal-label.red { color: #fca5a5; }
.signal-label.yellow { color: #fde68a; }
.signal-desc { font-size: 12px; color: var(–muted); line-height: 1.6; }

/* Advice */
.advice-card {
background: linear-gradient(135deg, rgba(255,107,157,0.1), rgba(192,132,252,0.1));
border: 1px solid rgba(255,107,157,0.2);
border-radius: 20px;
padding: 28px 32px;
margin-bottom: 16px;
}
.advice-title {
font-family: ‘Playfair Display’, serif;
font-size: 18px; margin-bottom: 16px; color: var(–pink);
}
.advice-text { font-size: 14px; line-height: 1.8; color: var(–text); }

/* Share card */
.share-card {
background: var(–card);
border: 1px solid var(–border);
border-radius: 20px;
padding: 24px 32px;
backdrop-filter: blur(20px);
text-align: center;
margin-bottom: 16px;
}
.share-title { font-size: 13px; color: var(–muted); margin-bottom: 16px; letter-spacing: 1px; text-transform: uppercase; }
.share-result-box {
background: rgba(255,255,255,0.04);
border: 1px dashed rgba(255,107,157,0.3);
border-radius: 12px;
padding: 16px;
font-size: 13px; color: var(–muted);
margin-bottom: 16px; line-height: 1.7;
}
.share-result-box strong { color: var(–pink); }
.copy-btn {
background: rgba(255,107,157,0.15);
border: 1px solid rgba(255,107,157,0.3);
border-radius: 10px;
color: var(–pink);
font-family: ‘DM Sans’, sans-serif;
font-size: 13px; padding: 10px 24px;
cursor: pointer; transition: all 0.15s;
}
.copy-btn:hover { background: rgba(255,107,157,0.25); }

/* Reset */
.reset-btn {
width: 100%;
background: transparent;
border: 1px solid var(–border);
border-radius: 14px;
color: var(–muted);
font-family: ‘DM Sans’, sans-serif;
font-size: 14px; padding: 14px;
cursor: pointer; transition: all 0.15s;
margin-top: 8px;
}
.reset-btn:hover { border-color: var(–lilac); color: var(–text); }

/* Upsell */
.upsell {
display: grid; grid-template-columns: 1fr 1fr;
gap: 12px; margin-bottom: 16px;
}
.upsell-item {
background: var(–card);
border: 1px solid var(–border);
border-radius: 14px; padding: 20px;
text-align: center; cursor: pointer;
transition: border-color 0.15s, transform 0.1s;
}
.upsell-item:hover { border-color: var(–pink); transform: translateY(-2px); }
.upsell-emoji { font-size: 28px; display: block; margin-bottom: 8px; }
.upsell-price { font-family: ‘Playfair Display’, serif; font-size: 22px; color: var(–pink); }
.upsell-name { font-size: 11px; color: var(–muted); margin-top: 4px; letter-spacing: 0.5px; }

/* Email capture */
.email-card {
background: linear-gradient(135deg, rgba(192,132,252,0.12), rgba(255,107,157,0.12));
border: 1px solid rgba(192,132,252,0.25);
border-radius: 20px;
padding: 28px 32px;
margin-bottom: 16px;
text-align: center;
animation: fadein 0.5s ease;
}
.email-card-emoji { font-size: 36px; display: block; margin-bottom: 12px; }
.email-card-title {
font-family: ‘Playfair Display’, serif;
font-size: 20px; font-weight: 700;
margin-bottom: 8px;
}
.email-card-sub {
font-size: 13px; color: var(–muted); line-height: 1.6;
margin-bottom: 20px;
}
.email-input-row {
display: flex; gap: 8px;
}
input[type=“email”] {
flex: 1;
background: rgba(255,255,255,0.06);
border: 1px solid var(–border);
border-radius: 10px;
color: var(–text);
font-family: ‘DM Sans’, sans-serif;
font-size: 14px;
padding: 12px 16px;
outline: none;
transition: border-color 0.2s;
}
input[type=“email”]:focus { border-color: var(–lilac); }
input[type=“email”]::placeholder { color: rgba(245,230,255,0.25); }
.email-submit-btn {
background: linear-gradient(135deg, var(–rose), var(–lilac));
border: none; border-radius: 10px;
color: #fff; font-family: ‘DM Sans’, sans-serif;
font-size: 13px; font-weight: 500;
padding: 12px 20px; cursor: pointer;
white-space: nowrap;
transition: opacity 0.15s, transform 0.1s;
}
.email-submit-btn:hover { opacity: 0.88; transform: translateY(-1px); }
.email-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.email-success {
color: #86efac; font-size: 14px; margin-top: 12px;
animation: fadein 0.3s ease;
}
.email-skip {
background: none; border: none; color: var(–muted);
font-family: ‘DM Sans’, sans-serif; font-size: 12px;
cursor: pointer; margin-top: 12px; text-decoration: underline;
display: block; width: 100%; text-align: center;
}
.email-skip:hover { color: var(–text); }
.email-privacy {
font-size: 10px; color: rgba(245,230,255,0.25);
margin-top: 10px; letter-spacing: 0.5px;
}

@media (max-width: 480px) {
.container { padding: 32px 16px 60px; }
.card { padding: 24px 20px; }
.names-row { grid-template-columns: 1fr; }
.names-row .heart-divider { display: none; }
.upsell { grid-template-columns: 1fr; }
.meter-card, .signals-card, .advice-card, .share-card, .email-card { padding: 24px 20px; }
.email-input-row { flex-direction: column; }
.email-submit-btn { width: 100%; }
}
`;

const HEARTS = [“💕”,“💖”,“💗”,“💓”,“✨”,“🌸”,“💫”,“🩷”];
const LOADING_MSGS = [
{ emoji: “🔍”, msg: “Reading between the lines…”, sub: “Analysing message patterns” },
{ emoji: “💭”, msg: “Decoding the vibes…”, sub: “Cross-referencing 10,000 situationships” },
{ emoji: “🫀”, msg: “Feeling this out…”, sub: “Almost there” },
{ emoji: “✨”, msg: “Preparing your verdict…”, sub: “This might sting a little” },
];

const VIBES = [“💬 Texts only”, “📞 We call too”, “👀 Mixed signals”, “🥶 They’re cold”, “🔥 Very flirty”, “👻 Sometimes ghosts me”];

function FloatingHearts() {
const hearts = Array.from({ length: 12 }, (_, i) => ({
id: i,
left: `${Math.random() * 100}%`,
delay: `${Math.random() * 8}s`,
duration: `${6 + Math.random() * 8}s`,
emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
size: `${14 + Math.random() * 16}px`,
}));
return (
<div className="hearts">
{hearts.map(h => (
<div key={h.id} className=“heart” style={{
left: h.left, fontSize: h.size,
animationDelay: h.delay, animationDuration: h.duration,
}}>{h.emoji}</div>
))}
</div>
);
}

function parseResult(text) {
try {
const clean = text.replace(/`json|`/g, “”).trim();
const start = clean.indexOf(”{”);
const end = clean.lastIndexOf(”}”);
return JSON.parse(clean.slice(start, end + 1));
} catch {
return null;
}
}

function ScoreMeter({ score }) {
const [displayed, setDisplayed] = useState(0);
useEffect(() => {
const t = setTimeout(() => setDisplayed(score), 300);
return () => clearTimeout(t);
}, [score]);

const emoji = score >= 80 ? “😍” : score >= 60 ? “🥺” : score >= 40 ? “😬” : “💔”;
const label = score >= 80 ? “They’re into you” : score >= 60 ? “Probably interested” : score >= 40 ? “Hard to tell…” : “Not looking good”;

return (
<div>
<span className="verdict-emoji">{emoji}</span>
<div className="verdict-title">{label}</div>
<div className="score-wrap">
<div className="score-label-row">
<span>NOT FEELING IT</span>
<span>OBSESSED WITH YOU</span>
</div>
<div className="meter-track">
<div className=“meter-fill” style={{ width: `${displayed}%` }} />
</div>
</div>
<div className="score-number">{score}%</div>
<div className="score-suffix">likelihood they like you</div>
</div>
);
}

export default function DoesThisPersonLikeMe() {
const [yourName, setYourName] = useState(””);
const [theirName, setTheirName] = useState(””);
const [texts, setTexts] = useState(””);
const [context, setContext] = useState(””);
const [selectedVibes, setSelectedVibes] = useState([]);
const [loading, setLoading] = useState(false);
const [loadingIdx, setLoadingIdx] = useState(0);
const [result, setResult] = useState(null);
const [copied, setCopied] = useState(false);
const [email, setEmail] = useState(””);
const [emailSubmitted, setEmailSubmitted] = useState(false);
const [emailSkipped, setEmailSkipped] = useState(false);
const [emailLoading, setEmailLoading] = useState(false);

const toggleVibe = (v) => setSelectedVibes(prev =>
prev.includes(v) ? prev.filter(x => x !== v) : […prev, v]
);

const handleAnalyse = async () => {
if (!texts.trim()) return;
setLoading(true); setResult(null); setLoadingIdx(0);

```
const interval = setInterval(() => {
  setLoadingIdx(i => (i + 1) % LOADING_MSGS.length);
}, 2000);

const prompt = `You are a world-class relationship analyst. Analyse the following text conversation and determine how likely this person likes the user romantically.
```

User’s name: ${yourName || “User”}
Their name: ${theirName || “Them”}
${context ? `Context: ${context}` : “”}
${selectedVibes.length ? `Vibes noted: ${selectedVibes.join(", ")}` : “”}

Text conversation:
${texts.slice(0, 3000)}

Respond ONLY with a valid JSON object (no markdown, no extra text):
{
“score”: <number 0-100>,
“verdict”: “<one punchy sentence verdict, brutally honest but warm>”,
“signals”: [
{ “type”: “green|yellow|red”, “icon”: “<emoji>”, “label”: “<short label>”, “desc”: “<1-2 sentence explanation>” },
{ “type”: “green|yellow|red”, “icon”: “<emoji>”, “label”: “<short label>”, “desc”: “<1-2 sentence explanation>” },
{ “type”: “green|yellow|red”, “icon”: “<emoji>”, “label”: “<short label>”, “desc”: “<1-2 sentence explanation>” },
{ “type”: “green|yellow|red”, “icon”: “<emoji>”, “label”: “<short label>”, “desc”: “<1-2 sentence explanation>” }
],
“advice”: “<2-3 sentences of actionable, honest advice on what to do next. Be a wise best friend, not a therapist.>”
}`;

```
try {
  const res = await fetch("https://emea01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fapi.anthropic.com%2Fv1%2Fmessages&data=05%7C02%7C%7Cbf7dfb12a1e243c26e1008dead321e0d%7C84df9e7fe9f640afb435aaaaaaaaaaaa%7C1%7C0%7C639138627925347013%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=fd8MGmkSc%2Bwf9RsulFww1JYtrVVvUQy0EoUsFx7tygE%3D&reserved=0", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  const text = data.content?.map(b => b.text || "").join("") || "";
  const parsed = parseResult(text);
  if (parsed) setResult(parsed);
  else setResult({
    score: 50,
    verdict: "The vibes are… complicated. Hard to say for sure.",
    signals: [{ type: "yellow", icon: "🤔", label: "Ambiguous signals", desc: "The conversation didn't give enough clear signals either way." }],
    advice: "The best way to know is to be direct. Life's too short for guessing games."
  });
} catch {
  setResult({
    score: 50,
    verdict: "Something went wrong — but that's more than I can say for your situationship.",
    signals: [],
    advice: "Try again with a clearer paste of your conversation."
  });
}

clearInterval(interval);
setLoading(false);
```

};

const shareText = result
? `💕 Does ${theirName || "my person"} like me? AI says: ${result.score}% — "${result.verdict}" doesthispersonlikeme.app`
: “”;

const handleEmailSubmit = async () => {
if (!email || !email.includes(”@”)) return;
setEmailLoading(true);
// Replace YOUR_MAILCHIMP_URL with your Mailchimp signup form action URL
// For now we simulate success — hook up Mailchimp later
await new Promise(r => setTimeout(r, 1000));
setEmailSubmitted(true);
setEmailLoading(false);
};

const handleCopy = () => {
navigator.clipboard.writeText(shareText);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};

const lm = LOADING_MSGS[loadingIdx];

return (
<>
<style>{styles}</style>
<div className="app">
<div className="bg" />
<FloatingHearts />

```
    <div className="container">
      <div className="header">
        <span className="logo-emoji">💌</span>
        <h1>Does this person<br /><em>actually</em> like you?</h1>
        <p className="subtitle">
          Paste your texts. Get a brutally honest AI verdict.<br />
          No more overthinking at 2am.
        </p>
      </div>

      {!loading && !result && (
        <>
          <div className="card">
            <span className="card-label">Who are we analysing?</span>
            <div className="names-row">
              <input type="text" placeholder="Your name" value={yourName} onChange={e => setYourName(e.target.value)} />
              <div className="heart-divider">💕</div>
              <input type="text" placeholder="Their name" value={theirName} onChange={e => setTheirName(e.target.value)} />
            </div>

            <span className="card-label">Paste your text conversation</span>
            <textarea
              placeholder={`${theirName || "Them"}: hey what are you up to tonight?\n${yourName || "You"}: not much, why?\n${theirName || "Them"}: just wondering 👀\n\n[paste your real texts here]`}
              value={texts}
              onChange={e => setTexts(e.target.value)}
            />
            <div className="char-count">{texts.length} characters</div>
          </div>

          <div className="card">
            <span className="card-label">Any extra context? (optional)</span>
            <input
              type="text"
              placeholder={`e.g. "We met at a party 2 weeks ago" or "We've been friends for years"`}
              value={context}
              onChange={e => setContext(e.target.value)}
              style={{ marginBottom: 16 }}
            />

            <span className="card-label">Describe the vibe</span>
            <div className="vibe-row">
              {VIBES.map(v => (
                <button key={v} className={`vibe-btn ${selectedVibes.includes(v) ? "selected" : ""}`}
                  onClick={() => toggleVibe(v)}>{v}</button>
              ))}
            </div>
          </div>

          <button className="submit-btn" onClick={handleAnalyse} disabled={!texts.trim()}>
            ✨ Analyse the vibes
          </button>
        </>
      )}

      {loading && (
        <div className="card loading">
          <span className="loading-emoji">{lm.emoji}</span>
          <div className="loading-msg">{lm.msg}</div>
          <div className="loading-sub">{lm.sub}</div>
          <div className="loading-dots" style={{ marginTop: 20 }}>
            <span /><span /><span />
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="result">
          <div className="meter-card">
            <ScoreMeter score={result.score} />
            <p className="verdict-text">"{result.verdict}"</p>
          </div>

          {/* Email capture — show after score, before signals */}
          {!emailSubmitted && !emailSkipped && (
            <div className="email-card">
              <span className="email-card-emoji">💌</span>
              <div className="email-card-title">Get your full report by email</div>
              <div className="email-card-sub">
                We'll send a deeper breakdown of every signal,<br />
                plus exactly what to say next. Free.
              </div>
              <div className="email-input-row">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleEmailSubmit()}
                />
                <button className="email-submit-btn" onClick={handleEmailSubmit} disabled={emailLoading || !email.includes("@")}>
                  {emailLoading ? "Sending…" : "Send it 💕"}
                </button>
              </div>
              <button className="email-skip" onClick={() => setEmailSkipped(true)}>
                No thanks, I'll just read it here
              </button>
              <div className="email-privacy">🔒 No spam. Unsubscribe anytime. Your texts are never stored.</div>
            </div>
          )}

          {emailSubmitted && (
            <div className="email-card">
              <span className="email-card-emoji">✅</span>
              <div className="email-card-title">It's on its way!</div>
              <div className="email-card-sub">Check your inbox in the next 2 minutes.<br />Check spam if you don't see it.</div>
            </div>
          )}

          {result.signals?.length > 0 && (
            <div className="signals-card">
              <div className="signals-title">📡 What the texts reveal</div>
              {result.signals.map((s, i) => (
                <div className="signal" key={i}>
                  <div className="signal-icon">{s.icon}</div>
                  <div className="signal-content">
                    <div className={`signal-label ${s.type}`}>{s.label}</div>
                    <div className="signal-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {result.advice && (
            <div className="advice-card">
              <div className="advice-title">💬 What to do next</div>
              <div className="advice-text">{result.advice}</div>
            </div>
          )}

          <div className="share-card">
            <div className="share-title">📤 Share your result</div>
            <div className="share-result-box">
              💕 Does <strong>{theirName || "my person"}</strong> like me?<br />
              AI says: <strong>{result.score}%</strong> — "{result.verdict}"
            </div>
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? "✓ Copied!" : "Copy to share"}
            </button>
          </div>

          <div className="upsell">
            <div className="upsell-item">
              <span className="upsell-emoji">💬</span>
              <div className="upsell-price">£4.99</div>
              <div className="upsell-name">What to reply next</div>
            </div>
            <div className="upsell-item">
              <span className="upsell-emoji">📞</span>
              <div className="upsell-price">£9.99</div>
              <div className="upsell-name">Full relationship report</div>
            </div>
          </div>

          <button className="reset-btn" onClick={() => { setResult(null); setTexts(""); setContext(""); setSelectedVibes([]); setEmail(""); setEmailSubmitted(false); setEmailSkipped(false); }}>
            ↩ Analyse someone else
          </button>
        </div>
      )}
    </div>
  </div>
</>
```

);
}
