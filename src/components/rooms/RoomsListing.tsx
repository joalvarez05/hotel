import { Users, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "../homepage/SearchBar";
import useSearchStore, { Room } from "@/hooks/useSearchStore";
import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useInView.ts";
import { useNavigate } from "react-router-dom";

const RoomListing: React.FC = () => {
  const { rooms, roomType } = useSearchStore();
  const { ref, inView } = useScrollAnimation();
  const navigate = useNavigate();
  const getRoomTypeName = (type: string) => {
    const typeMap: Record<string, string> = {
      single: "Habitación Single",
      double: "Habitación Doble",
      triple: "Habitación Triple",
      cuadruple: "Habitación Cuádruple",
      quintuple: "Habitación Quíntuple",
      suite: "Suite",
    };
    return typeMap[type] || "";
  };
  const addReservation = (room: Room) => {
    const reservationData = {
      id: room.id,
      name: room.name,
      description: room.description,
      capacity: room.capacity,
      typeRoom: {
        name: room.typeRoom.name,
        description: room.typeRoom.description,
        capacity: room.typeRoom.capacity,
        price: room.typeRoom.price,
      },
    };
    sessionStorage.setItem("reserva", JSON.stringify(reservationData));
    navigate("/confirmation");
  };

  return (
    <div className="p-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <SearchBar />
      </motion.div>

      {rooms.length > 0 ? (
        <>
          <h2 className="text-2xl pt-6 pb-2 font-bold text-center text-black mb-8">
            Habitaciones disponibles{" "}
            {roomType && ` - ${getRoomTypeName(roomType)}`}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-semibold mb-2 text-center sm:text-start">
                    {room.name}
                  </h3>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>${room.typeRoom?.price} / noche</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {room.capacity}{" "}
                      {room.capacity === 1 ? "persona" : "personas"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <button
                      type="button"
                      onClick={() => addReservation(room)}
                      className="inline-block bg-green-300 cursor-pointer text-black font-medium px-3 py-1 rounded-full text-sm"
                    >
                      Reservar
                    </button>
                  </div>
                </div>

                <div className="relative w-full max-w-lg mx-auto flex items-center ">
                  <button
                    title="Imagen Siguiente"
                    className="absolute cursor-pointer left-0 top-1/2 transform -translate-y-1/2 bg-[rgba(169,169,169,0.5)] p-0.5 rounded-full shadow-md z-10 flex flex-col justify-center items-center"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-200" />
                  </button>
                  <img
                    src="https://media-cdn.tripadvisor.com/media/photo-s/12/33/02/0b/habitacion-doble-twin.jpg"
                    alt="prueba"
                    className="rounded-lg w-full"
                  />
                  <button
                    title="Imagen Anterior"
                    className="absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2 bg-[rgba(169,169,169,0.5)] p-0.5 rounded-full shadow-md z-10 flex flex-col justify-center items-center"
                  >
                    {" "}
                    <ChevronRight className="w-5 h-5 text-gray-200" />
                  </button>
                </div>
                <div className="col-span-full text-center mt-6">
                  <p className="text-gray-600">{room.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-700">
            No hay habitaciones disponibles
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Por favor, intenta con diferentes criterios de búsqueda.
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomListing;
