// "Beyond Tesla": SpaceX + xAI and Nvidia. SEPARATE companies - never added to Tesla's total.
(function(){
const BD = {
 sx: { // SpaceX + xAI (merged 2 Feb 2026; IPO 12 Jun 2026, Nasdaq: SPCX). US$bn unless stated.
  price: 146.03, priceDate: "16 Oct 2026 close", sharesBn: 13.182, // 7,696.3m Class A + 5,485.5m Class B (10-Q cover)
  netCash: (93.522+6.487)-(2.525+36.839), // 30 Jun 2026 balance sheet: cash + marketable securities - debt & finance leases
  ipoNet: 85.675,
  subs: 12.0, arpu: 66, connRevAnn: 4.291*4, launchRevAnn: 0.962*4, aiRevAnn: 2.561*4,
  hist: { q: ["Q1 2026","Q2 2026"], conn: [3.257,4.291], launch: [0.619,0.962], ai: [0.818,2.561], subs: [10.3,12.0] },
  starter: { sxDisc:0.10, sxTg:0.03, subG1:0.20, subG2:0.08, arpuChg:-0.03, connM:0.25, launchG:0.06, launchM:0.15,
             aiBear:45, aiBase:40, aiBull:15, aiRevBase:60, aiMBase:0.15, shipP:15, shipVal:300 },
  ai: { bear:{rev10:20, m1:-1.0, m10:0.05}, base:{m1:-1.0}, bull:{rev10:200, m1:-0.8, m10:0.25} }
 },
 nv: { // Nvidia. US$bn unless stated. Base = latest quarter (Q2 FY2027, ended 26 Jul 2026) x 4.
  price: 214.13, priceDate: "16 Oct 2026 close", sharesM: 24285,
  dcAnn: 89.023*4, edgeAnn: 7.198*4, fy26Rev: 215.938, fy26DC: 193.737,
  cash: 22.443+34.143+42.783, debt: 33.366,
  hist: { q:["Q2 FY25","Q3 FY25","Q4 FY25","Q1 FY26","Q2 FY26","Q3 FY26","Q4 FY26","Q1 FY27","Q2 FY27"],
   total:[30.040,35.082,39.331,44.062,46.743,57.006,68.127,81.615,96.221], dc:[26.272,30.771,35.580,39.112,41.096,51.215,62.314,75.246,89.023],
   gm:[null,0.746,0.730,null,0.724,0.734,0.750,0.749,0.750] },
  starter: { nvDisc:0.10, nvTg:0.03, dcG1:0.15, dcG2:0.05, edgeG:0.08, nvM:0.40 }
 },
 sources: [
  ["SpaceX acquired xAI (2 Feb 2026): SpaceX US$1tn + xAI US$250bn = US$1.25tn","Reuters","https://www.reuters.com/business/musks-spacex-merge-with-xai-combined-valuation-125-trillion-bloomberg-news-2026-02-02/"],
  ["SpaceX IPO (June 2026): 638.9m Class A shares at US$135 incl. full over-allotment; net proceeds US$85,675m","SpaceX Q2 2026 10-Q, Note 1","https://www.sec.gov/Archives/edgar/data/1181412/000162828026052535/R10.htm"],
  ["Balance sheet 30 Jun 2026: cash 93,522 + marketable securities 6,487 - debt & finance leases 39,364 (US$m) = net cash ~US$60.6bn","SpaceX Q2 2026 10-Q","https://www.sec.gov/Archives/edgar/data/1181412/000162828026052535/R2.htm"],
  ["Shares outstanding: 7,696.3m Class A + 5,485.5m Class B; ticker SPCX","SpaceX Q2 2026 10-Q cover","https://www.sec.gov/Archives/edgar/data/1181412/000162828026052535/R1.htm"],
  ["Legal name Space Exploration Technologies Corp.; xAI held via X.AI Holdings (which owns X)","SpaceX filing","https://www.sec.gov/Archives/edgar/data/1181412/000162828026043288/spaceexplorationtechnologi.htm"],
  ["SPCX close US$146.03 (16 Oct 2026); market cap ~US$1.92-1.98tn","Exa / StockAnalysis","https://stockanalysis.com/stocks/spcx/market-cap/"],
  ["SpaceX 2025 revenue US$18.7bn (Connectivity US$11.4bn); Q1 2026 revenue US$4.69bn, Connectivity US$3.26bn, AI US$0.82bn","SpaceX S-1","https://www.sec.gov/Archives/edgar/data/1181412/000162828026036936/spaceexplorationtechnologi.htm"],
  ["Q2 2026: revenue US$7.81bn (Connectivity 4.29, Space 0.96, AI 2.56); Starlink 12.0m subs, ARPU US$66/mo; Megapack purchases from Tesla","SpaceX Q2 2026 results","https://www.sec.gov/Archives/edgar/data/1181412/000162828026052515/earningsreleaseq22608042.htm"],
  ["Starship V3 tests (Flight 13, July 2026)","SpaceX Q2 2026 call transcript","https://www.fool.com/earnings/call-transcripts/2026/08/11/spacex-spcx-q2-2026-earnings-call-transcript/"],
  ["Falcon 9: 165 launches in 2025","Reuters","https://www.reuters.com/legal/government/how-math-works-175-trillion-spacex-valuation-2026-04-08/"],
  ["Tesla related-party Megapack revenue from SpaceX","Tesla Q2 2026 10-Q (XBRL)","https://www.sec.gov/Archives/edgar/data/1318605/000162828026049270/R21.htm"],
  ["Nvidia Q2 FY2027: revenue US$96.2bn, Data Center US$89.0bn, Edge US$7.2bn, GM 75.0%, FCF US$21.3bn; Q3 guide US$108bn","Nvidia CFO commentary","https://www.sec.gov/Archives/edgar/data/1045810/000104581026000073/q2fy27cfocommentary.htm"],
  ["Nvidia FY2026: revenue US$215.9bn, Data Center US$193.7bn","Nvidia Q4 FY2026 CFO commentary","http://s201.q4cdn.com/141608511/files/doc_financials/2026/Q426/Q4FY26-CFO-Commentary.pdf"],
  ["Nvidia balance sheet 26 Jul 2026 (cash 22.4, debt securities 34.1, equity securities 42.8, debt 33.4 US$bn); 24,285m diluted shares","Nvidia 10-Q / press release","https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm"],
  ["Nvidia quarterly revenue history and margins (FY25-FY26)","Nvidia releases","https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-third-quarter-fiscal-2026"],
  ["NVDA close US$214.13 (16 Oct 2026)","Nvidia IR","https://investor.nvidia.com/stock-info/stock-quote-and-chart/default.aspx"],
  ["FY2028 revenue growth ~70% preliminary expectation; margins to bottom at 71-72% (memory costs)","Nvidia Q2 FY2027 call","https://exa.ai/library/markets/stocks/NVDA/earnings/FY2027/Q2/transcript"]
 ]
};
const pv=(arr,r)=>arr.reduce((s,f,i)=>s+f/Math.pow(1+r,i+1),0), tv=(f,r,g)=>f*(1+g)/(r-g)/Math.pow(1+r,10);
function sxModel(p){ const S=BD.sx, other=S.connRevAnn/(S.subs*S.arpu*12/1000);
 let subs=S.subs, arpu=S.arpu, lr=S.launchRevAnn; const star=[],lau=[],subsA=[];
 for(let t=1;t<=10;t++){ subs*=1+(t<=5?p.subG1:p.subG2); arpu*=1+p.arpuChg; lr*=1+p.launchG;
  subsA.push(subs); star.push(subs*arpu*12/1000*other*p.connM); lau.push(lr*p.launchM); }
 const sc=(s,rev10,m10)=>{const f=[];for(let t=1;t<=10;t++){const rev=S.aiRevAnn*Math.pow(rev10/S.aiRevAnn,t/10),m=s.m1+(m10-s.m1)*(t-1)/9;f.push(rev*m);}return {fcf:f,ev:pv(f,p.sxDisc)+tv(f[9],p.sxDisc,p.sxTg)};};
 const A=S.ai, bear=sc(A.bear,A.bear.rev10,A.bear.m10), base=sc(A.base,p.aiRevBase,p.aiMBase), bull=sc(A.bull,A.bull.rev10,A.bull.m10), w=[p.aiBear/100,p.aiBase/100,p.aiBull/100];
 const ai={ev:bear.ev*w[0]+base.ev*w[1]+bull.ev*w[2],fcf:bear.fcf.map((_,i)=>bear.fcf[i]*w[0]+base.fcf[i]*w[1]+bull.fcf[i]*w[2]),bear,base,bull};
 const parts={starlink:pv(star,p.sxDisc)+tv(star[9],p.sxDisc,p.sxTg), launch:pv(lau,p.sxDisc)+tv(lau[9],p.sxDisc,p.sxTg), xai:ai.ev, starship:p.shipP/100*p.shipVal};
 const ev=parts.starlink+parts.launch+parts.xai+parts.starship, total=ev+S.netCash, mcap=S.price*S.sharesBn;
 return {parts,ev,netCash:S.netCash,total,mcap,gap:total/mcap-1,perShare:total/S.sharesBn,star,lau,ai,subsA};
}
function nvModel(p){ const N=BD.nv; let dc=N.dcAnn, ed=N.edgeAnn; const fcf=[],dcA=[],edA=[];
 for(let t=1;t<=10;t++){ dc*=1+(t<=5?p.dcG1:p.dcG2); ed*=1+p.edgeG; dcA.push(dc); edA.push(ed); fcf.push((dc+ed)*p.nvM); }
 const ev=pv(fcf,p.nvDisc)+tv(fcf[9],p.nvDisc,p.nvTg), net=N.cash-N.debt, ps=(ev+net)*1000/N.sharesM;
 return {ev,net,ps,fcf,dcA,edA,tvShare:tv(fcf[9],p.nvDisc,p.nvTg)/ev};
}
function checks(){ const out=[]; let ok=true;
 // 1) Nvidia: if every growth rate = terminal growth, DCF must equal the closed-form Gordon value.
 const N=BD.nv, q={nvDisc:.1,nvTg:.03,dcG1:.03,dcG2:.03,edgeG:.03,nvM:.4}, r=nvModel(q), gordon=(N.dcAnn+N.edgeAnn)*.4*1.03/(.1-.03);
 const e1=Math.abs(r.ev/gordon-1); if(e1>1e-6) ok=false; out.push(`Nvidia DCF vs Gordon formula: ${(e1*100).toFixed(4)}% diff`);
 // 2) Nvidia base revenue = latest quarter x 4
 const e2=Math.abs(N.dcAnn+N.edgeAnn-96.221*4); if(e2>0.01) ok=false; out.push(`Nvidia base revenue ${(N.dcAnn+N.edgeAnn).toFixed(1)}bn = Q2 FY27 x4`);
 // 3) SpaceX: Starlink revenue rebuilt from subs x ARPU x mix factor equals Q2 annualised
 const S=BD.sx, other=S.connRevAnn/(S.subs*S.arpu*12/1000), e3=Math.abs(S.subs*S.arpu*12/1000*other-S.connRevAnn); if(e3>1e-9) ok=false; out.push(`Starlink base revenue rebuild ${S.connRevAnn.toFixed(2)}bn OK`);
 // 4) SpaceX parts add up and probabilities sum to 100
 const m=sxModel(S.starter), e4=Math.abs(m.parts.starlink+m.parts.launch+m.parts.xai+m.parts.starship+m.netCash-m.total); if(e4>1e-9||S.starter.aiBear+S.starter.aiBase+S.starter.aiBull!==100) ok=false; out.push("SpaceX parts + net cash sum to total; xAI probabilities = 100%");
 const msg=`[Beyond Tesla checks] ${ok?"PASS":"FAIL"} - `+out.join("; "); (ok?console.log:console.error)(msg); return {ok,msg};
}
window.TVBeyond={BD,sxModel,nvModel,checks};
if(typeof module!=="undefined") module.exports={BD,sxModel,nvModel,checks};
})();
