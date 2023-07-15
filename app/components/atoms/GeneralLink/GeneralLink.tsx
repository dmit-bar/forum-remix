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
          "text-red-600 hover:text-red-400 active:text-red-800":
            view === "primary",
        },
        {
          "text-gray-900 hover:text-gray-700 active:text-gray-950":
            view === "secondary",
        },
        {
          underline: underline,
        }
      )}
    />
  );
};

export { GeneralLink };
