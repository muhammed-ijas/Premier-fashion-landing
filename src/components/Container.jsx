import clsx from "clsx";

export default function Container({ className, children, as: Tag = "div", ...rest }) {
  return (
    <Tag className={clsx("mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16", className)} {...rest}>
      {children}
    </Tag>
  );
}
