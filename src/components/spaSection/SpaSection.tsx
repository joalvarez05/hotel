import "swiper/css";
import "swiper/css/autoplay";
import { useState } from "react";
import { spaSlides } from "@/data/SpaBanner";
import reseñasData from "@/data/Reseñas";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Heart,
  Users,
  Star,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const amenitiesData = [
  {
    icon: <Heart className="h-6 w-6 text-blue-700" />,
    title: "Masajes Terapéuticos",
    description:
      "Nuestros terapeutas certificados personalizan cada sesión para aliviar tensiones y restaurar el equilibrio de tu cuerpo.",
  },
  {
    icon: <Users className="h-6 w-6 text-blue-700" />,
    title: "Acceso Sin Hospedaje",
    description:
      "Disfruta de todas nuestras instalaciones premium sin necesidad de hospedarte. Perfecto para un día de desconexión y bienestar.",
  },
];

const SpaSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === spaSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? spaSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          Luxe Haven Spa & Wellness
        </h1>
        <p className="text-lg text-blue-700 max-w-2xl mx-auto">
          Tu refugio de bienestar en el corazón de{" "}
          <span className="font-bold">Recoleta</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 order-2 md:order-1">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-7 w-7 text-indigo-600 animate-bounce" />
            <h2 className="text-2xl font-bold text-blue-900">
              Experiencia Premium
            </h2>
          </div>

          <div className="space-y-6">
            {amenitiesData.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <div className="sm:flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 mb-2">
                <Award className="h-5 w-5 text-blue-700" />
                <span className="text-sm font-medium text-gray-700">
                  Premio Excelencia 2025
                </span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 text-yellow-500"
                    fill="#EAB308"
                  />
                ))}
                <span className="ml-2 text-gray-700 font-medium">5/5</span>
              </div>
            </div>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {reseñasData.map((review, index) => (
                <SwiperSlide
                  key={index}
                  className="flex justify-center items-center"
                >
                  <ReviewCard text={review.text} author={review.author} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="order-1 md:order-2 ">
          <div className="relative h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden">
            {spaSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out  ${
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
                  <h2 className="text-3xl font-bold mb-2 text-white">
                    {slide.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {spaSlides.map((_, dotIndex) => (
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
                      to="/spa"
                      title="Ir a obtener descuento"
                      className="px-4 flex items-center py-2 bg-gradient-to-r text-sm sm:text-base  from-blue-500 to-purple-500 rounded-lg text-white font-medium transition-all hover:shadow-lg hover:shadow-blue-500/30"
                    >
                      Obtener descuento
                      <ChevronRight className="w-5 h-5 " />
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
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode; 
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
      <div className="flex items-start gap-3">
        <div className="bg-indigo-100 p-2 rounded-lg">{icon}</div>
        <div>
          <h3 className="font-semibold text-blue-900 mb-1">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ReviewCard: React.FC<{ text: string; author: string }> = ({
  text,
  author,
}) => {
  return (
    <div className="bg-indigo-50 p-4 rounded-lg w-auto mx-auto ">
      <p className="italic text-gray-700 text-sm">{text}</p>
      <p className="text-right mt-2 text-sm font-medium text-blue-700">
        — {author}
      </p>
    </div>
  );
};

export default SpaSection;
