import { NextPage } from "next";
import SignUpFormContainer from "@/containers/SignupFormContainer";

const Login: NextPage = () => {
  return (
    <main className="bg-gray-100">
      <div className="container">
        <SignUpFormContainer />
      </div>
    </main>
  );
};

export default Login;
