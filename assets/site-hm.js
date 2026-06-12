/* ============================================================
   Hallo Mia, shared nav + footer (clean-URL / folder structure)
   Pages include <div id="site-nav"></div> and <div id="site-foot"></div>,
   set <body data-page="..."> for the active link and
   <body data-depth="0"> on the homepage (root) or data-depth="1" on subpages.
   ============================================================ */
(function(){
  var body = document.body;
  var page = body.getAttribute('data-page') || '';
  var depth = parseInt(body.getAttribute('data-depth') || '1', 10);
  if (isNaN(depth) || depth < 0) depth = 1;
  var R = depth === 0 ? '' : new Array(depth + 1).join('../');
  var HOME = R === '' ? './' : R;

  var BRAND = '<a class="brand" href="' + HOME + '">'
    + '<span class="mk">HQ</span>'
    + '<span class="wordmark">YourFellow</span></a>';

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
    +   BRAND
    +   '<nav class="nav-links" id="navLinks">'
    +     links.map(function(l){
            return '<a href="'+R+l.slug+'/"'+(page===l.id?' class="on"':'')+'>'+l.label+'</a>';
          }).join('')
    +   '</nav>'
    +   '<div class="nav-r">'
    +     '<a class="ghost" href="'+R+'aanmelden/">Plan demo</a>'
    +     '<a class="cta" href="https://app.yourfellow.nl/">Registreren</a>'
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
    +       '<a href="'+R+'begrippenlijst/">Begrippenlijst</a>'
    +       '<a href="'+R+'over-ons/">Over ons</a>'
    +       '<a href="'+R+'aanmelden/">Plan demo</a>'
    +     '</div>'
    +     '<div class="col"><h5>Aan de slag</h5>'
    +       '<a href="https://app.yourfellow.nl/">Registreren</a>'
    +       '<a href="'+R+'aanmelden/">Inloggen</a>'
    +       '<a href="'+R+'vragen/#privacy">Privacy &amp; data</a>'
    +     '</div>'
    +   '</div>'
    +   '<div class="bottom">'
    +     '<div>&copy; 2026 Hallo Mia, gratis te starten</div>'
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
