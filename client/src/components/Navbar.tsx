import PrimaryButton from "@/components/PrimaryButton";
import Avatar from "@/components/Avatar";
/**
 * Main nav component with links to other pages
 * @prop {boolean} isLoggedin - whether user is logged in or not
 *
 * @returns
 */

interface NavbarProps {
  isLoggedin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedin = false }) => (
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
    <div className="ml-auto ">
      {isLoggedin && (
        <Avatar userEmail="jayloabdullahi@gmail.com" username="shrewdTurtle" />
      )}
      {!isLoggedin && (
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
            Login
          </a>
          <PrimaryButton
            text="Sign up"
            padding="px-3 py-2"
            fontSize="text-base"
          />
        </div>
      )}
    </div>
  </div>
);

export default Navbar;
