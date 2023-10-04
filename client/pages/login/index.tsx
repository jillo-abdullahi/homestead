import { NextPage } from "next";
import LoginForm from "@/containers/LoginForm";

const Login: NextPage = () => {
  return (
    <div>
      <main className="bg-gray-100">
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;
