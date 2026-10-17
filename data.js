// Teslaverse Playground data. Source: "Teslaverse Valuation Model" v4 (Google Sheet, built 9 Oct 2026),
// which compiles Tesla's public quarterly updates / 10-K / 10-Q filings and public robotaxi reports.
// Only public data and educational model assumptions are included.
window.TV_DATA = {
  meta: { model: "Teslaverse Valuation Model v4", built: "9 Oct 2026", priceDate: "8 Oct 2026 close (US ET)" },
  actuals: {
    baseYear: 2025,
    deliveries2025: 1636129, autoRevenue2025: 69526, autoGrossMargin2025: 0.178,
    companyFCF2025: 6220, companyRevenue2025: 94827, capex2025: 8527,
    gwh2025: 46.7, energyRevenue2025: 12771, energyGrossProfit2025: 3802, gwhQ1Q3_2026: 36.0,
    cash: 43524, debt: 9342, balanceDate: "30 Jun 2026",
    sharesDiluted: 3540, sharesAlt: 3950, sharePrice: 375.00
  },
  starter: {
    disc: 0.10, tg: 0.03, shares: 3540,
    carG1: 0.05, carG2: 0.03, asp: 0.00, carM: 0.08,
    enG1: 0.12, enG2: 0.06, gwhP: -0.02, enM: 0.12,
    pBear: 45, pBase: 40, pBull: 15,
    fleetBear: 20000, fleetBase: 250000, fleetBull: 2000000,
    mBear: 0.10, mBase: 0.20, mBull: 0.30,
    opBear: 50, opBase: 35, opBull: 15, opUnitsBase: 300000, opUnitsBull: 2000000, opMBase: 0.15, opMBull: 0.20,
    fsdG1: 0.25, fsdG2: 0.10, fsdPrice: 99, fsdPriceChg: 0.0, fsdM: 0.60,
    licP: 15, licCars: 2000000, licFee: 1500
  },
  // Optimus fixed scenario drivers (all assumptions; Tesla has published no price, orders or unit counts)
  optimus: {
    bear: { units1: 1000, units10: 20000,  price1: 60000, priceChg: -0.05, m1: -0.50, m10: 0.05 },
    base: { units1: 2000, price1: 60000, priceChg: -0.08, m1: -0.40 },
    bull: { units1: 5000, price1: 60000, priceChg: -0.10, m1: -0.30 }
  },
  // FSD: Tesla reported 1.48m active paid FSD customers at 30 Jun 2026, ~45% on monthly subscription.
  fsd: { paidCustomers: 1480000, subShare: 0.45, licStartYear: 3, licMargin: 0.70 },
  // Robotaxi fixed scenario drivers (Sheet Inputs rows 64-71)
  robotaxi: {
    bear: { fleet1: 500,  miles: 40000, fare: 1.5, fareChg: -0.03, share: 1.00, m1: -1.00 },
    base: { fleet1: 1000, miles: 50000, fare: 1.5, fareChg: -0.04, share: 0.80, m1: -0.80 },
    bull: { fleet1: 1500, miles: 60000, fare: 1.5, fareChg: -0.05, share: 0.60, m1: -0.50 }
  },
  robotaxiFacts: [
    "About 2.4m cumulative paid robotaxi miles by end Q2 2026 (Tesla Q2 2026 update).",
    "Unsupervised rides in 6 cities: Austin, Dallas, Houston, Miami, Orlando, Tampa. Bay Area still uses a safety driver.",
    "Community count 7 Oct 2026: ~1,111 vehicles (409 unsupervised + 702 supervised). Tesla discloses no fleet size or robotaxi revenue.",
    "Waymo: 4,000+ driverless cars, ~500,000 paid rides a week (robotaxireport.com, Oct 2026)."
  ],
  quarters: ["Q1 23","Q2 23","Q3 23","Q4 23","Q1 24","Q2 24","Q3 24","Q4 24","Q1 25","Q2 25","Q3 25","Q4 25","Q1 26","Q2 26","Q3 26"],
  deliveries: [422875,466140,435059,484507,386810,443956,462890,495570,336681,384122,497099,418227,358023,480126,486532],
  storageGWh: [3.889,3.653,3.98,3.202,4.1,9.4,6.9,11.0,10.4,9.6,12.5,14.2,8.8,13.5,13.7],
  autoRev:   [19963,21268,19625,21563,17378,19878,20016,19798,13967,16661,21205,17693,16234,20516,null],
  energyRev: [1529,1509,1559,1438,1635,3014,2376,3061,2730,2789,3415,3837,2408,3139,null],
  servRev:   [1837,2150,2166,2166,2288,2608,2790,2848,2638,3046,3475,3371,3745,4581,null],
  autoGM:    [0.2108,0.1923,0.1869,0.1885,0.1848,0.1847,0.2011,0.1661,0.1623,0.172,0.1705,0.2042,0.2108,0.1688,null],
  energyGM:  [0.1099,0.1842,0.2444,0.2184,0.2465,0.2455,0.3051,0.2522,0.2875,0.3033,0.3142,0.2862,0.3953,0.2039,null],
  sources: [
    ["FY2025 car, energy, cash, debt, shares, quarterly trends","Teslaverse Valuation Model v4 (Tesla quarterly updates, 10-K/10-Q)","https://ir.tesla.com/"],
    ["Share price US$375.00 (8 Oct 2026 close)","Exa market data","https://exa.ai/library/markets/stock/TSLA"],
    ["Robotaxi cities, paid miles, Cybercab capacity, active FSD subscriptions 1.48m (30 Jun 2026)","Tesla Q2 2026 Update (22 Jul 2026)","https://ir.tesla.com/_flysystem/s3/sec/000162828026049213/tsla-20260722-gen.pdf"],
    ["~1.5m paid FSD customers (55% upfront, 45% subscription); >55% North America FSD attach; Optimus 'very complex' to scale","Tesla Q2 2026 earnings call transcript","https://www.fool.com/earnings/call-transcripts/2026/08/05/tesla-tsla-q2-2026-earnings-call-transcript/"],
    ["FSD subscription-only from 14 Feb 2026 at US$99/month (last purchase price US$8,000)","The Verge","https://www.theverge.com/news/861705/tesla-fsd-stop-selling-standalone-subscription-only"],
    ["FSD subscription markets (US, Canada, Australia, NZ, Netherlands, Belgium, Denmark etc.)","Tesla Support","https://www.tesla.com/support/full-self-driving-subscriptions"],
    ["FSD in China (May 2026), ¥64,000 one-off","CNBC","https://www.cnbc.com/2026/05/21/tesla-full-self-driving-china-launch-fsd.html"],
    ["No automaker has accepted an FSD licence (Musk, 22 Sep 2026)","NotATeslaKiller","https://notateslakiller.com/en/tesla-fsd-licensing-other-automakers-no-takers/"],
    ["FSD-related deferred revenue ~US$3.87bn (30 Jun 2026)","Tesla Q2 2026 10-Q (via companiesmarketcap)","https://companiesmarketcap.com/tesla/sec-reports-10q/0001628280-26-049270/"],
    ["Optimus: few dozen/week in Q2 2026, several hundred/week by Aug, >1,000/week line targeted by end-2026, ~20,000/week ambition; leasing plan; Musk's 2025 claims missed","Electrek (citing The Information)","https://electrek.co/2026/09/25/tesla-optimus-production-ramp-hands-ai-generalization-problems/"],
    ["Optimus: no price, orders or release date; Fremont line designed for 1m/yr, Texas 10m/yr long-term","Pogwire (14 Oct 2026)","https://pogwire.com/tech/tesla-optimus-price-release-date"],
    ["Optimus target price ~US$20-30k (Musk); analysts expect US$50-100k initially","WebProNews","https://www.webpronews.com/teslas-optimus-bet-from-factory-line-overhaul-to-2027-sales-target/"],
    ["Competitors: Unitree ~5,500 humanoids shipped in 2025, G1 from US$13,500; Agility Digit, Figure 03 at BMW, Boston Dynamics Atlas","Pheonix Research / marketupdate.ai","https://www.pheonixresearch.com/semiconductors-electronics/robotics-intelligent-automation/article/walking-was-the-easy-part-why-the-humanoid-robot-market-is-now-a-cost-per-part-business/"],
    ["Robotaxi fleet counts, Waymo 4,000+ cars","Robotaxi Report / AI Shift News","https://robotaxireport.com/data/how-many-robotaxis-are-on-the-road/"]
  ],
  expected: { cars: 25.17, energy: 8.69, robotaxi: 6.78, cash: 9.66, total: 50.30 }
};
