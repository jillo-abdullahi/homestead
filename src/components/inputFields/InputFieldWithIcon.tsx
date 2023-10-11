import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
/**
 * input field with icon on the left
 * @param {string} icon - icon component
 * @param {string} placeholder - placeholder text
 * @param {string} type - type of input field
 * @param {string} name - name of input field
 * @param {string} value - value of input field
 * @param {function} onChange - onChange function
 * @param {string} id - id of input field
 * @param {string | React.ReactNode } label - label of input field
 * @param {boolean} isLoginForm - if the input field is in the login form
 * @param {React.ReactNode | string} error - error message
 * @param {boolean} isRequired - if the input field is required
 * @param {boolean} isDisabled - if the input field is disabled
 * @param {number} min - min value of input field if number
 * @param {number} max - max value of input field if number
 * @returns
 */

interface InputFieldWithIconProps {
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label: string | React.ReactNode;
  isLoginForm?: boolean;
  error?: string | React.ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
  min?: number;
  max?: number;
}
const InputFieldWithIcon: React.FC<InputFieldWithIconProps> = ({
  icon,
  placeholder,
  type,
  name,
  value,
  onChange,
  id,
  label,
  isLoginForm,
  error,
  isRequired = false,
  isDisabled = false,
  min,
  max,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // toggle password visibility
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {type === "password" && isLoginForm && (
          <div className="text-sm">
            <Link
              href="/auth/forgot-password"
              className="font-semibold text-violet-700 hover:text-violet-600"
            >
              Forgot password?
            </Link>
          </div>
        )}
      </div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
        {type === "password" && value && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={handleShowPassword}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <EyeIcon className="h-4 w-4 text-gray-500" />
            )}
          </button>
        )}
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          id={id}
          value={value}
          required={isRequired}
          onChange={onChange}
          disabled={isDisabled}
          className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-700 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          min={type === "number" ? min : undefined}
          max={type === "number" ? max : undefined}
        />
      </div>
      {error ? (
        <p className="text-red-500 text-xs mt-1 px-2 py-2 border rounded-md border-red-500 bg-red-500 bg-opacity-10">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default InputFieldWithIcon;
