// import { motion } from "framer-motion";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Hero from "../components/homepage/Hero";
import ServiceCard from "../components/homepage/ServiceCard";
import RoomListing from "@/components/rooms/RoomsListing";
import FAQ from "../components/homepage/FAQ";
import Weather from "../components/Weather";
import HotelCard from "../components/homepage/HotelCard";
import HotelBanner from "../components/homepage/HotelBanner";
import SpaSection from "@/components/spaSection/SpaSection";

const Home: React.FC = () => {
  return (
    <div className="bg-white text-black min-h-screen ">
      <Header />
      <Hero />
      {/* <SearchBar/> */}
      <section className="pt-12 px-4 sm:px-8 bg-gray-50">
        <RoomListing />
      </section>
      <section className="pb-12 px-4 sm:px-8 bg-gray-100">
        <ServiceCard />
      </section>
      <section className="pb-12">
        <HotelBanner />
      </section>
      <section className="pb-12 px-4 sm:px-8 flex justify-center">
        <div className="p-4 sm:p-12 max-w-7xl bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg ">
          <SpaSection />
        </div>
      </section>
      <section className="pb-12 lg:max-w-full">
        <Weather />
      </section>
      <FAQ />
      {/* Sección de Ofertas de Hoteles */}
      <section className="py-12" id="ofertas">
        <HotelCard />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
