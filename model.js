// Re-implementation of the Sheet's formulas (Tesla Cars, Tesla Energy, Robotaxi tabs).
(function(){
const D = window.TV_DATA, A = D.actuals;
function gordon(lastFcf, r, g){ return lastFcf*(1+g)/(r-g); }
function cars(p){
  let del = A.deliveries2025, asp = A.autoRevenue2025*1e6/A.deliveries2025, pv=0, fcf=[];
  for(let t=1;t<=10;t++){ del*= 1+(t<=5?p.carG1:p.carG2); asp*=1+p.asp;
    const f = del*asp/1e6*p.carM; fcf.push(f); pv += f/Math.pow(1+p.disc,t); }
  const tv = gordon(fcf[9],p.disc,p.tg)/Math.pow(1+p.disc,10);
  return { ev: pv+tv, fcf, tvShare: tv/(pv+tv) };
}
function energy(p){
  let g = A.gwh2025, rpg = A.energyRevenue2025/A.gwh2025, pv=0, fcf=[];
  for(let t=1;t<=10;t++){ g*=1+(t<=5?p.enG1:p.enG2); rpg*=1+p.gwhP;
    const f=g*rpg*p.enM; fcf.push(f); pv+=f/Math.pow(1+p.disc,t); }
  const tv = gordon(fcf[9],p.disc,p.tg)/Math.pow(1+p.disc,10);
  return { ev: pv+tv, fcf, tvShare: tv/(pv+tv) };
}
function scenario(s, fleet10, m10, p){
  let pv=0, fcf=[], fleet=[];
  for(let t=1;t<=10;t++){
    const fl = s.fleet1*Math.pow(fleet10/s.fleet1,(t-1)/9);
    const fare = s.fare*Math.pow(1+s.fareChg,t-1);
    const rev = fl*s.miles*fare*s.share/1e6;
    const m = s.m1+(m10-s.m1)*(t-1)/9;
    const f = rev*m; fcf.push(f); fleet.push(fl); pv+=f/Math.pow(1+p.disc,t);
  }
  const tv = gordon(fcf[9],p.disc,p.tg)/Math.pow(1+p.disc,10);
  return { ev: pv+tv, fcf, fleet };
}
function robotaxi(p){
  const R=D.robotaxi;
  const bear=scenario(R.bear,p.fleetBear,p.mBear,p), base=scenario(R.base,p.fleetBase,p.mBase,p), bull=scenario(R.bull,p.fleetBull,p.mBull,p);
  const w=[p.pBear/100,p.pBase/100,p.pBull/100];
  const ev = bear.ev*w[0]+base.ev*w[1]+bull.ev*w[2];
  const fcf = bear.fcf.map((_,i)=>bear.fcf[i]*w[0]+base.fcf[i]*w[1]+bull.fcf[i]*w[2]);
  return { ev, fcf, bear, base, bull };
}
function optScen(s,u10,m10,p){
  let pv=0,fcf=[],units=[];
  for(let t=1;t<=10;t++){ const u=s.units1*Math.pow(u10/s.units1,(t-1)/9), pr=s.price1*Math.pow(1+s.priceChg,t-1), m=s.m1+(m10-s.m1)*(t-1)/9;
    const f=u*pr/1e6*m; fcf.push(f); units.push(u); pv+=f/Math.pow(1+p.disc,t); }
  const tv=gordon(fcf[9],p.disc,p.tg)/Math.pow(1+p.disc,10); return {ev:pv+tv,fcf,units};
}
function optimus(p){ const O=D.optimus;
  const bear=optScen(O.bear,O.bear.units10,O.bear.m10,p), base=optScen(O.base,p.opUnitsBase,p.opMBase,p), bull=optScen(O.bull,p.opUnitsBull,p.opMBull,p);
  const w=[p.opBear/100,p.opBase/100,p.opBull/100];
  return { ev:bear.ev*w[0]+base.ev*w[1]+bull.ev*w[2], fcf:bear.fcf.map((_,i)=>bear.fcf[i]*w[0]+base.fcf[i]*w[1]+bull.fcf[i]*w[2]), bear,base,bull };
}
// FSD: only INCREMENTAL subscribers above today's base are counted (today's FSD revenue already sits inside car revenue/margin),
// plus an optional probability-weighted licensing stream. Robotaxi fares are valued separately and not counted here.
function fsd(p){ const F=D.fsd, s0=F.paidCustomers*F.subShare; let s=s0,pv=0,fcf=[],subs=[],sub=[],lic=[];
  for(let t=1;t<=10;t++){ s*=1+(t<=5?p.fsdG1:p.fsdG2);
    const rev=(s-s0)*p.fsdPrice*12*Math.pow(1+p.fsdPriceChg,t-1)/1e6, fs=rev*p.fsdM;
    const cars=p.licCars*Math.max(0,(t-F.licStartYear)/(10-F.licStartYear)), fl=cars*p.licFee/1e6*F.licMargin*p.licP/100;
    subs.push(s); sub.push(fs); lic.push(fl); fcf.push(fs+fl); pv+=(fs+fl)/Math.pow(1+p.disc,t); }
  const tv=gordon(fcf[9],p.disc,p.tg)/Math.pow(1+p.disc,10); return {ev:pv+tv,fcf,subs,sub,lic,s0};
}
function run(p){
  const c=cars(p), e=energy(p), r=robotaxi(p), netCash=A.cash-A.debt, sh=p.shares;
  const o=optimus(p), f=fsd(p);
  const ps = { cars:c.ev/sh, energy:e.ev/sh, robotaxi:r.ev/sh, optimus:o.ev/sh, fsd:f.ev/sh, cash:netCash/sh };
  ps.core = ps.cars+ps.energy+ps.robotaxi+ps.cash;
  ps.total = ps.core+ps.optimus+ps.fsd;
  const core4=ps.cars+ps.energy+ps.cash, gap=A.sharePrice-core4;
  return { c,e,r,o,f,ps, gapClosed: gap>0 ? (ps.total-core4)/gap : 1 };
}
function selfCheck(){
  const out=run(D.starter).ps, exp=D.expected, rows=[]; let ok=true;
  out.totalV4=out.core;
  for(const k of ["cars","energy","robotaxi","cash"]){ const d=Math.abs(out[k]-exp[k]); if(d>0.05) ok=false; rows.push(`${k}: ${out[k].toFixed(2)} vs ${exp[k].toFixed(2)}`); }
  if(Math.abs(out.core-exp.total)>0.05) ok=false; rows.push(`original four total: ${out.core.toFixed(2)} vs ${exp.total.toFixed(2)}`);
  rows.push(`NEW total incl. Optimus ${out.optimus.toFixed(2)} + FSD ${out.fsd.toFixed(2)} = ${out.total.toFixed(2)}`);
  const msg=`[Teslaverse self-check] ${ok?"PASS":"FAIL"} (tolerance $0.05) - `+rows.join("; ");
  (ok?console.log:console.error)(msg); return {ok,msg};
}
window.TVModel={run,selfCheck,scenario};
if(typeof module!=="undefined") module.exports={run,selfCheck};
})();
