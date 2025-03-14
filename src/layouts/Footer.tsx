import { Facebook, Instagram, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface INewsletterForm {
  email: string;
}
function Footer() {
  const [t, i18n] = useTranslation("global");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<INewsletterForm>();

  const onSubmit = async (data: INewsletterForm) => {
    try {
      const response = await fetch("#", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data.email),
      });
      console.log(response);

      if (response.ok) {
        toast.success("¡Te has suscrito con éxito!");
        reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Intentalo de nuevo más tarde");
      }
    }
  };
  return (
    <div className=" bg-gray-100">
      <footer className="bg-gray-900 text-gray-300">
        <div className="bg-blue-700 ">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-white py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div>
                    <h3 className="text-sm font-medium">
                      {t("footer.offers")}
                    </h3>
                    <p className="text-lg font-semibold">
                      {t("footer.subscribe")}
                    </p>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex w-full md:w-auto gap-2"
                >
                  <input
                    type="email"
                    placeholder={t("footer.email_placeholder")}
                    className={`px-4 py-2 rounded-lg bg-gray-100 w-full md:w-80 text-black ${
                      errors.email ? "border-red-500 border-2" : ""
                    }`}
                    {...register("email", {
                      required: t("footer.email_required"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("footer.email_invalid"),
                      },
                    })}
                    disabled={isSubmitting}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  <button
                    type="submit"
                    title={t("footer.newsletter_title")}
                    role="button"
                    className="bg-white cursor-pointer text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("footer.sending") : t("footer.send")}
                  </button>
                </form>
              </div>
              {errors.email && (
                <p
                  className="text-red-500 drop-shadow-lg font-semibold leading-tight text-sm md:ps-6 md:text-center lg:text-end lg:pe-26"
                  aria-live="polite"
                >
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-12 pb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center text-2xl font-bold text-white ">
                <span className="text-blue-500">Luxe Haven</span>
              </div>
              <p className="text-sm text-white font-medium text-center md:text-left">
                HOTELS & RESORTS
              </p>
              <div className="mt-6">
                <h4 className="font-medium mb-4 text-center md:text-left">
                  {t("footer.social")}
                </h4>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {t("footer.about")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.company")}
                  </a>
                </li>
                <li>
                  <Link
                    to="/contacto"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.contact")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contacto"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.location")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {t("footer.services")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    {t("footer.questions")}
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    {t("footer.book")}
                  </a>
                </li>
                <li>
                  <a
                    href="#ofertas"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.promotions")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {t("footer.payment")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="#">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    loading="lazy"
                    className="h-8 bg-white p-1 rounded"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="Mastercard"
                    loading="lazy"
                    className="h-8 bg-white p-1 rounded"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                    loading="lazy"
                    className="h-8 bg-white p-1 rounded"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                    alt="American Express"
                    loading="lazy"
                    className="h-8 bg-white p-1 rounded"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                {t("footer.terms")}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t("footer.privacy")}
              </a>
            </div>
            <p className="text-gray-400">
              © 2025 Hotel Luxe Haven. <br />
              by No-Country
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
