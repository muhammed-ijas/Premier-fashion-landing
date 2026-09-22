import { MapPin, Phone, Mail } from "lucide-react";
import Container from "./Container";
import { navigation, services, offices, company } from "../data/company";

const HEADING = "type-label mb-4 text-white";
const LINK = "type-body transition-colors duration-300 hover:text-green";

export default function Footer() {
  const headOffice = offices.find((o) => o.country === "Vietnam");
  const year = new Date().getFullYear();

  return (
    <footer className="surface-blue">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 lg:grid-cols-[1.3fr_0.8fr_1fr_1.2fr] lg:gap-x-10 lg:py-16">
        <div className="col-span-2 max-w-[330px] text-center sm:text-left lg:col-span-1 mx-auto sm:mx-0">
          <img src="/PGLogo-whitened.png" alt={company.group} className="mx-auto h-[68px] w-auto object-contain sm:mx-0" />
          <p className="type-body mt-5">
            A one-stop apparel sourcing, design, product development and manufacturing partner,
            operating across Vietnam, China, India, Bangladesh, Nepal and beyond.
          </p>
        </div>

        <div>
          <h3 className={HEADING}>Quick links</h3>
          <ul className="space-y-[0.9rem]">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={LINK}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={HEADING}>Services</h3>
          <ul className="space-y-[0.9rem]">
            {services.map((s) => (
              <li key={s.slug}>
                <a href="#products-services" className={LINK}>{s.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <h3 className={HEADING}>Head office</h3>
          <address className="space-y-3.5 not-italic">
            <p className="type-body flex gap-2.5">
              <MapPin size={14} strokeWidth={1.9} className="mt-1 shrink-0 text-green" />
              {headOffice?.address}
            </p>
            {headOffice?.phone && (
              <p className="type-body flex gap-2.5">
                <Phone size={14} strokeWidth={1.9} className="mt-1 shrink-0 text-green" />
                {headOffice.phone}
              </p>
            )}
            {headOffice?.email && (
              <a href={`mailto:${headOffice.email}`} className={`${LINK} flex gap-2.5`}>
                <Mail size={14} strokeWidth={1.9} className="mt-1 shrink-0 text-green" />
                {headOffice.email}
              </a>
            )}
          </address>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="type-small flex flex-col items-center justify-between gap-2 py-5 text-fg-subtle md:flex-row">
          <p>© {year} {company.legalName} All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}