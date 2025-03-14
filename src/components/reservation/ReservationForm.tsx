import { useForm } from "react-hook-form";
import { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Check } from "lucide-react";
import useSearchStore from "@/hooks/useSearchStore.tsx";
import { calculatePrice } from "@/utils/totalPrice";
import toast from "react-hot-toast";
import sonidoConfirmacion from "@/assets/confirmFormSound.mp3";
import { Link } from "react-router-dom";
const schema = yup.object({
  nombre: yup.string().required("El nombre es requerido"),
  apellido: yup.string().required("El apellido es requerido"),
  telefono: yup
    .string()
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .min(8, "Mínimo 8 dígitos")
    .required("El teléfono es requerido"),
  nacionalidad: yup.string().required("La nacionalidad es requerida"),
  tipoDocumento: yup.string().required("El tipo de documento es requerido"),
  numeroDocumento: yup
    .string()
    .min(4, "Mínimo 4 dígitos")
    .max(8, "Maximo 10 dígitos")
    .required("El dni es requerido"),
  email: yup
    .string()
    .email("Ingrese un email válido")
    .required("El email es requerido"),
  peticionesEspeciales: yup.string().max(250, "Maximo 250 caracteres"),
  formaPago: yup.string().required("Seleccione una forma de pago"),
  tipoTarjeta: yup.string().when("formaPago", {
    is: "anticipado",
    then: (schema) => schema.required("Seleccione un tipo de tarjeta"),
    otherwise: (schema) => schema,
  }),
  aceptaTerminos: yup
    .boolean()
    .oneOf([true], "Debe aceptar los términos y condiciones"),
});

type FormData = yup.InferType<typeof schema>;

const ReservationForm = () => {
  const { checkIn, checkOut, guests } = useSearchStore();
  const reserva = sessionStorage.getItem("reserva");
  const reservaParseada = reserva ? JSON.parse(reserva) : null;
  console.log(reservaParseada);
  const { nightQuantity, totalPrice, subTotalPrice, ivaInDollars } =
    calculatePrice(checkIn, checkOut, reservaParseada?.typeRoom.price ?? 0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      formaPago: "tarjeta",
    },
  });
  const roomsQuantity = guests.rooms;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onSubmit = async (data: FormData) => {
    const bookingData = {
      checkIn,
      checkOut,
      peopleQuantity: reservaParseada?.capacity,
      idRoomType: reservaParseada?.id,
      email: data.email,
      roomsQuantity: roomsQuantity,
      specialRequests: data.peticionesEspeciales,
    };

    const formReserva = {
      name: data.nombre,
      lastname: data.apellido,
      phoneNumber: data.telefono,
      dni: data.numeroDocumento,
      email: data.email,
    };

    try {
      const responseTwo = await fetch(
        "https://hotels-1-0.onrender.com/api/visitor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formReserva),
        }
      );
      if (!responseTwo.ok) {
        const error = await responseTwo.json();

        if (error.error && error.message.includes("Email Already Registered")) {
          toast.error(
            "Usuario ya registrado ! Inicia sesión para completar tu reserva"
          );
        }
      }
      const responseOne = await fetch(
        "https://hotels-1-0.onrender.com/api/booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );
      if (!responseOne.ok) {
        const error = await responseOne.json();

        if (
          error.status === 400 &&
          error.message.includes(
            "There are not enough rooms available for booking"
          )
        ) {
          toast.error("Casi ! Esa habitación ya está reservada");
        }
      } else {
        toast.success("Reserva confirmada y formulario enviado con exito!");

        setTimeout(() => {
          audioRef.current?.play();
        }, 600);
        sessionStorage.clear();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <audio ref={audioRef} src={sonidoConfirmacion} preload="auto" />
      {isSubmitting && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-25 flex items-center justify-center z-50">
          <span className="loaderBooking"></span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:flex lg:space-x-8">
          <div className="lg:w-2/3">
            <div className="mb-8">
              <h2 className="text-2xl font-medium text-gray-700 mb-2">
                Tus Datos
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Datos del titular de la reserva.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    {...register("nombre")}
                    className={`w-full p-2 border rounded-md ${
                      errors.nombre ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="apellido"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    {...register("apellido")}
                    className={`w-full p-2 border rounded-md ${
                      errors.apellido ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.apellido && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.apellido.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  {...register("telefono")}
                  className={`w-full p-2 border rounded-md ${
                    errors.telefono ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.telefono && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.telefono.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="nacionalidad"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nacionalidad
                  </label>
                  <select
                    id="nacionalidad"
                    {...register("nacionalidad")}
                    className={`w-full p-2 border rounded-md ${
                      errors.nacionalidad ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Seleccione Nacionalidad</option>
                    <option value="argentina">Argentina</option>
                    <option value="brasil">Brasil</option>
                    <option value="chile">Chile</option>
                    <option value="colombia">Colombia</option>
                    <option value="mexico">México</option>
                    <option value="peru">Perú</option>
                    <option value="uruguay">Uruguay</option>
                    <option value="venezuela">Venezuela</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.nacionalidad && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.nacionalidad.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="tipoDocumento"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tipo Documento
                  </label>
                  <select
                    id="tipoDocumento"
                    {...register("tipoDocumento")}
                    className={`w-full p-2 border rounded-md ${
                      errors.tipoDocumento
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Elegir</option>
                    <option value="dni">DNI</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="cedula">Cédula de Identidad</option>
                  </select>
                  {errors.tipoDocumento && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.tipoDocumento.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="numeroDocumento"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Número de Documento
                </label>
                <input
                  type="text"
                  id="numeroDocumento"
                  {...register("numeroDocumento")}
                  className={`w-full p-2 border rounded-md ${
                    errors.numeroDocumento
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.numeroDocumento && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.numeroDocumento.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Dirección de e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`w-full p-2 border rounded-md ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="peticionesEspeciales"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Peticiones Especiales
                </label>
                <textarea
                  id="peticionesEspeciales"
                  {...register("peticionesEspeciales")}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md field-sizing-content min-h-20 max-h-40 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Forma de Pago */}
            <div className="mb-8">
              <h2 className="text-2xl font-medium text-gray-700 mb-4">
                Forma de Pago
              </h2>

              <div className="border border-gray-200 rounded-md mb-4">
                <div className="p-4">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="anticipado"
                      value="anticipado"
                      {...register("formaPago")}
                      className="mt-1 mr-2"
                    />
                    <div>
                      <label
                        htmlFor="anticipado"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Pago Anticipado 100%
                      </label>
                      <p className="text-xs text-gray-500">
                        Confirme la reserva y asegure disponibilidad
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pl-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Seleccione Tarjeta
                    </p>
                    <div className="flex space-x-6">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="mastercard"
                          value="mastercard"
                          {...register("tipoTarjeta")}
                          className="mr-2"
                        />
                        <label
                          htmlFor="mastercard"
                          className="flex items-center"
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                            alt="Mastercard"
                            className="h-8"
                            loading="lazy"
                          />
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="visa"
                          value="visa"
                          {...register("tipoTarjeta")}
                          className="mr-2"
                        />
                        <label htmlFor="visa" className="flex items-center">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                            alt="Visa"
                            className="h-6"
                            loading="lazy"
                          />
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="amex"
                          value="amex"
                          {...register("tipoTarjeta")}
                          className="mr-2"
                        />
                        <label htmlFor="amex" className="flex items-center">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/200px-American_Express_logo_%282018%29.svg.png"
                            alt="American Express"
                            className="h-6"
                            loading="lazy"
                          />
                        </label>
                      </div>
                    </div>
                    {errors.tipoTarjeta && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.tipoTarjeta.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="paypal"
                      value="paypal"
                      {...register("formaPago")}
                      className="mt-1 mr-2"
                    />
                    <div>
                      <label
                        htmlFor="paypal"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Pago con PayPal
                      </label>
                      <p className="text-xs text-gray-500">
                        Pague de forma segura utilizando su cuenta de PayPal
                      </p>
                      <div className="mt-2">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png"
                          alt="PayPal"
                          className="h-8"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="aceptaTerminos"
                  {...register("aceptaTerminos")}
                  className="mr-2"
                />
                <label
                  htmlFor="aceptaTerminos"
                  className="text-sm text-gray-700"
                >
                  Acepto términos y condiciones
                </label>
                {errors.aceptaTerminos && (
                  <p className="text-red-500 text-xs ml-2">
                    {errors.aceptaTerminos.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="border border-gray-200 rounded-md p-4 mb-4">
              <div className="flex items-start mb-4">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Hotel"
                  loading="lazy"
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    LUXE HAVEN RECOLETA
                  </h3>
                  <div className="flex text-yellow-400 mb-1">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    CANT. DE NOCHES
                  </span>
                  <span className="text-sm font-medium">{nightQuantity}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">LLEGADA</span>
                  <span className="text-sm">{checkIn}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">SALIDA</span>
                  <span className="text-sm">{checkOut}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">
                    POLÍTICA DE CANCEL.
                  </span>
                  <span className="text-sm text-red-500">No Reembolsable</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Personas</span>
                  <span className="text-sm">
                    {guests.adults} Adultos{" "}
                    {guests.children > 0 ? <>{guests.children}- Niño/s</> : ""}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    HABITACIÓN
                  </span>
                  <button className="text-blue-500 text-sm">
                    <span>-</span>
                  </button>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{reservaParseada?.name}</span>
                  <span className="text-sm"></span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{nightQuantity} noches</span>
                  <span className="text-sm">
                    USD {reservaParseada?.typeRoom.price}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-sm font-semibold">
                    TOTAL HABITACIÓN:
                  </span>
                  <span className="text-sm">USD {subTotalPrice}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">Subtotal:</span>
                  <span className="text-sm">USD {subTotalPrice}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">Impuestos:</span>
                  <span className="text-sm">USD {ivaInDollars}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-bold">
                  <span>USD {totalPrice}</span>
                  <span></span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-8 mt-5">
              <button
                type="submit"
                className="px-4 py-2 w-full cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Confirmar reserva
              </button>
            </div>
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white p-1 rounded-md mr-2">
                    <Check size={16} />
                  </div>
                  <span className="text-sm font-medium text-blue-700">
                    TAX FREE
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                Disponible para extranjeros no residentes
              </p>
              <Link to="/contacto" className="text-blue-500 text-xs">
                + Click aquí
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
