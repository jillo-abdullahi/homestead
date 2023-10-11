import { NextPage } from "next";
import LoginFormContainer from "@/containers/LoginFormContainer";

const Login: NextPage = () => {
  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow container">
        <LoginFormContainer />
      </div>
    </main>
  );
};

export default Login;
