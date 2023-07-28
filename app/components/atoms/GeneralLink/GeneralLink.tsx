import { Link as RemixLink } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/dist/components";
import classnames from "classnames";

interface GeneralLinkProps {
  view?: "primary" | "secondary";
  underline?: boolean;
}

const GeneralLink = ({
  view = "primary",
  underline = true,
  ...props
}: RemixLinkProps &
  React.RefAttributes<HTMLAnchorElement> &
  GeneralLinkProps) => {
  return (
    <RemixLink
      {...props}
      className={classnames(
        props.className,
        "font-bold transition-colors duration-100",
        {
          "bg-gradient-to-tl from-rose-400 to-amber-400 bg-200% bg-clip-text text-transparent hover:text-amber-400 active:text-rose-600":
            view === "primary",
        },
        {
          "hover:text-gray-300 active:text-gray-400": view === "secondary",
        },
        {
          underline: underline,
        }
      )}
    />
  );
};

export { GeneralLink };
