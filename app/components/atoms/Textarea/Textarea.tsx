import classNames from "classnames";
import { forwardRef } from "react";

interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  label?: string;
  className?: string;
  error?: string | null;
}

type TextareaRef = HTMLTextAreaElement;

const Textarea = forwardRef<TextareaRef, TextareaProps>((props, ref) => {
  const { id, label, className, error } = props;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor="login"
          className="block text-sm font-medium text-gray-950"
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <textarea
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

Textarea.displayName = "Textarea";

export { Textarea };
