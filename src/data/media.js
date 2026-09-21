// ============================================================
// MEDIA REGISTRY
// Every image path in the site lives here. Components import from
// this file and never write a path themselves.
//
// Empty string = no image yet. Components fall back gracefully
// (page headers show solid Premier Blue, image blocks show a
// marked placeholder), so nothing breaks before the photos arrive.
//
// Files go in public/, so "/hero/home.jpg" means
// public/hero/home.jpg. Lowercase, hyphens, no spaces.
//
// When we convert a component that needs an image, we add its key
// here first, then the component reads it.
//
// LATER, FOR SANITY: this file becomes a fetch plus urlFor() and
// the components stay untouched.
// ============================================================

/* ---------- PAGE HEADERS ----------
   Landscape, at least 1600×1000, under ~400 KB.
   A flat 58% dark overlay sits on top, so mid-tone images with
   space on the left work best — that is where the text sits. */
export const heroes = {
  home: "/hero/home.png",
  about: "/hero/about.png",
  productsServices: "/hero/products-services.png",
  services: "",   // "/hero/services.jpg"
  clients: "/hero/clients.png",
  careers: "",    // "/hero/careers.jpg"
  contact: "/hero/contact.png",
};

/* ---------- PRODUCT CATEGORIES ----------
   Portrait, 4:5, at least 1000×1250.
   Added as we convert Products.jsx. */
export const products = {
  "mens-wear": "/products/mens-wear.png",
  "womens-wear": "/products/womens-wear.png",
  "kids-wear": "/products/kids-wear.png",
  caps: "/products/caps.png",
  "product-photography": "",
};

/* ---------- SERVICES ----------
   Landscape, 5:4, at least 1200×960.
   Added as we convert Services.jsx. */
export const services = {
  "design-development": "",
  sampling: "",
  manufacturing: "",
  "fabric-sourcing": "",
};

/* ---------- ABOUT / COMPANY ----------
   Added as we convert About.jsx. */
export const about = {
  overview: "/about/overview.png",   // facility or head office, 5:4
  ceoPortrait: "/about/ceo.png",        // desktop cut-out, transparent PNG, full length
  designStudio: "/about/design-studio.png",
  chinaSourcing: "/about/china-sourcing.png",
};

/* ---------- CAREERS ---------- */
export const careers = {
  lifeAtPfg: "",     // 5:4
};

/* ---------- CLIENT LOGOS ----------
   PNG or SVG with transparent background, roughly 300×200,
   trimmed tight. Name each entry with the real client name once
   supplied — do not invent names.
   [{ name: "Client name", logo: "/clients/name.png" }] */
/* ---------- CLIENT LOGOS ----------
   Replace each "Client" with the real brand name once known — it becomes
   the alt text and what buyers and search engines actually read. */
export const clientLogos = [
  { name: "Client", logo: "/pptclients/pptclient (1).png" },
  { name: "Client", logo: "/pptclients/pptclient (2).png" },
  { name: "Client", logo: "/pptclients/pptclient (3).png" },
  { name: "Client", logo: "/pptclients/pptclient (4).png" },
  { name: "Client", logo: "/pptclients/pptclient (5).png" },
  { name: "Client", logo: "/pptclients/pptclient (6).png" },
  { name: "Client", logo: "/pptclients/pptclient (7).png" },
  { name: "Client", logo: "/pptclients/pptclient (8).png" },
  { name: "Client", logo: "/pptclients/pptclient (9).png" },
  { name: "Client", logo: "/pptclients/pptclient (10).png" },
  { name: "Client", logo: "/pptclients/pptclient (11).png" },
  { name: "Client", logo: "/pptclients/pptclient (13).png" },
  { name: "Client", logo: "/pptclients/pptclient (14).png" },
  { name: "Client", logo: "/pptclients/pptclient (15).png" },
  { name: "Client", logo: "/pptclients/pptclient (16).png" },
  { name: "Client", logo: "/pptclients/pptclient (17).png" },
  { name: "Client", logo: "/pptclients/pptclient (18).png" },
  { name: "Client", logo: "/pptclients/pptclient (19).png" },
  { name: "Client", logo: "/pptclients/pptclient (20).png" },
  { name: "Client", logo: "/pptclients/pptclient (21).png" },
  { name: "Client", logo: "/pptclients/pptclient (22).png" },
  { name: "Client", logo: "/pptclients/pptclient (23).png" },
  { name: "Client", logo: "/pptclients/pptclient (24).png" },
  { name: "Client", logo: "/pptclients/pptclient (25).png" },
  { name: "Client", logo: "/pptclients/pptclient (26).png" },
  { name: "Client", logo: "/pptclients/pptclient (27).png" },
  { name: "Client", logo: "/pptclients/pptclient (28).png" },
  { name: "Client", logo: "/pptclients/pptclient (29).png" },
  { name: "Client", logo: "/pptclients/pptclient (30).png" },
  { name: "Client", logo: "/pptclients/pptclient (31).png" },
  { name: "Client", logo: "/pptclients/pptclient (32).png" },
  { name: "Client", logo: "/pptclients/pptclient (33).png" },
  { name: "Client", logo: "/pptclients/pptclient (34).png" },
];

/* ---------- HELPER ----------
   Returns true when a path is actually set, so components can pick
   between the real image and their placeholder state. */


/* ---------- PROCESS STEPS ----------
   Portrait 3:4, at least 600x800. Files in public/process/.
   Keys must match the `slug` of each entry in company.js processSteps. */
export const processImages = {
  design: "/process/design.png",
  sourcing: "/process/sourcing.png",
  sampling: "/process/sampling.png",
  manufacturing: "/process/manufacturing.png",
  quality: "/process/quality.png",
  logistics: "/process/logistics.png",
};

/* ---------- PRODUCTION ----------
   Portrait or landscape, at least 1200x1000. File in public/. */
export const productionImage = "/production.png";

export const hasMedia = (path) => typeof path === "string" && path.length > 0;

/* ---------- BRAND PARTNERS (About page) ----------
   Files in public/brands/. Update the names as confirmed —
   they become the alt text. */
export const brands = [
  { name: "Lexi Morgan", logo: "/brands/brand-01.png" },
  { name: "Brand partner", logo: "/brands/brand-02.png" },
  { name: "Qube", logo: "/brands/brand-03.png" },
  { name: "Premier Sport", logo: "/brands/brand-04.png" },
  { name: "Premier Life", logo: "/brands/brand-05.png" },
  { name: "Brand partner", logo: "/brands/brand-06.png" },
];

/* ---------- CATEGORY TILES ----------
   Portrait 4:5, at least 800×1000. Files in public/categories/. */
export const categoryImages = {
  "mens-active-sports": "/categories/mens-active-sports.png",
  "mens-golf":          "/categories/mens-golf.png",
  "womens-active":      "/categories/womens-active.png",
  "womens-fashion":     "/categories/womens-fashion.png",
  "school-uniforms":    "/categories/school-uniforms.png",
  "office-uniforms":    "/categories/office-uniforms.png",
  "medical-scrubs":     "/categories/medical-scrubs.png",
  "work-wear-safety":   "/categories/work-wear-safety.png",
  "bags":               "/categories/bags.png",
};

export const categoryProducts = {
  "mens-active-sports": [],
  "mens-golf":          [],
  "womens-active":      [],
  "womens-fashion":     [],
  "school-uniforms":    [],
  "office-uniforms":    [],
  "medical-scrubs":     [],
  "work-wear-safety":   [],
  "bags":               [],
};

export const teamPhotos = {
  jamaluddin: "/team/jamaluddin.png",
  "farhan-raza": "/team/raza-farhan.webp",
  "abdul-ahad": "/team/abdul-ahad.webp",
  "chu-dao-linh-suong": "/team/chu-dao-linh-suong.png",
  "kadiravelu-saravana-kumar": "/team/kadiravelu-saravana-kumar.png",
  "ketan-patel": "/team/ketan-patel.png",
  "hussnain-ghafoor": "/team/hussnain-ghafoor.png",
  "grace-nguyen": "/team/grace-nguyen.png",
  "prashant-khandalkar": "/team/prashant-khandalkar.png",
  "mari-payes-micheal-pius-angolo": "/team/mari-payes-micheal-pius-angolo.png",
  sarah: "/team/sarah.png",
};

/* ---------- OFFICE PHOTOS ----------
   Portrait 3:4, at least 600×800. Files in public/offices/. */
export const officePhotos = {
  vietnam: "",
  china: "",
  "hong-kong": "",
  india: "",
  usa: "",
};