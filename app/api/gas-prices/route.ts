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

const FREE_SERIES = [
  { id: "us", region: "United States", market: "Henry Hub", series: "DHHNGSP", unit: "USD / MMBtu" },
  { id: "eu", region: "Europe", market: "EU natural gas", series: "PNGASEUUSDM", unit: "USD / MMBtu" },
  { id: "asia", region: "Asia Pacific", market: "Asia LNG", series: "PNGASJPUSDM", unit: "USD / MMBtu" },
] as const;

type FredPoint = { date: string; value: number };

async function readFredSeries(series: string): Promise<FredPoint[]> {
  const response = await fetch(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${series}`, {
    next: { revalidate: 1800 },
  });
  if (!response.ok) throw new Error(`FRED returned ${response.status}`);

  const csv = await response.text();
  return csv
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [date, rawValue] = line.split(",");
      return { date, value: Number(rawValue) };
    })
    .filter((point) => point.date && Number.isFinite(point.value));
}

export async function GET() {
  try {
    const liveMarkets = await Promise.all(
      FREE_SERIES.map(async (market) => {
        const points = await readFredSeries(market.series);
        const latest = points.at(-1);
        const previous = points.at(-2);
        if (!latest) throw new Error(`No data for ${market.series}`);

        return {
          id: market.id,
          region: market.region,
          market: market.market,
          value: latest.value,
          unit: market.unit,
          currency: "USD",
          change: previous ? ((latest.value - previous.value) / previous.value) * 100 : 0,
          date: latest.date,
          live: true,
        } satisfies GasMarket;
      }),
    );

    return NextResponse.json({
      markets: [REFERENCE_MARKETS[0], ...liveMarkets, REFERENCE_MARKETS[1]],
      source: "free-api",
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({
      markets: [REFERENCE_MARKETS[0], ...REFERENCE_MARKETS.slice(1)],
      source: "reference",
      updatedAt: new Date().toISOString(),
    });
  }
}
