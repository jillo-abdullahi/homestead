import { UserCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Avatar from "@/components/Avatar";

/**
 * Main nav component with links to other pages
 * @prop {boolean} isLoggedin - whether user is logged in or not
 * @returns
 */

interface NavbarProps {
  isLoggedin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedin = false }) => {
  const router = useRouter();

  // navigate to sign up page
  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="w-full py-6 flex items-center justify-between">
      {/* brand name  */}
      <Link
        href="/"
        className="text-xl text-gray-700 flex items-end justify-start space-x-1"
      >
        <span className="font-bold text-xl text-gray-800 hover:text-gray-700 transition-all duration-100">
          Homestead
          <span className="text-violet-500 font-bold text-3xl">.</span>
        </span>
      </Link>
      {/* links */}
      <div className="ml-auto flex space-x-3 items-center">
        {isLoggedin && (
          <div className="flex space-x-2 items-center">
            <SecondaryButton padding="px-3 py-2" fontSize="text-base">
              <div className="flex items-center justify-start">
                <PlusCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                <span>Add Listing</span>
              </div>
            </SecondaryButton>
            <Avatar
              userEmail="jayloabdullahi@gmail.com"
              username="shrewdTurtle"
            />
          </div>
        )}
        {!isLoggedin && (
          <div className="flex items-center space-x-6">
            <Link
              href="/login"
              className="flex items-center justify-start font-medium text-gray-700 hover:text-violet-700"
            >
              <span>Login</span>
            </Link>
            <PrimaryButton
              padding="px-3 py-2"
              fontSize="text-base"
              onClick={handleSignUp}
            >
              <div className="flex items-center justify-start">
                <UserCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                <span>Sign up</span>
              </div>
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
