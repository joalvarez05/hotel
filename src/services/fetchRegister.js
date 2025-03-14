const API_HOST = import.meta.env.VITE_API_HOST;

const fetchRegister = async (url, data) => {
  try {
    const response = await fetch(`${API_HOST}/api/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      let errorMessage = "";
      if (error.error) {
        if (error.message.includes("already exists")) {
          errorMessage = "Usuario ya registrado, intenta nuevamente.";
        } else if (error.message.includes("internal_server_error")) {
          errorMessage = "Intenta más tarde, hay un problema temporal.";
        } else {
          errorMessage = "Error al registrar usuario. Intentalo más tarde";
        }
      } else {
        errorMessage = "En este momento no podemos procesar tu solicitud.";
      }
      return { success: false, errorMessage };
    }

    return { success: true };
  } catch (error) {
    console.error("Error en fetchRegister:", error);
    return {
      success: false,
      errorMessage: "Ocurrió un error inesperado. Inténtalo más tarde.",
    };
  }
};
export default fetchRegister;
