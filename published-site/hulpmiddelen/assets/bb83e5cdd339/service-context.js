// A public service choice only: never place a draft, identity or summary in URLs.
export const serviceContexts=Object.freeze({
 renovation:{label:"Woningrenovatie",projectType:"Renovatie of verbouwing"},
 bathroom:{label:"Badkamer of toilet",projectType:"Badkamer of toilet"},
 electrical:{label:"Elektra en verlichting",projectType:"Elektra"},
 water:{label:"Water en sanitair",projectType:"Water of sanitair"},
 heating:{label:"Vloerverwarming en verwarming",projectType:"Anders"},
 carpentry:{label:"Timmerwerk en montage",projectType:"Timmer- of afbouwwerk"},
 finishing:{label:"Stuc- en schilderwerk",projectType:"Timmer- of afbouwwerk"},
 maintenance:{label:"Onderhoud en reparaties",projectType:"Onderhoud of reparatie"},
});
export function serviceContext(search) {
 if(typeof search!=="string"||search.length>2000)return null;
 const values=new URLSearchParams(search).getAll("onderwerp");
 if(values.length!==1||!Object.prototype.hasOwnProperty.call(serviceContexts,values[0]))return null;
 return {topic:values[0],...serviceContexts[values[0]]};
}
export function serviceEnquiryHref(topic) {
 return Object.prototype.hasOwnProperty.call(serviceContexts,topic)?"/?onderwerp="+encodeURIComponent(topic)+"#contact":"/#contact";
}
export function servicePreparationHref(topic) {
 return Object.prototype.hasOwnProperty.call(serviceContexts,topic)?"/hulpmiddelen/projectvoorbereider/?onderwerp="+encodeURIComponent(topic):"/hulpmiddelen/projectvoorbereider/";
}
export function contextProjectType(context,current,options,touched=false) {
 if(!context||current||touched||!options.includes(context.projectType))return current;
 return context.projectType;
}
// Keep the existing text-entry/checklist lifecycle independent from URL context.
export function activatePreparationContext(select,search,onNotice) {
 const context=serviceContext(search);
 if(!context||select.value)return {context:null,reset(){},cleanup(){}};
 select.value=context.topic;
 let touched=false;
 const change=()=>{touched=true;};
 select.addEventListener("input",change);
 select.addEventListener("change",change);
 onNotice(context);
 return {context,reset(){
  if(!touched&&select.value===context.topic)select.value="";
  onNotice(null);
 },cleanup(){
  select.removeEventListener("input",change);select.removeEventListener("change",change);
 }};
}
