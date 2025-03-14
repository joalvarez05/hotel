import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Gift, Clock, MapPin, Calendar, Info, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface CodigoQr {
  linkDescuento: string;
}

interface InfoCodigoQr {
  title: string;
  subTitulo: string;
  parrafo: string;
  info: string;
}

const infoCodigoQr: InfoCodigoQr = {
  title: "Oferta Especial",
  subTitulo: "Escaneando nuestro QR te regalamos un 30% de descuento",
  parrafo: "En tus primeros masajes. ¡No dejes pasar esta oportunidad única!",
  info: "Escanea con la cámara de tu móvil para obtener tu descuento",
};

const CodigoQr: React.FC<CodigoQr> = () => {
  const [discountCode, setDiscountCode] = useState<string>("");
  const [t] = useTranslation("global");
  const daysLeft = 7;

  useEffect(() => {
    const generateDiscountCode = () => {
      return Math.random().toString(36).substr(2, 6).toUpperCase();
    };
    setDiscountCode(generateDiscountCode());
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:max-w-xl transform transition duration-500 hover:scale-105">
      <div className="relative">
        <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rounded-bl-lg font-semibold text-sm z-10">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>¡Solo {daysLeft} días!</span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-indigo-600 animate-bounce" />
            <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
              {infoCodigoQr.title}
            </div>
          </div>

          <h2 className="mt-2 text-xl font-bold text-gray-900 text-center">
            {infoCodigoQr.subTitulo}
          </h2>

          <p className="mt-2 text-gray-600 text-center">
            {infoCodigoQr.parrafo}
          </p>

          <div className="mt-4 bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-500">
            <div className="flex items-start gap-2">
              <span className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0 hidden sm:block md:block lg:block xl:block" />
              <p className="text-indigo-800 text-sm">
                <span className="font-semibold">{t("qrcode.textone")}</span>
              </p>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 relative">
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-gray-800">
                {t("qrcode.texttwo")}
              </div>
              <QRCodeSVG
                value={`http://localhost:5173/descuento-masajes-30/${discountCode}`}
                size={128}
                bgColor={"#ffffff"}
                fgColor={"#4f46e5"}
                level={"H"}
              />
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            {infoCodigoQr.info}
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold text-gray-800 flex items-center gap-1">
              <Info className="h-4 w-4 text-indigo-500" />
              <span>{t("qrcode.textthree")}</span>
            </h3>
            <ul className="text-sm text-gray-600 space-y-1.5">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t("qrcode.textfour")}</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t("qrcode.textfive")}</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t("qrcode.textsix")}</span>
              </li>
            </ul>
          </div>

          {/* Información adicional */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span className="font-medium text-gray-600">
                {t("qrcode.street")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-medium text-gray-600">
                {t("qrcode.week")}: 10am-6pm
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to={`/descuento-masajes-30/${discountCode}`}
              aria-label="Link para conseguir descuento spa"
              title="Conseguir descuento"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <span>{t("qrcode.book")}</span>
              <span className="text-xs bg-white text-green-600 bg-opacity-20 px-2 py-0.5 rounded">
                30% OFF
              </span>
            </Link>
            <p className="mt-2 text-xs text-gray-500">
              {t("qrcode.textseven")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodigoQr;
