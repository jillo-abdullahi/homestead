import { useEffect, useState } from "react";
import Banner from "@/components/banner";
import { getLoggedInUser } from "@/utils/saveLoggedInUser";

/**
 * parent container
 * add app-wide checks here
 */

interface ParentContainerProps {
  children: React.ReactNode;
}

const ParentContainer: React.FC<ParentContainerProps> = ({ children }) => {
  const [userIsConfirmed, setUserIsConfirmed] = useState(true);
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
  }, []);

  const bannerMessage = "We sent a confirmation link to your email. Please confirm your email.";
  return (
    <div>
      {!userIsConfirmed && <Banner text={bannerMessage} dismiss={() => setUserIsConfirmed(true)} />}
      {children}
    </div>
  );
};

export default ParentContainer;
