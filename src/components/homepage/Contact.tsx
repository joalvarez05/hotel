import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .max(100, "Máximo 100 caracteres")
    .required("El nombre es requerido"),
  email: yup
    .string()
    .email("Correo inválido")
    .max(256, "Máximo 256 caracteres")
    .required("El correo es requerido"),
  message: yup
    .string()
    .min(5, "El mensaje debe tener al menos 5 caracteres")
    .max(500, "Máximo 500 caracteres")
    .required("El mensaje es requerido"),
});

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [t] = useTranslation("global");

  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitMessage("Enviando...");
    setSubmitStatus("");

    // Crear FormData para web3forms
    const formData = new FormData();
    formData.append("access_key", "8563bba6-aa5b-4520-b8d7-bebaaf8b13ae");
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (responseData.success) {
        setSubmitMessage("¡Mensaje enviado con éxito!");
        setSubmitStatus("success");
        reset();

        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        console.log("Error", responseData);
        setSubmitMessage(
          responseData.message ||
            "Ha ocurrido un error. Por favor, inténtelo de nuevo."
        );
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitMessage("Error de conexión. Por favor, inténtelo más tarde.");
      setSubmitStatus("error");
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6" id="contact">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium" htmlFor="name">
            {t("contact.name")}
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="border rounded p-2 w-full"
            aria-label="Nombre"
            aria-describedby="name-error"
          />
          <p className="text-red-500 text-sm" id="name-error">
            {errors.name?.message}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            aria-label="Correo electrónico"
            aria-describedby="email-error"
            className="border rounded p-2 w-full"
          />
          <p className="text-red-500 text-sm" id="email-error">
            {errors.email?.message}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium" htmlFor="message">
            {t("contact.message")}
          </label>
          <textarea
            {...register("message")}
            className="border rounded p-2 w-full field-sizing-content min-h-20 max-h-40 resize-none"
            rows={4}
            id="message"
            name="message"
            aria-label="Mensaje"
            aria-describedby="message-error"
          ></textarea>
          <p className="text-red-500 text-sm" id="message-error">
            {errors.message?.message}
          </p>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg"
        >
          {t("contact.send")}
        </button>
      </motion.form>

      {submitMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`mt-4 p-3 rounded-md text-center ${
            submitStatus === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : submitStatus === "error"
              ? "bg-red-100 text-red-800 border border-red-300"
              : "bg-blue-100 text-blue-800 border border-blue-300"
          }`}
        >
          {submitStatus === "success" && (
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{submitMessage}</span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{submitMessage}</span>
            </div>
          )}

          {!submitStatus && <span>{submitMessage}</span>}

          {submitStatus === "success" && (
            <p className="text-sm mt-2">
              Redirigiendo a la página principal...
            </p>
          )}
        </motion.div>
      )}
    </section>
  );
};

export default Contact;
