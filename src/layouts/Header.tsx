import { useEffect, useState, useRef } from "react";
import { Menu, X, Heart, Globe } from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation("global");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState("");
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setIsLanguageOpen(false);
  };

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
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Luxe Haven
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {/* Selector de idioma */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex cursor-pointer items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Globe size={20} />
                <span>{t("header.language")}</span>
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                  <button
                    className="block px-4 py-2 text-gray-700 w-full cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => changeLanguage("en")}
                  >
                    🇬🇧 {t("header.english")}
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 w-full cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => changeLanguage("es")}
                  >
                    🇪🇸 {t("header.spanish")}
                  </button>
                </div>
              )}
            </div>
            <Link
              to="/error"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Heart size={20} />
              <span>{t("favorites.favorites")}</span>
            </Link>
            {usuario ? (
              <>
                <FaRegUserCircle size={24} />
                <Link
                  to={role === "RECEPTIONIST" ? "/dashboard" : "/userProfile"}
                  className="font-medium"
                >
                  {usuario}
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t("login.login")}
              </Link>
            )}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex cursor-pointer items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Menu size={20} />
                <span>{t("option.option")}</span>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {t("option.home")}
                  </Link>
                  <a
                    href="#galeria"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {t("option.gallery")}
                  </a>
                  <Link
                    to="/contacto"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {t("option.contact")}
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  {usuario ? (
                    <button
                      type="button"
                      title="Deslogearse"
                      className="px-4 py-2 text-blue-600 w-full flex cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={handleLogout}
                    >
                      {t("login.logout")}
                    </button>
                  ) : (
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors mt-3"
                    >
                      {t("option.register")}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Botón menú hamburguesa en móviles */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Globe size={20} />
                <span>{t("header.language")}</span>
              </button>
              {isLanguageOpen && (
                <div className=" relative left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => changeLanguage("en")}
                  >
                    🇬🇧 {t("header.english")}
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => changeLanguage("es")}
                  >
                    🇪🇸 {t("header.spanish")}
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Heart size={20} />
              <a
                href="#"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t("favorites.favorites")}
              </a>
            </div>

            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              {t("option.home")}
            </Link>
            <Link
              to="/contacto"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              {t("option.contact")}
            </Link>

            <div className="border-t border-gray-200 pt-3 flex justify-between items-center py-1 z-60">
              {usuario ? (
                <button className="text-blue-600" onClick={handleLogout}>
                  {t("login.logout")}
                </button>
              ) : (
                <>
                  <div>
                    <Link
                      to="/register"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {t("login.register")}
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {t("login.login")}
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
