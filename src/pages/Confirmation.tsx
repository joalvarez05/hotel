import ReservationForm from "@/components/reservation/ReservationForm";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

const Login: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 pb-12 pt-24">
          <ReservationForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
