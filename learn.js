// Learning features: glossary + mini quiz per main tab, and "save my view" (localStorage).
(function(){
const LEARN={
 "tesla/overview":{g:[["DCF (discounted cash flow)","Add up the cash a business should make in future years, shrinking each future dollar because money later is worth less than money now."],["Discount rate","The yearly return investors want for waiting and taking risk. Higher rate = future cash counts for less."],["Terminal value","A shortcut for all the cash after year 10, assuming steady growth forever. Often over half of a DCF."],["Sum of the parts","Value each business separately, add them up, add net cash, divide by shares."],["Probability-weighted","Multiply each possible outcome by its chance and add them. A 10% chance of $100 is worth $10 today."],["Free cash flow (FCF)","Cash left after running the business and paying for factories and equipment (capex). Tesla: US$1.53bn in Q3 2026."]],
  q:[["If the discount rate goes UP, what happens to the model value?",["It goes up","It goes down","No change"],1,"Future cash is divided by a bigger number, so it is worth less today."],
     ["Tesla's Q3 2026 free cash flow was about...",["US$1.5bn","US$15bn","Negative"],0,"US$1.53bn: US$6.26bn operating cash flow minus US$4.73bn capex (Q3 2026 Update)."],
     ["A 20% chance of a business worth US$50 a share adds how much to a probability-weighted value?",["US$50","US$10","US$2.50"],1,"20% x US$50 = US$10."]]},
 "spacex/overview":{g:[["Starlink","SpaceX's satellite internet. 12.0m subscribers at ~US$66/month (Q2 2026)."],["ARPU","Average revenue per user per month. Falling as Starlink grows in cheaper countries."],["Starshield","A secure satellite network for US government and national-security customers."],["Direct-to-cell","Satellites that talk straight to normal phones where there is no tower (Starlink Mobile)."],["Net cash","Cash and investments minus debt. SpaceX: ~US$60.6bn at 30 Jun 2026."],["Market value","Share price x number of shares. SPCX ~US$1.9tn at US$146.03."]],
  q:[["Which part of SpaceX made most of its 2025 revenue?",["Launch","Starlink (Connectivity)","xAI"],1,"Connectivity was US$11.4bn of US$18.7bn in 2025 (prospectus)."],
     ["Does SpaceX disclose how much Starshield earns?",["Yes, every quarter","No - it is inside Enterprise & Government","Only in the IPO prospectus"],1,"Only Consumer vs Enterprise & Government is reported, so our split is an estimate."],
     ["Why would a working Starship raise Starlink's value?",["Cheaper launches and much bigger V3 satellites","It sells more Teslas","It lowers interest rates"],0,"One Starship V3 launch is planned to add 60 Tbps, >20x a Falcon 9 V2 Mini launch."]]},
 "nvidia/overview":{g:[["Data Center","Nvidia's AI chips and networking for cloud and AI companies: US$89.0bn in Q2 FY2027, 93% of revenue."],["Gross margin","Revenue minus the direct cost of making the product, as a %. Nvidia ~75%."],["Fiscal year (FY)","Nvidia's year ends in late January, so FY2027 is mostly calendar 2026."],["GPU","Graphics processing unit: the chip used to train and run AI models."]],
  q:[["Roughly what share of Nvidia's revenue is Data Center?",["About 25%","About 50%","Over 90%"],2,"US$89.0bn of US$96.2bn in Q2 FY2027."],
     ["Why does Nvidia matter to the Teslaverse?",["It makes Tesla's cars","xAI and Tesla buy its AI chips","It owns Starlink"],1,"xAI's Colossus and Tesla's AI training run on Nvidia GPUs."]]},
 "compare/overview":{g:[["Price / sales","Market value divided by a year of revenue. Higher = investors pay more for each $1 of sales."],["Related party","A company linked to the same owners or managers, e.g. SpaceX buying Tesla Megapacks."],["Run-rate","One quarter x 4, used when a full 12 months is not reported."],["Trailing 12 months (TTM)","The last four reported quarters added up."]],
  q:[["Which company trades at a higher price/sales?",["Tesla","SpaceX"],1,"SpaceX ~US$1.9tn on ~US$31bn run-rate revenue vs Tesla ~US$1.4tn on ~US$104bn."],
     ["What is a 'run-rate'?",["Last quarter x 4","Last year's revenue","A forecast by analysts"],0,"Used for SpaceX because Q3/Q4 2025 were never reported."]]}
};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
Object.entries(LEARN).forEach(([key,L],n)=>{ const [co,sub]=key.split("/"); const panel=document.querySelector(`.panel[data-co="${co}"][data-sub="${sub}"]`); if(!panel) return;
 const id="lq"+n;
 panel.insertAdjacentHTML("beforeend",`<div class="learn"><h3>Learn: glossary</h3><dl class="gloss">${L.g.map(g=>`<dt>${g[0]}</dt><dd>${g[1]}</dd>`).join("")}</dl>
 <h3>Quick quiz</h3><div class="quiz" id="${id}">${L.q.map((q,i)=>`<div class="qq"><p><b>${i+1}. ${q[0]}</b></p><div class="btns">${q[1].map((o,j)=>`<button data-q="${id}_${i}" data-j="${j}">${o}</button>`).join("")}</div><p class="note qa" id="${id}_${i}"></p></div>`).join("")}<p class="note" id="${id}_score"></p></div></div>`);
 const got={};
 panel.querySelectorAll(`[data-q^="${id}_"]`).forEach(b=>b.onclick=()=>{ const i=+b.dataset.q.split("_")[1], q=L.q[i], ok=+b.dataset.j===q[2];
  b.parentNode.querySelectorAll("button").forEach((x,j)=>{x.classList.toggle("right",j===q[2]&&ok);x.classList.toggle("wrong",x===b&&!ok);});
  document.getElementById(`${id}_${i}`).innerHTML=(ok?"✅ Right. ":"❌ Not quite. ")+q[3]; if(!(i in got)) got[i]=ok;
  const done=Object.keys(got).length; document.getElementById(id+"_score").textContent=done===L.q.length?`Score: ${Object.values(got).filter(Boolean).length} / ${L.q.length} on first try.`:"";});
});
// ---- Save my view ----
const KEY="teslaverse.views.v1", T=window.TVApp, M=window.TVModel, B=window.TVBeyond, BU=window.TVBeyondUI;
const box=document.getElementById("viewsBox"); if(!box) return;
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return []}}, save=v=>{try{localStorage.setItem(KEY,JSON.stringify(v));return true}catch(e){return false}};
const usd=v=>"US$"+v.toFixed(2);
let chart;
function vals(v){ const t=M.run(Object.assign({},window.TV_DATA.starter,v.t)).ps, s=B.sxModel(Object.assign({},B.BD.sx.starter,v.s)); return {t:t.total,s:s.perShare,rb:t.robotaxi,op:t.optimus,cars:t.cars,sl:s.parts.starlink,xai:s.parts.xai}; }
function render(){ const V=load();
 if(!V.length){ document.getElementById("viewsList").innerHTML=`<p class="note">No saved views yet. Set some sliders, give it a name and press Save. Views are stored only in this browser (nothing is sent anywhere).</p>`; }
 else document.getElementById("viewsList").innerHTML=`<table class="lt"><tr><th>Compare</th><th>Name</th><th>Saved</th><th>Tesla /share</th><th>SpaceX /share</th><th></th></tr>${V.map((v,i)=>{const r=vals(v);return `<tr><td><input type="checkbox" data-cmp="${i}" ${v.cmp!==false?"checked":""}></td><td><b>${esc(v.name)}</b></td><td>${esc(v.date)}</td><td>${usd(r.t)}</td><td>${usd(r.s)}</td><td><button data-load="${i}">Load</button> <button data-del="${i}" class="ghost">Delete</button></td></tr>`}).join("")}</table>`;
 const sel=V.map((v,i)=>[v,i]).filter(([v])=>v.cmp!==false), price=window.TV_DATA.actuals.sharePrice, spx=B.BD.sx.price;
 const labels=["Current sliders"].concat(sel.map(([v])=>v.name)), cur={t:T.getP(),s:BU?BU.getSP():{}}, rows=[vals(cur)].concat(sel.map(([v])=>vals(v)));
 const ds=[{label:"Tesla model US$/share",backgroundColor:"#e31937",data:rows.map(r=>+r.t.toFixed(2))},{label:"SpaceX model US$/share",backgroundColor:"#58a6ff",data:rows.map(r=>+r.s.toFixed(2))}];
 if(!chart) chart=new Chart(document.getElementById("viewsChart"),{type:"bar",data:{labels,datasets:ds},options:{plugins:{title:{display:true,text:`Your views vs share prices (Tesla ${usd(price)}, SPCX ${usd(spx)})`}}}});
 else {chart.data.labels=labels; chart.data.datasets=ds; chart.update("none");}
 document.getElementById("viewsCmp").innerHTML=`<table class="lt"><tr><th>View</th><th>Tesla</th><th>Cars</th><th>Robotaxi</th><th>Optimus</th><th>SpaceX</th><th>Starlink US$bn</th><th>xAI US$bn</th></tr>${rows.map((r,i)=>`<tr><td><b>${esc(labels[i])}</b></td><td>${usd(r.t)}</td><td>${usd(r.cars)}</td><td>${usd(r.rb)}</td><td>${usd(r.op)}</td><td>${usd(r.s)}</td><td>${r.sl.toFixed(0)}</td><td>${r.xai.toFixed(0)}</td></tr>`).join("")}</table>`;
}
document.getElementById("viewSave").onclick=()=>{ const n=document.getElementById("viewName").value.trim()||("View "+(load().length+1)); const V=load();
 V.push({name:n.slice(0,40),date:new Date().toLocaleString("en-AU",{dateStyle:"medium",timeStyle:"short"}),t:T.getP(),s:BU?BU.getSP():{}}); 
 document.getElementById("viewMsg").textContent=save(V)?`Saved "${n}".`:"Could not save (browser storage blocked?)."; document.getElementById("viewName").value=""; render(); };
box.addEventListener("click",e=>{ const l=e.target.closest("[data-load]"), d=e.target.closest("[data-del]"); const V=load();
 if(l){ const v=V[+l.dataset.load]; T.setP(v.t); if(BU) BU.setSP(v.s); document.getElementById("viewMsg").textContent=`Loaded "${v.name}" - all Tesla and SpaceX sliders now use it.`; render(); }
 if(d){ const v=V.splice(+d.dataset.del,1)[0]; save(V); document.getElementById("viewMsg").textContent=`Deleted "${v.name}".`; render(); }});
box.addEventListener("change",e=>{ const c=e.target.closest("[data-cmp]"); if(c){const V=load(); V[+c.dataset.cmp].cmp=c.checked; save(V); render();}});
(window.TVHooks=window.TVHooks||[]).push(()=>{ if(chart) render(); }); (window.SXHooks=window.SXHooks||[]).push(()=>{ if(chart) render(); });
render();
})();
