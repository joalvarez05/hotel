const API_HOST = import.meta.env.VITE_API_HOST;

const fetchLogin = async (url, data) => {
  try {
    const response = await fetch(`${API_HOST}/api/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: data.identifier,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();

      let errorMessage = "Error interno del servidor, intenta más tarde.";

      if (error.error) {
        if (error.message.includes("Bad credentials")) {
          errorMessage =
            "Las credenciales no coinciden, por favor revisa tus datos.";
        } else if (error.error.includes("eption")) {
          errorMessage = "Intenta más tarde, hay un problema temporal.";
        } else {
          errorMessage = "Hubo un error desconocido, intenta más tarde.";
        }
      } else {
        errorMessage = "En este momento no podemos procesar tu solicitud.";
      }

      return { success: false, errorMessage };
    }

    const { token, name, lastname, role } = await response.json();
    Object.entries({ token, name, lastname, role }).forEach(([key, value]) =>
      sessionStorage.setItem(key, value)
    );

    return { success: true, role: role };
  } catch (error) {
    console.error("Error en fetchLogin:", error);
    return {
      success: false,
      errorMessage: "Ocurrió un error inesperado. Inténtalo más tarde.",
    };
  }
};

export default fetchLogin;
