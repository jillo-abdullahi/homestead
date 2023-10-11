/**
 * Confirm Email Page
 */

import { NextPage } from "next";
import ConfirmEmailContainer from "@/containers/ConfirmEmailContainer";

const ForgotPassword: NextPage = () => {
  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow container">
        <ConfirmEmailContainer />
      </div>
    </main>
  );
};

export default ForgotPassword;
