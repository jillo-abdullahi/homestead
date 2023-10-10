import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import InputFieldWithIcon from "@/components/inputFields/InputFieldWithIcon";
import { SearchState } from "@/types";

/**
 * dropdown button component
 * shows two input fields to select min and max values
 * @param {keyof SearchState["filters"]} filterName - name of the filter
 * @param {function} onChange - onChange function
 * @param {string} label - label of the dropdown button
 * @param {React.ReactNode} icon - icon component to display on input fields
 * @returns
 */

interface DropdownButtonProps {
  filterName: keyof SearchState["filters"];
  filter: { min?: number; max?: number };
  onChange: (
    filterName: keyof SearchState["filters"],
    filter: { min?: number; max?: number }
  ) => void;
  label?: string;
  icon?: React.ReactNode;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  filterName,
  onChange,
  label,
  icon,
  filter,
}) => {
  // handle min and max values change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // check if max is less than min
    // set max to min if this is the case
    if (filter.min && name === "max" && parseInt(value) < filter.min) {
      onChange(filterName, { min: filter.min, max: filter.min });
      return;
    }
    // update filter state
    onChange(filterName, { ...filter, [name]: parseInt(value) });
  };

  // value to show on the dropdown button
  const selectedValue: string =
    filter?.min && filter?.max ? `${filter.min} - ${filter.max}` : "-";

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
        {label}
      </label>
      <div>
        <Menu.Button className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <div className="line-clamp-1 text-left w-4/5">{selectedValue}</div>
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4">
          <div className="py-1 space-y-2">
            <Menu.Item>
              <InputFieldWithIcon
                type="number"
                name="min"
                id="min"
                min={0}
                value={filter?.min?.toString()}
                onChange={handleChange}
                label="Min"
                isRequired={false}
                isDisabled={false}
                placeholder="Min"
                icon={icon}
              />
            </Menu.Item>
            <Menu.Item>
              <InputFieldWithIcon
                type="number"
                name="max"
                id="max"
                min={filter?.min}
                value={filter?.max?.toString()}
                onChange={handleChange}
                label="Max"
                isRequired={false}
                isDisabled={false}
                placeholder="Max"
                icon={icon}
              />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownButton;
