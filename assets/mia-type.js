/* ============================================================
   Hallo Mia — hero typewriter
   Types a rotating set of real prompts after "Hallo Mia,".
   Fixed, pre-shuffled order: never two of the same kind in a row.
   ============================================================ */
(function () {
  var el = document.getElementById('miaTyped');
  if (!el) return;

  var phrases = [
    'Schrijf mijn SEO-tekst',
    'Maak mijn social posts',
    'Analyseer mijn cijfers',
    'Schrijf een advertentietekst',
    'Schrijf een nieuwe post',
    'Verbeter mijn vindbaarheid',
    'Schrijf mijn nieuwsbrief',
    'Wat werkte vorige maand?',
    'Maak een carrousel',
    'Wat komt er deze maand aan?',
    'Schrijf een blog',
    "Welke pagina's lopen goed?",
    'Bedenk drie advertenties',
    'Plan een maand aan posts',
    'Mail mijn klanten',
    'Bedenk goede zoekwoorden',
    'Waarom daalt mijn bezoek?',
    'Maak een visual',
    'Bereid de feestdagen voor',
    'Val op in AI-zoekresultaten'
  ];

  // Reduced motion: show one prompt, no animation.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = phrases[0];
    return;
  }

  var TYPE = 46;      // ms per character typed
  var TYPE_VAR = 50;  // random extra, makes it feel human
  var DELETE = 24;    // ms per character deleted
  var HOLD = 1700;    // pause once a phrase is fully typed
  var GAP = 380;      // pause between phrases (empty field)

  var i = 0, ci = 0, deleting = false;

  function tick() {
    var full = phrases[i];
    if (!deleting) {
      ci++;
      el.textContent = full.slice(0, ci);
      if (ci >= full.length) { deleting = true; return setTimeout(tick, HOLD); }
      setTimeout(tick, TYPE + Math.random() * TYPE_VAR);
    } else {
      ci--;
      el.textContent = full.slice(0, ci);
      if (ci <= 0) { deleting = false; i = (i + 1) % phrases.length; return setTimeout(tick, GAP); }
      setTimeout(tick, DELETE);
    }
  }

  setTimeout(tick, 650);
})();
