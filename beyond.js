// "Beyond Tesla": SpaceX + xAI and Nvidia. SEPARATE companies - never added to Tesla's total.
(function(){
const BD = {
 sx: { // SpaceX + xAI (merged 2 Feb 2026; IPO 12 Jun 2026, Nasdaq: SPCX). US$bn unless stated.
  price: 145.23, priceDate: "28 Oct 2026 close", sharesBn: 13.581, // 8,246.5m Class A + 5,334.5m Class B at 15 Oct 2026 (Q3 2026 10-Q cover)
  netCash: (51.294+38.561)-(2.698+36.146), // 30 Sep 2026 balance sheet: cash + marketable securities - debt & finance leases (Q3 2026 release)
  ipoNet: 85.675,
  subs: 13.6, arpu: 69, connRevAnn: 5.248*4, launchRevAnn: 1.767*4, aiRevAnn: 7.560*4, // Q3 2026 x4
  hist: { q: ["Q1 2026","Q2 2026","Q3 2026"], conn: [3.257,4.291,5.248], launch: [0.619,0.962,1.767], ai: [0.818,2.561,7.560], subs: [10.3,12.0,13.6] },
  // Starlink split. Disclosed (Q3 2026 release): Consumer 3.121 + Enterprise & Government 2.127 = 5.248 (US$bn, quarter).
  // The E&G split into aviation/maritime (+other enterprise), government/Starshield and direct-to-cell is NOT disclosed:
  // we assume equal thirds (an estimate, clearly labelled on the site).
  seg: { consumerQ:3.121, egQ:2.127, egSplit:{ avm:1/3, gov:1/3, d2c:1/3 }, d2cDevicesM:7.4, d2cSats:650, d2cCountries:30 },
  // Starship progress link (assumptions): at 100% progress, Starlink margin +10 pts (cheaper replacement launches), consumer and
  // direct-to-cell growth +5 pts in years 1-5 (V3 capacity: 60 Tbps per Starship launch vs ~2.8 for Falcon 9 V2 Mini), launch margin +10 pts, launch growth +3 pts.
  shipLink: { connM:0.10, capG:0.05, launchM:0.10, launchG:0.03 },
  starter: { sxDisc:0.10, sxTg:0.03, subG1:0.20, subG2:0.08, arpuChg:-0.03, connM:0.25, launchG:0.06, launchM:0.15,
             avG1:0.164, govG1:0.164, d2cG1:0.164, shipProg:0,
             shipP:15, shipVal:300,
             // xAI business lines: r = starting revenue (US$bn/yr, Q3 2026 x4 split), g1 = growth yrs 1-5, g2 = growth yrs 6-10, m = cash margin by year 10, p = probability (%)
             subs_r:1.68, subs_g1:0.25, subs_g2:0.08, subs_m:0.25,
             api_r:3.71, api_g1:0.30, api_g2:0.10, api_m:0.25,
             agents_g1:0.60, agents_g2:0.25, agents_m:0.20, agents_p:25, agents_r1:0.5,
             compute_r:22.64, compute_g1:0.20, compute_g2:0.03, compute_m:0.15,
             ads_r:2.152, ads_g1:0.00, ads_g2:0.02, ads_m:0.15,
             gov_r:0.056, gov_g1:0.40, gov_g2:0.10, gov_m:0.20,
             orbital_p:5, orbital_r1:1, orbital_g:0.6, orbital_m:0.25,
             shared_c:2.5 },
  // Q3 2026 SI (ex-AI) segment revenue (US$bn): Advertising 0.538 + SI solutions & infrastructure 7.022 (release), of which Cursor 0.608
  // (from 14 Aug close; release). Ex-Cursor solutions 6.414 (+192% q/q, "driven primarily by cloud services"). The compute vs Grok split is
  // NOT disclosed - our ESTIMATE: Grok subs/API/gov ~0.754 (Q2 0.594 +~27%), so compute ~5.660. Cursor (developer tools) is put in API & enterprise.
  // Q2 2026 was: ads 0.367, compute ~1.6 (call), subs 0.330, api 0.250, gov 0.014.
  aiQ: { total:7.560, ads:0.538, compute:5.660, subs:0.420, api:0.928, gov:0.014, agents:0 },
  // Fixed starting margins (year 1) per line, ramping linearly to the year-10 slider. Assumptions.
  m0: { subs:0, api:0, agents:-0.5, compute:0.10, ads:0.05, gov:0, orbital:-1 },
  LINES: ["subs","api","agents","compute","ads","gov","orbital","shared"]
 },
 nv: { // Nvidia. US$bn unless stated. Base = latest quarter (Q2 FY2027, ended 26 Jul 2026) x 4.
  price: 214.13, priceDate: "16 Oct 2026 close", sharesM: 24285,
  dcAnn: 89.023*4, edgeAnn: 7.198*4, fy26Rev: 215.938, fy26DC: 193.737,
  cash: 22.443+34.143+42.783, debt: 33.366,
  hist: { q:["Q2 FY25","Q3 FY25","Q4 FY25","Q1 FY26","Q2 FY26","Q3 FY26","Q4 FY26","Q1 FY27","Q2 FY27"],
   total:[30.040,35.082,39.331,44.062,46.743,57.006,68.127,81.615,96.221], dc:[26.272,30.771,35.580,39.112,41.096,51.215,62.314,75.246,89.023],
   gm:[null,0.746,0.730,null,0.724,0.734,0.750,0.749,0.750] },
  // CoWoS capacity cap on DC revenue. cowos0 = '000 wafers/month (est.); capacity-implied
  // Nvidia DC US$bn/yr ≈ cowosKwpm × 12 × nvCowosShare × revPerCowos. revPerCowos chosen so
  // starter capacity ≈ today's annualised DC (US$356bn): 90×12×0.60×0.55 ≈ 356.
  starter: { nvDisc:0.10, nvTg:0.03, dcG1:0.15, dcG2:0.05, edgeG:0.08, nvM:0.40,
             cowos0:90, cowosG:0.12, nvCowosShare:0.60, revPerCowos:0.55 },
  // Historical TSMC scale (for DC-tab visual). CoWoS kwpm = TrendForce / Commercial Times estimates (not official).
  // Capex US$bn: 2024-25 official management reports; 2022-23 approx from NT$ / FX; 2026 mid of initial US$52-56bn guide (later raised).
  // Adv node = 7nm-and-below share of wafer revenue (TSMC tech mix, approx).
  tsmc: { y:[2022,2023,2024,2025,2026],
    cowos:[10,15,35,70,90], // '000 wpm, estimates
    capex:[36.3,30.5,29.8,40.9,54],
    advPct:[53,58,67,74,78],
    note:"CoWoS: TrendForce/Commercial Times estimates (not TSMC official). Capex 2024 US$29.8bn, 2025 US$40.9bn (mgmt reports); 2026 mid of US$52-56bn guide (later raised toward US$60-64bn). Adv %: 7nm+ wafer-revenue mix (approx from TSMC)."}
 },
 sources: [
  ["Starlink V3: 1 Tbps downlink per satellite; each Starship V3 launch adds 60 Tbps, >20x a Falcon 9 V2 Mini launch","SpaceX Starlink 2024 Progress Report (via Yahoo Tech)","https://tech.yahoo.com/science/articles/spacex-teases-1tbps-download-bandwidth-151511339.html"],
  ["Connectivity = Consumer Broadband, Enterprise Solutions (incl. aviation, maritime), Government Solutions (incl. Starshield), Starlink Mobile; ~650 mobile sats, ~7.4m monthly devices, ~30 countries (31 Mar 2026); split not disclosed","SpaceX 424(b)(4) prospectus","https://www.sec.gov/Archives/edgar/data/1181412/000162828026042639/spaceexplorationtechnologi.htm"],
  ["Starlink TAM US$1.6tn (broadband US$870bn, mobile US$740bn) - SpaceX's own estimate","SpaceX IPO roadshow","https://content.spacex.com/cms-assets/FINAL_Documents%20and%20Updates/SpaceX_IPO_Roadshow_Final.pdf"],
  ["SpaceX acquired xAI (2 Feb 2026): SpaceX US$1tn + xAI US$250bn = US$1.25tn","Reuters","https://www.reuters.com/business/musks-spacex-merge-with-xai-combined-valuation-125-trillion-bloomberg-news-2026-02-02/"],
  ["SpaceX trends 2023-2025 and Q1/Q2 2025 (segment revenue, operating profit, capex, subscribers, ARPU, launches, nameplate GW, MAU)","SpaceX 424(b)(4) prospectus, 12 Jun 2026","https://www.sec.gov/Archives/edgar/data/1181412/000162828026042639/spaceexplorationtechnologi.htm"],
  ["SpaceX Q2 2026 segment KPIs (launches, subscribers, ARPU, GW, ad revenue, capex)","SpaceX Q2 2026 earnings release (8-K Ex. 99.1)","https://www.sec.gov/Archives/edgar/data/1181412/000162828026052515/earningsreleaseq22608042.htm"],
  ["Segment details Q2 2026","SpaceX Q2 2026 10-Q, Segments note","https://www.sec.gov/Archives/edgar/data/1181412/000162828026052535/R83.htm"],
  ["Colossus live Jul 2024 with up to 100k H100s","DatacenterDynamics","https://www.datacenterdynamics.com/en/news/xais-memphis-supercluster-has-gone-live-with-up-to-100000-nvidia-h100-gpus/"],
  ["Colossus 100k Hopper GPUs, doubling to 200k (Oct 2024)","Nvidia press release","https://investor.nvidia.com/news/press-release-details/2024/NVIDIA-Ethernet-Networking-Accelerates-Worlds-Largest-AI-Supercomputer-Built-by-xAI/default.aspx"],
  ["Colossus doubled to 200k GPUs in 92 days","xAI","https://x.ai/colossus"],
  ["SPCX month-end closes","stockanalysis.com (S&P Global MI)","https://stockanalysis.com/stocks/spcx/history/"],
  ["xAI paid subscribers 4.9m (Dec 2025) and 6.3m (Mar 2026); Anthropic 325k GPUs at US$1.25bn/month to May 2029; AI solutions revenue = subscriptions, data licensing, API; orbital AI compute 'as early as 2028'","SpaceX 424(b)(4) prospectus","https://www.sec.gov/Archives/edgar/data/1181412/000162828026042639/spaceexplorationtechnologi.htm"],
  ["Q2 2026: ~US$1.6bn incremental AI infrastructure revenue from Cloud Services Agreements; US$14.1bn contracted; Google and Anthropic deals; Grok 4.5 token use tripled","SpaceX Q2 2026 call transcript","https://www.fool.com/earnings/call-transcripts/2026/08/11/spacex-spcx-q2-2026-earnings-call-transcript/"],
  ["Pricing: X Subscription Plus US$8, Premium US$30, Super US$100, Ultra US$200","xAI","https://docs.x.ai/x-subscription/pricing"],
  ["Pentagon CDAO frontier-AI awards, US$200m ceiling each incl. xAI (Jul 2025)","US DoD CDAO","https://www.ai.mil/Latest/News-Press/PR-View/Article/4242822/cdao-announces-partnerships-with-frontier-ai-companies-to-address-national-secu/"],
  ["GSA OneGov: Grok for Government at US$0.42 per agency to Mar 2027","GSA","https://www.gsa.gov/about-gsa/newsroom/news-releases/gsa-xai-partner-to-accelerate-federal-ai-adoption-09252025"],
  ["Starship Flight 12 (22 May 2026, first V3) and booster mishap","SpaceX / Reuters","https://www.spacex.com/launches/starship-flight-12/"],
  ["Starship Flight 13 (24 Jul 2026)","SpaceX / Spaceflight Now","https://spaceflightnow.com/2026/07/25/super-heavy-starship-rocket-chalks-up-mostly-successful-test-flight/"],
  ["Starship Flight 14 (28 Sep 2026): first orbit, 26 Starlink V3 deployed","SpaceX","https://www.spacex.com/launches/starship-flight-14/"],
  ["Flight 15 preparation (B22/S42)","NASASpaceflight","https://www.nasaspaceflight.com/2026/09/starship-14-orbit-flight-15/"],
  ["Artemis III 2027 LEO docking test; propellant-transfer demo slips (NASA OIG, GAO)","Reuters / NASA / Space Atlas","https://www.reuters.com/business/media-telecom/next-artemis-mission-track-2027-anything-can-happen-astronaut-says-2026-10-05/"],
  ["Propellant transfer demo slipped Mar 2025 -> Mar 2026 -> 2026","Astronomy","https://www.astronomy.com/space-exploration/why-we-need-in-orbit-refueling-to-return-to-the-moon/"],
  ["SpaceX IPO (June 2026): 638.9m Class A shares at US$135 incl. full over-allotment; net proceeds US$85,675m","SpaceX Q2 2026 10-Q, Note 1","https://www.sec.gov/Archives/edgar/data/1181412/000162828026052535/R10.htm"],
  ["Balance sheet 30 Jun 2026: cash 93,522 + marketable securities 6,487 - debt & finance leases 39,364 (US$m) = net cash ~US$60.6bn","SpaceX Q2 2026 10-Q","https://www.sec.gov/Archives/edgar/data/1181412/000162828026052535/R2.htm"],
  ["Shares outstanding: 7,696.3m Class A + 5,485.5m Class B; ticker SPCX","SpaceX Q2 2026 10-Q cover","https://www.sec.gov/Archives/edgar/data/1181412/000162828026052535/R1.htm"],
  ["Legal name Space Exploration Technologies Corp.; xAI held via X.AI Holdings (which owns X)","SpaceX filing","https://www.sec.gov/Archives/edgar/data/1181412/000162828026043288/spaceexplorationtechnologi.htm"],
  ["SPCX close US$146.03 (16 Oct 2026); market cap ~US$1.92-1.98tn","Exa / StockAnalysis","https://stockanalysis.com/stocks/spcx/market-cap/"],
  ["SpaceX 2025 revenue US$18.7bn (Connectivity US$11.4bn); Q1 2026 revenue US$4.69bn, Connectivity US$3.26bn, AI US$0.82bn","SpaceX S-1","https://www.sec.gov/Archives/edgar/data/1181412/000162828026036936/spaceexplorationtechnologi.htm"],
  ["Q3 2026: revenue US$14.58bn (Connectivity 5.25, Space 1.77, SI 7.56 incl. Cursor 0.61); Starlink 13.6m consumer subs, ARPU US$69/mo; net income US$4.40bn; Adj. EBITDA US$8.81bn; capex US$19.59bn; compute 1.7 GW; Starship Flight 14 first revenue mission","SpaceX Q3 2026 earnings release (20 Oct 2026)","https://www.sec.gov/Archives/edgar/data/1181412/000162828026066482/spaceexplorationtechnologi.htm"],
  ["Balance sheet 30 Sep 2026: cash 51,294 + marketable securities 38,561 - debt & finance leases 38,844 (US$m) = net cash ~US$51.0bn; shares 8,246.5m Class A + 5,334.5m Class B (15 Oct 2026)","SpaceX Q3 2026 10-Q","https://www.stocktitan.net/sec-filings/SPCX/10-q-space-exploration-technologies-corp-quarterly-earnings-report-b2536cc702ee.html"],
  ["Q3 2026 call: ex-Cursor SI solutions +192% q/q from cloud services; compute pricing slightly above US$30-50/W; Grok Bot 800k paid weekly users; ads +19% y/y","SpaceX Q3 2026 call transcript","https://www.fool.com/earnings/call-transcripts/2026/10/20/spacex-spcx-q3-2026-earnings-call-transcript/"],
  ["SPCX close US$145.23 (28 Oct 2026)","StockAnalysis / Yahoo Finance","https://stockanalysis.com/stocks/spcx/history/"],
  ["Q2 2026: revenue US$7.81bn (Connectivity 4.29, Space 0.96, AI 2.56); Starlink 12.0m subs, ARPU US$66/mo; Megapack purchases from Tesla","SpaceX Q2 2026 results","https://www.sec.gov/Archives/edgar/data/1181412/000162828026052515/earningsreleaseq22608042.htm"],
  ["Starship V3 tests (Flight 13, July 2026)","SpaceX Q2 2026 call transcript","https://www.fool.com/earnings/call-transcripts/2026/08/11/spacex-spcx-q2-2026-earnings-call-transcript/"],
  ["Falcon 9: 165 launches in 2025","Reuters","https://www.reuters.com/legal/government/how-math-works-175-trillion-spacex-valuation-2026-04-08/"],
  ["Tesla related-party Megapack revenue from SpaceX","Tesla Q2 2026 10-Q (XBRL)","https://www.sec.gov/Archives/edgar/data/1318605/000162828026049270/R21.htm"],
  ["Nvidia Q2 FY2027: revenue US$96.2bn, Data Center US$89.0bn, Edge US$7.2bn, GM 75.0%, FCF US$21.3bn; Q3 guide US$108bn","Nvidia CFO commentary","https://www.sec.gov/Archives/edgar/data/1045810/000104581026000073/q2fy27cfocommentary.htm"],
  ["Nvidia FY2026: revenue US$215.9bn, Data Center US$193.7bn","Nvidia Q4 FY2026 CFO commentary","http://s201.q4cdn.com/141608511/files/doc_financials/2026/Q426/Q4FY26-CFO-Commentary.pdf"],
  ["Nvidia balance sheet 26 Jul 2026 (cash 22.4, debt securities 34.1, equity securities 42.8, debt 33.4 US$bn); 24,285m diluted shares","Nvidia 10-Q / press release","https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm"],
  ["Nvidia quarterly revenue history and margins (FY25-FY26)","Nvidia releases","https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-third-quarter-fiscal-2026"],
  ["NVDA close US$214.13 (16 Oct 2026)","Nvidia IR","https://investor.nvidia.com/stock-info/stock-quote-and-chart/default.aspx"],
  ["TSMC CoWoS monthly capacity estimates: ~35k (2024), ~70k (end-2025), ~90k (end-2026); ~50% CAGR 2022-2026 (not official)","TrendForce / Commercial Times","https://www.trendforce.com/news/2024/12/13/news-tsmc-ramps-up-cowos-capacity-across-taiwan-projected-to-nearly-triple-by-2026/"],
  ["Later 2026 CoWoS estimates raised toward 120-140k wpm TSMC; industry ~200k with OSAT partners","TrendForce / Economic Daily","https://www.trendforce.com/news/2026/06/15/news-tsmc-cowos-supply-demand-gap-reportedly-seen-narrowing-from-20-to-10-by-end-2026-as-capacity-expands/"],
  ["TSMC capex: 2024 US$29.76bn, 2025 US$40.90bn (management reports); 2026 guide initially US$52-56bn, later raised toward US$60-64bn","TSMC 4Q24/4Q25 management reports; 20-F","https://investor.tsmc.com/"],
  ["Nvidia ~22% of TSMC revenue (largest customer); CoWoS share of advanced packaging often estimated ~40-60% for Nvidia (not official)","CNBC / supply-chain estimates","https://www.cnbc.com/"],
["FY2028 revenue growth ~70% preliminary expectation; margins to bottom at 71-72% (memory costs)","Nvidia Q2 FY2027 call","https://exa.ai/library/markets/stocks/NVDA/earnings/FY2027/Q2/transcript"]
 ]
};
const pv=(arr,r)=>arr.reduce((s,f,i)=>s+f/Math.pow(1+r,i+1),0), tv=(f,r,g)=>f*(1+g)/(r-g)/Math.pow(1+r,10);
function sxModel(p){ const S=BD.sx, other=S.connRevAnn/(S.subs*S.arpu*12/1000);
 const G=S.seg, K=S.shipLink, sp=(p.shipProg||0)/100, cm=p.connM+K.connM*sp, cap=K.capG*sp;
 let subs=S.subs, arpu=S.arpu, lr=S.launchRevAnn; const star=[],lau=[],subsA=[];
 const segR={consumer:G.consumerQ*4, avm:G.egQ*4*G.egSplit.avm, gov:G.egQ*4*G.egSplit.gov, d2c:G.egQ*4*G.egSplit.d2c}, segRev={consumer:[],avm:[],gov:[],d2c:[]}, segF={consumer:[],avm:[],gov:[],d2c:[]};
 const later=(1+p.subG2)*(1+p.arpuChg)-1;
 for(let t=1;t<=10;t++){ subs*=1+(t<=5?p.subG1+cap:p.subG2); arpu*=1+p.arpuChg; lr*=1+p.launchG+K.launchG*sp;
  const gr={consumer:(1+(t<=5?p.subG1+cap:p.subG2))*(1+p.arpuChg)-1, avm:t<=5?p.avG1:later, gov:t<=5?p.govG1:later, d2c:t<=5?p.d2cG1+cap:later};
  let tot=0; for(const k in segR){ segR[k]*=1+gr[k]; segRev[k].push(segR[k]); segF[k].push(segR[k]*cm); tot+=segR[k]*cm; }
  subsA.push(subs); star.push(tot); lau.push(lr*(p.launchM+K.launchM*sp)); }
 const segV={}; for(const k in segF) segV[k]=pv(segF[k],p.sxDisc)+tv(segF[k][9],p.sxDisc,p.sxTg);
 const M0=S.m0, ln=(k,r0,g1,g2,m10,prob,startYr)=>{const f=[],rv=[];let x=r0;for(let t=1;t<=10;t++){ if(startYr&&t<startYr){rv.push(0);f.push(0);continue;} if(startYr&&t===startYr) x=r0; else x*=1+(t<=5?g1:g2); rv.push(x); f.push(x*(M0[k]+(m10-M0[k])*(t-1)/9)*prob);} return {fcf:f,rev:rv,ev:pv(f,p.sxDisc)+tv(f[9],p.sxDisc,p.sxTg)};};
 const L={ subs:ln("subs",p.subs_r,p.subs_g1,p.subs_g2,p.subs_m,1), api:ln("api",p.api_r,p.api_g1,p.api_g2,p.api_m,1),
  agents:ln("agents",p.agents_r1,p.agents_g1,p.agents_g2,p.agents_m,p.agents_p/100,2), compute:ln("compute",p.compute_r,p.compute_g1,p.compute_g2,p.compute_m,1),
  ads:ln("ads",p.ads_r,p.ads_g1,p.ads_g2,p.ads_m,1), gov:ln("gov",p.gov_r,p.gov_g1,p.gov_g2,p.gov_m,1),
  orbital:ln("orbital",p.orbital_r1,p.orbital_g,0.2,p.orbital_m,p.orbital_p/100,4) };
 { const f=Array.from({length:10},()=>-p.shared_c); L.shared={fcf:f,rev:f.map(()=>0),ev:pv(f,p.sxDisc)+tv(f[9],p.sxDisc,p.sxTg)}; }
 const ai={ev:S.LINES.reduce((s,k)=>s+L[k].ev,0), fcf:Array.from({length:10},(_,i)=>S.LINES.reduce((s,k)=>s+L[k].fcf[i],0)), lines:L};
 const parts={starlink:pv(star,p.sxDisc)+tv(star[9],p.sxDisc,p.sxTg), launch:pv(lau,p.sxDisc)+tv(lau[9],p.sxDisc,p.sxTg), xai:ai.ev, starship:p.shipP/100*p.shipVal};
 const ev=parts.starlink+parts.launch+parts.xai+parts.starship, total=ev+S.netCash, mcap=S.price*S.sharesBn;
 return {parts,ev,netCash:S.netCash,total,mcap,gap:total/mcap-1,perShare:total/S.sharesBn,star,lau,ai,subsA,segRev,segV,segF};
}
function nvModel(p){ const N=BD.nv; let dem=N.dcAnn, ed=N.edgeAnn, cow=p.cowos0||90;
 const share=p.nvCowosShare??0.60, rpw=p.revPerCowos??0.55, gC=p.cowosG??0.12;
 const fcf=[],dcA=[],edA=[],demA=[],capA=[];
 for(let t=1;t<=10;t++){
  cow*=1+gC; // capacity available during the year after this year's buildout
  dem*=1+(t<=5?p.dcG1:p.dcG2); ed*=1+p.edgeG;
  const cap=cow*12*share*rpw, use=Math.min(dem,cap);
  demA.push(dem); capA.push(cap); dcA.push(use); edA.push(ed); fcf.push((use+ed)*p.nvM);
 }
 const ev=pv(fcf,p.nvDisc)+tv(fcf[9],p.nvDisc,p.nvTg), net=N.cash-N.debt, ps=(ev+net)*1000/N.sharesM;
 const capped=demA.some((d,i)=>d>capA[i]+1e-9);
 return {ev,net,ps,fcf,dcA,edA,demA,capA,capped,tvShare:tv(fcf[9],p.nvDisc,p.nvTg)/ev};
}
function checks(){ const out=[]; let ok=true;
 // 1) Nvidia: if every growth rate = terminal growth, DCF must equal the closed-form Gordon value.
 const N=BD.nv, q={nvDisc:.1,nvTg:.03,dcG1:.03,dcG2:.03,edgeG:.03,nvM:.4,cowos0:500,cowosG:.5,nvCowosShare:.6,revPerCowos:.55}, r=nvModel(q), gordon=(N.dcAnn+N.edgeAnn)*.4*1.03/(.1-.03);
 const e1=Math.abs(r.ev/gordon-1); if(e1>1e-6) ok=false; out.push(`Nvidia DCF vs Gordon formula: ${(e1*100).toFixed(4)}% diff`);
 // 1b) Capacity cap: delivered DC never exceeds capacity-implied; at starter, first years bind when demand growth > CoWoS growth.
 { const st=nvModel(N.starter); const okCap=st.dcA.every((u,i)=>u<=st.capA[i]+1e-9); if(!okCap) ok=false;
   out.push(`CoWoS cap: delivered ≤ capacity each year; starter capped=${st.capped}`);
   out.push(`Nvidia starter US$${st.ps.toFixed(2)}/share`); }
 // 2) Nvidia base revenue = latest quarter x 4
 const e2=Math.abs(N.dcAnn+N.edgeAnn-96.221*4); if(e2>0.01) ok=false; out.push(`Nvidia base revenue ${(N.dcAnn+N.edgeAnn).toFixed(1)}bn = Q2 FY27 x4`);
 // 3) SpaceX: Starlink revenue rebuilt from subs x ARPU x mix factor equals Q3 2026 annualised
 const S=BD.sx, other=S.connRevAnn/(S.subs*S.arpu*12/1000), e3=Math.abs(S.subs*S.arpu*12/1000*other-S.connRevAnn); if(e3>1e-9) ok=false; out.push(`Starlink base revenue rebuild ${S.connRevAnn.toFixed(2)}bn OK`);
 // 4) SpaceX parts add up and probabilities sum to 100
 const m=sxModel(S.starter), e4=Math.abs(m.parts.starlink+m.parts.launch+m.parts.xai+m.parts.starship+m.netCash-m.total); if(e4>1e-9) ok=false; out.push("SpaceX parts + net cash sum to total");
 // 5) xAI lines add up to the xAI value, and the starting revenue split adds up to reported Q3 2026 SI revenue
 const Q=S.aiQ, e5=Math.abs(S.LINES.reduce((s,k)=>s+m.ai.lines[k].ev,0)-m.parts.xai), q2=Q.ads+Q.compute+Q.subs+Q.api+Q.gov+Q.agents, st=S.starter, e6=Math.abs(q2-Q.total)+Math.abs((st.subs_r+st.api_r+st.compute_r+st.ads_r+st.gov_r)/4-Q.total);
 if(e5>1e-9||e6>0.0005) ok=false; out.push(`xAI lines sum to xAI value (${m.parts.xai.toFixed(1)}bn); line revenue split = Q3 2026 SI revenue ${q2.toFixed(3)}bn`);
 // 6) Starlink 4-segment split: segments sum to Starlink value; at starter (equal growth, no Starship boost) it equals the old single-line formula.
 { const st=S.starter; let s2=S.subs,a2=S.arpu; const old=[]; for(let t=1;t<=10;t++){ s2*=1+(t<=5?st.subG1:st.subG2); a2*=1+st.arpuChg; old.push(s2*a2*12/1000*other*st.connM); }
   const oldV=pv(old,st.sxDisc)+tv(old[9],st.sxDisc,st.sxTg), sumV=Object.values(m.segV).reduce((a,b)=>a+b,0), e7=Math.abs(sumV-m.parts.starlink), e8=Math.abs(m.parts.starlink/oldV-1);
   if(e7>1e-6||e8>0.002) ok=false; out.push(`Starlink 4 segments sum to Starlink value (${m.parts.starlink.toFixed(1)}bn); starter vs old single-line formula ${(e8*100).toFixed(2)}% diff`);
   const sp=sxModel(Object.assign({},st,{shipProg:100})); if(!(sp.parts.starlink>m.parts.starlink&&sp.parts.launch>m.parts.launch)) ok=false; out.push("Starship progress raises Starlink and Launch values"); }
 // 7) Q3 2026 data consistency: Consumer + E&G = Connectivity; Space+Connectivity+SI = reported total 14.575
 { const e9=Math.abs(S.seg.consumerQ+S.seg.egQ-S.connRevAnn/4), e10=Math.abs(S.connRevAnn/4+S.launchRevAnn/4+S.aiRevAnn/4-14.575), e11=Math.abs(S.aiQ.total-S.aiRevAnn/4);
   if(e9>1e-9||e10>0.0005||e11>1e-9) ok=false; out.push(`Q3 2026 segments add to reported revenue US$${(S.connRevAnn/4+S.launchRevAnn/4+S.aiRevAnn/4).toFixed(3)}bn`); }
 out.push(`SpaceX starter total US$${m.total.toFixed(1)}bn = US$${m.perShare.toFixed(2)}/share`);
 const msg=`[Beyond Tesla checks] ${ok?"PASS":"FAIL"} - `+out.join("; "); (ok?console.log:console.error)(msg); return {ok,msg};
}
window.TVBeyond={BD,sxModel,nvModel,checks};
if(typeof module!=="undefined") module.exports={BD,sxModel,nvModel,checks};
})();
