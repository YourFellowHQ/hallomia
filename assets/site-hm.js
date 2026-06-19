/* ============================================================
   Hallo Mia, shared nav + footer (clean-URL / folder structure)
   Pages include <div id="site-nav"></div> and <div id="site-foot"></div>,
   set <body data-page="..."> for the active link and
   <body data-depth="0"> on the homepage (root) or data-depth="1" on subpages.
   ============================================================ */
(function(){

  /* ============================================================
     CRM-KOPPELING (Constant Contact Lead Gen & CRM, ex-SharpSpring)
     >>> VUL HIER de vier gegevens van Paul / Constant Contact in. <<<
     Zolang ENDPOINT leeg is draait alles in DEMO-modus: elk formulier
     toont gewoon zijn succesboodschap zonder iets te versturen.
     Zodra je ENDPOINT (+ de rest) invult, verstuurt de HELE site direct
     echt naar Constant Contact. Niets anders hoeft aangepast.
     ============================================================ */
  var CRM = {
    endpoint:   '',          // [WACHT OP PAUL] endpoint-URL van het CC-formulier
    formId:     '',          // [WACHT OP PAUL] form-ID
    trackingId: '',          // [WACHT OP PAUL] tracking-ID
    // [WACHT OP PAUL] exacte veldnamen zoals Constant Contact ze verwacht.
    // Links = onze veldnaam (name="" op de site), rechts = de CC-veldnaam.
    fieldMap: {
      email:   'email',
      naam:    'first_name',
      bedrijf: 'company',
      tel:     'phone',
      site:    'website',
      bericht: 'waar_wil_je_mee_aan_de_slag',  // bestaand custom veld
      _bron:   'bron'         // verborgen bron-tag (self-serve/warm/koud); leeg = niet sturen
    },
    // GTM-container (al aangemaakt, zie bouwdoc). Zet loadGTM op true zodra
    // de cookie/consent-afhandeling rond is (AVG-punt in het bouwdoc).
    gtmId:   'GTM-MNL39P7S',
    loadGTM: false
  };
  window.CRM_CONFIG = CRM;
  window.dataLayer = window.dataLayer || [];

  /* GTM laden, alleen als ingeschakeld (loadGTM:true) */
  if(CRM.gtmId && CRM.loadGTM){
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',CRM.gtmId);
  }

  var body = document.body;
  var page = body.getAttribute('data-page') || '';
  var depth = parseInt(body.getAttribute('data-depth') || '1', 10);
  if (isNaN(depth) || depth < 0) depth = 1;
  var R = depth === 0 ? '' : new Array(depth + 1).join('../');
  var HOME = R === '' ? './' : R;

  /* Livegang-datum, gelijk aan de countdown op early-access.
     Vóór deze datum: "Early access"-knop. Erna: "Registreren" (naar de app)
     + een "Kennismaking"-knop (naar de live-pagina / aanmelden). */
  var LIVE_DATE = new Date('2026-07-06T00:00:00');
  var isLive = new Date() >= LIVE_DATE;
  var navCTA = isLive
    ? '<a class="cta ghost" href="'+R+'webinar/">Webinar</a>'
      + '<a class="cta ghost" href="'+R+'live/">Kennismaking</a>'
      + '<a class="cta" href="https://app.yourfellow.nl/">Registreren</a>'
    : '<a class="cta ghost" href="'+R+'webinar/">Webinar</a>'
      + '<a class="cta" href="'+R+'early-access/">Early access</a>';

  var BRAND = '<a class="brand" href="' + HOME + '">'
    + '<span class="mk">HQ</span>'
    + '<span class="wordmark">YourFellow</span></a>';

  var BRAND_HEADER = '<a class="brand brand-mia" href="' + HOME + '">'
    + '<img class="mia-mk" src="' + R + 'assets/mia-drawn.png" alt="Mia" width="40" height="40">'
    + '<span class="brand-tx"><span class="wordmark">Mia</span>'
    + '<span class="brand-sub">je AI-marketing collega</span></span></a>';

  var links = [
    {id:'wat',     slug:'wat-doet-het', label:'Wat doet het'},
    {id:'mia',     slug:'mia',          label:'Mia'},
    {id:'prijzen', slug:'prijzen',      label:'Prijzen'},
    {id:'blog',    slug:'blog',         label:'Blogs'},
    {id:'vragen',  slug:'vragen',       label:'Vragen'},
    {id:'over',    slug:'over-ons',     label:'Over ons'}
  ];

  var navHTML = ''
    + '<header class="topbar"><div class="wrap-wide topbar-in">'
    +   BRAND_HEADER
    +   '<nav class="nav-links" id="navLinks">'
    +     links.map(function(l){
            return '<a href="'+R+l.slug+'/"'+(page===l.id?' class="on"':'')+'>'+l.label+'</a>';
          }).join('')
    +   '</nav>'
    +   '<div class="nav-r">'
    +     navCTA
    +     '<button class="nav-burger" id="navBurger" aria-label="Menu">'
    +       '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'
    +     '</button>'
    +   '</div>'
    + '</div></header>';

  var footHTML = ''
    + '<footer class="site-foot"><div class="wrap">'
    +   '<div class="top">'
    +     '<div class="about">'
    +       BRAND
    +       '<p class="hq-note">Hallo Mia is onze kennismaking. Het platform heet straks <b>YourFellow HQ</b>, op <a href="https://app.yourfellow.nl/" target="_blank" rel="noopener">app.yourfellow.nl</a>, met Mia als je assistent.</p>'
    +       '<div class="award">Gemaakt door <a class="yflink" href="https://yourfellow.nl/" target="_blank" rel="noopener">YourFellow</a>, performance marketing uit Zevenbergen</div>'
    +     '</div>'
    +     '<div class="col"><h5>Product</h5>'
    +       '<a href="'+R+'wat-doet-het/">Wat doet het</a>'
    +       '<a href="'+R+'mia/">Mia</a>'
    +     '</div>'
    +     '<div class="col"><h5>Hulp</h5>'
    +       '<a href="'+R+'prijzen/">Prijzen</a>'
    +       '<a href="'+R+'vragen/">Vragen</a>'
    +       '<a href="'+R+'blog/">Blogs</a>'
    +       '<a href="'+R+'begrippenlijst/">Begrippenlijst</a>'
    +       '<a href="'+R+'over-ons/">Over ons</a>'
    +       '<a href="'+R+'early-access/">Early access</a>'
    +     '</div>'
    +     '<div class="col"><h5>Aan de slag</h5>'
    +       '<a href="'+R+'early-access/">Schrijf je in</a>'
    +       '<a href="'+R+'aanmelden/">Inloggen</a>'
    +       '<a href="'+R+'vragen/#privacy">Privacy &amp; data</a>'
    +     '</div>'
    +   '</div>'
    +   '<div class="bottom">'
    +     '<div>&copy; 2026 Hallo Mia, de beta voor &euro;49 p/m</div>'
    +     '<div class="links"><a href="'+R+'vragen/">Privacy</a><a href="'+R+'vragen/">Voorwaarden</a><a href="'+HOME+'">Home</a></div>'
    +   '</div>'
    + '</div></footer>';

  var navMount = document.getElementById('site-nav');
  var footMount = document.getElementById('site-foot');
  if(navMount) navMount.innerHTML = navHTML;
  if(footMount) footMount.innerHTML = footHTML;

  var burger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');
  if(burger && navLinks){
    burger.addEventListener('click', function(){ navLinks.classList.toggle('open'); });
  }

  /* ============================================================
     Formulier-koppeling. Elk <form data-crm-form> wordt automatisch
     afgehandeld: valideren, GTM-event, en (zodra CRM.endpoint staat)
     versturen naar Constant Contact met de juiste veldnamen.
     Markeer een formulier met deze attributen:
       data-crm-form                          markeert het formulier
       data-crm-done="#id"                     element met succesboodschap (krijgt class 'show')
       data-crm-source="self-serve|warm|koud"  bron-tag voor het CRM
       data-crm-list="..."                     (optioneel) doellijst, als referentie
     De velden worden gelezen uit de name=""-attributen en omgezet via CRM.fieldMap.
     ============================================================ */
  (function crmForms(){
    function flag(el,bad){ el.style.borderColor = bad ? '#C7553F' : ''; }
    function validate(form){
      var ok = true;
      form.querySelectorAll('[required]').forEach(function(el){
        var bad = el.type==='checkbox' ? !el.checked
                : el.type==='email'    ? !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value)
                :                        !String(el.value).trim();
        if(el.type==='checkbox'){ if(el.parentElement) el.parentElement.style.color = bad ? '#C7553F' : ''; }
        else flag(el, bad);
        if(bad) ok = false;
      });
      return ok;
    }
    document.querySelectorAll('form[data-crm-form]').forEach(function(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        if(!validate(form)) return;
        var done   = document.querySelector(form.getAttribute('data-crm-done') || '\u0000');
        var source = form.getAttribute('data-crm-source') || '';
        var list   = form.getAttribute('data-crm-list') || '';
        window.dataLayer.push({event:'crm_signup', crm_source:source, crm_list:list});
        function finish(){ form.style.display='none'; if(done) done.classList.add('show'); }
        if(!CRM.endpoint){ finish(); return; }   // demo-modus tot Paul de gegevens levert
        var fd = new FormData(), map = CRM.fieldMap || {};
        form.querySelectorAll('input[name],textarea[name],select[name]').forEach(function(el){
          if((el.type==='checkbox'||el.type==='radio') && !el.checked) return;
          fd.append(map[el.name] || el.name, el.value);
        });
        if(map._bron && source) fd.append(map._bron, source);
        if(CRM.formId)     fd.append('form_id', CRM.formId);
        if(CRM.trackingId) fd.append('tracking_id', CRM.trackingId);
        fetch(CRM.endpoint, {method:'POST', mode:'no-cors', body:fd}).then(finish, finish);
      });
    });
  })();

})();
