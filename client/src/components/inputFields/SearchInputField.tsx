import { IconSearch } from "@tabler/icons-react";
/**
 * input field to initiate a quick search from the homepage
 * @returns
 */
interface SearchInputFieldProps {
  placeholder?: string;
}
const SearchInputField: React.FC<SearchInputFieldProps> = ({ placeholder }) => {
  return (
    <div className="relative mt-2 flex items-center">
      <input
        type="text"
        name="search"
        id="search"
        placeholder={placeholder}
        className="block w-full rounded-lg border-0 py-3 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-700 sm:text-sm sm:leading-6"
      />
      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
        <button className="bg-violet-700 text-white rounded-md p-4 flex items-center justify-center">
          <IconSearch className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchInputField;
