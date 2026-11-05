// Preparation prompts drawn from the website's existing service scope.
// This is a conversation aid, not a technical inspection or quotation.
export const topics = {
 bathroom:{label:'Badkamer of toilet',items:['Noteer de afmetingen en de indeling van de ruimte.','Beschrijf welke voorzieningen u wilt behouden, verplaatsen of vernieuwen.','Verzamel voorbeelden van de gewenste afwerking en het sanitair.']},
 renovation:{label:'Renovatie of verbouwing',items:['Maak per ruimte een lijst met wat u wilt veranderen en behouden.','Benoem welke wensen voor u het belangrijkst zijn.','Noteer welke bouw-, installatie- en afbouwwerkzaamheden u samen wilt bespreken.']},
 electrical:{label:'Elektra en verlichting',items:['Markeer op een schets waar u verlichting, stopcontacten of aansluitingen wenst.','Noteer welke apparaten of functies de ruimte moet ondersteunen.','Beschrijf eventuele bestaande problemen, zonder zelf installaties te openen of aan te passen.']},
 water:{label:'Water en sanitair',items:['Noteer welke kranen, sanitaire voorzieningen of aansluitingen het betreft.','Beschrijf wat u wilt behouden, verplaatsen of toevoegen.','Beschrijf zichtbare klachten of schade en wanneer u die opmerkt.']},
 heating:{label:'Verwarming',items:['Noteer om welke ruimten en bestaande verwarming het gaat.','Beschrijf uw comfortwensen of klachten per ruimte.','Verzamel beschikbare informatie over de bestaande installatie voor het gesprek.']},
 finishing:{label:'Stuc- en schilderwerk',items:['Meet de relevante wanden, vloeren of plafonds op.','Noteer de bestaande afwerking en zichtbare beschadigingen.','Verzamel voorbeelden van de gewenste kleuren, materialen of afwerking.']},
 carpentry:{label:'Timmerwerk of montage',items:['Noteer de maten en functie van de plek waar het werk komt.','Beschrijf wat moet worden behouden, vernieuwd of op maat gemaakt.','Verzamel voorbeelden van de gewenste uitvoering.']},
 maintenance:{label:'Onderhoud of reparatie',items:['Maak een overzicht van de gebreken die u wilt laten bekijken.','Beschrijf waar en wanneer u het probleem opmerkt.','Noteer welke andere werkzaamheden u eventueel wilt combineren.']},
 unsure:{label:'Nog niet zeker',items:['Beschrijf wat u in uw woning anders of beter wilt hebben.','Noteer om welke ruimten het gaat.','Benoem welke vragen u met een vakpersoon wilt bespreken.']}
};
export const timings={exploring:'Ik oriënteer mij',soon:'Ik wil mijn wensen op korte termijn bespreken',later:'Ik bereid een project voor later voor',unsure:'Ik weet het nog niet'};
export const occupancy={yes:'De woning blijft bewoond',no:'De woning is tijdens het werk niet bewoond',unsure:'Nog niet bekend'};
export function makePlan(raw) {
  const errors={};
  if(!Object.prototype.hasOwnProperty.call(topics,raw.topic))errors.topic='Kies een type werkzaamheden. Nog niet zeker is ook een optie.';
  if(!Object.prototype.hasOwnProperty.call(timings,raw.timing))errors.timing='Kies een geldige optie voor de fase van uw project.';
  if(!Object.prototype.hasOwnProperty.call(occupancy,raw.occupancy))errors.occupancy='Kies een geldige optie voor bewoning.';
  const notes=String(raw.notes??'').trim();
  if(notes.length>800)errors.notes='Gebruik maximaal 800 tekens voor uw wensen.';
  if(Object.keys(errors).length)return {errors};
  const checklist=[...topics[raw.topic].items,'Maak overzichtsfoto’s voor uzelf; deel later alleen relevante beelden zonder onnodige privégegevens.','Zet de vragen die u wilt bespreken op een rij.'];
  if(raw.occupancy==='yes')checklist.push('Noteer welke ruimten bruikbaar moeten blijven en bespreek toegang en overlast.');
  if(raw.occupancy==='no')checklist.push('Noteer hoe toegang tot de woning en ontvangst van materialen kunnen worden geregeld.');
  if(raw.occupancy==='unsure')checklist.push('Bespreek of de woning tijdens de werkzaamheden bewoond blijft en wat daarvoor nodig is.');
  return {errors:{},topic:topics[raw.topic].label,timing:timings[raw.timing],occupancy:occupancy[raw.occupancy],notes,checklist};
}
export function summaryFor(plan,checked=[]) {
  if(plan.errors && Object.keys(plan.errors).length)throw new Error('Cannot summarise invalid input');
  const done=new Set(checked);
  return `Voorbereiding woningproject\nWerkzaamheden: ${plan.topic}\nFase: ${plan.timing}\nBewoning: ${plan.occupancy}\nMijn wensen: ${plan.notes||'Nog toe te lichten'}\n\nVoor het gesprek:\n${plan.checklist.map((item,index)=>`${done.has(index)?'[Voorbereid]':'[Nog bespreken]'} ${item}`).join('\n')}\n\nDeze voorbereiding is geen offerte, afspraak of technische beoordeling. Mijn gewenste timing moet nog worden besproken.`;
}
