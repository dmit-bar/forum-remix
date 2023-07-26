import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import colors from "tailwindcss/colors";

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
}

const Checkbox = ({ id, name, label }: CheckboxProps) => {
  return (
    <>
      <RadixCheckbox.Root
        className="border-2 border-red-600 flex h-4 w-4 appearance-none items-center justify-center rounded-sm"
        id={id}
        name={name}
      >
        <RadixCheckbox.Indicator className="bg-red-600">
          <CheckIcon color={colors.gray[50]} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label
        className="pl-2 text-sm leading-none text-gray-950 select-none"
        htmlFor={id}
      >
        {label}
      </label>
    </>
  );
};

export { Checkbox };
