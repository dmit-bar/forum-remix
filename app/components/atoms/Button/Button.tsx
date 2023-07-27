import classNames from "classnames";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  block?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  view?:
    | "primary-default"
    | "primary-small"
    | "secondary-default"
    | "secondary-small"
    | "link"
    | "link-default"
    | "link-small";
  className?: string;
  children?: React.ReactNode;
}

const Button = ({
  block,
  type = "button",
  view = "primary-default",
  className,
  children,
}: ButtonProps) => {
  return (
    <div className={block ? "w-full" : ""}>
      <button
        type={type}
        className={classNames(
          className,
          "rounded border font-medium transition-colors",
          { "w-full": block },
          {
            "py-1 px-4": view.includes("default"),
          },
          {
            "text-sm py-1 px-3": view.includes("small"),
          },
          {
            "border-transparent p-0 text-gray-950 hover:text-gray-700 active:text-gray-950":
              view.includes("link"),
          },
          {
            "bg-red-600 border-red-700 text-gray-50 hover:bg-red-500 active:bg-red-700":
              view.includes("primary"),
          },
          {
            "bg-gray-200 border-gray-400 text-gray-950 hover:bg-gray-100 active:bg-gray-300":
              view.includes("secondary"),
          }
        )}
      >
        {children}
      </button>
    </div>
  );
};

export { Button };
