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

const PWR={high:["Power high","pwr-high"],mid:["Power mid","pwr-mid"],low:["Power low","pwr-low"],unknown:["Power unknown","gap"],watch:["If built, very large","pwr-watch"]};
const PPL={high:["Many nearby","ppl-high"],mid:["People mid","ppl-mid"],low:["Few nearby","ppl-low"],na:["People n/a","gap"]};
const BEN={big:["Big published $","ben-big"],claimed:["Claimed, no exact $","ben-claimed"],none:["No published $","ben-none"],na:["No figures yet","gap"]};

function badges(r){
  return `<span class="vic-bds">${[PWR[r.pwr],PPL[r.ppl],BEN[r.ben]].map(b=>`<span class="vic-bd vic-bd-${b[1]}">${b[0]}</span>`).join("")}${r.outlier?`<span class="vic-bd vic-bd-out">Outlier to watch</span>`:""}</span>`;
}

const el=document.getElementById("vicDcApp");
if(!el) return;

const th=["Location","City or rural","Operator","Est. annual electricity use","People nearby","Density rank","Positive local impacts","Community impact"];
const keys=["loc","setting","op","use","people","rank","plus","impact"];

const table=`<div class="tblwrap vic-tbl" id="vicDcTbl"><table class="lt vic-dc"><thead><tr>${th.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${ROWS.map(r=>`<tr${r.outlier?` class="vic-out"`:""}>${keys.map((k,i)=>`<td>${i===0?`<b>${r.loc}</b>${badges(r)}`:r[k]}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;

const cards=`<div class="vic-cards" id="vicDcCards">${ROWS.map(r=>`<article class="vic-card${r.outlier?" vic-out":""}">
  <header><h3>${r.loc}</h3><p class="vic-op">${r.op} · ${r.setting}</p>${badges(r)}</header>
  <dl>
    <div><dt>Est. annual electricity use</dt><dd>${r.use}</dd></div>
    <div><dt>People nearby</dt><dd>${r.people}</dd></div>
    <div><dt>Density rank</dt><dd>${r.rank}${r.rank!=="Not applicable"?" <span class='note'>(1 = most people nearby)</span>":""}</dd></div>
    <div><dt>Positive local impacts</dt><dd>${r.plus}</dd></div>
    <div><dt>Community impact</dt><dd>${r.impact}</dd></div>
  </dl>
</article>`).join("")}</div>`;

const glanceRows=ROWS.filter(r=>r.pwr!=="watch");
const glance=`<div class="vic-hi">${glanceRows.map(r=>`<div class="vic-hi-row${r.outlier?" vic-out":""}"><div class="vic-hi-name">${r.chart||r.op}<div class="vic-hi-sub">${r.loc}</div></div>${badges(r)}</div>`).join("")}</div>`;

el.innerHTML=`
<p class="gi">A snapshot of Melbourne and Victoria data centre sites: estimated electricity use, how many people live nearby, and published local benefits. This does not change the Tesla, SpaceX or Nvidia model totals. Every electricity figure is an estimate, labelled est.</p>
<section class="vic-sug" id="vicSuggests">
<h3>What this suggests</h3>
<div class="takeaways">
<p><b>Overall:</b> in Melbourne, large campuses have mostly been kept in industrial areas away from homes, so the main community question is grid and power costs rather than local noise. West Footscray is the exception to watch.</p>
<p class="note">These are patterns from 7 sites that have both an electricity estimate and a density rank, not statistics.</p>
</div>
<h3>At a glance</h3>
${glance}
<p class="note">Badges use only figures already in the table. Power is estimated at full build-out (high ≈ 2 TWh or more, mid ≈ 0.7–1.3 TWh, low ≈ 0.09 TWh). People nearby follows the density rank (1–2 many, 3–4 mid, 5–7 few). Benefits are whatever that site has published: a construction dollar figure, a claim without an exact dollar figure, or nothing site-specific.</p>
<h3>Power use vs people nearby</h3>
<div class="chartbox vic-scatter"><canvas id="vicDcScatter"></canvas></div>
<p class="note"><b>What this shows:</b> estimated annual use (vertical) against density rank (horizontal; 1 is the most people nearby, 7 the fewest). The pattern is roughly inverse, except West Footscray (highlighted), which is both large and close to housing. Microsoft is left off because it has no published capacity. Estimates only; 7 points.</p>
<ul class="vic-findings">
<li><b>Power use vs population density — takeaway: roughly inverse.</b> The biggest users (CDC Laverton, CDC Brooklyn) sit in the least-populated areas (density ranks 7 and 6), and the densest area (Port Melbourne, rank 1) hosts the smallest site. The outlier is NEXTDC West Footscray, which is both large (~1.3 TWh est.) and dense (rank 2), and is the site where NEXTDC has paused work and says community support is its top priority.</li>
<li><b>Power use vs benefits — takeaway: published benefits are mostly one-off construction, not ongoing jobs.</b> The bigger sites publish the bigger construction investment (CDC Laverton $2.7bn+, AirTrunk $1bn+, NEXTDC M3 ~$678m+), but ongoing jobs stay small (~140 est. at 225 MW). No site publishes council rates or state tax, so the tax link can't be tested.</li>
<li><b>Data gaps — takeaway: some of the large campuses say little.</b> STACK and Microsoft publish no jobs or investment figures, and Microsoft gives no capacity.</li>
</ul>
</section>
<h3>Estimated annual electricity use</h3>
<div class="chartbox vic-chart"><canvas id="vicDcChart"></canvas></div>
<p class="note"><b>What this shows:</b> estimated annual use at full advertised capacity, in terawatt-hours. Microsoft Truganina is left off because its capacity is not published. Proposed 1,000 MW campuses (up to ~5–6 TWh each, if built) are also left off so they do not dwarf the sites that exist today.</p>
${table}
${cards}
<p class="note">On a phone, the same rows appear as cards. On a wider screen, scroll the table sideways if needed. Density rank runs from 1 for the most people nearby to 7 for the fewest.</p>
<h3>How the electricity estimates were worked out</h3>
<p>None of these sites publishes how much electricity it actually uses, so every figure is an estimate. Each one is the site's published capacity × 50% average load × 1.3 for cooling overhead (PUE) × 8,760 hours in a year. That comes to about 5.7 GWh a year for each megawatt.</p>
<p>These are full build-out figures, so they overstate today's use by a lot. They add up to about 6 TWh across the operating sites, while all of Victoria's data centres use roughly 1.5 TWh a year now. Many campuses are only partly built or filled. CDC's Laverton campus is still under construction and is not in that 6 TWh operating total. The ranking is still a fair guide to which sites will be biggest.</p>
<p class="note">The capacities come from the operators (<a href="https://airtrunk.com/location/mel1-melbourne/" target="_blank" rel="noopener">AirTrunk</a>, <a href="https://www.stackinfra.com/locations/asia-pacific/melbourne/mel01/" target="_blank" rel="noopener">STACK</a> and <a href="https://www.cdc.com.au/locations/victoria/" target="_blank" rel="noopener">CDC</a>) and the <a href="https://certifiedstrategic.com/maps/melbourne" target="_blank" rel="noopener">Certified Strategic Melbourne map</a>. AirTrunk is also planning a second Tullamarine campus, MEL2, at 354 MW+, which isn't counted above.</p>
<h3>People nearby</h3>
<p>The suburb populations are from the <a href="https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL22756" target="_blank" rel="noopener">ABS 2021 Census QuickStats</a>. The counts within 3 km are rough estimates of the host suburb plus its neighbours, not a measured radius. The growth suburbs of Truganina and Derrimut have probably grown since 2021.</p>
<p>The biggest power users, CDC's Laverton and Brooklyn campuses, sit in the least populated areas. The NEXTDC sites in Port Melbourne and West Footscray have the most neighbours. West Footscray is both large and close to housing, so local issues like noise and backup generators matter most there.</p>
<h3>Taxes and jobs</h3>
<p><b>On taxes:</b> none of these sites publishes what it pays in council rates or state tax, so there are no Victorian figures like Loudoun County's US$1.2bn. They do pay council rates on industrial land. <a href="https://www.wyndham.vic.gov.au/sites/default/files/2025-06/Attachment%20C%20Revenue%20and%20Rating%20Plan%202025-29.pdf" target="_blank" rel="noopener">Wyndham's rating plan</a>, the council for the Truganina sites, charges developed industrial land at 1.6 times the residential rate. Victoria has no special tax on data centres.</p>
<p><b>On jobs:</b> the pattern matches the US. There are big construction workforces in the hundreds to thousands, but ongoing jobs are in the low hundreds per campus at most. For example, NEXTDC's 225 MW site is estimated at about 140 ongoing jobs.</p>
<p class="note">Job and investment figures are the operators' own claims, from <a href="https://airtrunk.com/airtrunk-expands-mel1-to-185mw-capacity/" target="_blank" rel="noopener">AirTrunk</a>, <a href="https://www.cdc.com.au/locations/victoria/laverton/" target="_blank" rel="noopener">CDC Laverton</a>, <a href="https://www.cdc.com.au/locations/victoria/brooklyn/" target="_blank" rel="noopener">CDC Brooklyn</a>, <a href="https://talent-partnership.com/projects/nextdc-m3-expansion.html" target="_blank" rel="noopener">Talent Partnership's NEXTDC M3 entry</a>, <a href="https://local.microsoft.com/wp-content/uploads/2025/10/Microsoft-datacentres-in-Australia.pdf" target="_blank" rel="noopener">Microsoft</a> and <a href="https://www.invest.vic.gov.au/en/explore-your-sector/digital-technology/data-centres" target="_blank" rel="noopener">Invest Victoria</a>. NEXTDC has also paused work on M3 because of delayed power upgrades, and says winning community support is now its top priority there.</p>
<h3>Victoria's power rules for data centres</h3>
<p>Victoria's Sustainable Data Centre Action Plan (22 Sep 2026) asks new data centres to “bring your own power supply”: they should offset their use with new renewables and storage, pay their own connection costs, offer demand flexibility, and use recycled water where they can. The plan is not retrospective, so existing sites are not required to retrofit. VicGrid becomes a referral authority for these proposals.</p>
<p>Separately, the AEMC's “Improving the NEM Access Standards – Package 2” (12 Nov 2026) sets a 30 MW threshold for large data centres, with ride-through requirements so they stay on the grid during disturbances.</p>
<p class="note">These Victorian rules could change: the state election is on 28 Nov 2026.</p>
<h3>Victoria's battery storage</h3>
<p>Victoria already has about 3,100–3,250 MW / 5,300–6,100 MWh of battery storage installed and operating. That storage serves the broader grid, not data centre loads specifically. No operating battery is dedicated to a data centre.</p>
<p>Major operating projects include the Victorian Big Battery at Geelong, the Melbourne Renewable Energy Hub, Koorangie, Latrobe Valley projects, Rangebank, and others.</p>
<p>Two proposals would pair storage with new computing load: the Plumpton AI Hub and Hazelwood North.</p>
`;

const chartRows=ROWS.filter(r=>r.chart && r.twh!=null);
const ctx=document.getElementById("vicDcChart");
if(ctx && window.Chart){
  new Chart(ctx,{
    type:"bar",
    data:{
      labels:chartRows.map(r=>r.chart),
      datasets:[{label:"TWh / year (est., full build-out)",data:chartRows.map(r=>r.twh),backgroundColor:"#58a6ff88",borderColor:"#58a6ff",borderWidth:1}]
    },
    options:{
      indexAxis:"y",
      plugins:{
        title:{display:true,text:"Estimated annual electricity use (full build-out, labelled estimates)"},
        legend:{display:false},
        tooltip:{callbacks:{label:item=>` ${item.raw} TWh / year, est.`}}
      },
      scales:{
        x:{title:{display:true,text:"TWh / year (est.)"},beginAtZero:true},
        y:{ticks:{autoSkip:false}}
      }
    }
  });
}

const SHORT={
  "CDC Laverton":"Laverton",
  "CDC Brooklyn":"Brooklyn",
  "NEXTDC West Footscray":"W. Footscray",
  "AirTrunk Derrimut":"Derrimut",
  "STACK Truganina":"STACK",
  "NEXTDC Tullamarine (M2)":"Tullamarine",
  "NEXTDC Port Melbourne":"Port Melb."
};
const scatterRows=ROWS.filter(r=>r.twh!=null && r.rank!=="Not applicable" && !Number.isNaN(+r.rank));
const sc=document.getElementById("vicDcScatter");
if(sc && window.Chart){
  new Chart(sc,{
    type:"scatter",
    data:{
      datasets:[{
        label:"Sites (est.)",
        data:scatterRows.map(r=>({x:+r.rank,y:r.twh,name:SHORT[r.chart]||r.chart,full:r.chart,out:!!r.outlier})),
        pointRadius:d=>d.raw && d.raw.out?9:7,
        backgroundColor:d=>d.raw && d.raw.out?"#f0883e":"#58a6ffcc",
        borderColor:d=>d.raw && d.raw.out?"#f0883e":"#58a6ff",
        borderWidth:1
      }]
    },
    options:{
      plugins:{
        title:{display:true,text:"Est. annual use vs density rank (estimates, 7 sites)"},
        legend:{display:false},
        tooltip:{callbacks:{
          title:items=>items[0]&&items[0].raw?items[0].raw.full:"",
          label:item=>` ${item.raw.y} TWh / year, est. · density rank ${item.raw.x}`
        }}
      },
      scales:{
        x:{min:0.5,max:7.5,ticks:{stepSize:1},title:{display:true,text:"Density rank (1 = most people nearby)"}},
        y:{beginAtZero:true,title:{display:true,text:"TWh / year (est.)"}}
      }
    },
    plugins:[{
      id:"vicScatterLabels",
      afterDatasetsDraw(chart){
        const {ctx}=chart, meta=chart.getDatasetMeta(0);
        ctx.save();
        ctx.font="11px system-ui,sans-serif";
        ctx.fillStyle="#8b949e";
        meta.data.forEach((pt,i)=>{
          const d=chart.data.datasets[0].data[i];
          if(!d) return;
          ctx.textAlign="left";
          ctx.textBaseline="bottom";
          const x=Math.min(pt.x+8, chart.chartArea.right-4);
          const y=d.out?pt.y-10:pt.y-6;
          if(d.out) ctx.fillStyle="#f0883e";
          else ctx.fillStyle="#8b949e";
          ctx.fillText(d.name,x,y);
        });
        ctx.restore();
      }
    }]
  });
}
})();
