import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const Descuento: React.FC = () => {
  const { codigoDescuento } = useParams<{ codigoDescuento: string }>();
  const [copiaExitosa, setCopiaExitosa] = useState<string>("");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(codigoDescuento || "")
      .then(() => setCopiaExitosa("Código copiado con éxito"))
      .catch(() => setCopiaExitosa("Error al copiar el código"));
  };

  return (
    <div className="min-h-screen max-w-full pt-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 ">
        <h1 className="text-2xl font-bold text-center text-indigo-600">
          ¡Descuento Confirmado!
        </h1>
        <p className="mt-4 text-center text-lg text-gray-700">
          Para hacer uso de tu descuento del 30%, presenta este ticket en
          recepción.
        </p>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Comparti este código con la recepcionista:
          </p>
          <div className="mt-2 p-3 bg-gray-50 border-2 border-dashed rounded-lg">
            <p className="text-xl font-semibold text-indigo-600">
              {codigoDescuento}
            </p>
          </div>

          <div className="mt-4">
            <button
              onClick={handleCopy}
              className="px-6 py-2 bg-green-400 text-white font-semibold rounded-lg hover:bg-green-500 transition duration-300"
            >
              Copiar código
            </button>
          </div>

          {copiaExitosa && (
            <p className="mt-2 font-semibold text-sm text-green-500">{copiaExitosa}</p>
          )}
        </div>
      </div>
      <div className="pt-8 text-center">
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          {" "}
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Descuento;
