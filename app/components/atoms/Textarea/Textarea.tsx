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
          className="block text-sm font-medium text-gray-200"
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <textarea
          ref={ref}
          {...props}
          className={classNames(
            "w-full rounded-sm border border-stone-400 bg-stone-700 px-2 py-1 font-medium",
            { "border-gray-950": !error },
            { "border-violet-600": error }
          )}
        />
        {error ? (
          <div className="pt-1 text-violet-700" id={`${id}-error`}>
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
