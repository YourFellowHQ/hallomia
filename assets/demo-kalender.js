/* ============================================================
   Demo-aanmelding op /demo/.
   Bezoeker kiest dag + tijd en vult naam + e-mail in, allemaal in de
   huisstijl. Daarna laadt hetzelfde Constant Contact (SharpSpring)
   formulier met alle drie de velden als verborgen waarde; van dat
   formulier blijft alleen de verzendknop zichtbaar.

   In Constant Contact (formulier "HQ Demo Aanmelding") moeten naam,
   e-mail en Date HQ Demo op "Is Hidden?" staan, Autofill uit,
   Required uit. Date HQ Demo als tekstveld, niet als keuzelijst.
   ============================================================ */
(function(){
  var CFG = {
    account:'MzawMLE0MTGzAAA',
    formID:'szS0NEszMzXQNTYzTNM1MTJI1bU0SkzTtUgxSEw1N001MEkxBAA',
    domain:'app-3QNTLCGLQ4.marketingautomation.services',
    script:'https://koi-3QNTLCGLQ4.marketingautomation.services/client/form.js?ver=2.0.1',
    // Per veld het formulier-ID en de systeemnaam; beide worden meegestuurd.
    velden:{
      naam:  ['field_4560407554','firstName'],
      email: ['field_4560409602','emailAddress'],
      datum: ['field_400000049720322','date_hq_webinar_400000049720322']
    },
    tijden:(function(){ var t=['10:00','11:00','14:00','15:00'], o={}; [1,2,3,4,5].forEach(function(d){ o[d]=t; }); return o; })(),
    wekenVooruit:6,
    minUren:2,
    bedankt:'../bedankt-voor-je-interesse/'
  };
  var box = document.getElementById('demoKalender');
  var target = document.getElementById('ssDemoForm');
  var inNaam = document.getElementById('dkNaam');
  var inMail = document.getElementById('dkMail');
  var nep = document.getElementById('dkNep');
  if(!box || !target) return;

  var now = new Date(), grens = new Date(now.getTime() + CFG.wekenVooruit*7*864e5);
  var MAANDEN = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
  var DAGEN = ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'];

  function slotDate(d, t){ return new Date(d.getFullYear(), d.getMonth(), d.getDate(), +t.slice(0,2), +t.slice(3)); }
  function tijdenOp(d){
    return (CFG.tijden[d.getDay()] || []).filter(function(t){
      var s = slotDate(d, t); return s.getTime() > now.getTime() + CFG.minUren*36e5 && s <= grens;
    });
  }
  function label(d, t){ return DAGEN[d.getDay()] + ' ' + d.getDate() + ' ' + MAANDEN[d.getMonth()] + ' ' + d.getFullYear() + ', ' + t + ' uur'; }
  function same(a, b){ return a && b && a.toDateString() === b.toDateString(); }
  function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

  var eerste = null;
  for(var i = 0; i < CFG.wekenVooruit*7 + 1 && !eerste; i++){
    var d0 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    if(tijdenOp(d0).length) eerste = d0;
  }
  var view = eerste ? new Date(eerste.getFullYear(), eerste.getMonth(), 1) : new Date(now.getFullYear(), now.getMonth(), 1);
  var gekozenDag = eerste, gekozenTijd = null;

  function render(){
    var y = view.getFullYear(), m = view.getMonth();
    var start = (new Date(y, m, 1).getDay() + 6) % 7;
    var dagen = new Date(y, m + 1, 0).getDate();
    var minView = new Date(now.getFullYear(), now.getMonth(), 1);
    var maxView = new Date(grens.getFullYear(), grens.getMonth(), 1);
    var h = '<div class="dk-head"><b>' + MAANDEN[m] + ' ' + y + '</b><div class="dk-nav">'
      + '<button type="button" data-nav="-1" aria-label="Vorige maand"' + (view <= minView ? ' disabled' : '') + '>&#8249;</button>'
      + '<button type="button" data-nav="1" aria-label="Volgende maand"' + (view >= maxView ? ' disabled' : '') + '>&#8250;</button></div></div>'
      + '<div class="dk-wd"><span>ma</span><span>di</span><span>wo</span><span>do</span><span>vr</span><span>za</span><span>zo</span></div><div class="dk-grid">';
    for(var s = 0; s < start; s++) h += '<span></span>';
    for(var n = 1; n <= dagen; n++){
      var d = new Date(y, m, n), av = tijdenOp(d).length > 0;
      h += av ? '<button type="button" class="dk-day av' + (same(d, gekozenDag) ? ' sel' : '') + '" data-dag="' + n + '" aria-label="' + DAGEN[d.getDay()] + ' ' + n + ' ' + MAANDEN[m] + '">' + n + '</button>'
              : '<span class="dk-day">' + n + '</span>';
    }
    h += '</div>';
    if(gekozenDag && gekozenDag.getMonth() === m && gekozenDag.getFullYear() === y){
      h += '<div class="dk-times"><h4>' + cap(DAGEN[gekozenDag.getDay()]) + ' ' + gekozenDag.getDate() + ' ' + MAANDEN[gekozenDag.getMonth()] + '</h4><div class="dk-tl">';
      tijdenOp(gekozenDag).forEach(function(t){ h += '<button type="button" class="dk-t' + (t === gekozenTijd ? ' sel' : '') + '" data-tijd="' + t + '">' + t + '</button>'; });
      h += '</div></div>';
    }
    box.innerHTML = h;
  }

  var geladen = '', timer = null, scriptGeladen = false;
  function waarden(){
    var naam = inNaam ? inNaam.value.trim() : '';
    var mail = inMail ? inMail.value.trim() : '';
    var okMail = inMail ? (inMail.checkValidity() && /@.+\./.test(mail)) : false;
    if(!gekozenTijd || !naam || !okMail) return null;
    return {naam:naam, email:mail, datum:label(gekozenDag, gekozenTijd)};
  }
  function laadFormulier(){
    var w = waarden();
    if(!w){ geladen = ''; if(nep) zetKlaar(false); return; }
    var sleutel = w.naam + '|' + w.email + '|' + w.datum;
    if(klaar && nep) zetKlaar(true);
    if(sleutel === geladen) return;
    geladen = sleutel;
    var hidden = {};
    Object.keys(CFG.velden).forEach(function(k){ CFG.velden[k].forEach(function(id){ hidden[id] = w[k]; }); });
    // form.js rendert maar één keer per pagina: daarna passen we de iframe-URL zelf aan.
    var fr = target.querySelector('iframe');
    if(fr){
      var u = new URL(fr.src);
      Object.keys(hidden).forEach(function(k){ u.searchParams.set(k, hidden[k]); });
      zelfGezet = true; fr.src = u.toString();
    } else if(!scriptGeladen){
      scriptGeladen = true;
      window.ss_form = {account:CFG.account, formID:CFG.formID, width:'100%', domain:CFG.domain, target_id:'ssDemoForm', hidden:hidden};
      var sc = document.createElement('script');
      sc.src = CFG.script;
      document.body.appendChild(sc);
    } else {
      geladen = ''; setTimeout(laadFormulier, 400);
    }
    try { sessionStorage.setItem('hm-demo-moment', w.datum); } catch(e){}
  }
  /* Na verzenden laadt het formulier-iframe opnieuw zonder dat wij de URL veranderden.
     Dan sturen we zelf de hele pagina door naar de bedankpagina (vangnet als
     Constant Contact alleen binnen het iframe doorstuurt). */
  var zelfGezet = false, bekeken = null, klaar = false;
  function zetKlaar(aan){ var k = target.parentNode; if(k) k.classList.toggle('klaar', !!aan); if(nep) nep.disabled = !aan; }
  function volg(fr){
    if(fr === bekeken) return; bekeken = fr;
    var eerste = true;
    fr.addEventListener('load', function(){
      if(eerste || zelfGezet){ eerste = false; zelfGezet = false; klaar = true; if(nep && waarden()) zetKlaar(true); return; }
      window.location.href = CFG.bedankt;
    });
  }
  new MutationObserver(function(){ var fr = target.querySelector('iframe'); if(fr) volg(fr); }).observe(target, {childList:true, subtree:true});
  function later(){ clearTimeout(timer); timer = setTimeout(laadFormulier, 450); }

  box.addEventListener('click', function(e){
    var b = e.target.closest('button'); if(!b) return;
    if(b.dataset.nav){ view = new Date(view.getFullYear(), view.getMonth() + (+b.dataset.nav), 1); render(); return; }
    if(b.dataset.dag){ gekozenDag = new Date(view.getFullYear(), view.getMonth(), +b.dataset.dag); gekozenTijd = null; render(); laadFormulier(); return; }
    if(b.dataset.tijd){
      gekozenTijd = b.dataset.tijd; render();
      var c = document.getElementById('demoGekozen');
      if(c){ c.querySelector('b').textContent = label(gekozenDag, gekozenTijd); c.classList.add('show'); }
      laadFormulier();
      if(inNaam && !inNaam.value) inNaam.focus();
    }
  });
  [inNaam, inMail].forEach(function(el){ if(el){ el.addEventListener('input', later); el.addEventListener('blur', laadFormulier); } });
  render();
})();
