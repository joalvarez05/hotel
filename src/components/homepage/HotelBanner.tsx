import { useState } from "react";
import { hotelSlides } from "@/data/HotelBanner";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { FaWifi, FaSwimmingPool, FaUtensils } from "react-icons/fa";
import {
  MdElectricalServices,
  MdFitnessCenter,
  MdSpa,
  MdMoreHoriz,
} from "react-icons/md";
import { BsHouseDoor } from "react-icons/bs";
import { Link } from "react-router-dom";
import useScrollAnimation from "@/hooks/useInView";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function HotelBanner() {
  const { t } = useTranslation("global");

  const { ref, inView } = useScrollAnimation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const amenities = [
    {
      icon: <FaWifi className="text-indigo-400 text-xl" />,
      name: t("hotelbanner.wifi"),
    },
    {
      icon: <FaSwimmingPool className="text-indigo-400 text-xl" />,
      name: t("hotelbanner.pool"),
    },
    {
      icon: <BsHouseDoor className="text-indigo-400 text-xl" />,
      name: t("hotelbanner.workspace"),
    },
    {
      icon: <FaUtensils className="text-indigo-400 text-xl" />,
      name: t("hotelbanner.breakfast"),
    },
    {
      icon: <MdElectricalServices className="text-purple-400 text-xl" />,
      name: t("hotelbanner.energy"),
    },
    {
      icon: <MdFitnessCenter className="text-purple-400 text-xl" />,
      name: t("hotelbanner.gym"),
    },
    {
      icon: <MdSpa className="text-purple-400 text-xl" />,
      name: t("hotelbanner.spa"),
    },
    {
      icon: <MdMoreHoriz className="text-purple-400 text-xl" />,
      name: t("hotelbanner.services"),
    },
  ];
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === hotelSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? hotelSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 2 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4 md:p-8"
    >
      <div className="w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-slate-900 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center ">
            <div className="mb-12 text-center sm:text-start">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {t("hotelbanner.textone")}
              </h1>
              <p className="text-slate-400 text-lg mb-8">
                {t("hotelbanner.texttwo")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-3">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-2 group-hover:bg-blue-600 transition-colors duration-300">
                    <div className="text-blue-400 group-hover:text-white transition-colors duration-300">
                      {amenity.icon}
                    </div>
                  </div>
                  <span className="text-sm text-slate-300">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 2, delay: 0.1 }}
            className="relative h-full min-h-[400px] lg:min-h-[600px]"
          >
            {hotelSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <h2 className="text-3xl font-bold mb-2">
                    {t(`spaSlidesone.title${index + 1}`)}
                  </h2>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {hotelSlides.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => goToSlide(dotIndex)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            dotIndex === currentSlide
                              ? "bg-blue-500 w-8"
                              : "bg-white/50 hover:bg-white/80"
                          }`}
                          aria-label={`Go to slide ${dotIndex + 1}`}
                        />
                      ))}
                    </div>
                    <Link
                      to="/rooms"
                      title="Ir a reservar una habitación"
                      className="px-4 flex py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium transition-all hover:shadow-lg hover:shadow-blue-500/30"
                    >
                      {t("hotelbanner.book")}
                      <ChevronRight className="w-5 h-5 align-middle" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-all"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-all"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default HotelBanner;
