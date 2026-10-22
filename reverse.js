// Reverse "what would it take" calculator: pick a target share price, solve each lever on its own.
(function(){
const D=window.TV_DATA, M=window.TVModel, A=D.actuals, T=window.TVApp, usd=T.usd, pct=T.pct, int=T.int;
const el=document.getElementById("rvTbl"); if(!el) return;
let target=A.sharePrice, base=T.getP();
const total=p=>M.run(p).ps.total;
const probBull=(p,m,keys)=>{const [a,b,c]=keys,r=(p[a]+p[b])||1,o=Object.assign({},p);o[a]=(100-m)*p[a]/r;o[b]=(100-m)*p[b]/r;o[c]=m;return o;};
// Each lever: how to apply a value, search range, formatting and a plain-English reality check.
const L=[
 {id:"rbull",n:"Robotaxi: chance of the Bull case",cur:p=>p.pBull,set:(p,v)=>probBull(p,v,["pBear","pBase","pBull"]),lo:0,hi:100,f:v=>v.toFixed(0)+"%",
  rc:(v,p)=>`Bull = ~${int(p.fleetBull)} robotaxis by 2035. Waymo runs about 4,000 driverless cars today; Tesla gives no fleet count (community trackers ~1,100 in Oct 2026).`},
 {id:"fleet",n:"Robotaxi: Base-case fleet in 2035",cur:p=>p.fleetBase,set:(p,v)=>Object.assign({},p,{fleetBase:v}),lo:10000,hi:50000000,log:1,f:v=>int(v)+" cars",
  rc:v=>`That is about ${(v/4000).toFixed(0)}x Waymo's fleet today. Cybercab line capacity is >125,000 a year (Tesla), so ${int(v)} would need ~${(v/125000).toFixed(0)} years of today's capacity or many customer cars joining.`},
 {id:"obull",n:"Optimus: chance of the Bull case",cur:p=>p.opBull,set:(p,v)=>probBull(p,v,["opBear","opBase","opBull"]),lo:0,hi:100,f:v=>v.toFixed(0)+"%",
  rc:(v,p)=>`Bull = ~${int(p.opUnitsBull)} robots a year by 2035. Today: early production in Fremont; Musk expects ~20,000 a week in about a year (his forecast).`},
 {id:"units",n:"Optimus: Base-case robots per year in 2035",cur:p=>p.opUnitsBase,set:(p,v)=>Object.assign({},p,{opUnitsBase:v}),lo:5000,hi:100000000,log:1,f:v=>int(v)+"/yr",
  rc:v=>`Musk's 20,000/week goal is ~1.0m a year. Unitree, the largest humanoid maker, shipped ~5,500 in 2025.`},
 {id:"carM",n:"Cars: free cash flow margin",cur:p=>p.carM,set:(p,v)=>Object.assign({},p,{carM:v}),lo:0,hi:0.6,f:pct,
  rc:()=>`Car gross margin was 18.5% in Q3 2026 (before R&D, overheads, tax and capex). Whole-company FCF margin was about 6.6% in 2025 and 5.5% in Q3 2026.`},
 {id:"carG1",n:"Cars: delivery growth per year, 2026-2030",cur:p=>p.carG1,set:(p,v)=>Object.assign({},p,{carG1:v}),lo:-0.05,hi:1.5,f:pct,
  rc:v=>`Means ~${(A.deliveries2025*Math.pow(1+v,5)/1e6).toFixed(1)}m cars in 2030 (1.64m in 2025). Musk's goal: ~5m a year by about 2030.`},
 {id:"enG1",n:"Energy: storage growth per year, 2026-2030",cur:p=>p.enG1,set:(p,v)=>Object.assign({},p,{enG1:v}),lo:-0.05,hi:2,f:pct,
  rc:v=>`Means ~${int(A.gwh2025*Math.pow(1+v,5))} GWh in 2030 (46.7 GWh in 2025; Megafactory Texas planned at 50 GWh).`},
 {id:"disc",n:"Discount rate (lower = patient investors)",cur:p=>p.disc,set:(p,v)=>Object.assign({},p,{disc:v}),lo:null,hi:0.2,dec:1,f:pct,
  rc:(v,p)=>`Must stay above terminal growth (${pct(p.tg)}). Most analysts use 8-11% for big companies.`}
];
function solve(l,p){ const lo=l.lo===null?p.tg+0.002:l.lo, hi=l.hi, g=v=>total(l.set(p,v));
 const vlo=g(lo), vhi=g(hi); const inc=!l.dec;
 const best=inc?vhi:vlo, worst=inc?vlo:vhi;
 if(best<target) return {fail:"max",best};
 if(worst>target) return {fail:"min",worst,val:inc?lo:hi};
 let a=lo,b=hi; for(let i=0;i<60;i++){ const m=l.log?Math.sqrt(a*b):(a+b)/2, v=g(m); if((v<target)===inc) a=m; else b=m; }
 return {val:l.log?Math.sqrt(a*b):(a+b)/2};
}
let chart;
function render(){
 const p=base, now=total(p);
 document.getElementById("rvT").textContent=usd(target);
 document.getElementById("rvNow").innerHTML=`Your current settings give <b>${usd(now)}</b> a share. Target <b>${usd(target)}</b> is ${target>now?`<b>${(target/now).toFixed(1)}x</b> higher`:`below it, so levers can move the <i>other</i> way`}. Each row changes <b>only that one lever</b> and keeps everything else where you set it.`;
 const rows=[], bars=[];
 L.forEach(l=>{const r=solve(l,p), c=l.cur(p); let need, msg;
  if(r.fail==="max"){need="Not reachable";msg=`Even at the slider's limit (${l.f(l.dec?(p.tg+0.002):l.hi)}) this lever alone only gets to ${usd(r.best)}.`; bars.push(null);}
  else if(r.fail==="min"){need="Already there";msg=`Even at ${l.f(r.val)} the model is above target.`; bars.push(0);}
  else {need=l.f(r.val); msg=l.rc(r.val,p); bars.push(l.dec? c/r.val : (Math.abs(c)>1e-9? r.val/c : null));}
  rows.push(`<tr><td><b>${l.n}</b></td><td>${l.f(c)}</td><td class="${r.fail==="max"?"oF":"oS"}"><b>${need}</b></td><td>${msg}</td></tr>`);});
 // Combined: scale robotaxi fleets + Optimus units + car margin up together by one factor.
 const comb=k=>Object.assign({},p,{fleetBear:p.fleetBear*k,fleetBase:p.fleetBase*k,fleetBull:p.fleetBull*k,opUnitsBase:p.opUnitsBase*k,opUnitsBull:p.opUnitsBull*k,carM:Math.min(0.4,p.carM*Math.sqrt(k))});
 let a=0.05,b=200,cv; if(total(comb(b))<target) cv=null; else if(total(comb(a))>target) cv=a; else {for(let i=0;i<60;i++){const m=Math.sqrt(a*b); total(comb(m))<target?a=m:b=m;} cv=b;}
 rows.push(`<tr><td><b>All together:</b> robotaxi fleets, Optimus volumes and car margin pushed up in step</td><td>x1</td><td class="${cv?"oS":"oF"}"><b>${cv?"x"+cv.toFixed(2):"Not reachable (x200)"}</b></td><td>${cv?`Fleets and robot volumes x${cv.toFixed(2)} (Base fleet ${int(p.fleetBase*cv)}, Base robots ${int(p.opUnitsBase*cv)}/yr) and car margin ${pct(Math.min(0.4,p.carM*Math.sqrt(cv)))}. Spreading the stretch across bets needs less of each.`:"Even 200x is not enough on these settings."}</td></tr>`);
 document.getElementById("rvTbl").innerHTML=`<table class="lt"><tr><th>Lever</th><th>Now</th><th>Needed</th><th>Reality check</th></tr>${rows.join("")}</table>`;
 const lab=L.map(l=>l.n.replace(/ \(.*\)/,"")); const data=bars.map(v=>v===null?null:+v.toFixed(2));
 if(!chart) chart=new Chart(document.getElementById("rvChart"),{type:"bar",data:{labels:lab,datasets:[{label:"How many times today's setting (1 = no change)",data,backgroundColor:"#d2a8ff"}]},options:{indexAxis:"y",scales:{x:{type:"logarithmic",title:{display:true,text:"multiple of current setting (log scale); missing bar = not reachable"}}},plugins:{tooltip:{callbacks:{label:c=>"x"+c.raw}}}}});
 else {chart.data.datasets[0].data=data; chart.update("none");}
}
const sl=document.getElementById("rvSlider"); sl.min=50; sl.max=2000; sl.step=1; sl.value=Math.round(target);
sl.addEventListener("input",()=>{target=+sl.value; render();});
document.getElementById("rvPrice").onclick=()=>{target=A.sharePrice; sl.value=Math.round(target); render();};
(window.TVHooks=window.TVHooks||[]).push(P=>{base=P; if(document.getElementById("rvTbl")) render();});
window.TVReverse={solve,L,setTarget:v=>{target=v;render();}};
render();
})();
