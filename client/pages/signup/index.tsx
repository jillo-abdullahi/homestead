import { NextPage } from "next";
import SignUpFormContainer from "@/containers/SignupFormContainer";

const Login: NextPage = () => {
  return (
    <div>
      <main className="bg-gray-100">
        <SignUpFormContainer />
      </main>
    </div>
  );
};

export default Login;
