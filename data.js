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
    mBear: 0.10, mBase: 0.20, mBull: 0.30
  },
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
  expected: { cars: 25.17, energy: 8.69, robotaxi: 6.78, cash: 9.66, total: 50.30 }
};
