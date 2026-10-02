export type Source = {
  id: string;
  name: string;
  url: string;
  note: string;
};

export const sources: Source[] = [
  {
    id: "cambridge",
    name: "Cambridge Bitcoin Electricity Consumption Index (CBECI)",
    url: "https://ccaf.io/cbnsi/cbeci",
    note: "Bitcoin network electricity consumption and comparisons.",
  },
  {
    id: "ethereum",
    name: "Ethereum Foundation — Ethereum’s Energy Expenditure",
    url: "https://ethereum.org/en/energy-consumption/",
    note: "Post-Merge energy and carbon reduction figures.",
  },
  {
    id: "ccri",
    name: "Crypto Carbon Ratings Institute (CCRI)",
    url: "https://carbon-ratings.com/eth-report-2022",
    note: "Bottom-up estimate of the Ethereum Merge’s electricity and carbon impact.",
  },
  {
    id: "worldbank",
    name: "World Bank — Financial Inclusion Overview",
    url: "https://www.worldbank.org/en/topic/financialinclusion/overview",
    note: "Global account ownership and the unbanked population.",
  },
  {
    id: "atlanticcouncil",
    name: "Atlantic Council — Central Bank Digital Currency Tracker",
    url: "https://www.atlanticcouncil.org/cbdctracker/",
    note: "CBDC exploration, pilots, and launches by country.",
  },
  {
    id: "coinmarketcap",
    name: "CoinMarketCap — Crypto Market Overview",
    url: "https://coinmarketcap.com/charts/",
    note: "Total market capitalisation and bitcoin dominance.",
  },
  {
    id: "whitepaper",
    name: "Nakamoto, S. — Bitcoin: A Peer-to-Peer Electronic Cash System (2008)",
    url: "https://bitcoin.org/bitcoin.pdf",
    note: "The original whitepaper, including the 21-million supply cap.",
  },
];

export function sourceLabel(id: string): string {
  const s = sources.find((x) => x.id === id);
  return s ? s.name : id;
}
