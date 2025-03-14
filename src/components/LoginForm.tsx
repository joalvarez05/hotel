import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "@/assets/styles/bgLogin/BackgroundBeams";
import fetchLogin from "@/services/fetchLogin";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface ILoginInputs {
  identifier: string;
  password: string;
}

const schema = yup.object().shape({
  identifier: yup
    .string()
    .required("El email o nombre de usuario es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginInputs>({
    resolver: yupResolver(schema),
  });
  const [t] = useTranslation("global");
  const url = "auth/login";

  const onSubmit = async (data: ILoginInputs) => {
    const logIn = await fetchLogin(url, data);
    console.log(logIn);
    if (logIn.success) {
      toast.success("Inicio de sesión exitoso");
      if (logIn.role === "RECEPTIONIST") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } else {
      toast.error(logIn.errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <BackgroundBeams className="hidden lg:block" />
      <div className="my-4 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md pb-6">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-600">
              Luxe Heaven
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                {t("loginform.email")}
              </label>
              <div className="mt-1">
                <input
                  {...register("identifier")}
                  autoComplete="username"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.identifier && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.identifier.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {t("loginform.password")}
              </label>
              <div className="mt-1">
                <input
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  {t("loginform.remindme")}
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ${
                  isSubmitting ? "cursor-wait" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="loader"></span>
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </button>
            </div>
          </form>
          <div className="text-sm text-center mt-4">
            <a
              href="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t("loginform.forgotpassword")}
            </a>
            <p className="mt-8 text-center text-sm text-gray-600">
              {t("loginform.notcount")}{" "}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {t("loginform.register")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
