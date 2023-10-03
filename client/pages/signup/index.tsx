import { NextPage } from "next";
import SignUpForm from "@/containers/SignupForm";

const Login: NextPage = () => {
  return (
    <div>
      <main className="bg-violet-100">
        <SignUpForm />
      </main>
    </div>
  );
};

export default Login;
