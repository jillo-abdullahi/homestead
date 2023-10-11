/**
 * Forgot Password Page
 */

import { NextPage } from "next";
import ForgotPasswordContainer from "@/containers/ForgotPasswordContainer";

const ForgotPassword: NextPage = () => {
  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow container">
        <ForgotPasswordContainer />
      </div>
    </main>
  );
};

export default ForgotPassword;
