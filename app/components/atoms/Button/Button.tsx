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
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = ({
  block,
  type = "button",
  view = "primary-default",
  className,
  leftAddon,
  rightAddon,
  children,
}: ButtonProps) => {
  return (
    <div className={block ? "w-full" : "w-auto"}>
      <button
        type={type}
        className={classNames(
          className,
          "rounded font-medium transition-colors",
          { "w-full": block },
          {
            "px-4 py-1": view.includes("default"),
          },
          {
            "px-3 py-1 text-sm": view.includes("small"),
          },
          {
            "hover:text-stone-400 active:text-stone-500": view.includes("link"),
          },
          // {
          //   "bg-violet-400 text-stone-800 hover:bg-violet-500 active:bg-violet-600":
          //     view.includes("primary"),
          // },
          {
            "bg-gradient-to-tl from-rose-400 to-amber-400 bg-150% text-stone-800 hover:from-rose-300 hover:to-amber-300 active:from-rose-500 active:to-amber-500":
              view.includes("primary"),
          },
          {
            "bg-stone-300 text-stone-950 hover:bg-stone-200 active:bg-stone-400":
              view.includes("secondary"),
          }
        )}
      >
        <div className="flex items-center justify-center">
          {leftAddon && <div className="pr-1">{leftAddon}</div>}
          {children}
          {rightAddon && <div className="pl-1">{rightAddon}</div>}
        </div>
      </button>
    </div>
  );
};

export { Button };
