import { useRef, useEffect, useState } from "react";

export default function AnimateOnScroll({ children, className = "", style = {}, threshold = 0.08 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`animate-on-scroll${visible ? " visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
