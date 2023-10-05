import type { NextPage } from "next";
import Head from "next/head";
import HomePageContainer from "@/containers/HomePageContainer";
import PropertyListing from "@/components/PropertyListing";
import { listings } from "@/utils/dummyListings";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Homestead</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white">
        <HomePageContainer />
        {listings.length > 0 && (
          <div className="container">
            <div className="text-2xl font-bold text-gray-700 mt-7">
              Recent Properties
            </div>
            <div className="text-gray-500 text-sm font-medium">
              The surroundings are best for your lifestyle
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {listings.map(
                ({
                  id,
                  location,
                  images,
                  bathrooms,
                  bedrooms,
                  area,
                  title,
                  price,
                }) => (
                  <PropertyListing
                    key={id}
                    title={title}
                    location={location}
                    price={price}
                    image={images[0].original}
                    id={id}
                    bedrooms={bedrooms}
                    bathrooms={bathrooms}
                    area={area}
                  />
                )
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
