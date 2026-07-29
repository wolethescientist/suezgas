/**
 * Texture layer. Shares the contour + grain engineering with SuezElectric, but the
 * focal artefact is different: a burner ring instead of a banknote guilloche.
 * Electricity is a financial instrument; gas is a physical appliance.
 *
 * All deterministic maths, all server-rendered. No images.
 */

function contourPath(
  radius: number,
  wobble: number,
  phase: number,
  squash: number,
  steps = 132,
) {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r =
      radius +
      Math.sin(t * 3 + phase) * wobble +
      Math.sin(t * 5 - phase * 1.7) * wobble * 0.42 +
      Math.sin(t * 2 + phase * 0.6) * wobble * 0.7;
    pts.push(
      `${(600 + Math.cos(t) * r).toFixed(1)} ${(500 + Math.sin(t) * r * squash).toFixed(1)}`,
    );
  }
  return `M${pts.join("L")}Z`;
}

export function Contours({
  origin = { x: 62, y: 38 },
  rings = 28,
  className = "",
  tone = "bone",
  opacity = 1,
}: {
  origin?: { x: number; y: number };
  rings?: number;
  className?: string;
  tone?: "bone" | "ink";
  opacity?: number;
}) {
  const stroke = tone === "bone" ? "#bdb19a" : "#4a525c";
  const paths = Array.from({ length: rings }, (_, i) => {
    const k = i / rings;
    return {
      d: contourPath(70 + i * 34, 16 + i * 3.4, i * 0.42, 0.66 + k * 0.16),
      o: (0.95 - k * 0.7) * opacity,
      w: i % 6 === 0 ? 1.6 : 0.9,
    };
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Centring lives on the wrapper; the drift animation owns transform on the svg. */}
      <div
        className="absolute h-[165%] w-[165%] max-w-none"
        style={{
          left: `${origin.x}%`,
          top: `${origin.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg
          className="contour-drift h-full w-full"
          viewBox="0 0 1200 1000"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {paths.map((p, i) => (
            <path
              key={i}
              d={p.d}
              stroke={stroke}
              strokeWidth={p.w}
              strokeOpacity={p.o}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

/**
 * Burner ring — the port pattern of a gas hob, drawn as engineering linework.
 * Concentric rings, radial jet ports, and a fine outer scale. This is the motif
 * that makes the gas site recognisable at a glance.
 */
export function Burner({
  className = "",
  stroke = "#8a4408",
  strokeOpacity = 0.5,
  ports = 48,
}: {
  className?: string;
  stroke?: string;
  strokeOpacity?: number;
  ports?: number;
}) {
  const C = 220;
  const jets = Array.from({ length: ports }, (_, i) => {
    const t = (i / ports) * Math.PI * 2;
    const inner = 118;
    const outer = i % 4 === 0 ? 150 : 136; // every 4th port reads as a major graduation
    return {
      x1: C + Math.cos(t) * inner,
      y1: C + Math.sin(t) * inner,
      x2: C + Math.cos(t) * outer,
      y2: C + Math.sin(t) * outer,
      major: i % 4 === 0,
    };
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 440 440"
      fill="none"
      className={className}
    >
      <g className="burner-spin" style={{ transformOrigin: "220px 220px" }}>
        {jets.map((j, i) => (
          <line
            key={i}
            x1={j.x1}
            y1={j.y1}
            x2={j.x2}
            y2={j.y2}
            stroke={stroke}
            strokeOpacity={strokeOpacity * (j.major ? 1 : 0.55)}
            strokeWidth={j.major ? 1.4 : 0.8}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      {[54, 78, 100, 118, 150, 176, 200].map((r, i) => (
        <circle
          key={r}
          cx={C}
          cy={C}
          r={r}
          stroke={stroke}
          strokeOpacity={strokeOpacity * (i === 3 || i === 4 ? 0.9 : 0.4)}
          strokeWidth={i === 3 || i === 4 ? 1.4 : 0.8}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {/* The flame droplet at the centre, echoing the logo mark */}
      <path
        d="M220 150c22 30 34 47 34 66a34 34 0 0 1-68 0c0-19 12-36 34-66z"
        stroke={stroke}
        strokeOpacity={strokeOpacity * 1.1}
        strokeWidth={1.4}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Fixed film grain. On a bone canvas this multiplies rather than overlays. */
export function Grain() {
  return (
    <svg aria-hidden="true" className="grain" width="100%" height="100%">
      <filter id="suezgas-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves={3}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#suezgas-grain)" />
    </svg>
  );
}
