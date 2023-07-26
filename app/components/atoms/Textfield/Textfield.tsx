import classNames from "classnames";
import { forwardRef } from "react";

interface TextfieldProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

type TextfieldRef = HTMLInputElement;

const Textfield = forwardRef<TextfieldRef, TextfieldProps>((props, ref) => {
  const { id, label, error } = props;

  return (
    <div>
      {label && (
        <label
          htmlFor="login"
          className="block text-sm font-medium text-gray-950"
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          ref={ref}
          {...props}
          className={classNames(
            "w-full rounded-sm border px-2 py-1 font-medium",
            { "border-gray-950": !error },
            { "border-red-600": error }
          )}
        />
        {error ? (
          <div className="pt-1 text-red-700" id={`${id}-error`}>
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
});

Textfield.displayName = "Textfield";

export { Textfield };
