import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import Button from "./Button";
import { navigation } from "../data/company";
import { EASE } from "../lib/motion";

const SECTION_IDS = navigation.map((item) => item.href.replace("#", ""));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scrollspy — highlights the section currently in view
  useEffect(() => {
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
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "border-b border-hairline bg-white/95 backdrop-blur" : "nav-over-media bg-transparent"
      )}
    >
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <a href="#home" aria-label="Premier Fashion home">
          <img src="/PGLogo.png" alt="Premier Fashion" className="h-12 w-auto object-contain md:h-14" />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
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
            scrolled ? "text-ink" : "text-white"
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
                    onClick={() => setOpen(false)}
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
              <Button to="#contact" variant="green" className="w-full">Get in touch</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
