import { Routes, Route } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";
import HomePage from "../pages/Homepage";
import Dashboard from "../pages/Dashboard.js";
import Rooms from "../pages/Rooms.js";
import Contacto from "../pages/Contacto.js";
import Descuento from "@/pages/Descuento.jsx";
import Spa from "@/pages/Spa";
import Confirmation from "@/pages/Confirmation";
import Error from "@/pages/Error";
import ProtectedRoute from "./ProtectedRoute";
import { useTranslation } from "react-i18next";

const AppRoutes = () => {
  const { i18n } = useTranslation("global");
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "es";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/spa" element={<Spa />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route
        path="/descuento-masajes-30/:codigoDescuento"
        element={<Descuento />}
      />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Navigate to="/error" replace />} />
    </Routes>
  );
};

export default AppRoutes;
