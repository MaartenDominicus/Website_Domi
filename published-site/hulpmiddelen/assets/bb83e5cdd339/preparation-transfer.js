// One-use, same-tab preparation handoff. No network requests or personal fields.
export const TRANSFER_KEY='domi-preparation-v1';
export const TRANSFER_TTL=5*60*1000;
export const MESSAGE_LIMIT=5000;
const topicOptions={bathroom:'Badkamer of toilet',renovation:'Renovatie of verbouwing',electrical:'Elektra',water:'Water of sanitair',heating:'Anders',finishing:'Timmer- of afbouwwerk',carpentry:'Timmer- of afbouwwerk',maintenance:'Onderhoud of reparatie',unsure:'Anders'};
export function validTransfer(value,now=Date.now()) {
 return Boolean(value && typeof value==='object' && value.version===1 && typeof value.topic==='string' && Object.prototype.hasOwnProperty.call(topicOptions,value.topic) && typeof value.summary==='string' && value.summary.trim().length>0 && value.summary.length<=MESSAGE_LIMIT && Number.isSafeInteger(value.createdAt) && Number.isSafeInteger(now) && value.createdAt<=now && now-value.createdAt<TRANSFER_TTL);
}
export function saveTransfer(getStorage,topic,summary,now=Date.now()) {
 const payload={version:1,topic,summary,createdAt:now};
 if(!validTransfer(payload,now)) return {status:'invalid'};
 try {getStorage().setItem(TRANSFER_KEY,JSON.stringify(payload));return {status:'saved'};}
 catch{return {status:'unavailable'};}
}
export function consumeTransfer(getStorage,now=Date.now()) {
 try {
  const storage=getStorage(),raw=storage.getItem(TRANSFER_KEY);
  if(raw===null) return {status:'empty'};
  storage.removeItem(TRANSFER_KEY); // Remove even malformed/expired data, before exposing a preview.
  if(raw.length>20000) return {status:'invalid'};
  const payload=JSON.parse(raw);
  return validTransfer(payload,now)?{status:'ready',payload}:{status:'invalid'};
 } catch{return {status:'unavailable'};}
}
export function appendPreparation(draft,summary) {
 if(typeof draft!=='string'||typeof summary!=='string'||!summary.trim()||summary.length>MESSAGE_LIMIT) return {ok:false,message:draft};
 const message=draft ? draft+'\n\n'+summary : summary;
 return message.length<=MESSAGE_LIMIT?{ok:true,message}:{ok:false,message:draft};
}
export function preparationProjectType(topic,current,options,locale="nl") {
 if(current) return current;
 const translated={bathroom:"Bathroom or toilet",renovation:"Renovation or remodelling",electrical:"Electrical",water:"Plumbing or sanitary",heating:"Other",finishing:"Carpentry or finishing",carpentry:"Carpentry or finishing",maintenance:"Maintenance or repair",unsure:"Other"};
 const choices=locale==="en"?translated:topicOptions;
 const candidate=Object.prototype.hasOwnProperty.call(choices,topic)?choices[topic]:'';
 return options.includes(candidate)?candidate:current;
}
