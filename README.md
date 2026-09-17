# Premier Fashion — Landing Page

Single-page version of the Premier Fashion site. Same design system as the
main project: Poppins, Premier Blue (#0B73B5), Premier Green (#7CB715),
flat colour, photo header.

## Setup

    npm install
    npm run dev

## Assets

Copy these from the main project into `public/`:

    PGLogo.png
    PGLogo-whitened.png
    hero/home.png
    about/overview.png
    products/          (optional — falls back to labelled placeholders)
    clients/           (optional — the logo strip hides itself if empty)

Then paste the `clientLogos` array from the main project's `media.js`
into `src/data/media.js`.

## Structure

    src/
      components/   Navbar, Footer, Button, Container, Reveal, Stagger, SectionHeading
      sections/     Hero, About, ProductsServices, Clients, Contact
      data/         company.js (facts), media.js (image paths)
      lib/          motion.js
      index.css     the whole design system

Navigation is anchor-based: each section carries an `id` and the navbar
highlights whichever is in view.

## Deploy

Push to a new GitHub repo, import at vercel.com. `vercel.json` is included.
