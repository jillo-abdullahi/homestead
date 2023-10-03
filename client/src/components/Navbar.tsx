import Image from "next/image";
/**
 * Main nav component with links to other pages
 * @returns
 */

const Navbar: React.FC = () => (
  <div className="w-full py-6 flex items-center justify-between">
    {/* brand name  */}
    <a
      href="/"
      className="text-xl text-gray-700 flex items-end justify-start space-x-1"
    >
      <span className="font-bold text-xl text-gray-800 hover:text-gray-700 transition-all duration-100">
        Homestead
        <span className="text-violet-500 font-bold text-3xl">.</span>
      </span>
      
    </a>
    {/* links */}
    <div className="ml-auto">
      <a href="#" className="text-gray-700 hover:text-gray-900">
        Login
      </a>
    </div>
  </div>
);

export default Navbar;
