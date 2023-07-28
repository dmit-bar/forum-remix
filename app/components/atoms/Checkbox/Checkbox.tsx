import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import colors from "tailwindcss/colors";

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  defaultChecked?: boolean;
}

const Checkbox = ({ id, name, label, defaultChecked }: CheckboxProps) => {
  return (
    <>
      <RadixCheckbox.Root
        className="flex h-4 w-4 appearance-none items-center justify-center rounded-sm border-2 border-amber-500"
        id={id}
        name={name}
        defaultChecked={defaultChecked}
      >
        <RadixCheckbox.Indicator className="bg-amber-500">
          <CheckIcon color={colors.stone[800]} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className="select-none pl-2 text-sm leading-none" htmlFor={id}>
        {label}
      </label>
    </>
  );
};

export { Checkbox };
