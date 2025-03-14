import React from "react";
import { Link } from "react-router-dom";
const Error: React.FC = () => {
  return (
    <>
      <div className="bg-dark error_altura blanco pt-48 bg-gray-200">
        <main className="px-2">
          <div className="error_container">
            <div className="error_code">
              <p>4</p>
              <p className="text-black">0</p>
              <p>4</p>
            </div>
            <div className="error_title">Página no encontrada</div>
            <div className="error_description">
              Parece que no podemos encontrar esa página. Puede que se haya
              eliminado.
            </div>
            <Link to="/" className="action bg-blue-600 text-white">
              Volver al inicio
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default Error;
