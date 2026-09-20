// ============================================================
// COMPANY FACTS
// Source: Premier Fashion company profile brochure (2025).
// Where the brochure and the old premierfashionvn.com site
// disagree, the brochure wins. Do not add figures, clients,
// offices or history not stated in the brochure.
//
// OPEN QUESTIONS — marked TODO below, confirm before launch.
// ============================================================

export const company = {
  name: "Premier Fashion",
  legalName: "Premier Fashion Co., Ltd.",
  group: "Premier Group",
  founder: "Mr. Mohammad Jamaluddin",
  founderTitle: "Founder & CEO",
  founded: 2000,
};

export const about = {
  intro:
    "Premier Fashion Co., Ltd. is now a part of Premier Group, established in 2005 with garment manufacturing facilities in Vietnam. It was founded by Mr. Mohammad Jamaluddin, the CEO of the company.",
  today:
    "Today we are a one-stop shop for apparel exports — Men's, Women's and Kids' wear — produced across our facilities in Vietnam, Cambodia, China, India, Pakistan, Bangladesh and Nepal.",
  reach:
    "Our product development, marketing and merchandising offices in the USA, Vietnam, Bangladesh, India and South Africa keep our services available round the clock, with day-to-day answers whenever you need them. Production can be placed across multiple countries to suit your requirements for product category, cost and lead time.",
};

export const highlights = [
  {
    title: "One-stop solution",
    body: "Everything made under one roof, saving you the time, cost and effort of managing multiple suppliers.",
  },
  {
    title: "We make it easy",
    body: "Share your vision and we will bring it to life, so you can focus on building your brand.",
  },
  {
    title: "Guaranteed quality",
    body: "All factories operate under buyer protocol and compliance, with valid certification.",
  },
];

/* ---------------- GROUP FIGURES ---------------- */

export const groupStats = [
  { value: "US$ 85M", label: "Group turnover", note: "FY 2024-25" },
  { value: "12M", label: "Garments annually" },
  { value: "45", label: "Sewing lines in Vietnam" },
  { value: "3,500", label: "Workers" },
];

export const ownDesignShare = "30%";

/* ---------------- SERVICE & SUPPORT ----------------
   Brochure page 8 — the six stages, in order.                    */

export const processSteps = [
  { slug: "design", name: "Design / R&D" },
  { slug: "sourcing", name: "Sourcing / Fabric R&D" },
  { slug: "sampling", name: "Sampling" },
  { slug: "manufacturing", name: "Manufacturing" },
  { slug: "quality", name: "Quality" },
  { slug: "logistics", name: "Logistics" },
];

/* ---------------- PRODUCTION ----------------
   Brochure page 9. Category volumes are stated as approximate.   */

export const production = {
  statement:
    "Our capacity across several countries lets us produce high volumes on short lead times, with a wide range of products across categories.",
  // Annual capacity by category — brochure page 9, stated as approximate.
  volumes: [
    { value: "5.5", label: "Active / Sport Wear" },
    { value: "4.5", label: "Casual Woven / Knitted" },
    { value: "1.5", label: "Work Wear / Outerwear" },
  ],
  volumeUnit: "Million units",
  volumeNote: "Approximate, per year",
  // Brochure page 9.
  leadTimes: [
    { days: "70", basis: "Vertical denim fabric" },
    { days: "90", basis: "Local fabric" },
    { days: "120", basis: "Imported fabric" },
  ],
  // Export markets by share — brochure page 10.
  markets: [
    { name: "USA", share: 74 },
    { name: "Canada", share: 16 },
    { name: "Europe", share: 11 },
    { name: "South Africa", share: 4 },
  ],
};

/* ---------------- PRODUCTS & SERVICES ---------------- */

export const products = [
  { slug: "mens-wear", name: "Men's Wear" },
  { slug: "womens-wear", name: "Women's Wear" },
  { slug: "kids-wear", name: "Kid's Wear" },
  { slug: "caps", name: "Caps" },
];

// Product types produced across the network — brochure page 3.
export const productTypes = [
  "Woven soft separates",
  "Cut & sew knits",
  "Active knits and woven",
  "Woven bottoms",
  "Denim",
  "Seam sealing",
];

export const categories = [
  { slug: "mens-active-sports",      name: "Men's Active & Sports Wear" },
  { slug: "mens-golf",               name: "Men's Golf"                  },
  { slug: "womens-active",           name: "Women's Active Wear"         },
  { slug: "womens-fashion",          name: "Women's Fashion Collection"  },
  { slug: "school-uniforms",         name: "School Uniforms"             },
  { slug: "office-uniforms",         name: "Office Uniforms"             },
  { slug: "medical-scrubs",          name: "Medical Scrubs"              },
  { slug: "work-wear-safety",        name: "Work Wear & Safety"          },
  { slug: "bags",                    name: "Bags"                        },
];

export const services = [
  {
    slug: "design-development",
    name: "Design & Product Development",
    summary:
      "From a sketch on a napkin to a full tech pack — reducing cost while optimising speed to market.",
    items: [
      "Ideation",
      "Concept Building",
      "Design Services",
      "Technical Design",
      "Product Development",
    ],
  },
  {
    slug: "sampling",
    name: "Sampling",
    summary:
      "Turning sketches and tech packs into a physical product you can hold, before anything goes into production.",
    items: ["Pre-Production Sample", "Salesmen Sample", "Top of Production (TOP) Sample"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    summary:
      "State-of-the-art factories with continuous year-on-year investment in garment quality, efficiency and flexibility.",
    items: [],
  },
  {
    slug: "fabric-sourcing",
    name: "Fabric Sourcing",
    summary:
      "A team of specialists sourcing the right fabric for every product, whether standard or highly specific.",
    items: ["Knits", "Woven", "Denim", "Lace", "Synthetics", "Core cotton", "Recycled cotton"],
  },
];

/* ---------------- LOCATIONS ----------------
   One list. `location`, `established` and `photo` are filled only
   for the five offices profiled on brochure page 7; the rest come
   from the global operations map on page 3 and the overview on
   page 5. Empty strings render as nothing, never as a gap.        */

export const offices = [
  {
    slug: "vietnam",
    city: "Ho Chi Minh City",
    country: "Vietnam",
    label: "Head Office",
    // TODO: brochure page 7 says Tan Binh Industrial Zone; the address
    // below (Tay Thanh Ward) is from the old site and is a different
    // district. Confirm which is current.
    location: "Tan Binh Industrial Zone, HCM City",
    established: "2011",
    function:
      "Design & development, garment manufacturing, merchandising, quality control and logistics",
    entity: "Premier Fashion Co., Ltd",
    address: "57-59 S2 Street, Tay Thanh Ward, Ho Chi Minh City, Vietnam. Post code: 700000",
    phone: "+84 28 3815 5217 / 18 / 19",
    email: "info@premierfashionvn.com",
  },
  {
    slug: "china",
    city: "Shaoxing",
    country: "China",
    label: "Sourcing Office",
    location: "Zhejiang, China",
    established: "2010",
    function: "Fabric & trims sourcing, research & development",
    entity: "Premier Exim China Ltd.",
    address:
      "Room 2201-02, Building 1, Zhonghai International Business Center, Huashe Street, Keqiao District, Shaoxing City, Zhejiang Province, China. Post code: 312030",
    phone: "+86 155 5750 0786",
    email: "ahad@premierexim.com",
  },
  {
    slug: "hong-kong",
    city: "Hong Kong",
    country: "Hong Kong",
    label: "Finance Office",
    location: "New Town, Hong Kong",
    established: "2005",
    function: "Finance & strategy",
    entity: "Premier Exim Hong Kong Limited",
    address:
      "Flat L, 6th floor, DAI6, No. 6 Fuiz Yiu Kok Street, Tsuen Wan, NT, Hong Kong. Post code: 999077",
    phone: "+852 3749 9163 / 64",
    email: "mjuddin@premierfashionvn.com",
  },
  {
    slug: "india",
    city: "Kolkata",
    country: "India",
    label: "Marketing & Manufacturing",
    location: "Kolkata, India",
    // TODO: page 7 says established 2023; the journey timeline dates
    // Premier Creative India to 2021. Confirm.
    established: "2023",
    function: "Design & development, garment manufacturing",
    entity: "",
    address: "",
    phone: "",
    email: "",
  },
  {
    slug: "usa",
    city: "New York",
    country: "United States",
    label: "USA Office",
    location: "New York",
    established: "2016",
    function: "Merchandising & marketing",
    entity: "Premier Exim USA — The Concept Shop",
    address: "262 W 38th Street, 9th floor, Suite 906, New York, NY 10018",
    phone: "",
    email: "",
  },
    {
    slug: "bangladesh",
    city: "Dhaka",
    country: "Bangladesh",
    label: "Production Base",
    location: "",
    established: "2012",
    function: "Garment production",
    entity: "",
    address: "",
    phone: "",
    email: "",
  },
  {
    slug: "nepal",
    city: "Biratnagar",
    country: "Nepal",
    label: "Garment Production",
    location: "",
    established: "",
    function: "Garment production",
    entity: "Nepal Apparels Pvt. Ltd.",
    address: "Biratnagar-17, Morang District, Koshi Zone, Biratnagar, Nepal. Post code: 56613",
    phone: "",
    email: "",
  },
  {
    slug: "south-africa",
    city: "Johannesburg",
    country: "South Africa",
    label: "Marketing Office",
    location: "",
    established: "2013",
    function: "Marketing office",
    entity: "Premier Exim PTY",
    address: "PO Box 1221, Crown Mines, Johannesburg, Gauteng. Post code: 2195 CR",
    phone: "",
    email: "",
  },
  {
    slug: "canada",
    city: "Vancouver",
    country: "Canada",
    label: "Marketing Office",
    location: "",
    established: "2025",
    function: "Marketing office",
    entity: "",
    address: "",
    phone: "",
    email: "",
  },
  {
    slug: "uae",
    city: "Dubai",
    country: "United Arab Emirates",
    label: "Finance Office",
    location: "",
    established: "2025",
    function: "Finance office",
    entity: "",
    address: "",
    phone: "",
    email: "",
  },
];

// Named on the brochure map as a sourcing country, with no office.
export const additionalPresence = ["Pakistan"];

/* ---------------- COUNTRY CAPABILITIES ----------------
   Brochure page 5.                                              */

export const capabilities = [
  {
    country: "Vietnam",
    summary:
      "Headquarters with sales, manufacturing and development facilities, along with core production factories.",
    points: [
      "More than 20 years of partnership with our factories — 45 sewing lines across Vietnam plus several subcontractors, with nearly 3,500 workers.",
      "All factories operate under buyer protocol and compliance, with valid certification.",
      "Capacity of 700,000 to 800,000 pieces per month.",
    ],
  },
  {
    country: "China",
    summary: "Fabrics and trims procurement office with an experienced sourcing and quality team.",
    points: [
      "More than 18 years working with established Chinese fabric mills to control yarn prices, deliveries and new fabric development.",
      "Mill compliance maintained to each buyer's requirements.",
      "Yarn booked six months in advance, with well-equipped in-house fabric testing labs.",
      "Trims from our own nominated suppliers, offering round-the-clock service on both quality and price.",
      "90% of production material accessories are sourced from our China suppliers.",
    ],
  },
  {
    country: "India",
    summary: "Merchandising and development office.",
    points: [
      "Basic knit manufacturing in Tirupur, South India, and high-fashion apparel from our New Delhi factories.",
      "Categories — knitwear, woven, and men's and women's clothing.",
    ],
  },
  {
    country: "Bangladesh & Nepal",
    summary: "Production base.",
    points: [
      "Well-invested factories producing chinos, cargos, constructed jackets, t-shirts and tracksuits for the US, European and South African markets.",
    ],
  },
];

/* ---------------- LEADERSHIP ---------------- */

export const ceoMessage = {
  quote:
    "We do not simply manufacture garments; we foster sustainable, long-term partnerships driven by speed-to-market, cost efficiency, and rigorous compliance.",
  statement:
    'Over the past 25 years, Premier Group has evolved alongside the dynamic global apparel landscape, transforming industry challenges into lasting milestones of innovation and growth. Today, we stand as a trusted, world-class partner delivering agile, end-to-end supply chain solutions to tier-1 international retailers. Our foundation is built on an unwavering commitment to quality and value. By integrating dedicated Research & Development, strategic fabric sourcing, and advanced manufacturing capabilities, we deliver a truly seamless "One-Stop Vendor" experience. As we look ahead, Premier Group remains committed to elevating industry standards through cutting-edge technology and sustainable practices. We warmly invite you to explore our global capabilities and co-create the next chapter of apparel excellence with us.',
};

export const team = [
  // Country always in brackets, spelled out in full, never abbreviated.
  { slug: "jamaluddin", name: "Mohammad Jamaluddin", role: "Chairman & CEO" },
  { slug: "farhan-raza", name: "Farhan Raza", role: "Managing Director" },
  { slug: "abdul-ahad", name: "Abdul Ahad", role: "Managing Director (China & Hong Kong)" },
  { slug: "chu-dao-linh-suong", name: "Chu Đào Linh Sương", role: "Director (Vietnam)" },
  { slug: "kadiravelu-saravana-kumar", name: "Kadiravelu Saravana Kumar", role: "Chief Representative (Vietnam)" },
  { slug: "ketan-patel", name: "Ketan Patel", role: "Marketing & Sales Manager" },
  { slug: "hussnain-ghafoor", name: "Hussnain Ghafoor", role: "Fabric Sourcing & Production Manager" },
  { slug: "grace-nguyen", name: "Grace Nguyen", role: "General Manager, Product Development" },
  { slug: "prashant-khandalkar", name: "Prashant Khandalkar", role: "Development & Merchandising Manager" },
  { slug: "mari-payes-micheal-pius-angolo", name: "Mari Payes Micheal Pius Angolo", role: "Production & Sourcing Manager (Bangladesh)" },
  { slug: "sarah", name: "Sarah", role: "Merchandiser & Sourcing Manager (Vietnam)" },
];

/* ---------------- HISTORY ----------------
   Brochure page 4, "Our Journey".                                */

export const history = [
  { year: "2000", title: "Established", description: "Premier Group established." },
  { year: "2005", title: "Premier Exim Hong Kong", description: "Premier Exim Hong Kong founded." },
  { year: "2006", title: "Trading office", description: "Pha Re Mi En Ri Company opened in Vietnam — the former name of Premier Fashion Co., Ltd." },
  { year: "2008", title: "Joint venture", description: "Premier took a 50% share in the Ben Tre factory — Premier Pearl Garment JSC." },
  { year: "2010", title: "Fabric sourcing office", description: "Premier Exim China Ltd. established in Zhejiang." },
  { year: "2011", title: "Head office", description: "Premier Fashion Co., Ltd established in Vietnam as the company base." },
  { year: "2012", title: "Investment", description: "Co-founded a Bangladesh factory with a 50% investment." },
  { year: "2013", title: "Marketing office", description: "Established a marketing office in South Africa — Premier Fashion (SA) PVT Ltd." },
  { year: "2016", title: "Design & marketing office", description: "The Concept Shop opened in New York — Premier Exim USA." },
  { year: "2021", title: "Design & production base", description: "Premier Creative India expanded our design and production capability." },
  { year: "2024", title: "USA office expanded", description: "Additional team members onboarded to meet growing buyer requirements." },
  { year: "2025", title: "Canada & Dubai", description: "New offices strengthening our global network, marketing and customer service." },
];

/* ---------------- APPROACH ---------------- */

export const pillars = [
  { title: "Cost effectiveness", description: "Cost reduction through productivity improvement and technology investment." },
  { title: "Delivery", description: "Strategic planning to ensure on-time delivery." },
  { title: "Customer service", description: "Excel through efficient and dedicated service." },
  { title: "Design", description: "Design support to clients from concept to production." },
  { title: "Quality", description: "Continuous quality improvement to reinforce global competition." },
];

export const designInitiatives = [
  "Design offices in the US, Vietnam and India bring together the best of Western and Eastern market intelligence.",
  "Development teams across the US, Vietnam, India and China work each season on new fabrics and silhouettes. Samples turn around in three days once the fabric is sourced.",
  "Our design teams work closely with buyers to stay current on market intelligence and emerging trends, with CAD support to turn concepts into finished product.",
  "Premier USA — The Concept Shop is our own office and showroom, housing the design, marketing and merchandising teams.",
];

/* ---------------- NAVIGATION ---------------- */

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Products & Services", href: "#products-services" },
  { name: "Clients", href: "#clients" },
  { name: "Contact Us", href: "#contact" },
]; 