import { NextPage } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import ListingDetailsContainer from "@/containers/ListingDetailsContainer";

const Login: NextPage = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-grow container">
        <Navbar />
        <ListingDetailsContainer />
      </div>
      <Footer />
    </main>
  );
};

export default Login;
