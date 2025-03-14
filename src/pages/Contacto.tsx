import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Contact from "@/components/homepage/Contact";
import { motion } from "framer-motion";
const Contacto = () => {
  return (
    <>
      <Header />
      <div className="p-8 rounded-lg shadow-md w-full mx-auto my-16">
        <h1 className="font-bold text-2xl text-blue-600 text-center mt-10">
          Luxe Haven | Contacto
        </h1>
        <div className="grid md:grid-cols-2 gap-10 mx-auto max-w-4xl items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg leading-relaxed text-slate-500 mt-3">
              Estamos aquí para ayudarte. <br />
              Rellena el formulario o envíanos un email o llámanos.
            </p>
            <div className="mt-5">
              <div className="flex items-center mt-2 space-x-2 text-gray-600">
                <a
                  href="https://maps.app.goo.gl/be3bVWGhK7ju2bzC6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                >
                  <span>Calle ficticia 2355, Recoleta, C1014ACP</span>
                </a>
              </div>
              <div className="flex items-center mt-2 space-x-2 text-gray-600">
                <a
                  href="mailto:luxehaven@contacto.com"
                  className="hover:text-blue-500"
                >
                  luxehaven@contacto.com
                </a>
              </div>
              <div className="flex items-center mt-2 space-x-2 text-gray-600">
                <a
                  href="tel:+54 (9011) 1234 567"
                  className="hover:text-blue-500"
                >
                  +54 (011) 1234 567
                </a>
              </div>
            </div>
          </motion.div>
          <div>
            <Contact />
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
            Ubicación
          </h2>
          <p className="text-lg font-semibold text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Encuéntranos fácilmente en el corazón de Recoleta, Buenos Aires.
            Estamos ubicados en una de las zonas más emblemáticas de la ciudad,
            rodeados de cultura, historia y excelentes conexiones.
          </p>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1234.7929356020893!2d-58.38880786249812!3d-34.588944528226406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca99c609fc2f%3A0x392ca99351808a75!2sRecoleta%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1740431473590!5m2!1ses-419!2sar"
              width="800"
              height="300"
              allowFullScreen
              className="rounded-lg shadow-lg brightness-75 hover:brightness-100 duration-300 border-2 border-gray-200"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contacto;