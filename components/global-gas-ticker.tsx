"use client";

import { useEffect, useMemo, useState } from "react";
import type { GasMarket } from "@/app/api/gas-prices/route";

const INITIAL_MARKETS: GasMarket[] = [
  { id: "ng", region: "Nigeria", market: "Suez Gas · local LPG", value: 16000, unit: "3 kg refill", currency: "NGN", change: 0, date: "2026-07-29", live: false },
  { id: "us", region: "United States", market: "Henry Hub", value: 3.1, unit: "USD / MMBtu", currency: "USD", change: 1.8, date: "2026-07-20", live: false },
  { id: "eu", region: "Europe", market: "TTF day-ahead", value: 32.4, unit: "EUR / MWh", currency: "EUR", change: -0.9, date: "2026-07-24", live: false },
  { id: "asia", region: "Asia Pacific", market: "LNG import reference", value: 11.8, unit: "USD / MMBtu", currency: "USD", change: 2.4, date: "2026-07-24", live: false },
  { id: "uk", region: "United Kingdom", market: "NBP reference", value: 78.2, unit: "GBX / therm", currency: "GBX", change: -1.2, date: "2026-07-24", live: false },
];

function formatPrice(market: GasMarket) {
  if (market.currency === "NGN") return `₦${market.value.toLocaleString("en-NG")}`;
  return `${market.currency} ${market.value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

export function GlobalGasTicker() {
  const [markets, setMarkets] = useState(INITIAL_MARKETS);
  const [source, setSource] = useState<"reference" | "energy-api">("reference");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let active = true;

    const loadMarkets = async () => {
      try {
        const response = await fetch("/api/gas-prices", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as { markets: GasMarket[]; source: "reference" | "energy-api" };
        if (active && data.markets?.length) {
          setMarkets(data.markets);
          setSource(data.source);
        }
      } catch {
        // The reference rail remains visible if the browser is offline.
      }
    };

    loadMarkets();
    const interval = window.setInterval(loadMarkets, 5 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const rail = useMemo(() => [...markets, ...markets], [markets]);

  return (
    <section className="on-ink gas-market-section" aria-labelledby="global-market-title">
      <div className="measure relative">
        <div className="flex flex-col gap-6 border-b border-ink-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="eyebrow">Global market watch</div>
            <h2 id="global-market-title" className="mt-5 max-w-2xl text-display-m">
              A moving read on the world&rsquo;s gas markets.
            </h2>
          </div>
          <div className="flex items-center gap-5 text-[0.6875rem] uppercase tracking-[0.08em] text-fg-ink-muted">
            <span className="flex items-center gap-2" aria-live="polite">
              <span className={`gas-live-dot ${source === "energy-api" ? "gas-live-dot-active" : ""}`} />
              {source === "energy-api" ? "Live API" : "Reference feed"}
            </span>
            <button
              type="button"
              className="gas-ticker-control"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? "Resume market ticker" : "Pause market ticker"}
              aria-pressed={paused}
            >
              {paused ? "Resume" : "Pause"}
            </button>
          </div>
        </div>

        <div className="gas-ticker-viewport" data-paused={paused}>
          <div className="gas-ticker-track" role="list" aria-label="Global gas market prices">
            {rail.map((market, index) => (
              <article
                className="gas-market-item"
                key={`${market.id}-${index}`}
                role="listitem"
                aria-hidden={index >= markets.length}
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">{market.region}</div>
                    <h3 className="mt-3 text-[1.2rem] leading-tight">{market.market}</h3>
                  </div>
                  <span className="gas-market-index">{String((index % markets.length) + 1).padStart(2, "0")}</span>
                </div>
                <div className="mt-10 flex items-end justify-between gap-4">
                  <div>
                    <div className="font-mono text-[1.45rem] tabular-nums text-flame">{formatPrice(market)}</div>
                    <div className="mt-1 text-[0.6875rem] uppercase tracking-[0.08em] text-fg-ink-muted">{market.unit}</div>
                  </div>
                  <span className={`font-mono text-xs tabular-nums ${market.change > 0 ? "text-flame-lit" : market.change < 0 ? "text-burn-lit" : "text-fg-ink-muted"}`}>
                    {market.change > 0 ? "+" : ""}{market.change.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-ink-line pt-3 text-[0.625rem] uppercase tracking-[0.075em] text-fg-ink-muted">
                  <span>{market.live ? "Verified source" : "Reference only"}</span>
                  <time dateTime={market.date}>{formatDate(market.date)}</time>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-[0.6875rem] uppercase leading-relaxed tracking-[0.075em] text-fg-ink-muted">
          Benchmarks are not like-for-like household refill prices. They are shown in each market&rsquo;s published unit; Suez Gas confirms your local LPG price per cylinder before delivery.
        </p>
      </div>
    </section>
  );
}
