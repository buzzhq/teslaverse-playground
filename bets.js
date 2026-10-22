// Tesla bets: value if it works vs probability-weighted value, plus competition & risks.
(function(){
const D=window.TV_DATA, M=window.TVModel, T=window.TVApp, usd=T.usd, pct=T.pct, COL=T.COL;
if(!document.getElementById("betChart")) return;
const ch=new Chart(document.getElementById("betChart"),{type:"bar",data:{labels:["Robotaxi","Optimus","FSD"],datasets:[
 {label:"Value if it works (Bull / full licensing)",backgroundColor:"#3fb950",data:[]},{label:"Middle (Base) case",backgroundColor:"#58a6ff",data:[]},{label:"Probability-weighted (what the model counts)",backgroundColor:"#d2a8ff",data:[]}]},
 options:{scales:{y:{type:"logarithmic",title:{display:true,text:"US$ per Tesla share (log scale)"}}},plugins:{tooltip:{callbacks:{label:c=>c.dataset.label+": "+usd(c.raw)}}}}});
function upd(P,r){ const sh=P.shares, ps=r.ps;
 const fsdWorks=M.run(Object.assign({},P,{licP:100})).ps.fsd, fsdSubs=M.run(Object.assign({},P,{licP:0})).ps.fsd;
 const rows=[["Robotaxi",r.r.bull.ev/sh,r.r.base.ev/sh,ps.robotaxi,`${P.pBull}% Bull / ${P.pBase}% Base / ${P.pBear}% Bear`],
  ["Optimus",r.o.bull.ev/sh,r.o.base.ev/sh,ps.optimus,`${P.opBull}% Bull / ${P.opBase}% Base / ${P.opBear}% Bear`],
  ["FSD",fsdWorks,fsdSubs,ps.fsd,`${P.licP}% chance of licensing to other carmakers`]];
 ch.data.datasets[0].data=rows.map(x=>Math.max(0.01,x[1])); ch.data.datasets[1].data=rows.map(x=>Math.max(0.01,x[2])); ch.data.datasets[2].data=rows.map(x=>Math.max(0.01,x[3])); ch.update("none");
 document.getElementById("betTbl").innerHTML=`<table class="lt"><tr><th>Bet</th><th>If it works</th><th>Middle case</th><th>Weighted</th><th>Weighted as % of 'works'</th><th>Your odds</th></tr>`+rows.map(x=>`<tr><td><b>${x[0]}</b></td><td>${usd(x[1])}</td><td>${usd(x[2])}</td><td><b>${usd(x[3])}</b></td><td>${pct(x[3]/x[1])}</td><td>${x[4]}</td></tr>`).join("")+`</table><p class="note">For FSD the "middle case" column is subscriptions only (no licensing). Values are model outputs at your slider settings, not forecasts. The share price is ${usd(D.actuals.sharePrice)}; together the three "if it works" values are ${usd(rows[0][1]+rows[1][1]+rows[2][1])} a share.</p>`;
}
(window.TVHooks=window.TVHooks||[]).push(upd); T.update();
})();
