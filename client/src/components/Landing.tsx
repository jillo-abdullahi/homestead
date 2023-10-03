import Image from "next/image";
import Navbar from "@/components/Navbar";
/**
 * Landing page component.
 * Top section of the page with a welcome message.
 * @returns
 */

const Landing: React.FC = () => (
  <div className="flex flex-col items-center justify-start min-h-screen">
    <div className="w-full pb-7">
      <Navbar />
    </div>

    <div className="w-full grid grid-cols-12 gap-x-6 h-[36rem]">
      <div className="col-span-6 h-full flex flex-col items-start justify-center">
        <div className="text-6xl font-bold text-gray-700 mb-4">
          Find your dream home with{" "}
          <span className="text-violet-700">Homestead</span>.
        </div>
        <div className="text-lg text-gray-500">
          Connecting you with homes that match your lifestyle.
        </div>
      </div>
      <div className="col-span-6">
        <Image src="/landing-image.svg" alt="landing image" width={800} height={800} />
      </div>
    </div>
  </div>
);

export default Landing;
