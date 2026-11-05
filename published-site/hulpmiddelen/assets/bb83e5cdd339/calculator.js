// Integer arithmetic keeps exact tile boundaries stable for decimal input.
export function parseDecimal(raw, min, max, optional = false) {
  const text = String(raw).trim();
  if (optional && text === '') return null;
  if (!/^\d+(?:[.,]\d{1,3})?$/.test(text)) throw new Error('Gebruik een getal met maximaal drie decimalen, bijvoorbeeld 3,25.');
  const [whole, fraction = ''] = text.replace(',', '.').split('.');
  const units = BigInt(whole) * 1000n + BigInt(fraction.padEnd(3, '0'));
  if (units < BigInt(Math.round(min * 1000)) || units > BigInt(Math.round(max * 1000))) {
    throw new Error(`Vul een waarde tussen ${min} en ${max} in.`);
  }
  return units;
}
const ceilDivide = (n, d) => (n + d - 1n) / d;
export function calculate(raw) {
  const limits = {tileLength:[0.1,300], tileWidth:[0.1,300], reserve:[0,50], pack:[1,1000,true]};
  const values = {}, errors = {};
  for (const [key, range] of Object.entries(limits)) {
    try { values[key] = parseDecimal(raw[key] ?? '', ...range); }
    catch (error) { errors[key] = error.message; }
  }
  if (values.pack !== null && values.pack !== undefined && values.pack % 1000n !== 0n) errors.pack = 'Vul een heel aantal tegels per verpakking in.';
  const multiple = Object.prototype.hasOwnProperty.call(raw,'surfaces');
  const surfaces = multiple ? raw.surfaces : [raw];
  if(!Array.isArray(surfaces) || surfaces.length<1 || surfaces.length>8)return {errors:{surfaces:'Gebruik één tot maximaal acht vlakken.'}};
  let gross=0n,net=0n;
  const surfaceDetails=[];
  Array.from(surfaces).forEach((surface,index)=>{
    const parsed={},keyFor=key=>multiple?`s${index}.${key}`:key;
    for(const [key,range] of Object.entries({length:[0.01,100],width:[0.01,100],deduction:[0,10000]})){
      try{parsed[key]=parseDecimal(surface?.[key]??'',...range);}
      catch(error){errors[keyFor(key)]=error.message;}
    }
    if(['length','width','deduction'].some(key=>errors[keyFor(key)]))return;
    const surfaceGross=parsed.length*parsed.width;
    const surfaceNet=surfaceGross-parsed.deduction*1000n;
    if(surfaceNet<=0n){errors[keyFor('deduction')]='De aftrek moet kleiner zijn dan de oppervlakte van dit vlak.';return;}
    gross+=surfaceGross;net+=surfaceNet;
    surfaceDetails.push({index,gross:Number(surfaceGross)/1e6,net:Number(surfaceNet)/1e6});
  });
  if (Object.keys(errors).length) return {errors};
  const tile = values.tileLength * values.tileWidth;
  const baseTiles = ceilDivide(net * 10000n, tile);
  const tiles = ceilDivide(net * 10000n * (100000n + values.reserve), tile * 100000n);
  const packs = values.pack === null ? null : ceilDivide(tiles, values.pack / 1000n);
  const purchasedTiles = packs === null ? tiles : packs * (values.pack / 1000n);
  return {errors:{}, gross:Number(gross)/1e6, net:Number(net)/1e6,
    reserve:Number(values.reserve)/1000, areaWithReserve:Number(net * (100000n + values.reserve))/1e11,
    baseTiles:Number(baseTiles), tiles:Number(tiles), packs:packs === null ? null : Number(packs),
    purchasedTiles:Number(purchasedTiles), purchaseArea:Number(purchasedTiles * tile)/1e10,surfaceDetails};
}
