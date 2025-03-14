import { Users, ChevronDown, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import useSearchStore from "@/hooks/useSearchStore.tsx";
import fetchRooms from "@/services/fetchRooms";
import { hoy, fechaMañana } from "@/utils/fechaActual";

import "./home.css";

interface SearchForm {
  roomType: string;
  checkIn: string;
  checkOut: string;
}

const SearchBar: React.FC = () => {
  const {
    isGuestsOpen,
    checkIn,
    checkOut,
    roomType,
    guests,

    setIsGuestsOpen,
    setCheckIn,
    setCheckOut,
    setRoomType,
    handleGuestsChange,
  } = useSearchStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchForm>();

  const onSubmit = async (data: any) => {
    const { roomType, checkIn, checkOut } = data;
    setRoomType(roomType);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    await fetchRooms("rooms", roomType);
  };
  return (
    <div className="max-w-6xl mx-auto px-4 mt-8 " id="searchBar">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Ahorrá hasta un 45% en tu próxima estadía de hotel
        </h2>
        <h3 className="text-xl mb-2">Encontrá tu habitación ideal</h3>
      </div>
      <div className="bg-white rounded-lg shadow-xl py-4 px-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="relative">
              <select
                {...register("roomType", {
                  required: "",
                })}
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="">Tipo de habitación</option>
                <option value="single">Habitación Single</option>
                <option value="double">Habitación Doble</option>
                <option value="triple">Habitación Triple</option>
                <option value="cuadruple">Habitación Cuadruple</option>
                <option value="quintuple">Habitación Quintuple</option>
                <option value="suite">Suite</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/1 text-gray-400"
                size={20}
              />
              <div className="py-2"></div>
            </div>
            <div className="relative">
              <input
                {...register("checkIn", {
                  required: "Fecha de llegada",
                })}
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={hoy}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Check In"
              />
              <div className=" left-0 right-0 text-red-500 text-sm my-1 ">
                {errors.checkIn && (
                  <span>{String(errors.checkIn.message)}</span>
                )}
              </div>
            </div>
            <div className="relative">
              <input
                {...register("checkOut", {
                  required: "Fecha de salida",
                })}
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={fechaMañana}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Check Out"
              />
              <div className=" left-0 right-0 text-red-500 text-sm my-1">
                {errors.checkOut && (
                  <span>{String(errors.checkOut.message)}</span>
                )}
              </div>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsGuestsOpen(!isGuestsOpen)}
                className="w-full p-3 border border-gray-300 rounded-lg text-left focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-gray-400" />
                    {!guests ? (
                      <span className="text-sm">Viajeros</span>
                    ) : (
                      <span>{guests.adults} Adultos</span>
                    )}
                    <br />
                  </div>
                  <ChevronDown size={20} className="text-gray-400" />
                </div>
              </button>
              {isGuestsOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Adultos</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleGuestsChange("adults", "subtract")
                          }
                          value={guests.adults - 1}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          disabled={guests.adults <= 1}
                        >
                          -
                        </button>
                        <span>{guests.adults}</span>
                        <button
                          value={guests.adults + 1}
                          type="button"
                          onClick={() => handleGuestsChange("adults", "add")}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Niños</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          value={guests.children - 1}
                          onClick={() =>
                            handleGuestsChange("children", "subtract")
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          disabled={guests.children <= 0}
                        >
                          -
                        </button>
                        <span>{guests.children}</span>
                        <button
                          type="button"
                          value={guests.children + 1}
                          onClick={() => handleGuestsChange("children", "add")}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Habitaciones</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleGuestsChange("rooms", "subtract")
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          disabled={guests.rooms <= 1}
                        >
                          -
                        </button>
                        <span>{guests.rooms}</span>
                        <button
                          type="button"
                          onClick={() => handleGuestsChange("rooms", "add")}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsGuestsOpen(false)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Listo
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className={`w-full mt-4 bg-blue-600 cursor-pointer text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${
              isSubmitting ? "cursor-wait" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="flex">
                  <span className="loader"></span>
                  <span className="ms-12">Buscando habitaciones</span>
                </div>
              </>
            ) : (
              <>
                <Search size={20} />
                Buscar
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
