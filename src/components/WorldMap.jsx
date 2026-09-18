import { useState } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import clsx from "clsx";
import { WORLD_PATH, WORLD_VIEWBOX, officePoints } from "../data/worldMap";
import { offices } from "../data/company";
import { EASE } from "../lib/motion";

const VB_W = 1000;
const VB_H = 500;
const ZOOM = 2.3;
const EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Label placement, tuned per office. India, Nepal and Bangladesh sit
 * within ~10px of each other at world scale, so their labels fan out
 * instead of stacking.
 */
const LABELS = {
  canada: { anchor: "end", dx: -14, dy: 4 },
  usa: { anchor: "end", dx: -14, dy: 4 },
  "south-africa": { anchor: "start", dx: 14, dy: 4 },
  uae: { anchor: "end", dx: -14, dy: 3 },
  nepal: { anchor: "end", dx: -14, dy: -11 },
  india: { anchor: "end", dx: -14, dy: 13 },
  bangladesh: { anchor: "start", dx: 14, dy: -10 },
  china: { anchor: "start", dx: 14, dy: -5 },
  "hong-kong": { anchor: "start", dx: 15, dy: 14 },
  vietnam: { anchor: "start", dx: 14, dy: 15 },
};

export default function WorldMap() {
  const [activeSlug, setActiveSlug] = useState(null);

  const points = offices
    .map((office) => ({ ...office, point: officePoints[office.slug] }))
    .filter((office) => office.point);

  const active = points.find((p) => p.slug === activeSlug) ?? null;
  const scale = active ? ZOOM : 1;

  // Plain CSS transform on the <g>. framer-motion's originX/originY
  // resolve against the element's bounding box rather than the viewBox,
  // which is why the transform has to be set directly here.
  const tx = active ? VB_W / 2 - active.point.x * scale : 0;
  const ty = active ? VB_H / 2 - active.point.y * scale : 0;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,260px)_1fr] md:gap-7">
      {/* ---- location list ---- */}
      <div className="order-2 border border-line bg-white md:order-1">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
            {points.length} locations
          </p>
          {active && (
            <button
              type="button"
              onClick={() => setActiveSlug(null)}
              className="flex items-center gap-1.5 text-[0.66rem] font-medium uppercase tracking-[0.08em] text-blue transition-colors duration-200 hover:text-green"
            >
              <Globe size={12} strokeWidth={2.2} />
              View all
            </button>
          )}
        </div>

        <ul className="max-h-[260px] overflow-y-auto sm:max-h-[320px] md:max-h-[400px]">
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
                      {office.label}
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
            aria-label={`Premier Fashion locations in ${points
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
              <path d={WORLD_PATH} fill="#DDE7ED" stroke="#FFFFFF" strokeWidth="0.6" />

              {points.map((office, i) => {
                const isActive = office.slug === activeSlug;
                const dimmed = active && !isActive;
                const { x, y } = office.point;
                const label = LABELS[office.slug] ?? { anchor: "start", dx: 13, dy: 4 };

                // counter-scale so markers and labels stay the same
                // visual size while the map zooms beneath them
                const k = 1 / scale;

                return (
                  <motion.g
                    key={office.slug}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: EASE }}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveSlug(isActive ? null : office.slug)}
                  >
                    <circle cx={x} cy={y} r={16 * k} fill="transparent" />

                    {isActive && (
                      <circle cx={x} cy={y} r={11 * k} fill="#7CB715" opacity="0.2" />
                    )}

                    <circle
                      cx={x}
                      cy={y}
                      r={(isActive ? 6 : 4.5) * k}
                      fill={isActive ? "#7CB715" : "#0B73B5"}
                      stroke="#FFFFFF"
                      strokeWidth={2 * k}
                      opacity={dimmed ? 0.35 : 1}
                      style={{ transition: `all 0.8s ${EASE_CSS}` }}
                    />

                    <text
                      x={x + label.dx * k}
                      y={y + label.dy * k}
                      textAnchor={label.anchor}
                      className="hidden sm:block"
                      style={{
                        fontSize: `${14 * k}px`,
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        fill: isActive ? "#7CB715" : "#1B2A3B",
                        opacity: dimmed ? 0.25 : 1,
                        transition: `all 0.8s ${EASE_CSS}`,
                        pointerEvents: "none",
                      }}
                    >
                      {office.country}
                    </text>
                  </motion.g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* detail line — fixed height so nothing shifts */}
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