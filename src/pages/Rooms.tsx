import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import RoomsListing from "@/components/rooms/RoomsListing.tsx";

function Rooms() {
  return (
    <>
      <Header />
      <div className="mt-16">
         <RoomsListing /> 
        <Footer />
      </div>
    </>
  );
}

export default Rooms;
