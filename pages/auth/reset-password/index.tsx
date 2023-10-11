import { NextPage } from "next";
import ResetPasswordContainer from "@/containers/ResetPasswordContainer";

/**
 * Reset Password Page
 */
const ResetPassword: NextPage = () => {
  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow container">
        <ResetPasswordContainer />
      </div>
    </main>
  );
};

export default ResetPassword;
