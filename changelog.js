// Version history: old vs new values and why. Newest first. Add an entry whenever data or the model changes.
window.TV_CHANGES=[
 {v:"v6.1",date:"22 Oct 2026",title:"Tesla Q3 2026 results added",rows:[
  ["Tesla share price","US$375.00 (8 Oct close)","US$386.47 (21 Oct close)","Latest close before/at the Q3 results (Yahoo Finance). Fell ~3% after hours on 21 Oct."],
  ["Cash & investments","US$43,524m (30 Jun)","US$45,447m (30 Sep)","Q3 2026 Update balance sheet."],
  ["Debt & finance leases","US$9,342m","US$9,523m","Q3 2026 Update (1,387 current + 8,136 non-current)."],
  ["Diluted shares","3,540m (Q2)","3,541m (Q3)","Q3 2026 diluted weighted-average shares."],
  ["Paid FSD customers","1.48m, ~45% subscription","1.74m, ~50% subscription","Q3 Update (1.74m) and CFO on the call (50% subscriptions). Raises today's subscription base, which raises FSD growth value."],
  ["Q3 2026 trends","Deliveries and storage only","+ revenue by segment, margins, FCF, cash, FSD","Automotive US$20,560m, energy US$2,881m, services US$4,605m; auto GM 18.5%, energy GM 33.1%; FCF US$1,531m."],
  ["Net cash per share","US$9.66","US$10.15","More cash, slightly more debt and shares."],
  ["FSD value per share (starter)","US$5.10","US$6.45","Bigger subscriber base growing at the same rates."],
  ["Original four (cars+energy+robotaxi+cash)","US$50.30","US$50.77","Cash update; cars 25.17 -> 25.16 from 1m more shares."],
  ["Tesla model total (starter)","US$58.60","US$60.43","Sum of the above. Self-checks updated to these new targets."],
  ["Not changed","-","-","Forecast base stays FY2025 (car, energy revenue, deliveries) until full-year 2026 is reported; probabilities and growth sliders unchanged."]]},
 {v:"v6.0",date:"Oct 2026",title:"Before this log",rows:[["Earlier versions (v1-v5)","-","-","Sheet-based model v4, Optimus/FSD added, SpaceX+xAI and Nvidia sections, two-level navigation. SpaceX starter value US$256bn (US$19.42/share)."]]}
];
(function(){const el=document.getElementById("chgLog"); if(!el) return;
 el.innerHTML=window.TV_CHANGES.map(c=>`<h3>${c.v} · ${c.date} · ${c.title}</h3><div class="tblwrap"><table class="lt"><tr><th>What</th><th>Old</th><th>New</th><th>Why</th></tr>${c.rows.map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join("")}</table></div>`).join("");})();
