import { MotionValue, useMotionValue } from 'framer-motion';
import { useContext, useEffect } from 'react';
import ModelsContext from './ModelsContext';

interface UseWrapperScroll {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

export default function useWrapperScroll(): UseWrapperScroll {
  const { wrapperRef } = useContext(ModelsContext);

  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const currentRef = wrapperRef.current;
    if (currentRef) {
      const updateScrollValue = () => {
        if (currentRef) {
          const { scrollTop, scrollHeight, offsetHeight } = currentRef;

          const fullScroll = scrollHeight - offsetHeight;

          scrollY.set(scrollTop);
          scrollYProgress.set(scrollTop / fullScroll);
        }
      };

      currentRef.addEventListener('scroll', updateScrollValue);

      return () => currentRef.removeEventListener('scroll', updateScrollValue);
    }

    return undefined;
  }, [scrollY, scrollYProgress, wrapperRef]);

  return {
    scrollY,
    scrollYProgress,
  };
}
