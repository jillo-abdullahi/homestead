import Link from "next/link";

/**
 * brand name component
 * links back to the home page
 * @returns
 */
const BrandName: React.FC = () => {
  return (
    <Link
      href="/"
      className="text-xl text-gray-700 flex items-end justify-start space-x-1"
    >
      <span className="font-bold text-xl text-gray-800 hover:text-gray-700 transition-all duration-100">
        Homestead
        <span className="text-violet-500 font-bold text-3xl">.</span>
      </span>
    </Link>
  );
};

export default BrandName;
