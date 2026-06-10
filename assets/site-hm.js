/* ============================================================
   Hallo Mia, shared nav + footer (clean-URL / folder structure)
   Pages include <div id="site-nav"></div> and <div id="site-foot"></div>,
   set <body data-page="..."> for the active link and
   <body data-depth="0"> on the homepage (root) or data-depth="1" on subpages.
   ============================================================ */
(function(){
  var body = document.body;
  var page = body.getAttribute('data-page') || '';
  var R = body.getAttribute('data-depth') === '0' ? '' : '../';
  var HOME = R === '' ? './' : '../';

  var BRAND = '<a class="brand" href="' + HOME + '">'
    + '<span class="mk"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#062B25" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg></span>'
    + '<span class="wordmark">YourFellow&nbsp;<b>HQ</b></span></a>';

  var links = [
    {id:'wat',     slug:'wat-doet-het', label:'Wat doet het'},
    {id:'mia',     slug:'mia',          label:'Mia'},
    {id:'prijzen', slug:'prijzen',      label:'Prijzen'},
    {id:'vragen',  slug:'vragen',       label:'Vragen'},
    {id:'over',    slug:'over-ons',     label:'Over ons'}
  ];

  var navHTML = ''
    + '<header class="topbar"><div class="wrap-wide topbar-in">'
    +   BRAND
    +   '<nav class="nav-links" id="navLinks">'
    +     links.map(function(l){
            return '<a href="'+R+l.slug+'/"'+(page===l.id?' class="on"':'')+'>'+l.label+'</a>';
          }).join('')
    +   '</nav>'
    +   '<div class="nav-r">'
    +     '<a class="cta" href="'+R+'aanmelden/">Beta aanvragen</a>'
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
    +       '<a href="'+R+'bedrijfsprofiel/">Bedrijfsprofiel</a>'
    +       '<a href="'+R+'dashboard/">Dashboard</a>'
    +       '<a href="'+R+'advertenties/">Advertenties</a>'
    +       '<a href="'+R+'social/">Social posts</a>'
    +       '<a href="'+R+'seo-geo/">SEO &amp; GEO</a>'
    +     '</div>'
    +     '<div class="col"><h5>Hulp</h5>'
    +       '<a href="'+R+'prijzen/">Prijzen</a>'
    +       '<a href="'+R+'vragen/">Vragen</a>'
    +       '<a href="'+R+'over-ons/">Over ons</a>'
    +       '<a href="'+R+'aanmelden/">Beta aanvragen</a>'
    +     '</div>'
    +     '<div class="col"><h5>Aan de slag</h5>'
    +       '<a href="'+R+'aanmelden/">Vraag beta-toegang</a>'
    +       '<a href="'+R+'aanmelden/">Inloggen</a>'
    +       '<a href="'+R+'vragen/#privacy">Privacy &amp; data</a>'
    +     '</div>'
    +   '</div>'
    +   '<div class="bottom">'
    +     '<div>&copy; 2026 Hallo Mia, gratis tijdens de beta</div>'
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

})();
