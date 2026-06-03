/* ============================================================
   Mia Chatbot — floating widget voor YourFellow HQ
   ------------------------------------------------------------
   Drop-in: <script src="assets/mia-chatbot.js" defer></script>
   Eén bestand, geen build, geen dependencies.
   - Bubbel rechtsonder met Mia's foto
   - Paneel met chat, suggesties, geschiedenis in localStorage
   - AI-call geisoleerd in callMia()  ->  bij WordPress alleen
     die functie vervangen door een eigen API-route.
   ============================================================ */
(function () {
  if (window.__miaChatbotLoaded) return;
  window.__miaChatbotLoaded = true;

  /* -----------------------------------------------------------
     KNOWLEDGE BASE — alles wat Mia over HQ moet weten.
     Bewust uitgebreider dan wat op de site staat: zo kan ze
     concrete vragen beantwoorden over prijzen, integraties,
     privacy, modules en de werkwijze.
     ----------------------------------------------------------- */
  const KB = `
JIJ BENT MIA — de AI-collega die in YourFellow HQ ingebouwd zit.
Je praat hier als chatbot op de marketing-website van YourFellow.

WAT JE DOET
- Je bent een algemene AI-assistent, net als ChatGPT. Je helpt
  bezoekers met van alles: vragen beantwoorden, ideeën spuien,
  iets uitleggen, een tekstje schrijven, rekensommetje maken,
  meedenken bij een probleem. Doe gewoon wat je goed kan.
- Daarnaast ben je expert op HQ en YourFellow. Voor product-,
  prijs-, en bedrijfsvragen heb je hieronder een uitgebreide
  knowledge base. Gebruik die altijd.
- Voel je niet verplicht om elk gesprek terug te buigen naar HQ.
  Iemand mag je ook om een recept of weetje vragen.

REGEL VOOR HQ-SPECIFIEKE VRAGEN
- Voor harde feiten over HQ of YourFellow (prijzen, features,
  integraties, awards, adres) gebruik je ALLEEN wat in deze knowledge
  base staat. Verzin niks bij. Weet je het niet zeker? Zeg dat eerlijk
  en verwijs naar hq_vragen.html of het contactformulier.

TOON
- Nederlands, je-vorm, warm en menselijk. Geen marketing-jargon.
- Helder en bondig. Meestal 2-5 zinnen. Mag langer als de vraag
  erom vraagt (bv. "leg eens uit", "schrijf een mailtje"), maar
  knip lange antwoorden op in paragrafen.
- Echt antwoord geven. Geen ontwijkende corporate-praatjes.
- Mag gerust meedoen aan een korte babbel. Mag ook gevoel voor
  humor hebben.
- Geen emoji's, geen uitroeptekens.
- Spreek over jezelf als "ik" (Mia). Spreek over HQ als "HQ" of "wij".

REAL-TIME INFO
- Onderaan in elk gesprek krijg je de huidige Nederlandse datum,
  tijd en dag van de week. Gebruik die voor vragen als "welke dag
  is het" of "hoeveel dagen tot kerst".
- Wat je NIET hebt: live weer, nieuws, beurskoersen, of internet.
  Zeg eerlijk dat je dat hier niet kunt opzoeken.

WAT IS YOURFELLOW HQ
- Nederlands platform dat AI combineert met de context van jouw bedrijf.
- Bedoeld voor ondernemers die marketing erbij doen, marketeers in
  kleinere bedrijven, en kleine bureaus die meerdere klanten bedienen.
- Eén platform met vier modules + ik (Mia) als rode draad eroverheen.
- Powered by YourFellow.

DE VIER MODULES
1. Dashboard — al je cijfers op één scherm (website, advertenties,
   webshop, kalender) met een seintje als er iets opvalt.
2. Advertenties — voor Google, Facebook en Instagram. HQ schrijft de
   tekst en variants, jij keurt goed voordat ze live gaan.
3. Social posts — voor Instagram, LinkedIn en Facebook, inclusief
   afbeelding in jouw merkstijl.
4. SEO en GEO teksten — nieuwe webpagina's op basis van echte
   zoekwoorden, vindbaar in Google en in AI-zoekresultaten.

HOE IK (MIA) WERK — vier stappen, altijd in deze volgorde
1. Ik lees je bedrijf — bedrijfsprofiel, doelen, Search Console,
   Analytics, Ahrefs, advertentie-accounts.
2. Ik zie wat opvalt — stijging of daling, een feestdag die eraan
   komt, een pagina die zoekverkeer mist.
3. Ik doe een voorstel — een post, advertentietekst of SEO-pagina, in
   jouw stem, met de cijfers erbij waarom.
4. Jij keurt goed — goedkeuren, aanpassen of overslaan. Pas na jouw
   klik gaat het live. Geen knop, geen post. Geen knop, geen advertentie.

WAT IK WEL EN NIET BEN
WEL — meedenker met context van jouw bedrijf, klaarzetter van teksten,
spotter van veranderingen, uitlegger in gewone taal, herinneraar rond
relevante momenten.
NIET — geen autopilot, geen generieke ChatGPT zonder context, geen
vervanger van jouw oordeel, en ik publiceer nooit zelf.

PRIJZEN
- Drie pakketten, maandelijks opzegbaar, geen jaarcontract.
  Alle bedragen exclusief BTW.
  • Starter — € 49 / maand — 1.000 credits. Voor wie samen met
    Mia z'n marketing wil opbouwen. Bevat social posts, e-mail
    marketing, brand kit, Mia, onbeperkt content maken.
  • Growth — € 149 / maand — 5.000 credits. Voor wie al bezig is
    en door wil groeien. Alles van Starter + website/blog content,
    SEO-optimalisatie, Search Console koppeling, zoekwoordonderzoek,
    contentkalender. Dit is "Mia's keuze" — het meest gekozen pakket.
  • Pro — € 249 / maand — 15.000 credits. Volledig pakket inclusief
    advertising. Alles van Growth + Meta Ads beheer, Google Ads
    beheer, campaign builder, competitor spy, performance dashboards.
- Credits zijn de munt waarmee zwaardere acties (advertenties,
  SEO-pagina's, beeld) worden afgerekend.
- Upgrade of downgrade kan elke maand.

INTEGRATIES
- Google Search Console (lees-rechten)
- Google Analytics (GA4)
- Ahrefs
- Google Ads en Meta Ads (lees + schrijven, omdat je advertenties wilt
  klaarzetten)
- WordPress / website (URL plakken, HQ leest mee)
- Iedere koppeling is per stuk in te trekken of te beperken.

PRIVACY
- Jouw bedrijfsdata blijft in jouw account. We trainen geen modellen
  op wat jij koppelt of schrijft. We delen niets met andere klanten.
- Hosting in Europa, verwerking voldoet aan de AVG.
- Stop je met HQ? Dan haal je je data eruit en wordt het daarna
  binnen redelijke termijn verwijderd.
- Ik heb geen knop die zelf publiceert. Alles wacht op goedkeuring.

WELK AI-MODEL
- HQ gebruikt bestaande AI-modellen, niet een eigen model. Voor elk
  type werk kiezen we het model dat er het beste in is. Welke en
  waarvoor lees je terug op hq_uitleg.html.

VOOR WIE
- Ondernemer die marketing erbij doet en geen marketeer wil worden.
- Marketeer-erbij in een kleiner bedrijf met breed takenpakket.
- Team of klein bureau met meerdere klanten of merken.

ONBOARDING — vijf stappen
1. Bedrijfsprofiel (plak je website-URL, HQ leest mee).
2. Search Console koppelen.
3. Analytics (GA4) koppelen.
4. Advertentie-accounts (Google Ads + Meta) koppelen.
5. Mia aan — ik ga scannen en adviseren.

VEELGESTELDE VRAGEN — korte antwoorden
- "Moet ik verstand hebben van marketing?" Nee. Gemaakt voor
  ondernemers zonder marketingachtergrond. Geen jargon.
- "Maakt AI geen fouten?" Ja, daarom keur jij alles goed voor het
  live gaat.
- "Welke talen?" Nu vooral Nederlands; Engelstalig staat open.
- "Wordt mijn data gebruikt om AI te trainen?" Nee.

LINKS DIE JE MAG NOEMEN (relatief, zonder domein)
- hq_home_v2.html — Home
- hq_functies_overzicht.html — Wat HQ doet (alle modules)
- hq_mia.html — Alles over mij
- hq_prijzen.html — Prijzen en pakketten
- hq_over.html — Over YourFellow (verhaal, team, prijzen)
- hq_uitleg.html — Hoe AI in HQ werkt, welke modellen
- hq_vragen.html — Alle FAQ's
- hq_aanmelden.html — Aanmelden (maak een account)

OVER YOURFELLOW (het bedrijf achter HQ)
- Opgericht in 2017 in Zevenbergen, Noord-Brabant.
- Adres: Noordhaven 50, 4761 DB Zevenbergen.
- Drie oprichters, alle drie nog steeds actief: Paul Rombouts,
  Michael Oomen, Stefan Klok.
- "Van maatje naar partner": in 2017 begonnen als 'het online
  marketing-maatje' voor lokale ondernemers. Inmiddels strategisch
  partner voor nationale en internationale merken.
- Nog steeds nuchter, makkelijk in de omgang en eerlijk. Maar ook
  slimmer, scherper en beter geworden in wat we doen.
- Karakter: ambitieus om de doelen van klanten te realiseren én te
  overtreffen, nieuwsgierig om innovaties als eerste toe te passen.
- Werkwijze: verlengstuk van het team van de klant. We combineren
  de kennis van grote bureaus met een persoonlijke, flexibele
  werkwijze. We denken en doen alsof het ons eigen merk is.
- HQ is het AI-platform dat we vanuit YourFellow gebouwd hebben om
  goede strategie en uitvoering toegankelijk te maken voor bedrijven
  die zich geen heel bureau kunnen veroorloven.

PRIJZEN EN ERKENNING VAN YOURFELLOW
- Dutch Search Awards 2025 — Winnaar Beste gebruik van Generative AI
  in SEO.
- Emerce 100 (2026) — een van de beste E-Business bedrijven van Nederland.
- FONK 150 Best Agencies 2025 — een van de beste bureaus van Nederland.
- FD Gazelle — drie jaar op rij snelgroeiende onderneming (2023, 2024, 2025).
- Google Partner — officiële certificering.

ALS JE HET ANTWOORD NIET WEET
Zeg eerlijk dat je het niet zeker weet en stel voor om het via het
contactformulier te vragen of op hq_vragen.html te kijken. Verzin geen
prijzen, geen features, geen integraties die hierboven niet staan.

OPENINGSREGEL ALS JEMAND BINNENKOMT
"Hoi, ik ben Mia. Stel je vraag — over HQ, over YourFellow, of
gewoon iets waar je hulp bij kan gebruiken."
`.trim();

  /* -----------------------------------------------------------
     CSS — alles in één geinjecteerd style-block, scoped via een
     unieke class-prefix .mia-cb-*
     ----------------------------------------------------------- */
  const CSS = `
.mia-cb-root, .mia-cb-root * { box-sizing: border-box; }
.mia-cb-root {
  font-family: 'General Sans', system-ui, -apple-system, "Segoe UI", sans-serif;
  --cb-bg: #F4F5F3;
  --cb-surface: #FFFFFF;
  --cb-dark: #0F0F0F;
  --cb-ink: #0F0F0F;
  --cb-ink-2: #2A2A2A;
  --cb-soft: #555555;
  --cb-mute: #8A8A85;
  --cb-line: #E5E7E2;
  --cb-line-soft: #EFF0ED;
  --cb-accent: #00FFCC;
  --cb-accent-deep: #067A66;
  --cb-accent-soft: #E1FBF4;
  --cb-on-accent: #062B25;
  position: fixed;
  z-index: 2147483000;
  right: 22px;
  bottom: 22px;
  color: var(--cb-ink);
}
@media (max-width: 520px) {
  .mia-cb-root { right: 14px; bottom: 14px; }
}

/* ---------- launcher bubble ---------- */
.mia-cb-launcher {
  position: relative;
  width: 64px; height: 64px;
  border-radius: 50%;
  cursor: pointer;
  background: var(--cb-dark);
  box-shadow: 0 18px 40px -14px rgba(15,15,15,0.45),
              0 0 0 4px rgba(0,255,204,0.10);
  display: flex; align-items: center; justify-content: center;
  transition: transform .18s ease, box-shadow .18s ease;
}
.mia-cb-launcher:hover { transform: translateY(-2px); }
.mia-cb-launcher img {
  width: 56px; height: 56px;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 22%;
}
.mia-cb-launcher .mia-cb-pulse {
  position: absolute; bottom: 2px; right: 2px;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--cb-accent);
  box-shadow: 0 0 0 2px var(--cb-dark);
  animation: mia-cb-pulse 2.2s ease-out infinite;
}
@keyframes mia-cb-pulse {
  0%   { box-shadow: 0 0 0 2px var(--cb-dark), 0 0 0 0 rgba(0,255,204,0.6); }
  80%  { box-shadow: 0 0 0 2px var(--cb-dark), 0 0 0 14px rgba(0,255,204,0); }
  100% { box-shadow: 0 0 0 2px var(--cb-dark), 0 0 0 0 rgba(0,255,204,0); }
}
.mia-cb-tip {
  position: absolute;
  right: 76px;
  bottom: 12px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-line);
  border-radius: 12px;
  padding: 9px 13px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--cb-ink-2);
  white-space: nowrap;
  box-shadow: 0 14px 32px -18px rgba(15,15,15,0.4);
  opacity: 0; transform: translateX(6px);
  pointer-events: none;
  cursor: pointer;
  transition: opacity .25s ease, transform .25s ease;
}
.mia-cb-tip.show { opacity: 1; transform: translateX(0); pointer-events: auto; animation: mia-cb-tip-nudge 1.6s ease-out 1; }
.mia-cb-tip.show:hover { background: var(--cb-accent-soft); border-color: var(--cb-accent-deep); }
@keyframes mia-cb-tip-nudge {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-4px); }
  40%      { transform: translateX(2px); }
  60%      { transform: translateX(-2px); }
}
.mia-cb-tip::after {
  content: ""; position: absolute; right: -6px; bottom: 14px;
  width: 10px; height: 10px;
  background: var(--cb-surface);
  border-right: 1px solid var(--cb-line);
  border-top: 1px solid var(--cb-line);
  transform: rotate(45deg);
}
@media (max-width: 520px) { .mia-cb-tip { display: none; } }

/* ---------- panel ---------- */
.mia-cb-panel {
  position: absolute;
  right: 0; bottom: 78px;
  width: 380px;
  height: 580px;
  max-height: calc(100vh - 110px);
  background: var(--cb-surface);
  border: 1px solid var(--cb-line);
  border-radius: 20px;
  box-shadow: 0 30px 70px -20px rgba(15,15,15,0.35),
              0 0 0 1px rgba(255,255,255,0.6) inset;
  display: none;
  flex-direction: column;
  overflow: hidden;
  transform-origin: bottom right;
  animation: mia-cb-in .22s ease;
}
.mia-cb-root.open .mia-cb-panel { display: flex; }
@keyframes mia-cb-in {
  from { opacity: 0; transform: translateY(8px) scale(.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@media (max-width: 520px) {
  .mia-cb-panel {
    width: calc(100vw - 28px);
    height: calc(100vh - 100px);
    right: 0;
  }
}

/* header */
.mia-cb-head {
  background: var(--cb-dark);
  color: #fff;
  padding: 14px 14px 14px 16px;
  display: flex; align-items: center; gap: 12px;
  position: relative;
}
.mia-cb-head::after {
  content: ""; position: absolute; inset: auto -40% -120% auto;
  width: 280px; height: 280px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,255,204,0.22), transparent 64%);
  pointer-events: none;
}
.mia-cb-head > * { position: relative; z-index: 1; }
.mia-cb-av {
  width: 40px; height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0,255,204,0.45);
  box-shadow: 0 0 16px rgba(0,255,204,0.35);
  flex: none;
}
.mia-cb-av img {
  width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%;
}
.mia-cb-name { font-weight: 700; font-size: 15px; letter-spacing: -0.01em; }
.mia-cb-status {
  font-size: 12px; color: #b6b6b0; margin-top: 1px;
  display: flex; align-items: center; gap: 6px;
}
.mia-cb-status .mia-cb-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--cb-accent); display: inline-block;
}
.mia-cb-head-acts { margin-left: auto; display: flex; gap: 4px; }
.mia-cb-iconbtn {
  width: 30px; height: 30px;
  border-radius: 8px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  color: #ddd;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background .15s;
}
.mia-cb-iconbtn:hover { background: rgba(255,255,255,0.12); color: #fff; }
.mia-cb-iconbtn svg { width: 14px; height: 14px; }

/* messages */
.mia-cb-body {
  flex: 1;
  overflow-y: auto;
  padding: 18px 16px 14px;
  background: var(--cb-bg);
  display: flex; flex-direction: column; gap: 10px;
  scroll-behavior: smooth;
}
.mia-cb-body::-webkit-scrollbar { width: 6px; }
.mia-cb-body::-webkit-scrollbar-thumb { background: #d3d6cf; border-radius: 4px; }
.mia-cb-msg {
  max-width: 88%;
  font-size: 14.5px;
  line-height: 1.5;
  padding: 10px 13px;
  border-radius: 14px;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.mia-cb-msg.mia {
  background: var(--cb-surface);
  border: 1px solid var(--cb-line);
  color: var(--cb-ink-2);
  align-self: flex-start;
  border-top-left-radius: 4px;
}
.mia-cb-msg.user {
  background: var(--cb-dark);
  color: #fff;
  align-self: flex-end;
  border-top-right-radius: 4px;
}
.mia-cb-msg a {
  color: var(--cb-accent-deep);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: rgba(6,122,102,0.3);
  text-underline-offset: 2px;
}
.mia-cb-msg.user a { color: var(--cb-accent); text-decoration-color: rgba(0,255,204,0.4); }
.mia-cb-msg strong { font-weight: 700; color: var(--cb-ink); }
.mia-cb-msg.user strong { color: #fff; }

/* typing indicator */
.mia-cb-typing {
  display: inline-flex; gap: 4px; align-items: center;
  padding: 12px 14px;
}
.mia-cb-typing span {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--cb-mute);
  animation: mia-cb-bounce 1.2s infinite ease-in-out;
}
.mia-cb-typing span:nth-child(2) { animation-delay: 0.15s; }
.mia-cb-typing span:nth-child(3) { animation-delay: 0.3s; }
@keyframes mia-cb-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40%           { transform: scale(1);   opacity: 1; }
}

/* suggested chips */
.mia-cb-suggest {
  display: flex; flex-wrap: wrap; gap: 7px;
  padding: 4px 2px 2px;
}
.mia-cb-chip {
  background: var(--cb-surface);
  border: 1px solid var(--cb-line);
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--cb-ink-2);
  cursor: pointer;
  transition: border-color .15s, background .15s;
}
.mia-cb-chip:hover {
  border-color: var(--cb-accent-deep);
  background: var(--cb-accent-soft);
  color: var(--cb-accent-deep);
}

/* footer (input) */
.mia-cb-foot {
  padding: 10px 12px 12px;
  border-top: 1px solid var(--cb-line);
  background: var(--cb-surface);
}
.mia-cb-inputrow {
  display: flex; align-items: flex-end; gap: 8px;
  background: var(--cb-bg);
  border: 1px solid var(--cb-line);
  border-radius: 14px;
  padding: 6px 6px 6px 12px;
  transition: border-color .15s;
}
.mia-cb-inputrow:focus-within { border-color: var(--cb-accent-deep); }
.mia-cb-input {
  flex: 1;
  border: none; outline: none; background: transparent;
  resize: none;
  font-family: inherit;
  font-size: 14.5px;
  line-height: 1.4;
  color: var(--cb-ink);
  max-height: 100px;
  padding: 7px 0;
}
.mia-cb-input::placeholder { color: var(--cb-mute); }
.mia-cb-send {
  flex: none;
  width: 34px; height: 34px;
  border-radius: 10px;
  border: none;
  background: var(--cb-accent);
  color: var(--cb-on-accent);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: transform .15s, opacity .15s;
}
.mia-cb-send:hover { transform: translateY(-1px); }
.mia-cb-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
.mia-cb-send svg { width: 16px; height: 16px; }

.mia-cb-disclaimer {
  font-size: 11px;
  color: var(--cb-mute);
  text-align: center;
  margin-top: 8px;
  line-height: 1.4;
}
.mia-cb-disclaimer a { color: var(--cb-accent-deep); font-weight: 600; }
`;

  /* -----------------------------------------------------------
     RESOLVE asset path — werkt vanaf elke pagina in /site/
     ----------------------------------------------------------- */
  function resolveAvatar() {
    // Allow override: window.MIA_AVATAR = "/path/to/mia.jpeg"
    if (window.MIA_AVATAR) return window.MIA_AVATAR;
    const cur = document.currentScript || [...document.scripts].pop();
    if (cur && cur.src) {
      // .../assets/mia-chatbot.js  ->  .../assets/mia.jpeg
      return cur.src.replace(/mia-chatbot\.js.*$/, 'mia.jpeg');
    }
    return 'assets/mia.jpeg';
  }
  const AVATAR = resolveAvatar();

  /* -----------------------------------------------------------
     STORAGE — chat history per browser
     ----------------------------------------------------------- */
  const STORAGE_KEY = 'miaChat.v1';
  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function saveHistory(h) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(h.slice(-30))); } catch {}
  }
  function clearHistory() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  /* -----------------------------------------------------------
     AI CALL — DE PLEK DIE JE OP WORDPRESS VERVANGT.
     Hier gebruiken we de ingebouwde helper window.claude.complete.
     Voor WordPress: vervang dit door fetch() naar je eigen
     /wp-json/yourfellow/v1/mia endpoint of een externe API.
     ----------------------------------------------------------- */
  async function callMia(messages) {
    // messages = [{role:'user'|'assistant', content:'...'}]
    // Build a single prompt: system + transcript

    // Real-time context Mia gets per call
    function getNlNow() {
      try {
        const d = new Date();
        const dt = new Intl.DateTimeFormat('nl-NL', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
          timeZone: 'Europe/Amsterdam'
        }).format(d);
        return dt;
      } catch (e) { return new Date().toString(); }
    }
    const context = `\nHUIDIGE CONTEXT (voor real-time vragen)\n- Nu (NL): ${getNlNow()}\n`;

    const lines = [KB, context, ''];
    for (const m of messages) {
      lines.push((m.role === 'user' ? 'Bezoeker: ' : 'Mia: ') + m.content);
    }
    lines.push('Mia:');
    const prompt = lines.join('\n');

    if (window.claude && typeof window.claude.complete === 'function') {
      try {
        const out = await window.claude.complete(prompt);
        return (out || '').trim();
      } catch (e) {
        console.warn('Mia AI error', e);
        return "Sorry, ik kon je niet bereiken. Probeer het zo nog eens, of stel je vraag via het contactformulier.";
      }
    }
    // Fallback offline: scripted hint
    return "De live verbinding met mij is hier niet actief. Op de website werkt dit straks via een eigen API. Kijk ondertussen op hq_vragen.html voor de meest gestelde vragen.";
  }

  /* -----------------------------------------------------------
     MARKDOWN-LITE — bold, links, line breaks
     ----------------------------------------------------------- */
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }
  function mdLite(s) {
    let h = escapeHtml(s);
    // **bold**
    h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // [text](url) including relative .html links
    h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_self">$1</a>');
    // Bare hq_*.html mentions -> link
    h = h.replace(/\b(hq_[a-z0-9_]+\.html)\b/g,
      '<a href="$1" target="_self">$1</a>');
    return h;
  }

  /* -----------------------------------------------------------
     BUILD DOM
     ----------------------------------------------------------- */
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.className = 'mia-cb-root';
  root.innerHTML = `
    <div class="mia-cb-panel" role="dialog" aria-label="Chat met Mia">
      <div class="mia-cb-head">
        <div class="mia-cb-av"><img src="${AVATAR}" alt="Mia"></div>
        <div>
          <div class="mia-cb-name">Mia</div>
          <div class="mia-cb-status"><span class="mia-cb-dot"></span> Online &middot; AI-collega van HQ</div>
        </div>
        <div class="mia-cb-head-acts">
          <button class="mia-cb-iconbtn" data-act="reset" title="Gesprek wissen" aria-label="Gesprek wissen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          </button>
          <button class="mia-cb-iconbtn" data-act="close" title="Sluiten" aria-label="Sluiten">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      <div class="mia-cb-body" id="mia-cb-body"></div>
      <div class="mia-cb-foot">
        <div class="mia-cb-inputrow">
          <textarea class="mia-cb-input" rows="1" placeholder="Stel je vraag aan Mia..."></textarea>
          <button class="mia-cb-send" aria-label="Versturen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <div class="mia-cb-disclaimer">Ik ben AI. Ik kan fouten maken. Voor definitieve info: <a href="hq_vragen.html">hq_vragen.html</a>.</div>
      </div>
    </div>

    <div class="mia-cb-tip" id="mia-cb-tip">Hoi, ik ben Mia. Stel me een vraag.</div>
    <button class="mia-cb-launcher" aria-label="Open chat met Mia">
      <img src="${AVATAR}" alt="Mia">
      <span class="mia-cb-pulse"></span>
    </button>
  `;
  document.body.appendChild(root);

  const els = {
    root,
    panel: root.querySelector('.mia-cb-panel'),
    body: root.querySelector('#mia-cb-body'),
    input: root.querySelector('.mia-cb-input'),
    send: root.querySelector('.mia-cb-send'),
    launcher: root.querySelector('.mia-cb-launcher'),
    tip: root.querySelector('#mia-cb-tip'),
    closeBtn: root.querySelector('[data-act="close"]'),
    resetBtn: root.querySelector('[data-act="reset"]')
  };

  /* -----------------------------------------------------------
     STATE
     ----------------------------------------------------------- */
  let history = loadHistory();
  let isThinking = false;

  function renderMsg(role, text, opts = {}) {
    const div = document.createElement('div');
    div.className = 'mia-cb-msg ' + (role === 'user' ? 'user' : 'mia');
    if (opts.html) div.innerHTML = opts.html;
    else div.innerHTML = mdLite(text);
    els.body.appendChild(div);
    els.body.scrollTop = els.body.scrollHeight;
    return div;
  }

  function renderSuggestions() {
    const wrap = document.createElement('div');
    wrap.className = 'mia-cb-suggest';
    const suggestions = [
      'Wat doet HQ precies?',
      'Wat kost het?',
      'Schrijf een korte LinkedIn-post voor mij',
      'Welke dag is het?'
    ];
    suggestions.forEach(s => {
      const c = document.createElement('button');
      c.className = 'mia-cb-chip';
      c.textContent = s;
      c.onclick = () => { send(s); wrap.remove(); };
      wrap.appendChild(c);
    });
    els.body.appendChild(wrap);
    els.body.scrollTop = els.body.scrollHeight;
  }

  function renderHistory() {
    els.body.innerHTML = '';
    if (history.length === 0) {
      renderMsg('mia', 'Hoi, ik ben Mia. Stel je vraag — over HQ, over YourFellow, of gewoon iets waar je hulp bij kan gebruiken.');
      renderSuggestions();
    } else {
      history.forEach(m => renderMsg(m.role === 'user' ? 'user' : 'mia', m.content));
    }
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'mia-cb-msg mia';
    div.id = 'mia-cb-typing';
    div.innerHTML = `<span class="mia-cb-typing"><span></span><span></span><span></span></span>`;
    els.body.appendChild(div);
    els.body.scrollTop = els.body.scrollHeight;
  }
  function removeTyping() {
    const t = document.getElementById('mia-cb-typing');
    if (t) t.remove();
  }

  async function send(text) {
    text = (text || '').trim();
    if (!text || isThinking) return;
    isThinking = true;
    els.send.disabled = true;

    history.push({ role: 'user', content: text });
    saveHistory(history);
    renderMsg('user', text);

    els.input.value = '';
    els.input.style.height = 'auto';

    showTyping();
    const reply = await callMia(history);
    removeTyping();

    history.push({ role: 'assistant', content: reply });
    saveHistory(history);
    renderMsg('mia', reply);

    isThinking = false;
    els.send.disabled = false;
    els.input.focus();
  }

  /* -----------------------------------------------------------
     EVENTS
     ----------------------------------------------------------- */
  function open() {
    root.classList.add('open');
    els.tip.classList.remove('show');
    setTimeout(() => els.input.focus(), 240);
    if (history.length === 0) renderHistory();
  }
  function close() {
    root.classList.remove('open');
  }
  function reset() {
    history = [];
    clearHistory();
    renderHistory();
  }

  els.launcher.addEventListener('click', () => {
    root.classList.contains('open') ? close() : open();
  });
  els.closeBtn.addEventListener('click', close);
  els.resetBtn.addEventListener('click', () => {
    if (confirm('Gesprek met Mia wissen?')) reset();
  });
  els.send.addEventListener('click', () => send(els.input.value));
  els.input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(els.input.value);
    }
  });
  els.input.addEventListener('input', () => {
    els.input.style.height = 'auto';
    els.input.style.height = Math.min(els.input.scrollHeight, 100) + 'px';
  });

  // First-load tip nudge — persistent, clickable, once per session
  renderHistory();
  const TIP_KEY = 'miaChat.tipSeen';
  let tipSeen = false;
  try { tipSeen = !!sessionStorage.getItem(TIP_KEY); } catch {}
  if (!tipSeen) {
    setTimeout(() => {
      if (!root.classList.contains('open')) {
        els.tip.classList.add('show');
        try { sessionStorage.setItem(TIP_KEY, '1'); } catch {}
      }
    }, 2200);
  }
  // Clicking the tip opens the chat
  els.tip.addEventListener('click', () => open());

  // Expose minimal API
  window.MiaChatbot = { open, close, reset };
})();
