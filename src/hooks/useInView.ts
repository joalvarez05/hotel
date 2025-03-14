import { useInView } from "react-intersection-observer";

interface UseScrollAnimationOptions {
  triggerOnce?: boolean;
  threshold?: number;
}

const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    ...options,
  });

  return { ref, inView };
};

export default useScrollAnimation;
