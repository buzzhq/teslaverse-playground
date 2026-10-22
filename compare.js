// Tesla vs SpaceX side by side. Reported figures with dates; model values update live from both sets of sliders.
(function(){
const D=window.TV_DATA, A=D.actuals, M=window.TVModel, B=window.TVBeyond, S=B.BD.sx, T=window.TVApp;
if(!document.getElementById("cmpTbl")) return;
const bn=v=>v==null?"<i>not available</i>":"US$"+(v>=100?Math.round(v).toLocaleString("en-AU"):v.toFixed(1))+"bn", x=v=>v==null?"<i>not available</i>":v.toFixed(1)+"x";
const tslaTTM=(24901+22387+28236+28046)/1000; // Q4 2025 - Q3 2026 (Tesla Q3 2026 Update)
const spaceRun=(4.291+0.962+2.561)*4;        // Q2 2026 x4 (SpaceX Q2 2026 release); SpaceX's Q3/Q4 2025 were never reported, so no true TTM
const tMcap=A.sharePrice*A.sharesDiluted/1000, sMcap=S.price*S.sharesBn;
const C=(id,cfg)=>new Chart(document.getElementById(id),cfg);
const cv=C("cmpVal",{type:"bar",data:{labels:["Tesla","SpaceX (incl. xAI)"],datasets:[{label:"Model value at your sliders (US$bn)",backgroundColor:"#3fb950",data:[0,0]},{label:"Market value (US$bn)",backgroundColor:"#484f58",data:[tMcap,sMcap]}]},options:{plugins:{title:{display:true,text:"Model value vs market value"}}}});
C("cmpPs",{type:"bar",data:{labels:["Tesla (trailing 12 months)","SpaceX (Q2 2026 x4)"],datasets:[{label:"Price / sales (x)",backgroundColor:["#e31937","#58a6ff"],data:[tMcap/tslaTTM,sMcap/spaceRun]}]},options:{plugins:{title:{display:true,text:"Price paid per $1 of yearly revenue"},legend:{display:false}}}});
C("cmpCash",{type:"bar",data:{labels:["Tesla (30 Sep 2026)","SpaceX (30 Jun 2026)"],datasets:[{label:"Cash & investments",backgroundColor:"#3fb950",data:[A.cash/1000,93.522+6.487]},{label:"Debt & finance leases",backgroundColor:"#f85149",data:[A.debt/1000,2.525+36.839]}]},options:{plugins:{title:{display:true,text:"Cash vs debt (US$bn)"}}}});
C("cmpRev",{type:"bar",data:{labels:["Tesla","SpaceX"],datasets:[{label:"Yearly revenue (US$bn)",backgroundColor:["#e31937","#58a6ff"],data:[tslaTTM,spaceRun]}]},options:{plugins:{title:{display:true,text:"Revenue: Tesla trailing 12 months vs SpaceX Q2 2026 x4"},legend:{display:false}}}});
let tv=0, sv=0;
function render(){ const P=T.getP(), tp=M.run(P).ps.total; tv=tp*P.shares/1000;
 const sp=window.TVBeyondUI?B.sxModel(window.TVBeyondUI.getSP()):B.sxModel(S.starter); sv=sp.total;
 cv.data.datasets[0].data=[tv,sv]; cv.update("none");
 const R=[["Model value (your sliders)",bn(tv)+` (US$${tp.toFixed(2)}/share)`,bn(sv)+` (US$${sp.perShare.toFixed(2)}/share)`],
  ["Market value",bn(tMcap)+` (US$${A.sharePrice.toFixed(2)} x ${(A.sharesDiluted/1000).toFixed(2)}bn diluted shares, 21 Oct 2026)`,bn(sMcap)+` (US$${S.price.toFixed(2)} x ${S.sharesBn.toFixed(2)}bn shares, ${S.priceDate})`],
  ["Market pays vs model",x(tMcap/tv),x(sMcap/sv)],
  ["Yearly revenue",bn(tslaTTM)+" (12 months to 30 Sep 2026)",bn(spaceRun)+" (Q2 2026 x4 run-rate; no 12-month figure because Q3/Q4 2025 were not reported)"],
  ["Price / sales",x(tMcap/tslaTTM),x(sMcap/spaceRun)+" (on run-rate)"],
  ["Cash & investments",bn(A.cash/1000)+" (30 Sep 2026)",bn(93.522+6.487)+" (30 Jun 2026)"],
  ["Debt & finance leases",bn(A.debt/1000),bn(2.525+36.839)],
  ["Net cash",bn((A.cash-A.debt)/1000),bn(S.netCash)],
  ["Latest quarterly free cash flow","US$1.5bn (Q3 2026)","<i>not shown - not checked in filings yet</i>"],
  ["Spending on AI / capex","2026 capex guide ~US$20bn incl. AI compute (Q3 call)","AI segment capex US$15.8bn in Q2 2026 alone (release)"],
  ["Latest results","Q3 2026, 21 Oct 2026","Q2 2026, 4 Aug 2026 (Q3 not yet reported)"]];
 document.getElementById("cmpTbl").innerHTML=`<table class="lt"><tr><th></th><th>Tesla</th><th>SpaceX (incl. xAI)</th></tr>${R.map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table>`;
}
(window.TVHooks=window.TVHooks||[]).push(()=>render()); (window.SXHooks=window.SXHooks||[]).push(()=>render());
render();
})();
