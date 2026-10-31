// Key voices on X: curated substantive posts bearing on Tesla / SpaceX+xAI value.
// Only posts returned by the X API; quotes are the author's claims, not facts.
// Badges checked against data.js / beyond.js starter sliders.
(function(){
const A={
  elon:{handle:"elonmusk",name:"Elon Musk",role:"CEO, Tesla & SpaceX / xAI"},
  ashok:{handle:"aelluswamy",name:"Ashok Elluswamy",role:"VP AI / Autopilot, Tesla"},
  lars:{handle:"larsmoravy",name:"Lars Moravy",role:"VP Vehicle Engineering, Tesla"},
  franz:{handle:"woodhaus2",name:"Franz von Holzhausen",role:"Chief Designer, Tesla"},
  gwynne:{handle:null,name:"Gwynne Shotwell",role:"President & COO, SpaceX (no public X account found)"},
  nicolls:{handle:"michaelnicollsx",name:"Michael Nicolls",role:"President, xAI / SpaceXAI (also Starlink & AI, SpaceX)"},
  truell:{handle:"mntruell",name:"Michael Truell",role:"CEO, Cursor (SpaceXAI / Building @SpaceXSI)"}
};
// badge: "in" | "part" | "not"
const TESLA=[
 {id:"2111683964721037767",d:"2026-10-18",a:"elon",
  q:"Optimus and Cybercab will be the vast majority of Tesla’s value. The only things that will scale to incredible size economically are super intelligence, robots, solar power and mass to space.",
  why:"Musk’s claim that autonomy and humanoids dominate long-term value is the core reason this model has separate Optimus and Robotaxi tabs.",
  badge:"in",part:"Optimus probs (opBear/Base/Bull 50/35/15%) and Robotaxi probs (pBear/Base/Bull 45/40/15%); fleet/unit ramps on those tabs."},
 {id:"2112981960880783781",d:"2026-10-21",a:"ashok",
  q:"We are launching the Tesla Robotaxi safety report today. Till date, Robotaxi has driven a total of 3.3 million miles autonomously, and has had zero injuries nor airbag deployments.",
  why:"Ashok’s claim of zero injuries over 3.3m autonomous miles is the kind of safety evidence that supports (or challenges) the robotaxi probability and fleet-ramp assumptions.",
  badge:"part",part:"Robotaxi probabilities and year-1 fleet (bear 500 / base 1,000 / bull 1,500); safety itself is not a slider."},
 {id:"2108986941127696515",d:"2026-10-10",a:"ashok",
  q:"Two years since the 10/10 Cybercab WeRobot event, the cabs are everywhere in Austin now. Dallas soon.",
  why:"His claim that Cybercabs are already dense in Austin (with Dallas next) feeds the robotaxi city/fleet story the model discounts via probabilities.",
  badge:"in",part:"Robotaxi year-1 fleet and 10-year fleet (bear 20k / base 250k / bull 2m)."},
 {id:"2095772209331438012",d:"2026-09-04",a:"ashok",
  q:"Can’t believe the Cybercab is a real product. Yet, as of today, it is! A salute to all the supporters along the way; thanks for believing in us.",
  why:"Marks Cybercab as a shipping product in Ashok’s view — relevant to whether robotaxi fleet growth starts from a real vehicle or a concept.",
  badge:"part",part:"Robotaxi fleet ramp; Cybercab unit economics are not a separate line."},
 {id:"2097433956627210505",d:"2026-09-08",a:"elon",
  q:"We redesigned Cybercab production for production over 5 times faster than conventional automotive manufacturing!",
  why:"If true, a much faster Cybercab line would support higher robotaxi fleet growth than a car-like ramp; the model’s fleet paths are still generic S-curves.",
  badge:"part",part:"Robotaxi 10-year fleet (20k–2m) and year-1 fleet; no separate ‘unboxed process’ slider."},
 {id:"2080149830467547297",d:"2026-07-23",a:"ashok",
  q:"Using FSD is far safer than driving manually, as measured over 12 billion miles of its use. Safer by a margin of 2x the miles between collisions!",
  why:"Ashok’s 2× safety claim over 12bn miles is the kind of evidence that would support higher FSD attach and licensing take-up — both of which the model values.",
  badge:"part",part:"FSD subscriber growth (fsdG1 25% / fsdG2 10%) and licensing probability (licP 15%)."},
 {id:"2079580336875573750",d:"2026-07-21",a:"ashok",
  q:"Robotaxi now available across Miami, Tampa and Orlando in Florida. Try it out and let us know if you have any feedback.",
  why:"Expansion beyond Texas into three Florida cities is progress toward the multi-city fleet the robotaxi scenarios assume.",
  badge:"in",part:"Robotaxi year-1 fleet and city coverage implied by fleet growth."},
 {id:"2072214077372518657",d:"2026-07-01",a:"elon",
  q:"Walking the Optimus production line in Fremont",
  why:"Signals that Optimus manufacturing exists in Fremont — the model’s Optimus value depends on that line eventually scaling to hundreds of thousands of units.",
  badge:"part",part:"Optimus units (base year-10 from opUnitsBase 300k; bull 2m) and probabilities."},
 {id:"2072448521513685263",d:"2026-07-01",a:"elon",
  q:"No, Optimus production will be extremely slow at first, as everything is new. This is not like making a car.",
  why:"Musk’s own claim of a very slow early Optimus ramp supports the model’s bear/base starting units (1k–2k in year 1) rather than an instant million-unit line.",
  badge:"in",part:"Optimus year-1 units (bear 1,000 / base 2,000 / bull 5,000) and opUnitsBase/Bull."},
 {id:"2062202577555763337",d:"2026-06-03",a:"ashok",
  q:"Unsupervised Robotaxi now available in the greater Austin area.",
  why:"Unsupervised (no safety monitor) service is the threshold that turns robotaxi from a supervised demo into something closer to the model’s cash-flow scenarios.",
  badge:"in",part:"Robotaxi probabilities (45/40/15) and year-1 fleet."},
 {id:"2057305173438116200",d:"2026-05-21",a:"franz",
  q:"After nearly 18 years I can stop working on Model S and X. We put so much love into these products, but will continue to pour that into the future products.",
  why:"Franz’s claim that design focus is shifting off S/X toward ‘future products’ lines up with the Optimus-factory / Cybercab narrative, not with growing legacy car ASP.",
  badge:"part",part:"Cars growth (carG1 5%) and Optimus factory story; no separate S/X sunset slider."},
 {id:"2047574971774611553",d:"2026-04-24",a:"elon",
  q:"Cybercab has started production",
  why:"Production start is a necessary step for the robotaxi fleet ramp; the model still treats early volumes as probability-weighted.",
  badge:"part",part:"Robotaxi year-1 fleet (500–1,500) and 10-year fleet."},
 {id:"2023831190302847088",d:"2026-02-17",a:"elon",
  q:"Congratulations to the Tesla team on making the first production Cybercab!",
  why:"First unit off the line is symbolic evidence that Cybercab is real hardware, not only a render — still far from the base 250k robotaxi fleet.",
  badge:"part",part:"Robotaxi fleet ramp (fleetBase 250,000 at year 10)."},
 {id:"2014397578352226423",d:"2026-01-22",a:"elon",
  q:"Just started Tesla Robotaxi drives in Austin with no safety monitor in the car. Congrats to the @teslasi team! … Solving real-world AI for Optimus will be 100X harder than cars.",
  why:"Unsupervised Austin rides are the first cash-flow-relevant robotaxi milestone; the Optimus ‘100× harder’ claim reinforces why Optimus carries its own probability discount.",
  badge:"in",part:"Robotaxi probs + year-1 fleet; Optimus probs (opBear/Base/Bull)."},
 {id:"2014398853991301538",d:"2026-01-22",a:"ashok",
  q:"Robotaxi rides without any safety monitors are now publicly available in Austin. Starting with a few unsupervised vehicles mixed in with the broader robotaxi fleet with safety monitors, and the ratio will increase over time.",
  why:"Ashok’s claim of a mixed supervised/unsupervised fleet matches how the model starts with a small year-1 fleet and ramps.",
  badge:"in",part:"Robotaxi year-1 fleet (bear 500 / base 1,000 / bull 1,500)."},
 {id:"2014541556565352467",d:"2026-01-23",a:"elon",
  q:"Cybercab production starts in April",
  why:"A dated production start claim — useful for checking whether the robotaxi ramp timeline in the model is optimistic or conservative.",
  badge:"part",part:"Robotaxi year-1 fleet timing (implicit in the 10-year S-curve)."},
 {id:"2013751504847433803",d:"2026-01-20",a:"elon",
  q:"With the important caveat that initial production is always very slow and follows an S-curve. … For Cybercab and Optimus, almost everything is new, so the early production…",
  why:"Explicit S-curve language for Cybercab and Optimus matches how the model ramps fleet/units from year 1 to year 10.",
  badge:"in",part:"Robotaxi and Optimus year-1 → year-10 unit paths."},
 {id:"1990662857021927917",d:"2025-11-18",a:"elon",
  q:"Major valuation change when there is unsupervised self-driving at scale and an even larger valuation change when Optimus reaches volume production",
  why:"States the two valuation step-changes the model tries to capture with robotaxi and Optimus probability-weighted DCFs.",
  badge:"in",part:"Robotaxi + Optimus tabs (probability-weighted EV)."},
 {id:"2085191304905138594",d:"2026-08-06",a:"elon",
  q:"Megapack 3 starting production. Congrats Tesla Megapack team!",
  why:"Megapack capacity underpins the Energy tab’s storage growth; Megapack 3 at Brookshire is a concrete capacity claim.",
  badge:"in",part:"Energy growth (enG1 12% / enG2 6%) and energy margin (enM 12%)."},
 {id:"2103199150779338825",d:"2026-09-24",a:"lars",
  q:"Super excited for Tesla Semi ROLLOUT!!!",
  why:"Semi is a real product push from vehicle engineering, but this model has no separate Semi line — any value would sit inside Cars or be missed entirely.",
  badge:"not",part:"No Semi revenue or margin slider; not in the sum-of-parts."},
 {id:"1997024017245786213",d:"2025-12-05",a:"lars",
  q:"Fun fact - Tesla is the most reliable EV you can buy according to Consumer Reports - and we continue to improve year over year.",
  why:"Reliability claims can support brand and residual values, but the model does not have a quality or warranty-cost slider.",
  badge:"not",part:"No reliability / residual-value input."},
 {id:"2110913934844916176",d:"2026-10-16",a:"franz",
  q:"Roadster!",
  why:"A new Roadster reveal matters for design buzz; the model does not value Roadster as a separate cash-flow line.",
  badge:"not",part:"No Roadster units, ASP or margin; not in the sum-of-parts."},
 {id:"2111320679090102695",d:"2026-10-17",a:"franz",
  q:"Designed, engineered, and made in America",
  why:"Brand/manufacturing positioning; no direct slider (tariffs and localisation are not modelled).",
  badge:"not",part:"No ‘made in USA’ or tariff slider."},
 {id:"2105747471045370250",d:"2026-10-01",a:"elon",
  q:"We cut our RAM in half for the Tesla AI5 chip (now 72GB of LP5) and 1/3 for AI6 (now 144GB of LP6). This was the only way to get enough volume for Optimus production and greatly reduces cost.",
  why:"Chip cost claims matter for Optimus unit economics, but the model uses a simple price and margin path, not BOM or memory prices.",
  badge:"not",part:"Optimus price/margin only (price1 US$60k, m10 15–20%); no AI5/AI6 or RAM inputs."}
];

const SPACEX=[
 {id:"2114434646914068862",d:"2026-10-25",a:"elon",
  q:"As of the past few weeks, debt markets have almost entirely shut off access to money for any company that doesn’t have substantial revenue independent of AI data centers. SpaceX closed $40B of debt for GPUs, but we’re investment grade and have Starlink & launch…",
  why:"Musk’s claim of US$40bn GPU debt plus investment-grade status affects net-cash and the compute (Colossus) ramp the xAI lines depend on.",
  badge:"part",part:"Net cash (~US$51.0bn at 30 Sep 2026) and xAI compute revenue starter (compute_r US$22.64bn/yr); debt raise itself is not a slider."},
 {id:"2106454808676716916",d:"2026-10-03",a:"elon",
  q:"Starship deploying Starlink V3 satellites",
  why:"First operational Starlink V3 on Starship is the capacity step-change the Starship-progress link is meant to capture.",
  badge:"in",part:"Starship progress (shipProg, starter 0%) → Starlink margin/growth and Launch margin/growth."},
 {id:"2102068280156414171",d:"2026-09-21",a:"elon",
  q:"In 7 days, the first Starship launch to orbit will be carrying Starlink V3 satellites intended for operational use",
  why:"Dates the first revenue-ish Starship / V3 mission — relevant to when shipProg should move off 0%.",
  badge:"in",part:"Starship progress slider (shipProg) and Starship option (shipP 15%, shipVal US$300bn)."},
 {id:"2099295234471461372",d:"2026-09-14",a:"elon",
  q:"700 Falcon flights completed. Congrats to the SpaceX Falcon team!",
  why:"Falcon cadence underpins today’s Launch cash flows; the model’s launch revenue starts from Q3 2026 annualised Space segment.",
  badge:"in",part:"Launch revenue base (US$1.767bn × 4) and launch growth/margin (launchG 6%, launchM 15%)."},
 {id:"2092292773915537580",d:"2026-08-25",a:"elon",
  q:"Starbase Louisiana will ultimately have over a dozen launch towers, enabling more than 30 Starship flights per day and making it the biggest launch site on Earth!",
  why:"A multi-tower, dozens-per-day claim is far beyond the starter launch growth; it would mainly show up if you raise shipProg and the Starship option.",
  badge:"part",part:"Starship progress (shipProg) and Starship option (shipP / shipVal); no Louisiana-tower slider."},
 {id:"2091287025555214632",d:"2026-08-22",a:"elon",
  q:"Once Starship is flying reliably several times per week, it makes sense to shift super scarce SpaceX engineering and production resources to Starship … which means winding down Falcon",
  why:"A Falcon wind-down would eventually cut today’s Launch cash flows even as Starship grows — the model does not explicitly retire Falcon.",
  badge:"part",part:"Launch growth (launchG) and Starship progress; no Falcon retirement date."},
 {id:"2086229516599673108",d:"2026-08-08",a:"elon",
  q:"What is not speculative is that the V3 satellites that will be launched on Starship are an order of magnitude more capable than the V2 satellites currently launched on Falcon. Or that an order of…",
  why:"V3 ‘order of magnitude’ capacity is exactly what the Starship→Starlink link assumes (+margin / +consumer & d2c growth at 100% progress).",
  badge:"in",part:"Starship progress link (connM +10 pts, capG +5 pts at 100% shipProg)."},
 {id:"2057974830469677092",d:"2026-05-23",a:"elon",
  q:"Congratulations @SpaceX team on an epic first Starship V3 launch & landing! You scored a goal for humanity.",
  why:"First V3 flight success is progress toward the Starship option and the progress slider leaving 0%.",
  badge:"part",part:"Starship option (shipP 15%, shipVal US$300bn) and shipProg."},
 {id:"2043157936261025980",d:"2026-04-12",a:"elon",
  q:"Starlink V3 launches with Starship will carry 25 to 50 times more bandwidth than a Falcon flight with V2 … Starship will also launch 100+ times more per year than Falcon (mostly AI sats). Probably ~20k comms satellites per year…",
  why:"Bandwidth and sat-count claims drive the long-run Starlink and orbital-compute stories; starter shipProg is still 0%.",
  badge:"in",part:"Starship progress link + Starlink sub growth (subG1 20%) and orbital AI line (orbital_p 5%)."},
 {id:"2035507310068711662",d:"2026-03-22",a:"elon",
  q:"The xAI Colossus data center will cost more and deliver far more computing than that this year",
  why:"Colossus scale is the backbone of the xAI compute revenue line (the largest SI starter).",
  badge:"in",part:"xAI compute_r US$22.64bn/yr, compute_g1 20%, compute_m 15%."},
 {id:"2014393849334866001",d:"2026-01-22",a:"elon",
  q:"Starship will add ~3 orders of magnitude to SpaceX mass to orbit and beyond",
  why:"A 1,000× mass-to-orbit claim is the bull case behind the Starship option value (chance × payoff).",
  badge:"in",part:"Starship option (shipP 15% × shipVal US$300bn)."},
 {id:"2003359106720293267",d:"2025-12-23",a:"elon",
  q:"Starship and Starlink V3 will be a major step change",
  why:"Directly names the two coupled upgrades the Starship-progress link is built to model.",
  badge:"in",part:"shipProg and Starlink V3 capacity assumptions in beyond.js."},
 {id:"1997399963509150089",d:"2025-12-06",a:"elon",
  q:"There has been a lot of press claiming @SpaceX is raising money at $800B, which is not accurate. SpaceX has been cash flow positive for many years and does periodic stock buybacks twice a year…",
  why:"Musk disputes an $800bn raise narrative; this site uses its own DCF (~US$382bn starter), not a funding round mark.",
  badge:"not",part:"Model uses DCF sum-of-parts, not secondary-sale marks; no ‘raise valuation’ input."},
 {id:"1994518037614268565",d:"2025-11-28",a:"elon",
  q:"SpaceX is accelerating rapidly. When Starship is launching several times a day in a few years, SpaceX will be ~99% of all Earth payload mass to orbit, even if the others triple their current launch rate.",
  why:"Near-monopoly payload-mass claim would support a much higher launch + Starship option; starter shipProg stays at 0%.",
  badge:"part",part:"Launch growth and Starship option; no market-share slider."},
 {id:"2070499465589317797",d:"2026-06-26",a:"gwynne",
  q:"[Reported] SpaceX president Gwynne Shotwell told IPO-roadshow investors the group was considering a Starlink retail mobile product and could build its own terrestrial US mobile network (Financial Times, via @trmcdonald).",
  why:"If Shotwell’s reported mobile/retail push happens, it would expand direct-to-cell and consumer ARPU beyond the starter path — she has no public X account, so this is a third-party report of her claim.",
  badge:"part",part:"Starlink direct-to-cell growth (d2cG1 ~16.4%) and consumer growth (subG1 20%); no separate ‘terrestrial MVNO’ line.",
  url:"https://x.com/trmcdonald/status/2070499465589317797"},
 {id:"2046993831250309571",d:"2026-04-22",a:"gwynne",
  q:"[Reported by others] Gwynne Shotwell said Falcon launches will begin to decline this year (130–140)…",
  why:"A claimed Falcon cadence peak would cap near-term Launch revenue even as Starship ramps — relevant if you cut launchG or raise shipProg.",
  badge:"part",part:"Launch growth (launchG 6%) and Starship progress; attributed via third-party posts, not her own account.",
  url:"https://x.com/Vantadaga/status/2046993831250309571"},
 {id:"2112642599286690279",d:"2026-10-20",a:"nicolls",
  q:"SpaceX posted Q3 earnings results and both @Starlink and @spacexai had a standout quarter. Congrats to the team!",
  why:"Nicolls (xAI president) flags Super Intelligence as a standout Q3 line — the model’s xAI sum-of-parts starts from that Q3 SI revenue (US$7.56bn).",
  badge:"in",part:"xAI lines from Q3 2026 SI (aiQ total US$7.560bn → starters subs/api/compute/ads)."},
 {id:"2107293648685601276",d:"2026-10-06",a:"nicolls",
  q:"Congrats to @reflection_ai - trained on @spacexai compute!",
  why:"A named third-party training customer on SpaceXAI compute supports the compute-as-a-service line (the largest xAI starter).",
  badge:"in",part:"compute_r US$22.64bn/yr, compute_g1 20%, compute_m 15%."},
 {id:"2103513809931714751",d:"2026-09-25",a:"nicolls",
  q:"Cookin’ in Memphis/Southhaven!  And hiring at a rapid clip for hard-working and talented individuals… join us",
  why:"Nicolls’ claim that Colossus (Memphis/Southaven) is scaling and hiring hard is evidence for the compute capacity behind compute_r (nameplate 1.7 GW at Q3).",
  badge:"in",part:"compute_r / compute_g1; capacity itself is not a separate slider."},
 {id:"2102084752257753184",d:"2026-09-21",a:"nicolls",
  q:"Congrats to the @spacexai team on the release of 4.7!",
  why:"A Grok model release from the xAI president is product evidence for the subscriptions and API lines that monetise Grok.",
  badge:"part",part:"subs_r US$1.68bn/yr and api_r US$3.71bn/yr; model version is not a slider."},
 {id:"2088276272820670653",d:"2026-08-14",a:"nicolls",
  q:"Welcome to the @spacexai team! 🚀",
  why:"Nicolls welcoming Cursor into SpaceXAI marks the close of the US$60bn Cursor deal — Cursor revenue sits inside the API & enterprise starter.",
  badge:"in",part:"api_r US$3.71bn/yr (incl. Cursor US$0.608bn in Q3 ~1.5 months)."},
 {id:"2072013394975346697",d:"2026-06-30",a:"nicolls",
  q:"The unique capabilities of the Colossus datacenters could not be accomplished without the partnership and support from the local Memphis community. Happy to bring affordable and great @SpaceX @Starlink connectivity to our neighbors.",
  why:"Confirms Colossus as the Memphis compute cluster that underpins the compute rental line; Starlink cross-sell is a side benefit, not a separate xAI slider.",
  badge:"in",part:"compute_r US$22.64bn/yr (Colossus); Starlink consumer is a separate Starlink line."},
 {id:"2105736227613974783",d:"2026-10-01",a:"truell",
  q:"Grok Bot gets useful work done, without you needing to ask.",
  why:"Proactive Grok Bot behaviour is the agent product the model treats as an early-stage agents scenario (probability-weighted).",
  badge:"part",part:"agents_p 25%, agents_r1 US$0.5bn in 2028; today’s Bot revenue sits inside subs/API (not disclosed)."},
 {id:"2102073686970843638",d:"2026-09-21",a:"truell",
  q:"Grok 4.7 is out! Smarter and more capable, at the same speed and cost.",
  why:"Truell’s model-release claim (same price/speed, better quality) supports API & Cursor attach without raising unit price — relevant to api growth, not a price slider.",
  badge:"part",part:"api_r / api_g1 30%; no separate ‘model quality’ or price-per-token slider."},
 {id:"2095625771541008756",d:"2026-09-03",a:"truell",
  q:"Grok Bot for enterprise is out today. We're making it free for all Grok and Cursor enterprise customers for the next two weeks. Deploying Bot has felt like onboarding thousands of capable teammates to our company. It is both the most internally adopted and most powerful AI product we've seen so far.",
  why:"Enterprise Bot free trial + heavy internal adoption is the clearest public signal for the agents scenario and for API/enterprise attach via Cursor.",
  badge:"part",part:"agents_p / agents_r1; api_r (Cursor enterprise). Free trial itself is not modelled."},
 {id:"2092672784774394350",d:"2026-08-26",a:"truell",
  q:"Grok Bot is now available to everyone with a standard Grok or Cursor subscription. It's grown faster than any product we've seen. It's been particularly exciting to see the range of jobs people delegate to Grok Bot, from running small e-commerce businesses (including support, advertising, inventory, finance), coordinating customer events, testing production software, and completing large, mundane parts of users' day-to-day work.",
  why:"Bundling Bot into Grok/Cursor subs and claiming fastest growth ties agents uptake to the subscriptions and API lines; the model still keeps agents as a separate probability-weighted scenario.",
  badge:"part",part:"subs_r, api_r, and agents_p (25%); Bot not broken out in reported revenue."},
 {id:"2088277505933488137",d:"2026-08-14",a:"truell",
  q:"Cursor has officially joined SpaceX. We’re grateful to become part of such a special company, and it has been a privilege working with the SpaceXAI team. Lots ahead.",
  why:"CEO confirmation of the Cursor→SpaceX close — Cursor is the main disclosed driver of the jump in API & enterprise starter revenue.",
  badge:"in",part:"api_r US$3.71bn/yr (incl. Cursor)."},
 {id:"2087565040677454327",d:"2026-08-12",a:"truell",
  q:"Excited to release Grok 4.6. With each release, Grok is becoming a more capable digital colleague. 4.6 is significantly better at difficult tasks and knowledge work. It combines Opus-class intelligence and polish with very low cost and high speed.",
  why:"‘Opus-class at low cost/high speed’ is the competitive claim behind API share and Cursor usage — the model captures price/volume only via api_r and growth, not quality scores.",
  badge:"part",part:"api_r / api_g1; no benchmark or ‘Opus-class’ slider."},
 {id:"2087226192512626848",d:"2026-08-11",a:"truell",
  q:"Grok Bot is out now! An early step towards capable, delightful digital colleagues.",
  why:"Product launch of Grok Bot is the public start of the agents line the model treats as a 25% probability scenario.",
  badge:"part",part:"agents_p 25%, agents_r1 US$0.5bn (2028 success case)."},
 {id:"2074916251743457787",d:"2026-07-08",a:"truell",
  q:"Excited to release Grok 4.5 with @spacexai. It's an Opus-class model that's fast and low cost. It's a significant step up over any model we've developed so far, including Composer 2.5, and has become the daily driver for many on our team. First of many releases. More soon.",
  why:"First joint Cursor×SpaceXAI coding/agents model — directly feeds the API & enterprise line (and later Grok Build / Bot) that api_r is built from.",
  badge:"in",part:"api_r US$3.71bn/yr (Cursor + Grok API); agents still a scenario."}
];

function fmtDate(iso){
  const d=new Date(iso+"T12:00:00Z");
  return d.toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric",timeZone:"Australia/Sydney"});
}
function badgeHtml(b,part){
  const map={in:["In the model","v-in"],part:["Partly in the model","v-part"],not:["Not in the model","v-not"]};
  const [lab,cls]=map[b]||map.not;
  return `<span class="v-badge ${cls}" title="${esc(part)}">${lab}</span>`;
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}
function card(p){
  const au=A[p.a]||{name:p.a,handle:"",role:""};
  const href=p.url||(au.handle?`https://x.com/${au.handle}/status/${p.id}`:`#`);
  const handle=au.handle?`@${au.handle}`:"(no X account)";
  return `<article class="v-card" data-author="${p.a}" data-badge="${p.badge}">
  <header class="v-hd"><span class="v-who"><b>${esc(au.name)}</b> <span class="muted">${esc(handle)}</span></span>
  <time datetime="${p.d}">${fmtDate(p.d)}</time></header>
  <p class="v-q">“${esc(p.q)}”</p>
  <p class="v-why"><b>Why it matters for value:</b> ${esc(p.why)}</p>
  <p class="v-mod"><b>Model:</b> ${esc(p.part)}</p>
  <footer class="v-ft">${badgeHtml(p.badge,p.part)} <a class="v-link" href="${href}" target="_blank" rel="noopener">View on X ↗</a></footer>
 </article>`;
}
function filters(prefix,authors){
  const people=[["all","Everyone"],...authors.map(([k,lab])=>[k,lab])];
  const badges=[["all","All badges"],["in","In the model"],["part","Partly in the model"],["not","Not in the model"]];
  return `<div class="v-filters" data-prefix="${prefix}">
  <div class="v-chips" data-kind="author">${people.map(([k,l],i)=>`<button type="button" class="v-chip${i===0?" on":""}" data-v="${k}">${esc(l)}</button>`).join("")}</div>
  <div class="v-chips" data-kind="badge">${badges.map(([k,l],i)=>`<button type="button" class="v-chip${i===0?" on":""}" data-v="${k}">${esc(l)}</button>`).join("")}</div>
 </div>`;
}
function bind(root){
  const chips=root.querySelectorAll(".v-chip");
  const state={author:"all",badge:"all"};
  chips.forEach(btn=>btn.addEventListener("click",()=>{
    const kind=btn.parentElement.dataset.kind; state[kind]=btn.dataset.v;
    btn.parentElement.querySelectorAll(".v-chip").forEach(b=>b.classList.toggle("on",b===btn));
    root.querySelectorAll(".v-card").forEach(c=>{
      const okA=state.author==="all"||c.dataset.author===state.author;
      const okB=state.badge==="all"||c.dataset.badge===state.badge;
      c.style.display=(okA&&okB)?"":"none";
    });
  }));
}
function render(elId, posts, authors, note){
  const el=document.getElementById(elId); if(!el) return;
  const sorted=[...posts].sort((a,b)=>b.d.localeCompare(a.d));
  const counts={in:0,part:0,not:0}; sorted.forEach(p=>counts[p.badge]++);
  el.innerHTML=`<p class="gi">${note}</p>
  <p class="note">Showing <b>${sorted.length}</b> posts · In the model ${counts.in} · Partly ${counts.part} · Not ${counts.not}. Newest first. Claims are the speaker’s, not verified facts. Badges checked against starter sliders in <code>data.js</code> / <code>beyond.js</code>.</p>
  ${filters(elId,authors)}
  <div class="v-list">${sorted.map(card).join("")}</div>`;
  bind(el);
}
const noteT="Substantive posts from Elon Musk, Ashok Elluswamy (AI/Autopilot), Lars Moravy (vehicle engineering) and Franz von Holzhausen (design) about robotaxi / FSD, Optimus, Cybercab, production and energy — roughly the last 12 months.";
const noteS="Substantive posts from Elon Musk (Starship/Starlink/xAI), Michael Nicolls (xAI president — Colossus/compute/Grok), Michael Truell (Cursor CEO inside SpaceXAI — Grok Bot/API/agents), plus a couple of third-party reports of Gwynne Shotwell (no public X account found). Original co-founders had left by early 2026 and are not included.";
document.addEventListener("DOMContentLoaded",()=>{
  render("voicesTesla",TESLA,[["elon","Elon"],["ashok","Ashok"],["lars","Lars"],["franz","Franz"]],noteT);
  render("voicesSpaceX",SPACEX,[["elon","Elon"],["nicolls","Nicolls"],["truell","Truell"],["gwynne","Gwynne (reported)"]],noteS);
});
window.TVVoices={TESLA,SPACEX,A};
})();
