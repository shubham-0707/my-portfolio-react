import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0, raf;

    const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    document.addEventListener("mousemove", onMove);

    function animate() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      el.style.left = glowX + "px";
      el.style.top = glowY + "px";
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="cursor-glow" ref={ref}></div>;
}
