export type StatCallout = {
  value: string;
  label: string;
  sourceId: string;
};

export type Article = {
  id: string;
  title: string;
  paragraphs: string[];
  pullQuote?: string;
  stat?: StatCallout;
};

export type Chapter = {
  number: string;
  title: string;
  subtitle: string;
  articles: Article[];
};

export const chapters: Chapter[] = [
  {
    number: "01",
    title: "History",
    subtitle: "From a nine-page whitepaper to a $2.93 trillion market.",
    articles: [
      {
        id: "1-1",
        title: "A Whitepaper in a Crisis",
        paragraphs: [
          "On 31 October 2008, an anonymous author calling themselves Satoshi Nakamoto posted a nine-page document to a cryptography mailing list. Titled “Bitcoin: A Peer-to-Peer Electronic Cash System”, it described money that could move between strangers — with no bank, government, or intermediary in the middle.",
          "The timing was no accident. Weeks earlier, Lehman Brothers had collapsed and the global financial system had frozen. The paper’s core idea — a shared public ledger that no single institution could rewrite — was a direct answer to the failure of trust that had just cost the world trillions.",
          "On 3 January 2009 the first block of that ledger, the “genesis block”, was mined. Embedded in its code was a newspaper headline about a bank bailout: a small, permanent record of the moment the idea was born from.",
        ],
        pullQuote:
          "A currency that could move between strangers — with no bank in the middle.",
      },
      {
        id: "1-2",
        title: "The Pizza and the First Boom",
        paragraphs: [
          "Bitcoin had no price at first. On 22 May 2010, a programmer in Florida paid 10,000 BTC — then worth about $41 — for two delivered pizzas. It was the first real-world purchase ever made with the currency, and it is now celebrated every year as Bitcoin Pizza Day. Those coins would be worth hundreds of millions of dollars today.",
          "The early years were chaotic. The currency found its first users on the dark-web marketplace Silk Road, and lost its first major exchange, Mt. Gox, to a hack that erased hundreds of millions of dollars. Each crash was declared the end of crypto. Each time, the price returned.",
          "In 2015 a new network, Ethereum, launched with a crucial addition: smart contracts — programs that move money automatically when conditions are met. For the first time, a blockchain could run applications, not just payments.",
        ],
        pullQuote: "10,000 BTC bought two pizzas in 2010 — the first real purchase ever made with the currency.",
      },
      {
        id: "1-3",
        title: "From Outsiders to Institutions",
        paragraphs: [
          "By 2021 the outsiders had been joined by the mainstream. Public companies put bitcoin on their balance sheets, Wall Street launched futures and exchange-traded funds, and in September 2021 El Salvador became the first country to make bitcoin legal tender.",
          "Then came the reckoning. In 2022 a stablecoin and a major exchange collapsed within months of each other, wiping out billions in customer funds and triggering a deep bear market that regulators are still responding to.",
          "Today the market has rebuilt: total cryptocurrency value stands near $2.93 trillion, with bitcoin alone accounting for roughly 59 percent. The experiment has survived every crisis thrown at it — but the question of what it is actually for remains open.",
        ],
        stat: {
          value: "$2.93T",
          label: "total cryptocurrency market value, October 2026",
          sourceId: "coinmarketcap",
        },
      },
    ],
  },
  {
    number: "02",
    title: "Technology",
    subtitle: "How a network of strangers agrees on the truth.",
    articles: [
      {
        id: "2-1",
        title: "The Shared Ledger",
        paragraphs: [
          "Strip away the jargon and a blockchain is simple: a ledger — a record of who owns what — that is copied across thousands of computers instead of living on one company’s server.",
          "Transactions are bundled into “blocks”, and each block carries a digital fingerprint of the one before it. Change a single character in an old block and every fingerprint after it breaks. That makes the history of the ledger effectively impossible to quietly rewrite.",
          "No one owns this ledger. Anyone can read it, anyone can verify it, and no single party can switch it off. That is the entire trick — and the source of both its promise and its stubborn inefficiency.",
        ],
        pullQuote: "Change one block and every fingerprint after it breaks.",
      },
      {
        id: "2-2",
        title: "Proof-of-Work vs Proof-of-Stake",
        paragraphs: [
          "If no one is in charge, how does the network agree on the truth? Bitcoin’s answer is proof-of-work: computers race to solve a puzzle, and the winner — who spent real electricity — gets to add the next block. Cheating would mean out-spending the rest of the network.",
          "Ethereum now uses a different answer: proof-of-stake. Instead of burning electricity, validators put up their own funds as collateral and are rewarded for honest behaviour and penalised for fraud.",
          "In September 2022 Ethereum switched to proof-of-stake in an event called the Merge. By one widely cited estimate, the move cut the network’s annual electricity use by more than 99.988 percent.",
        ],
        stat: {
          value: ">99.988%",
          label: "reduction in Ethereum’s electricity use after the Merge, September 2022",
          sourceId: "ethereum",
        },
      },
      {
        id: "2-3",
        title: "Keys, Wallets, and Code That Moves Money",
        paragraphs: [
          "Owning cryptocurrency really means owning a private key — a long secret number that unlocks your funds on the ledger. Lose it and the money is gone forever; there is no password reset and no customer-service line.",
          "The community has a saying for this: “not your keys, not your coins”. It is a warning that keeping money on an exchange means trusting that exchange — and exchanges have failed before.",
          "Smart contracts extend the same idea from payments to programs: agreements written in code that execute themselves. They power everything from automatic loans to digital art, and they are the reason crypto is now far more than money.",
        ],
        pullQuote: "Not your keys, not your coins.",
      },
    ],
  },
  {
    number: "03",
    title: "Economy",
    subtitle: "A currency, an asset, and a parallel financial system.",
    articles: [
      {
        id: "3-1",
        title: "Digital Gold and the Halving",
        paragraphs: [
          "Bitcoin’s supply is written into its code: only 21 million coins will ever exist. Roughly every four years, the reward paid to miners is cut in half — an event called the halving.",
          "Each halving makes new supply scarcer. Supporters argue this built-in scarcity makes bitcoin a hedge against inflation — “digital gold”. Critics reply that scarcity alone does not make something a reliable store of value.",
          "The market, so far, has treated it as a bit of both: a volatile asset that cycles through euphoria and despair, but whose long-term price has kept rising. Bitcoin now trades around $86,000 and dominates more than half the crypto market.",
        ],
        stat: {
          value: "21M",
          label: "the hard cap on the number of bitcoins that will ever exist",
          sourceId: "whitepaper",
        },
      },
      {
        id: "3-2",
        title: "Stablecoins and DeFi",
        paragraphs: [
          "Not everything in crypto swings wildly. Stablecoins are tokens engineered to stay pegged to a stable asset, usually the US dollar, and they have become the quiet workhorse of the industry.",
          "In countries with high inflation or strict capital controls, people use dollar-pegged stablecoins as a way to hold savings that don’t lose value — a use that has grown faster than almost any other.",
          "Stablecoins are also the fuel of “DeFi” — decentralised finance — a parallel banking system of lending, borrowing and trading that runs on smart contracts instead of banks. It is open to anyone with an internet connection, and subject to almost none of the protections of a traditional bank.",
        ],
        pullQuote: "Stablecoins are the quiet workhorse of the industry.",
      },
      {
        id: "3-3",
        title: "Boom, Bust, and the Real Economy",
        paragraphs: [
          "Crypto moves in cycles that track its four-year halving rhythm: quiet accumulation, a euphoric bull run, then a crash that shakes out the over-leveraged.",
          "For speculators, the cycle is an opportunity and a trap. For the people who use crypto as an everyday tool — migrants sending remittances, savers escaping inflation — the same volatility is a serious risk they are often least able to absorb.",
          "The honest picture is split. Crypto has lowered the cost of moving money across borders and given millions an alternative to broken currencies. It has also produced fraud, collapses, and fortunes lost. Both stories are true at once.",
        ],
        pullQuote: "Both stories are true at once.",
      },
    ],
  },
  {
    number: "04",
    title: "The Planet",
    subtitle: "The physical footprint of digital money.",
    articles: [
      {
        id: "4-1",
        title: "The Power Behind the Proof",
        paragraphs: [
          "Securing Bitcoin is not free. Cambridge researchers estimate the network now consumes around 160 terawatt-hours of electricity a year — roughly 0.63 percent of the world’s total electricity use, more than countries like Norway or Poland.",
          "That number cuts both ways. Much of the energy is cheap, stranded or renewable: hydro in wet seasons, gas that would otherwise be flared and wasted, curtailed wind and solar. Miners gravitate toward power that no one else can use.",
          "The debate is whether mining crowds out the grid or subsidises its greening. Both things happen in different places — which is why the same statistic is quoted by critics and supporters alike.",
        ],
        stat: {
          value: "~160 TWh",
          label: "Bitcoin’s estimated annual electricity use — about 0.63% of the world total",
          sourceId: "cambridge",
        },
      },
      {
        id: "4-2",
        title: "The Hardware That Becomes Waste",
        paragraphs: [
          "Proof-of-work mining runs on specialised chips called ASICs, built to do one thing only: mine. When faster models ship, the old ones become worthless almost overnight.",
          "The result is a fast churn of hardware with no second life — a stream of electronic waste that dedicated monitors track separately from energy use. Unlike the energy debate, there is no renewables counterweight here; the waste is physical and permanent.",
          "The same demand has rippled into graphics cards, distorting prices for gamers and researchers whenever mining is profitable. Digital money, it turns out, is built on very physical hardware.",
        ],
        pullQuote: "Digital money is built on very physical hardware.",
      },
      {
        id: "4-3",
        title: "Inclusion, Aid, and the Unbanked",
        paragraphs: [
          "The World Bank estimates that 1.4 billion adults have no bank account. For many of them, a phone is the only financial infrastructure they have — which is exactly the gap crypto was designed to fill.",
          "Remittances, which cost an average of around six percent to send through traditional channels, are one of the clearest real-world wins. Dollar-pegged stablecoins and borderless transfers can move money to family in minutes, at a fraction of the fee.",
          "The same rails have carried humanitarian aid around frozen banking systems. But they have also carried scams, and the people they reach are often the least protected. Access, by itself, does not guarantee safety.",
        ],
        stat: {
          value: "1.4B",
          label: "adults worldwide with no bank account",
          sourceId: "worldbank",
        },
      },
    ],
  },
  {
    number: "05",
    title: "The Future",
    subtitle: "Bans, CBDCs, and what comes next.",
    articles: [
      {
        id: "5-1",
        title: "Three Camps — and the Central Banks’ Answer",
        paragraphs: [
          "Governments have split into three camps. A handful have banned or severely restricted crypto. A few, like El Salvador, have embraced it. Most are trying to regulate it into something they can tax, police, and live with.",
          "Meanwhile, central banks are building their own answer: central bank digital currencies, or CBDCs. The Atlantic Council counts 146 countries and currency unions — over 98 percent of global GDP — now exploring one, with pilots running in 41 of them.",
          "Three countries have fully launched: the Bahamas, Jamaica, and Nigeria. Every G20 member except the United States is exploring a CBDC. The quiet race over the future of money is already under way.",
        ],
        stat: {
          value: "146",
          label: "countries and currency unions exploring a CBDC — over 98% of global GDP",
          sourceId: "atlanticcouncil",
        },
      },
      {
        id: "5-2",
        title: "Three Plausible Futures",
        paragraphs: [
          "Extrapolate the present and three futures emerge. In the first, crypto becomes mainstream rails: stablecoins settle everyday payments, funds hold bitcoin, and the technology fades into the background of finance.",
          "In the second, it settles into a regulated niche — an asset class like gold, legal but contained, with the speculative edges sanded off. In the third, tightening rules and superior state alternatives shrink it back to the fringes.",
          "Which future arrives depends less on the technology than on the choices of the next few years. The one certainty is that a fifteen-year-old experiment has already changed how the world thinks about money — and its impact is still being written.",
        ],
        pullQuote: "Its impact is still being written.",
      },
    ],
  },
];
