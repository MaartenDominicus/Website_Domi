import {calculate} from './calculator.js';
const form=document.querySelector('#tile-form'),result=document.querySelector('#result'),notice=document.querySelector('#calculation-status');
const surfaces=document.querySelector('#surfaces'),add=document.querySelector('#add-surface'),undo=document.querySelector('#undo-surface'),surfaceStatus=document.querySelector('#surface-status');
const template=surfaces.querySelector('[data-surface]').cloneNode(true);
const number=new Intl.NumberFormat('nl-NL',{maximumFractionDigits:3}),area=n=>`${number.format(n)} m²`;
const rows=()=>[...surfaces.querySelectorAll('[data-surface]')];
let serial=1,lastRemoved=null;
function clearErrors(){
  [...form.querySelectorAll('input')].forEach(field=>{field.removeAttribute('aria-invalid');document.querySelector(`#${field.id}-error`).textContent='';});
  document.querySelector('#error-summary').hidden=true;
}
function invalidate(){clearErrors();if(!result.hidden)notice.textContent='De invoer is gewijzigd. Bereken opnieuw voor een actuele uitkomst.';result.hidden=true;}
function controls(){
  const count=rows().length;add.disabled=count>=8;undo.hidden=!lastRemoved;undo.disabled=count>=8;
  rows().forEach((row,index)=>{row.querySelector('legend').textContent=`Vlak ${index+1}`;const remove=row.querySelector('[data-remove-surface]');remove.textContent=`Verwijder vlak ${index+1}`;remove.hidden=count===1;});
}
add.addEventListener('click',()=>{
  if(rows().length>=8)return;
  const row=template.cloneNode(true);serial++;
  row.querySelectorAll('[data-measure]').forEach(field=>{
    const key=field.dataset.measure,id=`tile-surface-${serial}-${key}`,wrapper=field.closest('.tool-field');
    field.id=id;field.name=`surface-${serial}-${key}`;field.value=key==='deduction'?'0':'';field.removeAttribute('aria-invalid');
    wrapper.querySelector('label').htmlFor=id;
    wrapper.querySelector('.tool-help').id=`${id}-help`;
    const error=wrapper.querySelector('.tool-error');error.id=`${id}-error`;error.textContent='';
    field.setAttribute('aria-describedby',`${id}-help ${id}-error`);
  });
  surfaces.append(row);invalidate();controls();row.querySelector('input').focus();
  surfaceStatus.textContent=`Vlak ${rows().length} toegevoegd. ${rows().length} van maximaal acht vlakken.`;
});
surfaces.addEventListener('click',event=>{
  const remove=event.target.closest('[data-remove-surface]');if(!remove || rows().length===1)return;
  const row=remove.closest('[data-surface]'),index=rows().indexOf(row);lastRemoved={row,index};row.remove();invalidate();controls();
  rows()[Math.min(index,rows().length-1)].querySelector('input').focus();
  surfaceStatus.textContent='Vlak verwijderd. U kunt de laatste verwijdering ongedaan maken; de andere maten zijn behouden.';
});
undo.addEventListener('click',()=>{
  if(!lastRemoved || rows().length>=8)return;
  const {row,index}=lastRemoved;surfaces.insertBefore(row,rows()[index]||null);lastRemoved=null;invalidate();controls();row.querySelector('input').focus();surfaceStatus.textContent='Het verwijderde vlak en de ingevulde maten zijn hersteld.';
});
form.addEventListener('input',invalidate);
form.addEventListener('submit',event=>{
  event.preventDefault();clearErrors();
  const raw={},fieldMap={};
  for(const key of ['tileLength','tileWidth','reserve','pack']){const field=form.elements.namedItem(key);raw[key]=field.value;fieldMap[key]=field;}
  raw.surfaces=rows().map((row,index)=>{
    const values={};row.querySelectorAll('[data-measure]').forEach(field=>{values[field.dataset.measure]=field.value;fieldMap[`s${index}.${field.dataset.measure}`]=field;});return values;
  });
  const value=calculate(raw);
  if(Object.keys(value.errors).length){
    result.hidden=true;notice.textContent='';
    for(const [key,message]of Object.entries(value.errors)){const field=fieldMap[key];if(field){field.setAttribute('aria-invalid','true');document.querySelector(`#${field.id}-error`).textContent=message;}}
    const summary=document.querySelector('#error-summary');summary.textContent='Controleer de gemarkeerde velden. Uw invoer is bewaard.';summary.hidden=false;
    fieldMap[Object.keys(value.errors)[0]]?.focus();return;
  }
  document.querySelector('#net-area').textContent=area(value.net);
  document.querySelector('#tile-count').textContent=number.format(value.tiles);
  document.querySelector('#pack-count').textContent=value.packs===null?'Niet ingevuld':number.format(value.packs);
  const breakdown=document.querySelector('#surface-breakdown');breakdown.replaceChildren();
  value.surfaceDetails.forEach(surface=>{const li=document.createElement('li');li.textContent=`Vlak ${surface.index+1}: ${area(surface.net)} na aftrek.`;breakdown.append(li);});
  document.querySelector('#calculation-detail').textContent=`Totale oppervlakte: ${area(value.gross)}. Na aftrek: ${area(value.net)}. Met uw ${number.format(value.reserve)}% extra: ${area(value.areaWithReserve)}. Dit is ${number.format(value.tiles)} hele tegels${value.packs===null?'.':`; afgerond op verpakkingen: ${number.format(value.purchasedTiles)} tegels (${area(value.purchaseArea)}).`}`;
  document.querySelector('#summary-text').value=`Tegelproject\n${value.surfaceDetails.map(surface=>`Vlak ${surface.index+1}: ${raw.surfaces[surface.index].length} × ${raw.surfaces[surface.index].width} m, netto ${area(surface.net)}`).join('\n')}\nTotale netto oppervlakte: ${area(value.net)}\nTegelformaat voor alle vlakken: ${raw.tileLength} × ${raw.tileWidth} cm\nExtra gekozen: ${number.format(value.reserve)}%\nBerekend: ${number.format(value.tiles)} tegels${value.packs===null?'':`, ${number.format(value.packs)} verpakkingen (${number.format(value.purchasedTiles)} tegels)`}\nIndicatie op basis van totale oppervlakte; legplan en verpakking nog controleren.`;
  document.querySelector('#copy-help').textContent='Kopieer de actuele samenvatting en voeg die desgewenst zelf toe aan uw projectaanvraag.';
  result.hidden=false;notice.textContent=`Berekening klaar voor ${rows().length} ${rows().length===1?'vlak':'vlakken'}: ${number.format(value.tiles)} ${value.tiles===1?'tegel':'tegels'}${value.packs===null?'':` en ${number.format(value.packs)} ${value.packs===1?'verpakking':'verpakkingen'}`}.`;
  result.focus();
});
document.querySelector('#select-summary').addEventListener('click',()=>{const text=document.querySelector('#summary-text');text.focus();text.select();document.querySelector('#copy-help').textContent='De tekst is geselecteerd. Kopieer met Ctrl+C, ⌘C of de kopieeroptie van uw telefoon.';});
// Without a loaded controller, native form submission and empty-row creation stay disabled.
controls();form.querySelector('button[type=submit]').disabled=false;
