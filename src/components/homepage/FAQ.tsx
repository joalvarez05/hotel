import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import useInView from "@/hooks/useInView";
import { motion } from "framer-motion";

const FAQ = () => {
  const { ref, inView } = useInView();
  const { t } = useTranslation("global");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const questions = t("faq.questions", { returnObjects: true }) as {
    question: string;
    answer: string;
  }[];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8" id="faq">
      <h2 className="text-2xl font-bold text-center mb-6">{t("faq.title")}</h2>
      <div className="space-y-4 cursor-pointer" ref={ref}>
        {questions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.3,
              ease: "easeOut",
            }}
            className="bg-white p-4 rounded-lg shadow-lg"
            title="Desplegar respuesta"
          >
            <h3
              className="text-xl font-semibold w-full text-left flex justify-between"
              onClick={() => toggleAnswer(index)}
              role="button"
            >
              {item.question}
              <span className="text-lg" aria-label="Ver respuesta">
                {activeIndex === index ? <AiOutlineUp /> : <AiOutlineDown />}
              </span>
            </h3>
            {activeIndex === index && (
              <p className="mt-2 text-gray-600">{item.answer}</p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
