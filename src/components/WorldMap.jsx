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
  usa: { dx: -6, dy: 4, anchor: "middle" },
  canada: { dx: 0, dy: -4, anchor: "middle" },
  "south-africa": { dx: 0, dy: 16, anchor: "middle" },
  uae: { dx: -4, dy: 14, anchor: "middle" },
  nepal: { dx: -14, dy: -10, anchor: "end" },
  india: { dx: -4, dy: 12, anchor: "middle" },
  bangladesh: { dx: 16, dy: -6, anchor: "start" },
  china: { dx: 6, dy: -6, anchor: "middle" },
  "hong-kong": { dx: 14, dy: 16, anchor: "start" },
  vietnam: { dx: 12, dy: 20, anchor: "start" },
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
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,260px)_1fr] md:gap-7">
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

        <ul className="max-h-[280px] overflow-y-auto md:max-h-[400px]">
          {points.map((office) => {
            const isActive = office.slug === activeSlug;
            return (
              <li key={office.slug}>
                <button
                  type="button"
                  onClick={() => setActiveSlug(isActive ? null : office.slug)}
                  aria-pressed={isActive}
                  className={clsx(
                    "flex w-full cursor-pointer items-center gap-3 border-l-2 px-4 py-3 text-left transition-colors duration-200",
                    isActive
                      ? "border-green bg-page"
                      : "border-transparent hover:border-line-strong hover:bg-page"
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
                    <span className="block truncate text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-ink">
                      {office.country}
                    </span>
                    <span className="block truncate text-[0.68rem] text-fg-subtle">
                      {office.label && office.city ? office.city : office.function}
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
        <div className="overflow-hidden border border-line bg-white">
          <svg
            viewBox={WORLD_VIEWBOX}
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

              {/* names */}
              {points.map((office) => {
                const isActive = office.slug === activeSlug;
                const dimmed = active && !isActive;
                const n = LABEL_NUDGE[office.slug] ?? { dx: 0, dy: 4, anchor: "middle" };
                const k = 1 / scale;

                return (
                  <text
                    key={`${office.slug}-label`}
                    x={office.label.x + n.dx * k}
                    y={office.label.y + n.dy * k}
                    textAnchor={n.anchor}
                    className="hidden sm:block"
                    style={{
                      fontSize: `${11.5 * k}px`,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      fill: isActive ? "#1B2A3B" : "#1B2A3B",
                      opacity: dimmed ? 0.3 : 1,
                      paintOrder: "stroke",
                      stroke: "#FFFFFF",
                      strokeWidth: `${2.5 * k}px`,
                      strokeLinejoin: "round",
                      transition: "opacity 0.4s ease",
                      pointerEvents: "none",
                    }}
                  >
                    {office.country}
                  </text>
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