import { motion } from "framer-motion";
import clsx from "clsx";
import { DURATION, EASE } from "../lib/motion";

const variants = {
  primary: "btn btn-solid",
  light: "btn btn-solid",
  secondary: "btn btn-outline",
  outline: "btn btn-outline",
  green: "btn btn-green",
  ghost: "btn btn-ghost",
};

/**
 * Button — carries no colour. Values come from the surrounding surface.
 * `to` renders an anchor link for on-page navigation.
 */
export default function Button({ as, to, href, variant = "primary", className, children, ...rest }) {
  const classes = clsx(variants[variant] ?? variants.primary, className);
  const motionProps = {
    whileTap: { scale: 0.98 },
    transition: { duration: DURATION.fast, ease: EASE },
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="group inline-block">
        <a href={to} className={classes}>{children}</a>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div {...motionProps} className="group inline-block">
        <a href={href} className={classes} target="_blank" rel="noreferrer">{children}</a>
      </motion.div>
    );
  }

  const Tag = as ?? "button";
  return (
    <motion.div {...motionProps} className="group inline-block">
      <Tag className={classes} {...rest}>{children}</Tag>
    </motion.div>
  );
}
