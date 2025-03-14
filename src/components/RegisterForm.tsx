import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import fetchRegister from "@/services/fetchRegister";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { BackgroundBeams } from "@/assets/styles/bgLogin/BackgroundBeams";

interface IFormInputs {
  name: string;
  username: string;
  lastname: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  dni: string;
}

const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  username: yup.string().required("El nombre es requerido"),
  lastname: yup.string().required("El apellido es requerido"),
  address: yup.string().required("La dirección es requerido"),
  email: yup
    .string()
    .email("Ingrese un email válido")
    .required("El email es requerido"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .min(8, "Mínimo 8 dígitos")
    .required("El teléfono es requerido"),
  dni: yup
    .string()
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .min(7, "Mínimo 7 dígitos")
    .max(8, "Maximo 8 dígitos")
    .required("El dni es requerido"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .required("La contraseña es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirme su contraseña"),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const url = "auth/register";
  const onSubmit = async (data: IFormInputs) => {
    const registro = await fetchRegister(url, data);
    if (registro.success) {
      toast.success("Registro exitoso");
      navigate("/login");
    } else {
      toast.error(registro.errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <BackgroundBeams className="min-h-[162vh]" />
      <div className="my-4 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="pt-6 pb-8 sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-center text-3xl font-extrabold text-blue-600">
                Crear una cuenta
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Ingrese aquí
                </Link>
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <div className="mt-1">
                  <input
                    {...register("name")}
                    type="text"
                    name="name"
                    id="name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido
                </label>
                <div className="mt-1">
                  <input
                    {...register("lastname")}
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.lastname && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de Usuario
                </label>
                <div className="mt-1">
                  <input
                    {...register("username")}
                    type="text"
                    name="username"
                    id="username"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="dni"
                  className="block text-sm font-medium text-gray-700"
                >
                  DNI
                </label>
                <div className="mt-1">
                  <input
                    {...register("dni")}
                    type="text"
                    name="dni"
                    id="dni"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.dni && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.dni.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección
                </label>
                <div className="mt-1">
                  <input
                    {...register("address")}
                    type="text"
                    name="address"
                    id="address"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.address && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    id="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <div className="mt-1">
                  <input
                    {...register("phoneNumber")}
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <div className="mt-1">
                  <input
                    {...register("password")}
                    type="password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmar Contraseña
                </label>
                <div className="mt-1">
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ${
                    isSubmitting ? "cursor-wait" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loader"></span>
                    </>
                  ) : (
                    "Registrarse"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
