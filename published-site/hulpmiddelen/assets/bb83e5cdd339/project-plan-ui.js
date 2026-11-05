import {makePlan,summaryFor} from './project-plan.js';
import {saveTransfer} from './preparation-transfer.js';
import {activatePreparationContext,serviceEnquiryHref} from './service-context.js';
const form=document.querySelector('#prepare-form'),result=document.querySelector('#prepare-result'),status=document.querySelector('#prepare-status');
const fields=[...form.querySelectorAll('select,textarea')];
let current=null,currentTopic=null;
const contextNotice=document.querySelector('#prepare-context');
const contextText=document.querySelector('#prepare-context-text');
const topicSelect=form.elements.namedItem('topic');
const serviceSelection=activatePreparationContext(topicSelect,window.location.search,context=>{
 contextNotice.hidden=!context;
 contextText.textContent=context?`Het onderwerp ${context.label.toLowerCase()} is meegenomen vanaf de dienstpagina. U kunt hieronder een ander onderwerp kiezen. Uw overige antwoorden blijven behouden.`:'';
});
function refreshContactLinks(){
 const href=serviceEnquiryHref(topicSelect.value);
 document.querySelectorAll('[data-preparation-contact]').forEach(link=>link.href=href);
}
refreshContactLinks();
topicSelect.addEventListener('change',refreshContactLinks);
document.querySelector('#prepare-context-reset').addEventListener('click',()=>{
 serviceSelection.reset();refreshContactLinks();
 // Invalidate an already-built result after resetting the auto-selected topic.
 form.dispatchEvent(new Event('input',{bubbles:true}));topicSelect.focus();
});
window.addEventListener('pagehide',event=>{if(!event.persisted)serviceSelection.cleanup();});
function clearErrors(){fields.forEach(field=>{field.removeAttribute('aria-invalid');document.querySelector(`#${field.id}-error`).textContent='';});document.querySelector('#prepare-errors').hidden=true;}
function refreshSummary(){
  const checked=[...document.querySelectorAll('#prepare-checklist input:checked')].map(el=>Number(el.value));
  document.querySelector('#prepare-summary').value=summaryFor(current,checked);
  document.querySelector('#prepare-progress').textContent=`${checked.length} van ${current.checklist.length} punten gemarkeerd als voorbereid. Ook met open vragen kunt u contact opnemen.`;
  document.querySelector('#prepare-copy-status').textContent='Kopieer de actuele samenvatting en plak deze desgewenst zelf in de projectaanvraag. Er wordt niets automatisch meegestuurd.';
}
form.addEventListener('input',()=>{clearErrors();if(!result.hidden)status.textContent='Uw antwoorden zijn gewijzigd. Maak de voorbereiding opnieuw om uw overzicht bij te werken.';result.hidden=true;current=null;currentTopic=null;});
form.addEventListener('submit',event=>{
  event.preventDefault();clearErrors();
  const plan=makePlan(Object.fromEntries(fields.map(field=>[field.name,field.value])));
  if(Object.keys(plan.errors).length){
    for(const [name,message]of Object.entries(plan.errors)){const field=form.elements.namedItem(name);field.setAttribute('aria-invalid','true');document.querySelector(`#${field.id}-error`).textContent=message;}
    const error=document.querySelector('#prepare-errors');error.textContent='Controleer de gemarkeerde velden. Uw antwoorden zijn bewaard.';error.hidden=false;
    form.elements.namedItem(Object.keys(plan.errors)[0]).focus();status.textContent='';return;
  }
  current=plan;currentTopic=form.elements.namedItem('topic').value;const list=document.querySelector('#prepare-checklist');list.replaceChildren();
  plan.checklist.forEach((text,index)=>{
    const label=document.createElement('label');label.className='prepare-check';
    const input=document.createElement('input');input.type='checkbox';input.value=index;input.addEventListener('change',refreshSummary);
    const span=document.createElement('span');span.textContent=text;label.append(input,span);list.append(label);
  });
  document.querySelector('#prepare-result-heading').textContent=`Uw voorbereiding: ${plan.topic.toLowerCase()}`;
  refreshSummary();result.hidden=false;status.textContent='Uw checklist en samenvatting zijn klaar. Er is nog niets verstuurd.';result.focus();
});
document.querySelector('#prepare-copy').addEventListener('click',async()=>{
  const text=document.querySelector('#prepare-summary'),feedback=document.querySelector('#prepare-copy-status');
  try{await navigator.clipboard.writeText(text.value);feedback.textContent='Samenvatting gekopieerd. U kunt deze zelf in de projectaanvraag plakken.';}
  catch{ text.focus();text.select();feedback.textContent='De tekst is geselecteerd. Kopieer met Ctrl+C, ⌘C of de kopieeroptie van uw telefoon.';}
});
form.querySelector('button[type=submit]').disabled=false;

document.querySelector('#prepare-transfer').addEventListener('click',()=>{
 if(!current||result.hidden) return;
 const summary=document.querySelector('#prepare-summary'),feedback=document.querySelector('#prepare-copy-status');
 const transfer=saveTransfer(()=>window.sessionStorage,currentTopic,summary.value);
 if(transfer.status==='saved') {window.location.assign('/#contact');return;}
 summary.focus();summary.select();
 feedback.textContent='De tijdelijke overdracht is niet beschikbaar. Gebruik Kopieer de samenvatting of kopieer de geselecteerde tekst zelf en plak die in de projectaanvraag.';
});
