import { NextResponse } from "next/server";

export type GasMarket = {
  id: string;
  region: string;
  market: string;
  value: number;
  unit: string;
  currency: string;
  change: number;
  date: string;
  live: boolean;
};

const SYMBOLS = "HENRY_HUB,TTF_GAS";

// These keep the tape useful on first load and when the upstream API is down.
// They are intentionally labelled as reference data in the UI.
const REFERENCE_MARKETS: GasMarket[] = [
  {
    id: "ng",
    region: "Nigeria",
    market: "Suez Gas · local LPG",
    value: 16000,
    unit: "3 kg refill",
    currency: "NGN",
    change: 0,
    date: "2026-07-29",
    live: false,
  },
  {
    id: "us",
    region: "United States",
    market: "Henry Hub",
    value: 3.1,
    unit: "USD / MMBtu",
    currency: "USD",
    change: 1.8,
    date: "2026-07-20",
    live: false,
  },
  {
    id: "eu",
    region: "Europe",
    market: "TTF day-ahead",
    value: 32.4,
    unit: "EUR / MWh",
    currency: "EUR",
    change: -0.9,
    date: "2026-07-24",
    live: false,
  },
  {
    id: "asia",
    region: "Asia Pacific",
    market: "LNG import reference",
    value: 11.8,
    unit: "USD / MMBtu",
    currency: "USD",
    change: 2.4,
    date: "2026-07-24",
    live: false,
  },
  {
    id: "uk",
    region: "United Kingdom",
    market: "NBP reference",
    value: 78.2,
    unit: "GBX / therm",
    currency: "GBX",
    change: -1.2,
    date: "2026-07-24",
    live: false,
  },
];

type EnergyApiResponse = {
  success?: boolean;
  date?: string;
  rates?: Record<string, number>;
  dates?: Record<string, string>;
  currencies?: Record<string, string>;
};

function withLiveBenchmarks(data: EnergyApiResponse) {
  const markets = REFERENCE_MARKETS.map((market) => {
    const symbol = market.id === "us" ? "HENRY_HUB" : market.id === "eu" ? "TTF_GAS" : undefined;
    const value = symbol ? data.rates?.[symbol] : undefined;

    return value == null || !symbol
      ? market
      : {
          ...market,
          value,
          currency: data.currencies?.[symbol] ?? market.currency,
          date: data.dates?.[symbol] ?? data.date ?? market.date,
          live: true,
        };
  });

  return markets;
}

export async function GET() {
  const apiKey = process.env.ENERGY_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      markets: REFERENCE_MARKETS,
      source: "reference",
      updatedAt: new Date().toISOString(),
    });
  }

  try {
    const url = new URL("https://energy-api.com/api/v1/latest");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("symbols", SYMBOLS);

    const response = await fetch(url, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error(`Energy API returned ${response.status}`);

    const data = (await response.json()) as EnergyApiResponse;
    return NextResponse.json({
      markets: withLiveBenchmarks(data),
      source: "energy-api",
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({
      markets: REFERENCE_MARKETS,
      source: "reference",
      updatedAt: new Date().toISOString(),
    });
  }
}
