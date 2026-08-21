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
    loadGTM: false,
    // GA4-property "Hallo Mia". Zet loadGA op false om het meten te stoppen.
    gaId:    'G-QB20D38EG3',
    loadGA:  true,
    // Meta-pixel (gegevensset "Hallo Mia website"). Laadt pas na toestemming
    // in de cookiemelding. Zet loadPixel op false om het adverteren-meten te stoppen.
    pixelId:   '1375618640654932',
    loadPixel: true
  };
  window.CRM_CONFIG = CRM;
  window.dataLayer = window.dataLayer || [];

  /* GA4 laden, alleen als ingeschakeld (loadGA:true). Anoniem: geen advertentie-
     signalen, IP-adres verkort, en de bezoeker wordt niet over sites gevolgd. */
  if(CRM.gaId && CRM.loadGA){
    var gs=document.createElement('script');
    gs.async=true;gs.src='https://www.googletagmanager.com/gtag/js?id='+CRM.gaId;
    document.head.appendChild(gs);
    window.gtag=function(){window.dataLayer.push(arguments);};
    gtag('js',new Date());
    gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
    gtag('config',CRM.gaId,{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});
  }

  /* ============================================================
     COOKIEMELDING + META-PIXEL
     De pixel is een advertentiecookie, dus die laadt alleen na een
     uitdrukkelijk "ja" in de melding. Keuze staat een jaar vast in
     localStorage ('hm-cookies'). GA4 hierboven blijft anoniem draaien
     en valt niet onder deze toestemming.
     Keuze opnieuw laten kiezen: window.hmCookieVoorkeur() in de console
     of een link met data-cookie-voorkeur.
     ============================================================ */
  (function pixelConsent(){
    var KEY = 'hm-cookies';
    function lees(){ try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch(e){ return null; } }
    function schrijf(ja){ try { localStorage.setItem(KEY, JSON.stringify({ads:!!ja, op:Date.now()})); } catch(e){} }

    function laadPixel(){
      if(!CRM.pixelId || !CRM.loadPixel || window.fbq) return;
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', CRM.pixelId);
      fbq('track', 'PageView');
      // Wie de prijzen bekeek is een warme retargeting-groep.
      if(/\/prijzen\//.test(location.pathname)) fbq('track','ViewContent',{content_name:'Prijzen'});
      if(window.gtag) gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
    }
    window.hmLaadPixel = laadPixel;

    // Pad naar de site-root, want de melding staat ook op pagina's twee mappen diep.
    function ckRoot(){
      var d = parseInt((document.body.getAttribute('data-depth') || '1'), 10);
      if(isNaN(d) || d < 0) d = 1;
      return d === 0 ? '' : new Array(d + 1).join('../');
    }

    function melding(){
      var w = document.createElement('div');
      w.id = 'hm-cookiebalk';
      w.setAttribute('role','dialog');
      w.setAttribute('aria-label','Cookievoorkeur');
      w.innerHTML = '<div class="hm-ck-card">'
        + '<div class="hm-ck-txt"><strong>Cookies</strong>We gebruiken cookies om de website te laten werken, het gebruik te analyseren en onze advertenties te verbeteren.</div>'
        + '<div class="hm-ck-btns">'
        + '<button type="button" class="hm-ck-nee">Weigeren</button>'
        + '<button type="button" class="hm-ck-ja">Accepteren</button>'
        + '</div></div>';
      var st = document.createElement('style');
      st.textContent = '#hm-cookiebalk{position:fixed;left:0;right:0;bottom:0;z-index:9000;padding:14px;display:flex;justify-content:center;pointer-events:none;animation:hmCkIn .28s ease-out both}'
        + '@keyframes hmCkIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}'
        + '#hm-cookiebalk .hm-ck-card{pointer-events:auto;max-width:600px;width:100%;background:#fff;border:1px solid #E4E7EB;border-radius:12px;box-shadow:0 8px 28px rgba(15,18,22,0.10);padding:12px 14px;display:flex;gap:14px;align-items:center;flex-wrap:wrap}'
        + '#hm-cookiebalk .hm-ck-txt{flex:1 1 240px;font-size:13.5px;line-height:1.5;color:#4A5058}'
        + '#hm-cookiebalk .hm-ck-txt strong{display:block;font-size:14.5px;font-weight:600;color:#0F1216;margin-bottom:3px}'
        + '#hm-cookiebalk .hm-ck-btns{display:flex;gap:8px;flex:0 0 auto}'
        + '#hm-cookiebalk button{font:inherit;font-size:13.5px;font-weight:600;border-radius:8px;padding:10px 16px;cursor:pointer;border:1px solid transparent;min-height:44px}'
        + '#hm-cookiebalk .hm-ck-nee{background:#fff;border-color:#D6DAE0;color:#4A5058}'
        + '#hm-cookiebalk .hm-ck-nee:hover{border-color:#0F1216;color:#0F1216}'
        + '#hm-cookiebalk .hm-ck-ja{background:#0F1216;color:#fff}'
        + '#hm-cookiebalk .hm-ck-ja:hover{background:#000}'
        + '@media(max-width:560px){#hm-cookiebalk .hm-ck-btns{width:100%}#hm-cookiebalk .hm-ck-btns button{flex:1}}';
      document.head.appendChild(st);
      document.body.appendChild(w);
      function sluit(ja){ schrijf(ja); w.remove(); if(ja) laadPixel(); }
      w.querySelector('.hm-ck-ja').addEventListener('click', function(){ sluit(true); });
      w.querySelector('.hm-ck-nee').addEventListener('click', function(){ sluit(false); });
    }

    var keus = lees();
    if(keus && keus.ads) laadPixel();
    // Twee tellen wachten: de bezoeker is dan al aan het lezen en de melding
    // onderbreekt niets. Dat levert merkbaar vaker een keuze op.
    else if(!keus && CRM.pixelId && CRM.loadPixel) setTimeout(melding, 2000);

    window.hmCookieVoorkeur = function(){ try { localStorage.removeItem(KEY); } catch(e){} melding(); };
    document.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('[data-cookie-voorkeur]');
      if(a){ e.preventDefault(); window.hmCookieVoorkeur(); }
    });
  })();

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

  /* Livegang-datum. Erna: "Registreren" (naar de app) + "Contact". */
  var LIVE_DATE = new Date('2026-07-06T00:00:00');
  var isLive = new Date() >= LIVE_DATE;
  var navCTA = isLive
    ? '<a class="cta ghost" href="'+R+'webinar/">Plan je demo in</a>'
      + '<a class="cta ghost" href="'+R+'contact/">Contact</a>'
      + '<a class="cta" href="https://app.yourfellow.nl/?bron=site-header">Registreren</a>'
    : '<a class="cta ghost" href="'+R+'webinar/">Plan je demo in</a>'
      + '<a class="cta" href="https://app.yourfellow.nl/?bron=site-header">Registreren</a>';

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
    {id:'voor',    slug:'voor-wie',     label:'Voor wie'},
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
            if(!l.dd) return '<a href="'+R+l.slug+'/"'+(page===l.id?' class="on"':'')+'>'+l.label+'</a>';
            var on = l.items.some(function(it){ return page===it.id; });
            return '<div class="nav-dd'+(on?' on':'')+'">'
              + '<button type="button" class="nav-dd-t" aria-expanded="false">'+l.label
              + '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button>'
              + '<div class="nav-dd-m">'
              +   l.items.map(function(it){
                    return '<a href="'+R+it.slug+'/"'+(page===it.id?' class="on"':'')+'><b>'+it.label+'</b>'
                      + (it.note?'<span>'+it.note+'</span>':'')+'</a>';
                  }).join('')
              +   '<span class="nav-dd-soon">Meer branches volgen</span>'
              + '</div></div>';
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
    +       '<p class="hq-note">Hallo Mia is onze kennismaking. Het platform heet straks <b>YourFellow HQ</b>, op <a href="https://app.yourfellow.nl/?bron=site-footer" target="_blank" rel="noopener">app.yourfellow.nl</a>, met Mia als je assistent.</p>'
    +       '<div class="award">Gemaakt door <a class="yflink" href="https://yourfellow.nl/" target="_blank" rel="noopener">YourFellow</a>, performance marketing uit Zevenbergen. <a class="yflink" href="https://www.linkedin.com/company/yourfellow/" target="_blank" rel="noopener">Volg ons op LinkedIn</a></div>'
    +     '</div>'
    +     '<div class="col"><h5>Product</h5>'
    +       '<a href="'+R+'wat-doet-het/">Wat doet het</a>'
    +       '<a href="'+R+'mia/">Mia</a>'
    +       '<a href="'+R+'voor-wie/">Voor wie</a>'
    +     '</div>'
    +     '<div class="col"><h5>Hulp</h5>'
    +       '<a href="'+R+'prijzen/">Prijzen</a>'
    +       '<a href="'+R+'vragen/">Vragen</a>'
    +       '<a href="'+R+'blog/">Blogs</a>'
    +       '<a href="'+R+'begrippenlijst/">Begrippenlijst</a>'
    +       '<a href="'+R+'over-ons/">Over ons</a>'
    +     '</div>'
    +     '<div class="col"><h5>Aan de slag</h5>'
    +       '<a href="https://app.yourfellow.nl/?bron=site-footer">Registreren</a>'
    +       '<a href="'+R+'contact/">Contact</a>'
    +       '<a href="'+R+'aanmelden/">Inloggen</a>'
    +       '<a href="'+R+'vragen/#privacy">Privacy &amp; data</a>'
    +     '</div>'
    +   '</div>'
    +   '<div class="bottom">'
    +     '<div>&copy; 2026 Hallo Mia, vanaf &euro;79,99 p/m</div>'
    +     '<div class="links"><a href="'+R+'vragen/">Privacy</a><a href="'+R+'vragen/">Voorwaarden</a><a href="#" data-cookie-voorkeur>Cookies</a><a href="'+HOME+'">Home</a></div>'
    +   '</div>'
    + '</div></footer>';

  var navMount = document.getElementById('site-nav');
  var footMount = document.getElementById('site-foot');
  if(navMount) navMount.innerHTML = navHTML;
  if(footMount) footMount.innerHTML = footHTML;

  /* dropdowns in de nav: klik om te openen, klik buiten om te sluiten */
  document.querySelectorAll('.nav-dd').forEach(function(dd){
    var t = dd.querySelector('.nav-dd-t');
    if(!t) return;
    t.addEventListener('click', function(e){
      e.stopPropagation();
      var open = !dd.classList.contains('open');
      document.querySelectorAll('.nav-dd.open').forEach(function(o){ o.classList.remove('open'); });
      dd.classList.toggle('open', open);
      t.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function(){
    document.querySelectorAll('.nav-dd.open').forEach(function(o){
      o.classList.remove('open');
      var t = o.querySelector('.nav-dd-t'); if(t) t.setAttribute('aria-expanded','false');
    });
  });

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
        if(window.gtag) gtag('event','crm_signup',{crm_source:source, crm_list:list});
        if(window.fbq) fbq('track','Lead',{content_name:source || 'formulier'});
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

  /* Campagne-tracking: UTM's van de advertentie vasthouden en doorgeven aan de app,
     plus een dataLayer-event bij elke klik op een CTA. */
  (function utmPass(){
    var KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid','wbraid','msclkid'];
    var K = 'hm-campagne';
    var store = {};
    try { store = JSON.parse(sessionStorage.getItem(K) || '{}'); } catch(e){}
    var q = new URLSearchParams(location.search), fresh = false;
    KEYS.forEach(function(k){ var v = q.get(k); if(v){ store[k] = v; fresh = true; } });
    if(fresh){ try { sessionStorage.setItem(K, JSON.stringify(store)); } catch(e){} }

    document.querySelectorAll('a[href*="app.yourfellow.nl"]').forEach(function(a){
      var u;
      try { u = new URL(a.href); } catch(e){ return; }
      Object.keys(store).forEach(function(k){ if(!u.searchParams.has(k)) u.searchParams.set(k, store[k]); });
      if(!u.searchParams.has('lp')) u.searchParams.set('lp', location.pathname.replace(/\/index\.html$/,'/'));
      a.href = u.toString();
    });

    window.dataLayer = window.dataLayer || [];
    document.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a[href]');
      if(!a) return;
      var h = a.getAttribute('href') || '';
      var type = h.indexOf('app.yourfellow.nl') > -1 ? 'aanmelden'
               : /\/contact\//.test(h) ? 'demo'
               : /\/webinar\//.test(h) ? 'webinar' : null;
      if(!type) return;
      var bron = '';
      try { bron = new URL(a.href, location.href).searchParams.get('bron') || ''; } catch(err){}
      window.dataLayer.push({event:'cta_click', cta_type:type, cta_bron:bron, cta_pagina:location.pathname});
      if(window.gtag) gtag('event','cta_click',{cta_type:type, cta_bron:bron, cta_pagina:location.pathname});
      if(window.fbq){
        if(type==='aanmelden') fbq('track','StartTrial',{content_name:bron || location.pathname});
        else fbq('trackCustom','CTAKlik',{cta_type:type, cta_pagina:location.pathname});
      }
    }, true);
  })();

})();
