import { NextPage } from "next";
import LoginFormContainer from "@/containers/LoginFormContainer";

const Login: NextPage = () => {
  return (
    <div>
      <main className="bg-gray-100">
        <LoginFormContainer />
      </main>
    </div>
  );
};

export default Login;
