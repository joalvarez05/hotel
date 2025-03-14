import RegisterForm from "../components/RegisterForm";
import Header from "@/layouts/Header";

const Register: React.FC = () => {
  return (
    <>
      <Header />
      <div className="mt-12">
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;
