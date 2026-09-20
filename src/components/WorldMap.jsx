const TILE_URL = "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png";import { useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import { Globe } from "lucide-react";
import clsx from "clsx";
import "leaflet/dist/leaflet.css";
import { offices } from "../data/company";

/**
 * Real map tiles via Leaflet, so it pans, zooms and reads like a map
 * rather than an illustration. Markers are plain circles — no image
 * pins — which avoids Leaflet's default icon-path problem in Vite.
 *
 * NOTE ON TILES: CARTO's basemap renders the India–Pakistan and
 * India–China boundaries as disputed. If the site must show the
 * Indian view of Jammu & Kashmir, swap TILE_URL for a provider with
 * an Indian worldview, or go back to the SVG map, which was built
 * from Natural Earth's Indian-worldview boundaries.
 */
const TILE_ATTRIBUTION =
  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Office coordinates, latitude then longitude.
const COORDS = {
  vietnam: [10.82, 106.63],
  china: [30.0, 120.58],
  "hong-kong": [22.32, 114.17],
  india: [22.57, 88.36],
  usa: [40.71, -74.01],
  bangladesh: [23.81, 90.41],
  nepal: [26.45, 87.28],
  "south-africa": [-26.2, 28.05],
  canada: [49.28, -123.12],
  uae: [25.2, 55.27],
};

const WORLD_CENTER = [22, 30];
const WORLD_ZOOM = 1;

/** Flies the map to whichever office is selected. */
function MapController({ target }) {
  const map = useMap();

  if (target) {
    map.flyTo(COORDS[target], 4, { duration: 1.1 });
  } else {
    map.flyTo(WORLD_CENTER, WORLD_ZOOM, { duration: 1.1 });
  }

  return null;
}

export default function WorldMap() {
  const [activeSlug, setActiveSlug] = useState(null);

  const points = useMemo(
    () => offices.filter((office) => COORDS[office.slug]),
    []
  );

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,300px)_1fr] md:gap-7">
      {/* ---- location list ---- */}
      <div className="order-2 self-start border border-line bg-white md:order-1">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
            {points.length} locations
          </p>
          {activeSlug && (
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
        <div className="overflow-hidden border border-line">
          <MapContainer
            center={WORLD_CENTER}
            zoom={WORLD_ZOOM}
            minZoom={1}
            maxZoom={6}
            scrollWheelZoom={false}
            worldCopyJump
            attributionControl={false}
            className="h-[300px] w-full md:h-[420px]"
          >
            <TileLayer url={TILE_URL} />
            <MapController target={activeSlug} />

            {points.map((office) => {
              const isActive = office.slug === activeSlug;
              return (
                <CircleMarker
                  key={office.slug}
                  center={COORDS[office.slug]}
                  radius={isActive ? 9 : 6}
                  pathOptions={{
                    color: "#FFFFFF",
                    weight: 2,
                    fillColor: isActive ? "#7CB715" : "#0B73B5",
                    fillOpacity: 1,
                  }}
                  eventHandlers={{
                    click: () => setActiveSlug(isActive ? null : office.slug),
                  }}
                >
                  {/* permanent label, so every office reads as a name
                      rather than an anonymous dot */}
                  <Tooltip
                    permanent
                    direction="right"
                    offset={[8, 0]}
                    opacity={1}
                    className="pf-map-label"
                  >
                    {office.country}
                  </Tooltip>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>

        <p className="mt-2 text-right text-[0.58rem] text-fg-subtle">
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-200 hover:text-blue"
          >
            © OpenStreetMap contributors
          </a>
        </p>

        <div className="mt-2 flex min-h-[2.5rem] items-start justify-center px-4 text-center">
          {activeSlug ? (
            <div>
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.05em] text-ink">
                {points.find((p) => p.slug === activeSlug)?.country}
                {points.find((p) => p.slug === activeSlug)?.city && (
                  <span className="font-normal normal-case text-fg-muted">
                    {" "}
                    — {points.find((p) => p.slug === activeSlug)?.city}
                  </span>
                )}
              </p>
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