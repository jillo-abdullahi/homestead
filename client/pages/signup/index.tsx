import { NextPage } from "next";
import SignUpForm from "@/containers/SignupForm";

const Login: NextPage = () => {
  return (
    <div>
      <main className="bg-gray-100">
        <SignUpForm />
      </main>
    </div>
  );
};

export default Login;
