/* Centrale prijzen. Bij een wijziging: ook de vaste teksten, meta-descriptions, JSON-LD en llms.txt bijwerken (zie CLAUDE.md). */
window.HM_PRIJZEN={btw:'excl. btw',korting:'20%',
social:{maand:{nu:'€66',was:''},jaar:{nu:'€633,60',was:'€792,00'}},
ga:{maand:{nu:'€149',was:''},jaar:{nu:'€1.428',was:'€1.788'}},
combo:{maand:{nu:'€189',was:''},jaar:{nu:'€1.812',was:'€2.268'}}};
(function(){function get(k){var p=k.split('.'),o=window.HM_PRIJZEN[p[0]];o=o&&o[p[1]];return o?o[p[2]||'nu']:null}
function run(){var els=document.querySelectorAll('[data-prijs]');for(var i=0;i<els.length;i++){var v=get(els[i].getAttribute('data-prijs'));if(v!=null)els[i].textContent=v}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();})();
