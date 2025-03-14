export interface Question {
    question: string;
    answer: string;
  }
  
  export const questions: Question[] = [
    {
      question: "¿Cuáles son los horarios de check-in y check-out?",
      answer: "El check-in comienza a partir de las 15:00 horas, y el check-out debe realizarse antes de las 11:00 horas. Si necesitas un check-in temprano o un check-out tardío, por favor contáctanos con anticipación para verificar la disponibilidad.",
    },
    {
      question: "¿Qué comodidades incluyen las habitaciones?",
      answer: "Nuestras habitaciones están equipadas con Wi-Fi gratuito, aire acondicionado, televisión por cable, minibar, caja fuerte, baño privado con artículos de aseo y servicio de limpieza diario.",
    },
    {
      question: "¿Las habitaciones tienen balcón o vista al mar?",
      answer: "Algunas de nuestras habitaciones cuentan con balcón y vistas panorámicas al mar. Puedes seleccionar esta opción al momento de la reserva o consultar la disponibilidad con nuestro equipo.",
    },
    {
      question: "¿Se permite el alojamiento de mascotas en las habitaciones?",
      answer: "Aceptamos mascotas en habitaciones específicas con un cargo adicional. Te recomendamos consultar con el hotel antes de tu llegada para conocer las condiciones y disponibilidad.",
    },
    {
      question: "¿Las habitaciones incluyen desayuno?",
      answer: "Sí, el desayuno está incluido en la mayoría de nuestras tarifas. Ofrecemos un desayuno buffet variado con opciones dulces y saladas, así como alternativas sin gluten y vegetarianas.",
    },
    {
      question: "¿Las habitaciones tienen cocina o microondas?",
      answer: "Algunas suites y apartamentos incluyen kitchenette con microondas, nevera y utensilios de cocina. Si necesitas esta comodidad, por favor indícalo al momento de la reserva.",
    },
    {
      question: "¿Se pueden agregar camas supletorias o cunas a la habitación?",
      answer: "Sí, ofrecemos camas supletorias y cunas para niños bajo solicitud y sujeto a disponibilidad. Pueden aplicarse cargos adicionales dependiendo de la tarifa reservada.",
    }
  ];
  