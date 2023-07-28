import classNames from "classnames";
import { forwardRef } from "react";

interface TextfieldProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string | null;
  compact?: boolean;
}

type TextfieldRef = HTMLInputElement;

const Textfield = forwardRef<TextfieldRef, TextfieldProps>((props, ref) => {
  const { id, label, className, error, compact } = props;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor="login"
          className="block text-sm font-medium text-stone-200"
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          ref={ref}
          {...props}
          className={classNames(
            "w-full rounded-sm border border-stone-200/50 bg-stone-700 px-2 py-1 font-medium",
            { "border-gray-950": !error },
            { "border-red-500": error },
            {
              "text-sm": compact,
            }
          )}
        />
        {error ? (
          <div
            className={classNames("pt-1 text-red-500", {
              "text-sm": compact,
            })}
            id={`${id}-error`}
          >
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
});

Textfield.displayName = "Textfield";

export { Textfield };
