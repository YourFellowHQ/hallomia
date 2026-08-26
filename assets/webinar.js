/* ============================================================
   Webinar: datumkeuze + aanmelding
   Gedeeld door de homepage (modal) en de /webinar/-pagina.

   1. Genereert de komende sessies: elke week dinsdag 14:00, woensdag
      14:00 en donderdag 10:00.
   2. Rendert ze als klikbare datumkeuze in elk element met
      [data-webinar-dates], en vult de eerstvolgende datum in elk
      [data-webinar-next].
   3. Handelt elk <form data-webinar-form> af: e-mailt de aanmelding
      naar NOTIFY_EMAIL en toont daarna de succesboodschap.

   >>> VUL HIERONDER JOUW E-MAILADRES IN. <<<
   Op dat adres ontvang je elke webinar-aanmelding. De allereerste keer
   stuurt FormSubmit een bevestigingsmail: klik die link eenmalig aan,
   daarna komen alle aanmeldingen vanzelf binnen. Zolang het adres op de
   placeholder staat draait dit in demo-modus (toont alleen de bevestiging,
   verstuurt niets).
   ============================================================ */
(function(){
  var NOTIFY_EMAIL = 'JOUW@EMAIL.NL';   // << jouw inbox

  // Vast weekschema: [weekdag 0=zo, starttijd]
  var WB_SLOTS  = [[2,'14:00'],[3,'14:00'],[4,'10:00']];
  var WB_WEEKS  = 4;       // aantal weken vooruit om te tonen
  var WB_TIME   = '14:00'; // fallback-starttijd
  var DAY = 86400000;

  function upcoming(){
    var now = new Date(), out = [];
    for(var w = 0; w <= WB_WEEKS; w++){
      WB_SLOTS.forEach(function(slot){
        var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + w * 7, +slot[1].slice(0,2), +slot[1].slice(3));
        d.setDate(d.getDate() + ((slot[0] - d.getDay() + 7) % 7));
        d.wbTime = slot[1];
        if(d.getTime() > now.getTime()) out.push(d);
      });
    }
    out.sort(function(a,b){ return a - b; });
    return out;
  }
  function dayLabel(d){
    var s = d.toLocaleDateString('nl-NL', {weekday:'long', day:'numeric', month:'long'});
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function fullLabel(d){ return dayLabel(d) + ', ' + (d.wbTime || WB_TIME) + ' uur'; }

  function renderDates(){
    var dates = upcoming();
    document.querySelectorAll('[data-webinar-next]').forEach(function(el){
      el.textContent = fullLabel(dates[0]);
    });
    document.querySelectorAll('[data-webinar-dates]').forEach(function(box){
      box.innerHTML = '';
      dates.forEach(function(d, i){
        var lab = fullLabel(d);
        var l = document.createElement('label');
        l.className = 'wb-date' + (i === 0 ? ' sel' : '');
        l.innerHTML =
          '<input type="radio" name="webinar_sessie" value="' + lab + '"' + (i === 0 ? ' checked' : '') + '>' +
          '<span class="wb-date-day">' + dayLabel(d) + '</span>' +
          '<span class="wb-date-time">' + (d.wbTime || WB_TIME) + ' uur</span>';
        box.appendChild(l);
      });
      box.addEventListener('change', function(){
        box.querySelectorAll('.wb-date').forEach(function(l){
          l.classList.toggle('sel', l.querySelector('input').checked);
        });
      });
    });
  }

  function wireForms(){
    document.querySelectorAll('form[data-webinar-form]').forEach(function(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var email = form.querySelector('input[type=email]');
        var sess  = form.querySelector('input[name=webinar_sessie]:checked')
                 || form.querySelector('input[name=webinar_sessie]');
        if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)){
          if(email){ email.style.borderColor = '#C7553F'; email.focus(); }
          return;
        }
        var done = (function(){ var s = form.getAttribute('data-webinar-done'); return s ? document.querySelector(s) : null; })();
        var chosen = sess ? sess.value : '';
        (window.dataLayer = window.dataLayer || []).push({event:'crm_signup', crm_source:'self-serve', crm_list:'webinar'});
        document.querySelectorAll('[data-webinar-chosen]').forEach(function(el){ el.textContent = chosen; });
        function finish(){ form.style.display = 'none'; if(done) done.classList.add('show'); }
        if(!NOTIFY_EMAIL || NOTIFY_EMAIL === 'JOUW@EMAIL.NL'){ finish(); return; } // demo tot adres is ingevuld
        var fd = new FormData();
        fd.append('Aanmelding', 'Webinar Hallo Mia');
        fd.append('E-mail deelnemer', email.value);
        fd.append('Gekozen sessie', chosen);
        fd.append('_subject', 'Nieuwe webinar-aanmelding voor Hallo Mia');
        fd.append('_template', 'table');
        fd.append('_captcha', 'false');
        fetch('https://formsubmit.co/ajax/' + encodeURIComponent(NOTIFY_EMAIL), {
          method:'POST', headers:{'Accept':'application/json'}, body:fd
        }).then(finish, finish);
      });
    });
  }

  function init(){ renderDates(); wireForms(); }
  if(document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
