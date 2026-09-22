import { motion } from "framer-motion";
import clsx from "clsx";
import Container from "../components/Container";
import Button from "../components/Button";
import { EASE } from "../lib/motion";
import { company } from "../data/company";
import { heroes, hasMedia } from "../data/media";

const line = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };

export default function Hero() {
  const image = heroes.home;

  return (
    <section
      id="home"
      className={clsx("surface-media page-header overflow-hidden", !hasMedia(image) && "no-media")}
      style={hasMedia(image) ? { backgroundImage: `url(${image})` } : undefined}
    >
      <Container className="w-full">
        <motion.div
          initial="hidden" animate="visible" variants={line}
          transition={{ duration: 0.6, ease: EASE }}
          className="eyebrow mb-6"
        >
          {company.legalName}
        </motion.div>

        <motion.h1
          initial="hidden" animate="visible" variants={line}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="hero-title max-w-3xl text-balance"
        >
          A one-stop partner in global apparel making
        </motion.h1>

        <motion.p
          initial="hidden" animate="visible" variants={line}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          className="lede mt-5 max-w-xl"
        >
          {company.name} designs, develops and manufactures Men's, Women's and Kids' apparel from
          facilities across Vietnam, China, India, Bangladesh and Nepal — everything made under one roof.
        </motion.p>

        <motion.div
          initial="hidden" animate="visible" variants={line}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Button to="#products-services" variant="primary">What we do</Button>
          <Button to="#contact" variant="secondary">Get in touch</Button>
        </motion.div>
      </Container>
    </section>
  );
}