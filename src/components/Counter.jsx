import { useRef, useEffect, useState } from "react";

export default function Counter({ target }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    let raf;

    function step() {
      current += increment;
      if (current >= target) {
        setValue(target);
      } else {
        setValue(Math.floor(current));
        raf = requestAnimationFrame(step);
      }
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return <span className="stat-number" ref={ref}>{value}</span>;
}
