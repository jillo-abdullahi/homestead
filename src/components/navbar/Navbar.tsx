import { useEffect, useState } from "react";
import { UserCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Avatar from "@/components/navbar/Avatar";

/**
 * Main nav component with links to other pages
 * @prop {boolean} isOnCreateListingPage - whether user is on create listing page or not
 * @returns
 */

interface NavbarProps {
  isOnCreateListingPage?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isOnCreateListingPage = false }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const router = useRouter();

  // navigate to sign up page
  const handleSignUp = () => {
    router.push("/auth/signup");
  };

  // navigate to create listing page
  const handleCreateListing = () => {
    router.push("/create-listing");
  };

  // check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("homesteaduser");
    if (user) {
      const { username, email } = JSON.parse(user);
      setUser({ username, email });
    }
  }, []);

  const isLoggedin = user.email !== "";

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
            {!isOnCreateListingPage && (
              <SecondaryButton
                padding="px-3 py-2"
                fontSize="text-base"
                onClick={handleCreateListing}
              >
                <div className="flex items-center justify-start">
                  <PlusCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                  <span>Add Listing</span>
                </div>
              </SecondaryButton>
            )}
            <Avatar userEmail={user.email} username={user.username} />
          </div>
        )}
        {!isLoggedin && (
          <div className="flex items-center space-x-6">
            <Link
              href="/auth/login"
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
