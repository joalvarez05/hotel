import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./form.css";
import fetchRooms from "@/services/fetchRooms";

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  habitacion: string;
  dni: string;
}

interface Room {
  id: number;
  roomNumber: string;
  typeRoom: {
    name: string;
  };
  roomStatus: boolean | null;
}

const schema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es requerido"),
  apellido: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Ingrese un email válido")
    .required("El email es requerido"),
  telefono: Yup.string()
    .required("El teléfono es requerido")
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .min(6, "El teléfono debe tener mínimo 6 números.")
    .max(15, "El teléfono debe tener máximo 15 números."),
  habitacion: Yup.string().required("Debes seleccionar una habitación"),
  dni: Yup.string()
    .required("El dni es requerido")
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .min(5, "El DNI debe tener al menos 5 caracteres")
    .max(10, "El DNI no puede tener más de 10 caracteres"),
});

const Form: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchHabitaciones = async () => {
      setIsLoading(true);
      const habitaciones: Room[] = await fetchRooms("rooms");
      setRooms(habitaciones);
      setIsLoading(false);
    };
    fetchHabitaciones();
  }, []);

  const onSubmit = (data: FormData) => {
    console.log("Datos enviados:", data);
  };
  const nombreEmpleado = sessionStorage.getItem("name");
  const apellidoEmpleado = sessionStorage.getItem("lastname");
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-center pb-6 pt-2 font-bold">
        Empleado: <span className="font-medium">{nombreEmpleado}</span>{" "}
        <span className="font-medium">{apellidoEmpleado}</span>
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
            Registrar Huésped
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {[
              { label: "Nombre", name: "nombre" },
              { label: "Apellido", name: "apellido" },
              { label: "DNI", name: "dni" },
              { label: "Email", name: "email", type: "email" },
              { label: "Teléfono", name: "telefono", type: "tel" },
            ].map(({ label, name, type = "text" }) => (
              <div className="mt-1" key={name}>
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type={type}
                  {...register(name as keyof FormData)}
                  className="block w-full px-3 py-2 border rounded-md"
                />
                {errors[name as keyof FormData] && (
                  <p className="text-red-600 text-sm">
                    {errors[name as keyof FormData]?.message}
                  </p>
                )}
              </div>
            ))}
            <div className="mt-1">
              <label className="block text-sm font-medium text-gray-700">
                Habitación
              </label>
              <select
                {...register("habitacion")}
                className="block w-full px-3 py-2 border rounded-md"
              >
                <option value="">Seleccionar habitación</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    Habitación {room.roomNumber} - {room.typeRoom.name}
                  </option>
                ))}
              </select>
              {errors.habitacion && (
                <p className="text-red-600 text-sm">
                  {errors.habitacion.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 cursor-pointer bg-indigo-600 text-white rounded-md"
            >
              Registrar Huésped
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md scrollable-container">
          <h2 className="text-xl font-semibold text-black mb-4">
            Lista de Habitaciones
          </h2>
          {isLoading ? (
            <span className="font-medium">Cargando habitaciones ...</span>
          ) : (
            <div className="space-y-5">
              {rooms.length > 0
                ? rooms.map((room) => (
                    <div
                      key={room.id}
                      className={`p-4 flex justify-between rounded-lg space-y-1 ${
                        room.roomStatus === null ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <div>
                        <h3 className="font-semibold text-black">
                          Habitación {room.roomNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Tipo: {room.typeRoom.name}
                        </p>
                        <p className="text-sm font-medium text-black">
                          Estado:{" "}
                          {room.roomStatus === null
                            ? "Disponible"
                            : room.roomStatus === true
                            ? "Ocupada"
                            : "En mantenimiento"}
                        </p>
                      </div>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded cursor-pointer">
                        {room.roomStatus ? "Check Out" : "Check In"}
                      </button>
                    </div>
                  ))
                : "No hay habitaciones cargadas"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
