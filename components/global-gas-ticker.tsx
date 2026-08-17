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

export function GlobalGasTicker() {
  const [markets, setMarkets] = useState(INITIAL_MARKETS);
  const [source, setSource] = useState<"reference" | "free-api">("reference");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let active = true;

    const loadMarkets = async () => {
      try {
        const response = await fetch("/api/gas-prices", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as { markets: GasMarket[]; source: "reference" | "free-api" };
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
    <section className="on-ink market-ticker" aria-label="Global gas market prices">
      <div className="market-ticker-label" aria-live="polite">
        <span className={`gas-live-dot ${source === "free-api" ? "gas-live-dot-active" : ""}`} />
        <span>{source === "free-api" ? "Live markets" : "Market watch"}</span>
      </div>

      <div className="market-ticker-viewport" data-paused={paused}>
        <div className="market-ticker-track" role="list">
          {rail.map((market, index) => (
            <div
              className="market-ticker-item"
              key={`${market.id}-${index}`}
              role="listitem"
              aria-hidden={index >= markets.length}
            >
              <span className="market-ticker-name">{market.market}</span>
              <span className="market-ticker-price">{formatPrice(market)}</span>
              <span className="market-ticker-change" data-direction={market.change < 0 ? "down" : "up"}>
                {market.change > 0 ? "▲" : market.change < 0 ? "▼" : "—"} {Math.abs(market.change).toFixed(2)}%
              </span>
              <span className="market-ticker-divider" aria-hidden="true">|</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="market-ticker-control"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? "Resume market ticker" : "Pause market ticker"}
        aria-pressed={paused}
      >
        {paused ? "Resume" : "Pause"}
      </button>

      <p className="sr-only">
        Benchmarks are not like-for-like household refill prices. They are shown in each market&rsquo;s published unit; Suez Gas confirms your local LPG price per cylinder before delivery.
      </p>
    </section>
  );
}
