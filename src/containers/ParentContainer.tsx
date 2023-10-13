import { useEffect, useState } from "react";
import Banner from "@/components/banner";
import { getLoggedInUser } from "@/utils/saveLoggedInUser";
import { useRouter } from "next/router";

/**
 * parent container
 * add app-wide checks here
 */

interface ParentContainerProps {
  children: React.ReactNode;
}

const ParentContainer: React.FC<ParentContainerProps> = ({ children }) => {
  const [userIsConfirmed, setUserIsConfirmed] = useState(true);
  const router = useRouter();

  // we don't want to show the banner on the confirm email page
  const { pathname } = router;
  const isConfirmationPage = pathname.includes("confirm-email");

  // check if logged in user is confirmed
  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      const { confirmed } = loggedInUser;
      if (!confirmed) {
        setUserIsConfirmed(false);
      } else {
        setUserIsConfirmed(true);
      }
    }
  }, [pathname]);

  const bannerMessage =
    "We sent a confirmation link to your email. Please confirm your email.";

  console.log({
    pathname,
    isConfirmationPage,
    isUserConfirmed: userIsConfirmed,

    TRUE: !userIsConfirmed && !isConfirmationPage,
  });

  return (
    <div>
      {!userIsConfirmed && !isConfirmationPage && (
        <Banner text={bannerMessage} dismiss={() => setUserIsConfirmed(true)} />
      )}
      {children}
    </div>
  );
};

export default ParentContainer;
