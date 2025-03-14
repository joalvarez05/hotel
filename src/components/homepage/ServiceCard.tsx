import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ServiceCard, defaultServices } from "../../data/Services";
import { Link } from "react-router-dom";

interface ServiceCardsProps {
  services?: ServiceCard[];
}

const ServiceCards: React.FC<ServiceCardsProps> = ({
  services = defaultServices,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <div className="max-w-6xl mx-auto p-4" id="galeria">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-auto">
        {services.map((service, index) => {
          return (
            <motion.div
              ref={ref}
              key={index}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105
                ${index === 0 ? "row-span-2 col-span-1" : "col-span-1"}
              `}
            >
              <div
                className={`w-full bg-cover bg-center ${
                  index === 0 ? "h-full" : "aspect-[4/3]"
                }`}
                style={{ backgroundImage: `url(${service.image})` }}
              />
              {/* Capa de superposición oscura con degradado */}
              <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/10 to-transparent transition-opacity group-hover:bg-black/40" />

              {/* Título del servicio */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold text-center px-4">
                  {service.title}
                </h3>
              </div>

              {/* Enlace clickeable */}
              <Link
                to={service.link}
                title={service.title}
                className="absolute inset-0"
                aria-label={`View ${service.title}`}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceCards;
