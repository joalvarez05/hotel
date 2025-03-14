import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState("");
  useEffect(() => {
    const nombre = sessionStorage.getItem("name");
    const apellido = sessionStorage.getItem("lastname");

    if (nombre && apellido) {
      setUsuario(`${nombre} ${apellido}`);
    }
  }, []);
  const role = sessionStorage.getItem("role");
  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("Sesión cerrada correctamente");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50"
      id="#top"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                Luxe Haven
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/#"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Heart size={20} />
              <span>Favoritos</span>
            </a>
            {usuario ? (
              <>
                <FaRegUserCircle size={24} />
                <Link
                  to={role === "RECEPTIONIST" ? "/dashboard" : "/userProfile"}
                  className="font-medium disabled "
                >
                  {usuario}
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Iniciar sesión
              </Link>
            )}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex cursor-pointer items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Menu size={20} />
                <span>Menú</span>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Inicio
                  </Link>
                  <a
                    href="#galeria"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Galería
                  </a>
                  <Link
                    to="/contacto"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Contacto
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  {usuario ? (
                    <button
                      type="button"
                      title="Deslogearse"
                      className="px-4 py-2 text-blue-600 w-full flex cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  ) : (
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors mt-3"
                    >
                      Registrate
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Heart size={20} />
              <span>Favoritos</span>
            </a>
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              Inicio
            </Link>
            <a
              href="#galeria"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              Galería
            </a>
            <Link
              to="/contacto"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contacto
            </Link>
            <div className="border-t border-gray-200 pt-3 flex justify-between items-center py-1">
              {usuario ? (
                <div className="flex space-x-2">
                  <FaRegUserCircle size={24} />
                  <Link to="#" className="font-medium disabled ">
                    {usuario}
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Iniciá sesión
                </Link>
              )}
              {usuario ? (
                <button
                  type="button"
                  className="text-blue-600"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              ) : (
                <Link
                  to="/register"
                  className="block text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Registrate
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
