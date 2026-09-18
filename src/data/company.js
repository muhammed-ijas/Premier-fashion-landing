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
  founded: 2005,
};

export const about = {
  intro:
    "Premier Fashion Co., Ltd. is now a part of Premier Group, established in 2005 with garment manufacturing facilities in Vietnam. It was founded by Mr. Mohammad Jamaluddin, the CEO of the company.",
  today:
    "Today we are a one-stop shop dealing in apparel exports consisting of Men's, Women's and Kids' wear, from our different facilities spread across Asia subsisting countries such as Vietnam, Cambodia, China, India, Pakistan, Bangladesh and Nepal.",
  reach:
    "We have PD, marketing and merchandising offices in the USA, Vietnam, Bangladesh, India and RSA, so that our services are available round the clock, providing day-to-day query solutions. We offer multi-country production facilities depending on clients' requirements, such as product category, cost and lead-time.",
};

export const highlights = [
  {
    title: "One-stop solution",
    body: "Everything made under one roof — saving time, money and the effort of dealing with multiple suppliers.",
  },
  {
    title: "We make it easy",
    body: "Share your vision and ideas. We bring it to life, so you can focus on building your brand.",
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
    "An advantage of having vast capacities is that we are able to make a large volume of garments with short lead times in various countries, and have a wide range of multi-category products.",
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
  "Bottoms",
  "Jackets",
  "Tops",
  "T-Shirts",
  "Polo",
  "Shirts",
  "Dresses",
  "Denims",
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
      "Turning sketches and tech packs into a physical product you can hold, before it goes into production.",
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
      "A team of experts sourcing the right fabric for every product, general or highly specific.",
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
    city: "",
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
      "More than 20 years of mutual understanding with factory — 45 sewing lines across Vietnam and several subcontractors, with nearly 3,500 workers.",
      "All factories are under buyer protocol and compliance with valid certification.",
      "Capacity of 700,000 to 800,000 pieces per month.",
    ],
  },
  {
    country: "China",
    summary: "Fabrics and trims procurement office with an experienced sourcing and quality team.",
    points: [
      "More than 18 years in partnership with reputed China fabric mills to control yarn prices, deliveries and new fabric developments.",
      "Maintaining mill compliance as per buyer requirement.",
      "Six months advance yarn bookings and internal well-equipped fabric testing labs.",
      "Trims — trusted own nominated suppliers providing round-the-clock service with quality and prices.",
      "90% of production material accessories are sourced from our China suppliers.",
    ],
  },
  {
    country: "India",
    summary: "Merchandising and development office.",
    points: [
      "Basic knit manufacturing facilities in Tirupur (South India) and high fashion apparel in New Delhi factories.",
      "Categories — knitwear, woven, and men's and women's clothing.",
    ],
  },
  {
    country: "Bangladesh & Nepal",
    summary: "Production base.",
    points: [
      "Well-invested factories for products like chino, cargo, construed jacket, t-shirts and track-suits for the US, European and RSA markets.",
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
  { slug: "abdul-ahad", name: "Abdul Ahad", role: "Managing Director (China & Hong Kong)" },
  { slug: "chu-dao-linh-suong", name: "Chu Đào Linh Sương", role: "Director (Vietnam)" },
  { slug: "kadiravelu-saravana-kumar", name: "Kadiravelu Saravana Kumar", role: "Chief Representative, Vietnam" },
  { slug: "ketan-patel", name: "Ketan Patel", role: "Marketing & Sales Director" },
  { slug: "hussnain-ghafoor", name: "Hussnain Ghafoor", role: "Fabric Sourcing & Production Manager" },
  { slug: "raza-farhan", name: "Raza Farhan", role: "Deputy CEO" },
  { slug: "grace-nguyen", name: "Grace Nguyen", role: "General Manager, Product Development" },
  { slug: "prashant-khandalkar", name: "Prashant Khandalkar", role: "Development & Merchandising Manager" },
  { slug: "mari-payes-micheal-pius-angolo", name: "Mari Payes Micheal Pius Angolo", role: "Production & Sourcing Manager (BD)" },
  { slug: "sarah", name: "Sarah", role: "Merchandiser & Sourcing Manager (VN)" },
];

/* ---------------- HISTORY ----------------
   Brochure page 4, "Our Journey".                                */

export const history = [
  { year: "2005", title: "Established", description: "Premier Exim HK founded." },
  { year: "2006", title: "Trading office", description: "Pha Re Mi En Ri Company in Vietnam, former name of Premier Fashion Co., Ltd." },
  { year: "2008", title: "Cooperate", description: "Premier incorporates 50% in Ben Tre Factory — Premier Pearl Garment JSC." },
  { year: "2010", title: "Fabric sourcing office established", description: "Premier Exim China Ltd. established in China." },
  { year: "2011", title: "The base & head office", description: "Premier Fashion Co., Ltd in Viet Nam." },
  { year: "2012", title: "Investment", description: "Co-founder of Bangladesh factory with 50% investment." },
  { year: "2013", title: "Marketing office", description: "Established a marketing office in South Africa — Premier Fashion (SA) PVT Ltd." },
  { year: "2016", title: "Design & marketing office", description: "The Concept Shop — Premier Exim USA." },
  { year: "2021", title: "Expanded the design & production base", description: "Premier Creative India." },
  { year: "2024", title: "Expansion of USA office", description: "Additional team onboarding to meet increasing buyer requirements." },
  { year: "2025", title: "Expanded presence in Canada & Dubai", description: "Strengthening our global network, marketing and customer services." },
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
  "Design offices in the US, Vietnam and India combine the best intelligence of the West and the East.",
  "Development teams across the US, Vietnam, India and China evolve each season with new fabrics and silhouettes. Sample turnaround is 3 days once fabric is sourced.",
  "Design teams work closely with buyers to keep market intelligence and upcoming trends current, offering CAD support to turn concepts into reality.",
  "Premier USA — The Concept Shop is the company's own office and showroom, housing designers, marketing and merchandising teams.",
];

/* ---------------- NAVIGATION ---------------- */

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Products & Services", href: "#products-services" },
  { name: "Clients", href: "#clients" },
  { name: "Contact Us", href: "#contact" },
];