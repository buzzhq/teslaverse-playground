// Victoria data centres context tab. Public figures and labelled estimates only. No model totals.
(function(){
const ROWS=[
 {loc:"Laverton (west)",setting:"City, industrial",op:"CDC",
  use:"~2.3 TWh, est. (400 MW+ when complete; under construction)",twh:2.3,chart:"CDC Laverton",
  people:"Laverton North has 119 residents. About 15,000–30,000 live within 3 km, est.",rank:"7",
  plus:"CDC says it will inject more than $2.7bn into the economy during construction and create “thousands” of jobs across construction and operations. It uses closed-loop cooling with no ongoing water use.",
  impact:"<b>Mixed.</b> It sits in established industrial areas away from homes, but these are large, power-hungry campuses.",
  pwr:"high",ppl:"low",ben:"big"},
 {loc:"Brooklyn (west)",setting:"City, industrial",op:"CDC",
  use:"~2.0 TWh, est. (350 MW+ when complete)",twh:2.0,chart:"CDC Brooklyn",
  people:"Brooklyn has 1,979 residents. About 20,000–40,000 live within 3 km, est.",rank:"6",
  plus:"CDC calls it a “multi-billion-dollar” investment that has supported “thousands” of jobs, and says it prefers to hire locally and partner with TAFEs. It gives no exact figures.",
  impact:"<b>Mixed.</b> It sits in established industrial areas away from homes, but these are large, power-hungry campuses.",
  pwr:"high",ppl:"low",ben:"claimed"},
 {loc:"West Footscray (inner west)",setting:"City, industrial",op:"NEXTDC (M3)",
  use:"~1.3 TWh, est. (225 MW)",twh:1.3,chart:"NEXTDC West Footscray",
  people:"West Footscray has 11,729 residents. About 50,000–70,000 live within 3 km, est.",rank:"2",
  plus:"It's a $678m+ development (over $750m to build), with about 700 construction jobs and about 140 ongoing jobs, est. (tracker figures).",
  impact:"<b>Mixed.</b> It's a smaller site closer to housing, so noise and backup generators matter more locally.",
  pwr:"mid",ppl:"high",ben:"big",outlier:true},
 {loc:"Derrimut (west)",setting:"City, industrial",op:"AirTrunk (MEL1)",
  use:"~1.05 TWh, est. (185 MW+)",twh:1.05,chart:"AirTrunk Derrimut",
  people:"Derrimut has 8,651 residents. About 30,000–50,000 live within 3 km, est.",rank:"4",
  plus:"AirTrunk says the expansion is over $1bn of direct investment, with 1,000+ construction jobs plus skilled ongoing technical roles.",
  impact:"<b>Mixed.</b> It's a large hyperscale campus that brings big investment but few permanent jobs and adds heavy load to the grid.",
  pwr:"mid",ppl:"mid",ben:"big"},
 {loc:"Truganina (west)",setting:"City, industrial",op:"STACK (MEL01)",
  use:"~1.0 TWh, est. (180 MW full campus; 72 MW built so far, about 0.4 TWh)",twh:1.0,chart:"STACK Truganina",
  people:"Truganina has 36,305 residents. About 40,000–60,000 live within 3 km, est.",rank:"3",
  plus:"No published jobs or investment figures.",
  impact:"<b>Mixed.</b> It brings new investment to a growth corridor, but adds to rising demand on Victoria's grid.",
  pwr:"mid",ppl:"mid",ben:"none"},
 {loc:"Tullamarine and airport area",setting:"City, industrial",op:"NEXTDC (M2), Microsoft and others",
  use:"~0.7 TWh, est. for NEXTDC M2 (120 MW); other sites not published",twh:0.7,chart:"NEXTDC Tullamarine (M2)",
  people:"Tullamarine has 6,733 residents. About 25,000–40,000 live within 3 km, est.",rank:"5",
  plus:"No site-specific figures. Microsoft's Australian totals are below.",
  impact:"<b>Mixed.</b> These are well-connected industrial sites with few residential neighbours, and they add to grid demand.",
  pwr:"mid",ppl:"low",ben:"none"},
 {loc:"Port Melbourne (inner)",setting:"City",op:"NEXTDC (M1)",
  use:"~0.09 TWh (90 GWh), est. (16 MW)",twh:0.09,chart:"NEXTDC Port Melbourne",
  people:"Port Melbourne has 17,633 residents. About 70,000–100,000 live within 3 km, est.",rank:"1",
  plus:"No figures for M1 itself. NEXTDC has announced a $2bn digital campus (M4) at nearby Fishermans Bend.",
  impact:"<b>Mixed.</b> It brings jobs and connectivity close to the CBD, with a modest footprint but closer neighbours.",
  pwr:"low",ppl:"high",ben:"none"},
 {loc:"Truganina (west)",setting:"City, industrial",op:"Microsoft",
  use:"Unknown (capacity not published)",twh:null,chart:null,
  people:"Same area as STACK",rank:"3",
  plus:"Only Australia-wide figures: about 200 staff at its data centres, and more than 1,860 construction jobs at peak for 3 new Melbourne and Sydney sites.",
  impact:"<b>Mixed.</b> It brings new investment to a growth corridor, but adds to rising demand on Victoria's grid.",
  pwr:"unknown",ppl:"mid",ben:"none"},
 {loc:"Proposed campuses of about 1,000 MW",setting:"Not yet built",op:"Various",
  use:"Up to ~5–6 TWh each, est., if built",twh:null,chart:null,
  people:"Not applicable",rank:"Not applicable",
  plus:"Large investment and construction jobs if built, but no figures yet.",
  impact:"<b>Watch.</b> At that size, power prices and grid upgrades become the main community question.",
  pwr:"watch",ppl:"na",ben:"na"}
];

const el=document.getElementById("vicDcApp");
if(!el) return;

// ---------- Appendix: full site table (unchanged columns) ----------
const th=["Location","City or rural","Operator","Est. annual electricity use","People nearby","Density rank","Positive local impacts","Community impact"];
const keys=["loc","setting","op","use","people","rank","plus","impact"];
const table=`<div class="tblwrap vic-tbl" id="vicDcTbl"><table class="lt vic-dc"><thead><tr>${th.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${ROWS.map(r=>`<tr${r.outlier?` class="vic-out"`:""}>${keys.map((k,i)=>`<td>${i===0?`<b>${r.loc}</b>`:r[k]}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const cards=`<div class="vic-cards" id="vicDcCards">${ROWS.map(r=>`<article class="vic-card${r.outlier?" vic-out":""}">
  <header><h3>${r.loc}</h3><p class="vic-op">${r.op} · ${r.setting}</p></header>
  <dl>
    <div><dt>Est. annual electricity use</dt><dd>${r.use}</dd></div>
    <div><dt>People nearby</dt><dd>${r.people}</dd></div>
    <div><dt>Density rank</dt><dd>${r.rank}${r.rank!=="Not applicable"?" <span class='note'>(1 = most people nearby)</span>":""}</dd></div>
    <div><dt>Positive local impacts</dt><dd>${r.plus}</dd></div>
    <div><dt>Community impact</dt><dd>${r.impact}</dd></div>
  </dl>
</article>`).join("")}</div>`;

const CH=[["vicCh1","1 · Why Victoria"],["vicCh2","2 · The good"],["vicCh3","3 · The bad"],["vicCh4","4 · What's being done"],["vicCh5","5 · Verdict"],["vicAll","All the sites"]];
const take=t=>`<p class="vic-take"><b>Takeaway:</b> ${t}</p>`;

el.innerHTML=`
<p class="gi">The story of Melbourne's data centre boom in five short chapters: why they're coming, the good, the bad, what the state is doing about it, and the verdict. Every electricity figure is an estimate, labelled est. This tab doesn't change the Tesla, SpaceX or Nvidia model totals.</p>
<nav class="vic-toc" aria-label="Chapters">${CH.map(c=>`<button type="button" data-go="${c[0]}">${c[1]}</button>`).join("")}</nav>

<div class="vic-gb" id="vicSuggests">
 <div class="vic-gb-col vic-good"><h4>👍 The good</h4><ul>
  <li>Billions in published investment ($2.7bn+ CDC Laverton, $1bn+ AirTrunk, $678m+ NEXTDC M3)</li>
  <li>Hundreds to thousands of construction jobs</li>
  <li>Council rates on industrial land (Wyndham charges 1.6× the residential rate)</li>
  <li>The big campuses sit in industrial areas, mostly away from homes</li>
 </ul></div>
 <div class="vic-gb-col vic-bad"><h4>👎 The bad</h4><ul>
  <li>Power: ~6 TWh a year if today's sites fill up, est., vs ~1.5 TWh used now</li>
  <li>Few ongoing jobs (~140 est. at a 225 MW site)</li>
  <li>Grid strain: NEXTDC M3 paused by power-connection delays</li>
  <li>Little published on tax, and STACK and Microsoft say almost nothing</li>
 </ul></div>
</div>
<p class="vic-take vic-one"><b>In one line:</b> lots of one-off investment for the west, but a big and growing power bill for the grid, and the new rules only apply to sites that aren't built yet.</p>

<section class="vic-ch" id="vicCh1">
<h3><span class="vic-n">1</span>Why Victoria?</h3>
<p>Cloud services and the AI boom need huge warehouses full of computers. Melbourne's west has big blocks of industrial land close to the city, good power and fibre connections, and room to grow, so the big operators (CDC, AirTrunk, NEXTDC, STACK and Microsoft) have all built there. The state government actively courts them through Invest Victoria.</p>
<div class="vic-tiles">
 <div class="vic-tile"><span class="vic-big">8</span><span>sites and clusters on this page, almost all in the west</span></div>
 <div class="vic-tile"><span class="vic-big">~1.5</span><span>TWh a year used by all Victorian data centres today</span></div>
 <div class="vic-tile"><span class="vic-big">~6</span><span>TWh a year if today's operating sites fill up, est.</span></div>
 <div class="vic-tile"><span class="vic-big">~5–6</span><span>TWh a year for <i>each</i> proposed 1,000 MW campus, est.</span></div>
</div>
${take("Victoria is now a major data centre hub, and the next wave of proposed campuses is far bigger than anything built so far.")}
</section>

<section class="vic-ch" id="vicCh2">
<h3><span class="vic-n">2</span>The good</h3>
<p>The money is real. Operators have published billions of dollars of investment, and building these campuses employs hundreds to thousands of workers each. Once they're running, they pay council rates on industrial land: in Wyndham, home to the Truganina sites, that's 1.6 times the residential rate. NEXTDC has also announced a $2bn campus (M4) at Fishermans Bend. And the biggest campuses were put in industrial areas with few neighbours.</p>
<div class="chartbox vic-chart-s"><canvas id="vicInvChart"></canvas></div>
<p class="note"><b>What this shows:</b> investment the operators have published themselves, in A$ billions. "+" means "more than". CDC Brooklyn says "multi-billion" without an exact figure, and STACK and Microsoft publish no Victorian figure, so they're not shown.</p>
<div class="vic-jobs">
 <div><span class="vic-big">~700</span><span>construction jobs, NEXTDC M3 (tracker figure)</span></div>
 <div class="vic-arrow">→</div>
 <div><span class="vic-big vic-dim">~140</span><span>ongoing jobs once running, est.</span></div>
</div>
<p class="note">Same pattern elsewhere: AirTrunk 1,000+ construction jobs; Microsoft about 1,860 at peak construction across 3 new Melbourne and Sydney sites, but only about 200 staff at its data centres Australia-wide.</p>
${take("the benefits are big but mostly one-off: the jobs are in building them, not running them.")}
</section>

<section class="vic-ch" id="vicCh3">
<h3><span class="vic-n">3</span>The bad</h3>
<p>The biggest worry is electricity. If the sites already operating fill up, they could use about four times what all of Victoria's data centres use today, and a single proposed 1,000 MW campus would use about as much again. That means grid upgrades and pressure on power prices. The grid is already struggling to keep up: NEXTDC has paused work on its West Footscray site because Jemena's power upgrades are delayed.</p>
<div class="chartbox vic-chart-s"><canvas id="vicGrowthChart"></canvas></div>
<p class="note"><b>What this shows:</b> today's actual use vs estimated use at full build-out. Estimates use capacity × 50% load × 1.3 cooling overhead × 8,760 hours (about 5.7 GWh per MW). CDC Laverton (~2.3 TWh est.) is still being built, so it's shown on its own.</p>
<ul class="vic-list">
 <li><b>Close to homes:</b> West Footscray is the outlier. It's large (~1.3 TWh est.) and has about 50,000–70,000 people within 3 km, est., so noise and backup generators matter most there. NEXTDC says winning community support is now its top priority.</li>
 <li><b>Few lasting jobs:</b> ongoing jobs are in the low hundreds per campus at most.</li>
 <li><b>Water:</b> the state now asks for recycled water. CDC says Laverton uses closed-loop cooling with no ongoing water use. No other site's water figures are covered here.</li>
 <li><b>Missing information:</b> no site publishes its actual power use, council rates or state tax. STACK publishes no jobs or investment figures, and Microsoft doesn't even publish its capacity.</li>
</ul>
${take("the costs (power, grid upgrades, a few neighbours) are ongoing, while most of the benefits are one-off.")}
</section>

<section class="vic-ch" id="vicCh4">
<h3><span class="vic-n">4</span>What's being done</h3>
<div class="vic-tl">
 <div class="vic-tl-i"><span class="vic-tl-d">22 Sep 2026</span><div><b>Sustainable Data Centre Action Plan.</b> New data centres must "bring your own power": fund new renewables and storage to match their use, pay their own grid connection, cut back when the grid is strained, and use recycled water where they can. VicGrid gets a say on proposals. <i>Not retrospective:</i> existing sites don't have to change.</div></div>
 <div class="vic-tl-i"><span class="vic-tl-d">12 Nov 2026</span><div><b>AEMC 30 MW rules.</b> Large data centres (30 MW+) must "ride through" grid disturbances instead of dropping off all at once and destabilising the grid.</div></div>
 <div class="vic-tl-i vic-tl-next"><span class="vic-tl-d">28 Nov 2026</span><div><b>Victorian election.</b> The rules above could change depending on the result.</div></div>
</div>
<p><b>Batteries help, but not directly.</b> Victoria has about 3,100–3,250 MW / 5,300–6,100 MWh of batteries operating (AEMO's October list showed about 2,188 MW in service), including the Victorian Big Battery at Geelong, the Melbourne Renewable Energy Hub, Koorangie and Rangebank. They back up the whole grid. None is dedicated to a data centre. Two proposals would pair storage with new computing: the Plumpton AI Hub and Hazelwood North.</p>
${take("the rules now push new campuses to bring their own clean power, but today's sites are grandfathered.")}
</section>

<section class="vic-ch" id="vicCh5">
<h3><span class="vic-n">5</span>The verdict</h3>
<div class="vic-score">
 <div class="vic-sc-row"><span>Investment</span><span class="vic-pill g">Good</span><span class="vic-sc-why">Billions published, mostly one-off</span></div>
 <div class="vic-sc-row"><span>Jobs</span><span class="vic-pill m">Mixed</span><span class="vic-sc-why">Big to build, small to run</span></div>
 <div class="vic-sc-row"><span>Where they're built</span><span class="vic-pill g">Good</span><span class="vic-sc-why">Industrial west, except West Footscray</span></div>
 <div class="vic-sc-row"><span>Power and grid</span><span class="vic-pill b">Bad</span><span class="vic-sc-why">~4× today's use if sites fill, est.</span></div>
 <div class="vic-sc-row"><span>Rules</span><span class="vic-pill m">Mixed</span><span class="vic-sc-why">Strong for new sites, none for existing ones</span></div>
 <div class="vic-sc-row"><span>Transparency</span><span class="vic-pill b">Bad</span><span class="vic-sc-why">No power, tax or (for some) jobs figures</span></div>
</div>
<p><b>Overall:</b> a net positive for investment and a manageable local footprint so far, but the bill is power. Whether it stays positive depends on the giant proposed campuses actually bringing their own renewables.</p>
<h4 class="vic-watch-h">What to watch</h4>
<ul class="vic-watch">
 <li>🗳️ <b>28 Nov 2026 election:</b> does the action plan survive?</li>
 <li>🏗️ <b>The 1,000 MW proposals:</b> do any get approved, and on what conditions?</li>
 <li>⚡ <b>Does the plan bite?</b> The first new sites that must fund matching renewables and storage.</li>
 <li>🔌 <b>West Footscray:</b> when NEXTDC M3 restarts and how the community responds.</li>
</ul>
</section>

<details class="vic-all" id="vicAll">
<summary>All the sites: full table, method and sources ▾</summary>
<h3>Estimated annual electricity use by site</h3>
<div class="chartbox vic-chart"><canvas id="vicDcChart"></canvas></div>
<p class="note"><b>What this shows:</b> estimated annual use at full advertised capacity, in terawatt-hours. Microsoft Truganina is left off because its capacity is not published. Proposed 1,000 MW campuses (up to ~5–6 TWh each, if built) are also left off so they do not dwarf the sites that exist today.</p>
${table}
${cards}
<p class="note">On a phone, the rows appear as cards. On a wider screen, scroll the table sideways if needed. Density rank runs from 1 for the most people nearby to 7 for the fewest.</p>
<h3>How the electricity estimates were worked out</h3>
<p>None of these sites publishes how much electricity it actually uses, so every figure is an estimate. Each one is the site's published capacity × 50% average load × 1.3 for cooling overhead (PUE) × 8,760 hours in a year. That comes to about 5.7 GWh a year for each megawatt.</p>
<p>These are full build-out figures, so they overstate today's use by a lot. They add up to about 6 TWh across the operating sites, while all of Victoria's data centres use roughly 1.5 TWh a year now. Many campuses are only partly built or filled. CDC's Laverton campus is still under construction and is not in that 6 TWh operating total. The ranking is still a fair guide to which sites will be biggest.</p>
<p class="note">The capacities come from the operators (<a href="https://airtrunk.com/location/mel1-melbourne/" target="_blank" rel="noopener">AirTrunk</a>, <a href="https://www.stackinfra.com/locations/asia-pacific/melbourne/mel01/" target="_blank" rel="noopener">STACK</a> and <a href="https://www.cdc.com.au/locations/victoria/" target="_blank" rel="noopener">CDC</a>) and the <a href="https://certifiedstrategic.com/maps/melbourne" target="_blank" rel="noopener">Certified Strategic Melbourne map</a>. AirTrunk is also planning a second Tullamarine campus, MEL2, at 354 MW+, which isn't counted above.</p>
<h3>People nearby</h3>
<p>The suburb populations are from the <a href="https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL22756" target="_blank" rel="noopener">ABS 2021 Census QuickStats</a>. The counts within 3 km are rough estimates of the host suburb plus its neighbours, not a measured radius. The growth suburbs of Truganina and Derrimut have probably grown since 2021.</p>
<h3>Taxes and jobs sources</h3>
<p>No site publishes what it pays in council rates or state tax, so there are no Victorian figures like Loudoun County's US$1.2bn. <a href="https://www.wyndham.vic.gov.au/sites/default/files/2025-06/Attachment%20C%20Revenue%20and%20Rating%20Plan%202025-29.pdf" target="_blank" rel="noopener">Wyndham's rating plan</a> charges developed industrial land at 1.6 times the residential rate. Victoria has no special tax on data centres.</p>
<p class="note">Job and investment figures are the operators' own claims, from <a href="https://airtrunk.com/airtrunk-expands-mel1-to-185mw-capacity/" target="_blank" rel="noopener">AirTrunk</a>, <a href="https://www.cdc.com.au/locations/victoria/laverton/" target="_blank" rel="noopener">CDC Laverton</a>, <a href="https://www.cdc.com.au/locations/victoria/brooklyn/" target="_blank" rel="noopener">CDC Brooklyn</a>, <a href="https://talent-partnership.com/projects/nextdc-m3-expansion.html" target="_blank" rel="noopener">Talent Partnership's NEXTDC M3 entry</a>, <a href="https://local.microsoft.com/wp-content/uploads/2025/10/Microsoft-datacentres-in-Australia.pdf" target="_blank" rel="noopener">Microsoft</a> and <a href="https://www.invest.vic.gov.au/en/explore-your-sector/digital-technology/data-centres" target="_blank" rel="noopener">Invest Victoria</a>.</p>
</details>
`;

// Chapter buttons scroll without touching the hash router.
el.querySelectorAll(".vic-toc button").forEach(b=>b.addEventListener("click",()=>{
  const t=document.getElementById(b.dataset.go);
  if(!t) return;
  if(t.tagName==="DETAILS") t.open=true;
  t.scrollIntoView({behavior:"smooth",block:"start"});
}));

if(!window.Chart) return;
const GRID="#30363d";

// Chapter 2: published investment (A$bn, operators' own claims)
const inv=[[["CDC Laverton","(construction)"],2.7],[["NEXTDC M4","(announced)"],2.0],[["AirTrunk","Derrimut"],1.0],[["NEXTDC M3","W. Footscray"],0.678]];
const ic=document.getElementById("vicInvChart");
if(ic) new Chart(ic,{type:"bar",
  data:{labels:inv.map(r=>r[0]),datasets:[{data:inv.map(r=>r[1]),backgroundColor:"#3fb95088",borderColor:"#3fb950",borderWidth:1}]},
  options:{indexAxis:"y",maintainAspectRatio:false,
    plugins:{legend:{display:false},title:{display:true,text:"Published investment, A$bn (operators' claims)"},
      tooltip:{callbacks:{label:i=>` A$${i.raw}bn+`}}},
    scales:{x:{beginAtZero:true,grid:{color:GRID},title:{display:true,text:"A$ billions (more than)"}},y:{ticks:{autoSkip:false,font:{size:11}}}}}});

// Chapter 3: how big could the power demand get (TWh / year)
const gr=[[["All Vic DCs","today (actual)"],1.5,"#8b949e"],[["Operating sites","if full (est.)"],6,"#f0883e"],[["CDC Laverton","being built (est.)"],2.3,"#f0883e"],[["One 1,000 MW","campus (est.)"],5.7,"#e31937"]];
const gc=document.getElementById("vicGrowthChart");
if(gc) new Chart(gc,{type:"bar",
  data:{labels:gr.map(r=>r[0]),datasets:[{data:gr.map(r=>r[1]),backgroundColor:gr.map(r=>r[2]+"aa"),borderColor:gr.map(r=>r[2]),borderWidth:1}]},
  options:{indexAxis:"y",maintainAspectRatio:false,
    plugins:{legend:{display:false},title:{display:true,text:"Electricity use, TWh a year"},
      tooltip:{callbacks:{label:i=>i.dataIndex===3?" ~5–6 TWh / year, est.":i.dataIndex===0?" ~1.5 TWh / year":` ~${i.raw} TWh / year, est.`}}},
    scales:{x:{beginAtZero:true,grid:{color:GRID},title:{display:true,text:"TWh / year"}},y:{ticks:{autoSkip:false,font:{size:11}}}}}});

// Appendix: per-site chart, built when the details panel first opens (it has no size while closed)
const chartRows=ROWS.filter(r=>r.chart && r.twh!=null);
let siteChart=null;
const det=document.getElementById("vicAll");
function buildSite(){
  if(siteChart) return;
  const ctx=document.getElementById("vicDcChart");
  if(!ctx) return;
  siteChart=new Chart(ctx,{type:"bar",
    data:{labels:chartRows.map(r=>r.chart),datasets:[{label:"TWh / year (est., full build-out)",data:chartRows.map(r=>r.twh),backgroundColor:"#58a6ff88",borderColor:"#58a6ff",borderWidth:1}]},
    options:{indexAxis:"y",plugins:{title:{display:true,text:"Estimated annual electricity use (full build-out, labelled estimates)"},legend:{display:false},
      tooltip:{callbacks:{label:item=>` ${item.raw} TWh / year, est.`}}},
      scales:{x:{title:{display:true,text:"TWh / year (est.)"},beginAtZero:true},y:{ticks:{autoSkip:false}}}}});
}
if(det) det.addEventListener("toggle",()=>{ if(det.open) buildSite(); });
})();
