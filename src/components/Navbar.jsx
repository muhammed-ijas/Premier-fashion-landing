import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import Button from "./Button";
import { navigation } from "../data/company";
import { EASE } from "../lib/motion";

const SECTION_IDS = navigation.map((item) => item.href.replace("#", ""));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scrollspy — only on home page
  useEffect(() => {
    if (!isHomePage) {
      setActive("products-services");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHomePage]);

  // lock the page while the mobile menu is open, or the body scrolls
  // behind the panel on iOS
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /**
   * Close the menu first, then scroll. Letting the browser handle the
   * anchor natively means the page jumps while the mobile panel is still
   * collapsing, so it lands short of the section — or not at all.
   */
  const goToSection = (e, href) => {
    e.preventDefault();
    setOpen(false);

    if (!isHomePage) {
      // navigate to home first, then scroll after landing
      navigate("/");
      window.setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
      return;
    }

    const el = document.querySelector(href);
    if (!el) return;

    if (open) {
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 380);
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "border-b border-hairline bg-white/95 backdrop-blur"
          : "nav-over-media bg-transparent"
      )}
    >
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <a href="#home" onClick={(e) => goToSection(e, "#home")} aria-label="Premier Fashion home">
          <img src="/PGLogo.png" alt="Premier Fashion" className="h-12 w-auto object-contain md:h-14" />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => goToSection(e, item.href)}
                className={clsx("nav-link", active === item.href.replace("#", "") && "is-active")}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button to="#contact" variant="green">Get in touch</Button>
        </div>

        <button
          className={clsx(
            "flex h-10 w-10 items-center justify-center transition-colors lg:hidden",
            scrolled || open ? "text-ink" : "text-white"
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-hairline bg-white lg:hidden"
          >
            <ul className="flex flex-col px-6 pb-8 pt-2">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04, ease: EASE }}
                  className="border-b border-hairline"
                >
                  <a
                    href={item.href}
                    onClick={(e) => goToSection(e, item.href)}
                    className={clsx(
                      "block py-3.5 text-[0.95rem] font-medium transition-colors",
                      active === item.href.replace("#", "") ? "text-green" : "text-ink hover:text-green"
                    )}
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-6 pb-8">
              <a
                href="#contact"
                onClick={(e) => goToSection(e, "#contact")}
                className="btn btn-green w-full"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}