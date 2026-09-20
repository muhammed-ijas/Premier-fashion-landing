import { useState } from "react";
import { Globe } from "lucide-react";
import clsx from "clsx";
import {
  BASE_PATH,
  WORLD_VIEWBOX,
  countryShapes,
  countryLabels,
} from "../data/worldMap";
import { offices } from "../data/company";

const VB_W = 1000;
const VB_H = 500;
const ZOOM = 2.3;
const EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Hong Kong has no separate shape at this scale, so it shares China's.
 * Label nudges keep names off their neighbours where countries cluster.
 */
const SHAPE_FOR = { "hong-kong": "china" };

const LABEL_NUDGE = {
  usa: { dx: -8, dy: 5, anchor: "middle" },
  canada: { dx: 0, dy: -7, anchor: "middle" },
  "south-africa": { dx: 0, dy: 18, anchor: "middle" },
  china: { dx: 4, dy: -9, anchor: "middle" },
  india: { dx: -2, dy: 19, anchor: "middle" },
  // South Asia is dense: these four sit off their country on a leader line
  nepal: { dx: -20, dy: -15, anchor: "end", leader: true },
  bangladesh: { dx: 24, dy: -7, anchor: "start", leader: true },
  uae: { dx: -16, dy: 1, anchor: "end", leader: true },
  "hong-kong": { dx: 20, dy: 13, anchor: "start", leader: true },
  vietnam: { dx: 16, dy: 20, anchor: "start", leader: true },
};

export default function WorldMap() {
  const [activeSlug, setActiveSlug] = useState(null);

  const points = offices
    .map((office) => ({ ...office, label: countryLabels[office.slug] }))
    .filter((office) => office.label);

  const active = points.find((p) => p.slug === activeSlug) ?? null;
  const scale = active ? ZOOM : 1;
  const tx = active ? VB_W / 2 - active.label.x * scale : 0;
  const ty = active ? VB_H / 2 - active.label.y * scale : 0;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,300px)_1fr] md:gap-7">
      {/* ---- location list ---- */}
      <div className="order-2 border border-line bg-white md:order-1">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
            {offices.length} locations
          </p>
          {active && (
            <button
              type="button"
              onClick={() => setActiveSlug(null)}
              className="flex cursor-pointer items-center gap-1.5 text-[0.66rem] font-medium uppercase tracking-[0.08em] text-blue transition-colors duration-200 hover:text-green"
            >
              <Globe size={12} strokeWidth={2.2} />
              View all
            </button>
          )}
        </div>

        <ul className="grid grid-cols-2">
          {points.map((office) => {
            const isActive = office.slug === activeSlug;
            return (
              <li key={office.slug} className="border-b border-r border-line">
                <button
                  type="button"
                  onClick={() => setActiveSlug(isActive ? null : office.slug)}
                  aria-pressed={isActive}
                  className={clsx(
                    "flex h-full w-full cursor-pointer items-center gap-2.5 border-l-2 px-3 py-2.5 text-left transition-colors duration-200",
                    isActive
                      ? "border-l-green bg-page"
                      : "border-l-transparent hover:border-l-line-strong hover:bg-page"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200",
                      isActive ? "bg-green" : "bg-blue"
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[0.72rem] font-semibold uppercase tracking-[0.03em] text-ink">
                      {office.country}
                    </span>
                    <span className="block truncate text-[0.62rem] text-fg-subtle">
                      {office.city || office.function}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ---- map ---- */}
      <div className="order-1 md:order-2">
        <div className="overflow-hidden border border-line bg-white p-3 md:p-4">
          <svg
            viewBox={WORLD_VIEWBOX}
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            role="img"
            aria-label={`Premier Fashion operates in ${points
              .map((p) => p.country)
              .join(", ")}`}
          >
            <g
              style={{
                transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
                transformOrigin: "0 0",
                transition: `transform 0.8s ${EASE_CSS}`,
              }}
            >
              {/* everywhere we do not operate */}
              <path d={BASE_PATH} fill="#E4EBF0" stroke="#FFFFFF" strokeWidth="0.5" />

              {/* countries we operate in, filled */}
              {points.map((office) => {
                const shapeKey = SHAPE_FOR[office.slug] ?? office.slug;
                const d = countryShapes[shapeKey];
                if (!d) return null;

                const isActive = office.slug === activeSlug;
                const dimmed = active && !isActive;

                return (
                  <path
                    key={office.slug}
                    d={d}
                    fill={isActive ? "#7CB715" : "#0B73B5"}
                    stroke="#FFFFFF"
                    strokeWidth={0.6 / scale}
                    opacity={dimmed ? 0.35 : 1}
                    style={{
                      cursor: "pointer",
                      transition: `fill 0.4s ease, opacity 0.4s ease`,
                    }}
                    onClick={() => setActiveSlug(isActive ? null : office.slug)}
                  />
                );
              })}

              {/* names, with leader lines where countries are too close
                  to carry a label on top of themselves */}
              {points.map((office) => {
                const isActive = office.slug === activeSlug;
                const dimmed = active && !isActive;
                const n = LABEL_NUDGE[office.slug] ?? { dx: 0, dy: 5, anchor: "middle" };
                const k = 1 / scale;
                const lx = office.label.x + n.dx * k;
                const ly = office.label.y + n.dy * k;

                return (
                  <g key={`${office.slug}-label`} style={{ pointerEvents: "none" }}>
                    {n.leader && (
                      <line
                        x1={office.label.x}
                        y1={office.label.y}
                        x2={lx - (n.anchor === "end" ? -2 : 2) * k}
                        y2={ly - 3 * k}
                        stroke="#1B2A3B"
                        strokeWidth={0.6 * k}
                        opacity={dimmed ? 0.2 : 0.45}
                      />
                    )}

                    <text
                      x={lx}
                      y={ly}
                      textAnchor={n.anchor}
                      className="hidden sm:block"
                      style={{
                        fontSize: `${10.5 * k}px`,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        fill: "#1B2A3B",
                        opacity: dimmed ? 0.3 : 1,
                        paintOrder: "stroke",
                        stroke: "#FFFFFF",
                        strokeWidth: `${2.5 * k}px`,
                        strokeLinejoin: "round",
                        transition: "opacity 0.4s ease",
                      }}
                    >
                      {office.country}
                    </text>
                  </g>
                );
              })}

            </g>
          </svg>
        </div>

        <div className="mt-3 flex min-h-[2.75rem] items-start justify-center px-4 text-center">
          {active ? (
            <div>
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.05em] text-ink">
                {active.country}
                {active.city && (
                  <span className="font-normal normal-case text-fg-muted"> — {active.city}</span>
                )}
              </p>
              {active.established && (
                <p className="mt-1 text-[0.7rem] text-fg-subtle">
                  Established {active.established}
                </p>
              )}
            </div>
          ) : (
            <p className="text-[0.74rem] text-fg-subtle">
              Select a location to view it on the map
            </p>
          )}
        </div>
      </div>
    </div>
  );
}