import { useState, useRef, useEffect } from "react";
import { Globe, MapPin, Phone, Mail } from "lucide-react";
import clsx from "clsx";
import { offices } from "../data/company";
import { BASE_PATH, countryShapes, countryLabels } from "../data/worldMap";

// ─── zoom boxes [x, y, w, h] ─────────────────────────────────────────────────
const ZOOM_BOXES = {
  canada:         [0,    -3,  340, 200],
  usa:            [0,    60,  340, 200],
  "south-africa": [430, 270,  260, 158],
  china:          [620,  60,  250, 160],
  uae:            [500, 130,  200, 130],
  nepal:          [560, 120,  200, 130],
  india:          [540, 120,  220, 160],
  bangladesh:     [600, 130,  200, 130],
  "hong-kong":    [640, 130,  200, 130],
  vietnam:        [660, 140,  200, 140],
};

const DEFAULT_VB = [0, -3, 1000, 425];

// ─── label nudges — offset text from centroid ─────────────────────────────────
const LABEL_NUDGE = {
  canada:         { dx:  0,  dy: -4,  anchor: "middle" },
  usa:            { dx: -6,  dy:  4,  anchor: "middle" },
  "south-africa": { dx:  0,  dy: 16,  anchor: "middle" },
  china:          { dx:  6,  dy: -6,  anchor: "middle" },
  uae:            { dx: -4,  dy: 14,  anchor: "middle" },
  nepal:          { dx:-14,  dy:-10,  anchor: "end"    },
  india:          { dx: -4,  dy: 12,  anchor: "middle" },
  bangladesh:     { dx: 16,  dy: -6,  anchor: "start"  },
  "hong-kong":    { dx: 14,  dy: 16,  anchor: "start"  },
  vietnam:        { dx: 12,  dy: 20,  anchor: "start"  },
};

// ─── animation ────────────────────────────────────────────────────────────────
const ANIM_MS = 500;
function lerp(a, b, t) { return a + (b - a) * t; }
function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

function useAnimatedViewBox(slug) {
  const target   = slug ? ZOOM_BOXES[slug] : DEFAULT_VB;
  const fromRef  = useRef(DEFAULT_VB);
  const [cur, setCur] = useState(DEFAULT_VB);
  const startRef = useRef(null);
  const rafRef   = useRef(null);

  useEffect(() => {
    fromRef.current  = cur;
    startRef.current = null;
    cancelAnimationFrame(rafRef.current);
    function step(ts) {
      if (!startRef.current) startRef.current = ts;
      const t    = Math.min((ts - startRef.current) / ANIM_MS, 1);
      const e    = easeInOut(t);
      const next = fromRef.current.map((v, i) => lerp(v, target[i], e));
      setCur(next);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return cur.join(" ");
}

// ─── office details panel — empty fields render nothing ──────────────────────
function OfficeDetails({ office }) {
  const rows = [
    { icon: MapPin, value: office.address },
    { icon: Phone,  value: office.phone },
    { icon: Mail,   value: office.email, href: office.email && `mailto:${office.email}` },
  ].filter((r) => r.value);

  return (
    <div className="border border-line bg-white px-5 py-4">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-green">
        {office.label}
      </p>
      <p className="mt-1 text-[0.85rem] font-semibold uppercase tracking-[0.04em] text-ink">
        {office.country}
        {office.city && (
          <span className="font-normal normal-case text-fg-muted"> — {office.city}</span>
        )}
      </p>
      {office.entity && (
        <p className="mt-1 text-[0.74rem] text-fg-muted">{office.entity}</p>
      )}
      {office.function && (
        <p className="mt-2 text-[0.74rem] leading-[1.7] text-fg-muted">{office.function}</p>
      )}

      {rows.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
          {rows.map(({ icon: Icon, value, href }) => (
            <li key={value} className="flex items-start gap-2 text-[0.74rem] leading-[1.6] text-fg-muted">
              <Icon size={13} strokeWidth={2} className="mt-[3px] shrink-0 text-blue" />
              {href ? (
                <a href={href} className="transition-colors hover:text-blue">{value}</a>
              ) : (
                <span>{value}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── component ────────────────────────────────────────────────────────────────
export default function WorldMap() {
  const [activeSlug, setActiveSlug] = useState(null);
  const animatedVB = useAnimatedViewBox(activeSlug);

  const points = offices.filter((o) => countryLabels[o.slug]);
  const active = points.find((p) => p.slug === activeSlug) ?? null;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,300px)_1fr] md:gap-7">

      {/* ── location list ──────────────────────────────────────────────────── */}
      <div className="order-2 self-start border border-line bg-white md:order-1">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
            {points.length} locations
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
                    "flex h-full w-full cursor-pointer items-start gap-2.5 border-l-2 px-3 py-2.5 text-left transition-colors duration-200",
                    isActive
                      ? "border-l-green bg-page"
                      : "border-l-transparent hover:border-l-line-strong hover:bg-page"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200",
                      isActive ? "bg-green" : "bg-blue"
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[0.72rem] font-semibold uppercase tracking-[0.03em] text-ink">
                      {office.country}
                    </span>
                    {office.city && (
                      <span className="block truncate text-[0.62rem] text-fg-subtle">
                        {office.city}
                      </span>
                    )}
                    {office.label && (
                      <span
                        className={clsx(
                          "mt-0.5 block truncate text-[0.58rem] font-medium uppercase tracking-[0.06em]",
                          isActive ? "text-green" : "text-blue"
                        )}
                      >
                        {office.label}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── map ────────────────────────────────────────────────────────────── */}
      <div className="order-1 md:order-2">
        <div className="overflow-hidden border border-line bg-[#EEF3F6]">
          <div style={{ position: "relative", paddingBottom: "42.5%", width: "100%" }}>
            <svg
              viewBox={animatedVB}
              preserveAspectRatio="xMidYMid meet"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
              {/* world background */}
              <path d={BASE_PATH} fill="#D8E2E8" stroke="#fff" strokeWidth={0.4} />

              {/* office country fills */}
              {points.map(({ slug }) => {
                const d        = countryShapes[slug];
                const isActive = slug === activeSlug;
                const dimmed   = active && !isActive;
                if (!d) return null;
                return (
                  <path
                    key={slug}
                    d={d}
                    fill={isActive ? "#7CB715" : "#0B73B5"}
                    stroke="#fff"
                    strokeWidth={0.4}
                    opacity={dimmed ? 0.3 : 1}
                    onClick={() => setActiveSlug(isActive ? null : slug)}
                    style={{ cursor: "pointer", transition: "fill 0.3s, opacity 0.3s" }}
                  />
                );
              })}

              {/* country names — on phones only the selected country's name shows */}
              {points.map((office) => {
                const lbl      = countryLabels[office.slug];
                const nudge    = LABEL_NUDGE[office.slug] ?? { dx: 0, dy: 4, anchor: "middle" };
                const isActive = office.slug === activeSlug;
                const dimmed   = active && !isActive;
                if (!lbl) return null;

                return (
                  <text
                    key={office.slug}
                    x={lbl.x + nudge.dx}
                    y={lbl.y + nudge.dy}
                    textAnchor={nudge.anchor}
                    fontSize={7}
                    fontFamily="Poppins, sans-serif"
                    fontWeight={700}
                    fill="#1B2A3B"
                    stroke="#fff"
                    strokeWidth={2}
                    paintOrder="stroke"
                    opacity={dimmed ? 0.25 : 1}
                    onClick={() => setActiveSlug(isActive ? null : office.slug)}
                    className={isActive ? "" : "hidden md:block"}
                    style={{
                      userSelect: "none",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "opacity 0.3s",
                    }}
                  >
                    {office.country}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        <p className="mt-2 text-right text-[0.58rem] text-fg-subtle">
          <a
            href="https://www.naturalearthdata.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-200 hover:text-blue"
          >
            © Natural Earth — Indian Worldview
          </a>
        </p>

        {/* selected office details */}
        <div className="mt-3">
          {active ? (
            <OfficeDetails office={active} />
          ) : (
            <p className="py-2 text-center text-[0.74rem] text-fg-subtle">
              Select a location to view office details
            </p>
          )}
        </div>
      </div>

    </div>
  );
}