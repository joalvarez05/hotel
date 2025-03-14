import { useState } from "react";
import CodigoQr from "@/components/codigoQr/CodigoQr";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
export default function Spa() {
  const [linkDescuento] = useState("/descuento-masajes-30");

  return (
    <>
      <Header />
      <div className="py-12 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-lg flex flex-col gap-12">
        <div className="text-center font-bold text-xl"></div>
        <div>
          <CodigoQr linkDescuento={linkDescuento} />
        </div>
      </div>
      <Footer />
    </>
  );
}
