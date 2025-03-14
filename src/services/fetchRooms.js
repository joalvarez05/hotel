import useSearchStore from "@/hooks/useSearchStore";
const API_HOST = import.meta.env.VITE_API_HOST;

const fetchRooms = async (url, roomType) => {
  try {
    const response = await fetch(`${API_HOST}/api/${url}`);
    const data = await response.json();
    let filteredRooms = data;
    if (roomType) {
      const capacityMap = {
        single: 1,
        double: 2,
        triple: 3,
        cuadruple: 4,
        quintuple: 5,
        suite: 6,
      };
      const targetCapacity = capacityMap[roomType];

      if (targetCapacity !== undefined) {
        filteredRooms = data.filter((room) => room.capacity === targetCapacity);
      }
    }
    useSearchStore.getState().setRooms(filteredRooms);
    return filteredRooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

export default fetchRooms;
