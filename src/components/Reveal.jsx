import { motion } from "framer-motion";
import { DURATION, EASE, revealVariants } from "../lib/motion";

export default function Reveal({
  as = "up",
  delay = 0,
  duration = DURATION.base,
  once = true,
  amount = 0.3,
  className,
  children,
  ...rest
}) {
  const variant = revealVariants[as] ?? revealVariants.up;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variant}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
