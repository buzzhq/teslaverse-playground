// SpaceX (incl. xAI) historical trends. Reported figures only (US$bn unless noted). null = not disclosed.
// Annual 2023-2025 and Q1/Q2 2025: 424(b)(4) prospectus (12 Jun 2026, recast to include xAI and X).
// Q1/Q2 2026: Q2 2026 10-Q and 4 Aug 2026 earnings release. Q3/Q4 2025 were not disclosed separately.
const TR={
 A:["2023","2024","2025"], Q:["Q1 25","Q2 25","Q1 26","Q2 26"],
 rev:{space:[[3.557,3.796,4.086],[0.865,0.746,0.619,0.962]], conn:[[3.869,7.599,11.387],[2.475,2.588,3.257,4.291]], ai:[[2.961,2.620,3.201],[0.727,0.737,0.818,2.561]]},
 aiOp:[[-3.973,-1.561,-6.355],[-0.936,-1.524,-2.469,-1.257]], aiEbitda:[[1.222,0.347,-1.237],[-0.112,-0.276,-0.609,1.146]],
 aiCapex:[[0.463,5.633,12.727],[2.567,0.749,7.723,15.828]],
 gw:[[0,0.3,0.8],[0.3,0.4,1.0,1.4]],
 ads:[[2.323,1.728,1.844],[0.444,0.426,0.343,0.367]], aiSol:[[0.638,0.892,1.357],[0.284,0.311,0.475,2.194]],
 subs:[[2.3,4.4,8.9],[5.0,6.0,10.3,12.0]], arpu:[[99,91,81],[86,85,66,66]],
 consumer:[[2.817,4.830,7.208],[1.492,1.721,2.148,2.485]], eg:[[1.052,2.769,4.179],[0.982,0.867,1.109,1.806]],
 connOp:[[0.469,2.006,4.423],[1.033,0.923,1.188,1.656]],
 launches:[[98,138,170],[38,46,40,38]], falcon:[[96,134,165],[36,null,40,null]], custL:[[33,45,43],[12,9,7,10]],
 ls:[[1.964,2.584,2.576],[0.566,0.490,0.330,0.648]], ld:[[1.593,1.212,1.510],[0.299,0.256,0.289,0.314]],
 spaceOp:[[-0.001,0.021,-0.657],[-0.070,-0.369,-0.662,-0.542]],
 ship:{o:"FFPSSSFFPSSPSS", rd:[[1.538,1.835,3.004],[0.526,0.693,0.930,1.076]], capex:[[1.497,2.032,3.832],[0.759,0.946,1.052,1.174]]},
 px:{d:["11 Jun (IPO price)","31 Jul","31 Aug","30 Sep","16 Oct"],v:[135,108.37,143.69,150.86,146.03]}
};
(function(){
const L=[...TR.A,...TR.Q], j=a=>[...a[0],...a[1]];
const sep={id:"sep",afterDraw(c){const x=c.scales.x;if(!x||c.config.type==="pie")return;const p=(x.getPixelForValue(2)+x.getPixelForValue(3))/2,ctx=c.ctx;ctx.save();ctx.strokeStyle="#8b949e";ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(p,c.chartArea.top);ctx.lineTo(p,c.chartArea.bottom);ctx.stroke();ctx.fillStyle="#8b949e";ctx.font="10px sans-serif";ctx.fillText("full year",c.chartArea.left+2,c.chartArea.top+10);ctx.fillText("quarter",p+4,c.chartArea.top+10);ctx.restore();}};
function mk(id,title,ds,opt={}){const el=document.getElementById(id); if(!el) return; new Chart(el,{type:opt.type||"bar",data:{labels:opt.labels||L,datasets:ds},plugins:opt.nosep?[]:[sep],options:Object.assign({responsive:true,maintainAspectRatio:false,plugins:{title:{display:true,text:title}},scales:Object.assign({x:{stacked:!!opt.stack},y:{stacked:!!opt.stack}},opt.scales||{})})});}
const b=(label,c,data,extra={})=>Object.assign({label,backgroundColor:c,borderColor:c,data},extra);
const ln=(label,c,data,extra={})=>Object.assign({type:"line",label,borderColor:c,backgroundColor:c,data,spanGaps:false,tension:0.2},extra);
// Overview
mk("tSxRev","Revenue by segment (US$bn) - annual, then quarterly",[b("Connectivity (Starlink)","#58a6ff",j(TR.rev.conn)),b("Space (launch)","#8b949e",j(TR.rev.space)),b("AI (xAI + X)","#d2a8ff",j(TR.rev.ai))],{stack:true});
mk("tSxPx","SPCX share price (US$, month-end closes)",[ln("SPCX","#3fb950",TR.px.v)],{type:"line",labels:TR.px.d,nosep:true});
// xAI
mk("tAiRev","AI segment revenue (US$bn): X advertising vs AI solutions & infrastructure",[b("Advertising (mostly X)","#8b949e",j(TR.ads)),b("AI solutions & infrastructure (Grok, compute, subs)","#d2a8ff",j(TR.aiSol))],{stack:true});
mk("tAiOp","AI segment profit (US$bn)",[b("Operating profit/loss (GAAP)","#f85149",j(TR.aiOp)),ln("Adjusted EBITDA (non-GAAP)","#3fb950",j(TR.aiEbitda))]);
mk("tAiCapex","AI capex (US$bn) and compute power (GW)",[b("AI capex (US$bn)","#d2a8ff",j(TR.aiCapex)),ln("Nameplate compute (GW, period end)","#f0883e",j(TR.gw),{yAxisID:"y2"})],{scales:{y2:{position:"right",min:0,grid:{display:false},title:{display:true,text:"GW"}}}});
// Starlink
mk("tSlSubs","Starlink subscribers (m) and ARPU (US$/month)",[b("Subscribers (m, period end)","#58a6ff",j(TR.subs)),ln("ARPU (US$/month)","#f0883e",j(TR.arpu),{yAxisID:"y2"})],{scales:{y2:{position:"right",min:0,grid:{display:false}}}});
mk("tSlRev","Connectivity revenue (US$bn) and operating margin",[b("Consumer","#58a6ff",j(TR.consumer),{stack:"r"}),b("Enterprise & government","#1f6feb",j(TR.eg),{stack:"r"}),ln("Operating margin %","#3fb950",j(TR.connOp).map((v,i)=>+(100*v/(j(TR.consumer)[i]+j(TR.eg)[i])).toFixed(1)),{yAxisID:"y2"})],{stack:true,scales:{y2:{position:"right",min:0,max:50,grid:{display:false},title:{display:true,text:"%"}}}});
// Launch
mk("tLnCount","Launches (number)",[b("Customer launches","#f0883e",j(TR.custL),{stack:"l"}),b("Internal (mostly Starlink) and Starship","#8b949e",j(TR.launches).map((v,i)=>v-j(TR.custL)[i]),{stack:"l"})],{stack:true});
mk("tLnRev","Space segment revenue (US$bn) and operating profit",[b("Launch services","#8b949e",j(TR.ls),{stack:"r"}),b("Launch & development (NASA, DoW contracts)","#6e7681",j(TR.ld),{stack:"r"}),ln("Operating profit/loss (US$bn, right axis)","#f85149",j(TR.spaceOp),{yAxisID:"y2"})],{stack:true,scales:{y2:{position:"right",grid:{display:false}}}});
{const o=TR.ship.o.split(""),lab=o.map((_,i)=>"F"+(i+1)+(i<6?" V1":i<11?" V2":" V3")); let s=0,h=0; const rate=[],rateH=[],cum=[]; o.forEach((x,i)=>{if(x==="S"){s++;h++;} if(x==="P")h+=0.5; cum.push(i+1); rate.push(+(100*s/(i+1)).toFixed(0)); rateH.push(+(100*h/(i+1)).toFixed(0));});
 mk("tShFl","Starship test flights: cumulative count and success rate",[b("Cumulative flights","#484f58",cum),ln("Success rate % (successes only)","#3fb950",rate,{yAxisID:"y2"}),ln("Success rate % (partials count half)","#f0883e",rateH,{yAxisID:"y2",borderDash:[5,4]})],{labels:lab,nosep:true,scales:{y2:{position:"right",min:0,max:100,grid:{display:false}}}});}
mk("tShRd","Space segment R&D (mostly Starship) and capex, US$bn",[b("Space R&D","#f0883e",j(TR.ship.rd)),b("Space capex","#8b949e",j(TR.ship.capex))]);
})();
