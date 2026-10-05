import { useState } from "react";
import { Globe, MapPin, Phone, Mail } from "lucide-react";
import clsx from "clsx";
import { offices } from "../data/company";

/* The map is a static image (public/map.png) that already shows the
   countries we operate in, highlighted. The list beside it stays
   clickable so each office's address, phone and email can be read
   underneath it. */
const MAP_IMAGE = "/map.png";

// ─── office details panel — empty fields render nothing ──────────────────────
function OfficeDetails({ office }) {
  const rows = [
    { icon: MapPin, value: office.address },
    { icon: Phone,  value: office.phone },
    { icon: Mail,   value: office.email, href: office.email && `mailto:${office.email}` },
  ].filter((r) => r.value);

  return (
    <div className="border border-line bg-white px-4 py-4">
      <p className="type-label text-green">{office.label}</p>
      <p className="card-title mt-1">
        {office.country}
        {office.city && (
          <span className="font-normal normal-case tracking-normal text-fg-muted"> — {office.city}</span>
        )}
      </p>
      {office.entity && <p className="type-small mt-1">{office.entity}</p>}
      {office.function && <p className="type-small mt-2">{office.function}</p>}

      {rows.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
          {rows.map(({ icon: Icon, value, href }) => (
            <li key={value} className="type-small flex items-start gap-2">
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

  const points = offices;
  const active = points.find((p) => p.slug === activeSlug) ?? null;

  return (
    <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,320px)_1fr] md:gap-6">

      {/* ── left: location list, then the selected office's details ───────── */}
      <div className="order-2 flex flex-col gap-4 md:order-1">
        <div className="border border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="type-label">{points.length} locations</p>
            {active && (
              <button
                type="button"
                onClick={() => setActiveSlug(null)}
                className="type-label flex cursor-pointer items-center gap-1.5 text-blue transition-colors duration-200 hover:text-green"
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
                      <span className="type-label block truncate text-ink">{office.country}</span>
                      {office.city && (
                        <span className="type-small block truncate text-fg-subtle">{office.city}</span>
                      )}
                      {office.label && (
                        <span
                          className={clsx(
                            "type-label mt-0.5 block truncate tracking-[0.06em]",
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

        {/* details sit under the list, so the column fills the map's height */}
        {active ? (
          <OfficeDetails office={active} />
        ) : (
          <p className="type-small border border-dashed border-line px-4 py-4 text-center text-fg-subtle">
            Select a location to view office details
          </p>
        )}
      </div>

      {/* ── right: map image ─────────────────────────────────────────────── */}
      <div className="order-1 overflow-hidden border border-line bg-white md:order-2">
        <img
          src={MAP_IMAGE}
          alt={`Premier Fashion operates in ${points.map((p) => p.country).join(", ")}`}
          loading="lazy"
          className="block w-full"
        />
      </div>

    </div>
  );
}