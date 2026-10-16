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
function run(p){
  const c=cars(p), e=energy(p), r=robotaxi(p), netCash=A.cash-A.debt, sh=p.shares;
  const ps = { cars:c.ev/sh, energy:e.ev/sh, robotaxi:r.ev/sh, cash:netCash/sh };
  ps.total = ps.cars+ps.energy+ps.robotaxi+ps.cash;
  const gap = A.sharePrice-(ps.total-ps.robotaxi);
  return { c,e,r,ps, gapClosed: gap>0 ? ps.robotaxi/gap : 1 };
}
function selfCheck(){
  const out=run(D.starter).ps, exp=D.expected, rows=[]; let ok=true;
  for(const k of ["cars","energy","robotaxi","cash","total"]){ const d=Math.abs(out[k]-exp[k]); if(d>0.05) ok=false; rows.push(`${k}: ${out[k].toFixed(2)} vs ${exp[k].toFixed(2)}`); }
  const msg=`[Teslaverse self-check] ${ok?"PASS":"FAIL"} (tolerance $0.05) - `+rows.join("; ");
  (ok?console.log:console.error)(msg); return {ok,msg};
}
window.TVModel={run,selfCheck,scenario};
if(typeof module!=="undefined") module.exports={run,selfCheck};
})();
