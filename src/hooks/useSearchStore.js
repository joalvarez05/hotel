import { create } from "zustand";
const useSearchStore = create((set) => ({
    isGuestsOpen: false,
    checkIn: "",
    checkOut: "",
    roomType: "",
    rooms: [],
    guests: {
        adults: 2,
        children: 0,
        rooms: 1,
    },
    setIsGuestsOpen: (state) => set({ isGuestsOpen: state }),
    setCheckIn: (date) => set({ checkIn: date }),
    setCheckOut: (date) => set({ checkOut: date }),
    setRoomType: (roomType) => set({ roomType }),
    setGuests: (guests) => set({ guests }),
    setRooms: (rooms) => set({ rooms }),
    handleGuestsChange: (type, operation) => {
        set((state) => ({
            guests: {
                ...state.guests,
                [type]: operation === "add"
                    ? state.guests[type] + 1
                    : Math.max(type === "adults" ? 1 : 0, state.guests[type] - 1),
            },
        }));
    },
}));
export default useSearchStore;
