import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SearchInputField from "@/components/inputFields/SearchInputField";

/**
 * Landing page component.
 * Top section of the page with a welcome message.
 * @returns
 */

const Landing: React.FC = () => (
  <div className="flex flex-col items-center justify-start container">
    <div className="w-full pb-2">
      <Navbar isLoggedin={true} />
    </div>

    <div
      className="w-full flex justifif-start items-center rounded-xl p-10 bg-violet-100 h-[30rem]"
      style={{
        background: "url('/bg-intro.jpeg') no-repeat center center",
        backgroundSize: "cover",
      }}
    >
      <div className="col-span-6 h-full flex flex-col items-start justify-center w-full md:w-1/2">
        <div className="text-4xl font-bold text-gray-700 mb-4">
          Find your dream home with{" "}
          <span className="text-violet-700">Homestead</span>.
        </div>

        <div className="mt-5 w-full">
          <SearchInputField placeholder="Search for a location, town, or estate" />
        </div>
      </div>
      <div className="col-span-6"></div>
    </div>
  </div>
);

export default Landing;
