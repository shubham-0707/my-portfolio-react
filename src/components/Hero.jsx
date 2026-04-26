import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalData } from "../data/personalData";
import { useTypingEffect } from "../hooks/useAnimations";
import Counter from "./Counter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const socialLinks = [
  { href: personalData.github, label: "GitHub", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
  { href: personalData.linkedin, label: "LinkedIn", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { href: personalData.twitter, label: "Twitter/X", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { href: personalData.topmate, label: "Topmate", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
];

export default function Hero() {
  const typedText = useTypingEffect(personalData.roles);

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-gradient-orb hero-orb-1"></div>
        <div className="hero-gradient-orb hero-orb-2"></div>
        <div className="hero-gradient-orb hero-orb-3"></div>
        <div className="hero-grid-pattern"></div>
      </div>
      <Particles count={30} />
      <div className="container hero-content">
        <div className="hero-text">
          <motion.div className="hero-badge" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="badge-dot"></span>
            Open to collaborate
          </motion.div>
          <motion.h1 className="hero-name" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            Hi, I'm <span className="gradient-text">{personalData.firstName}</span>
            <br />
            <span className="hero-name-sub">{personalData.lastName}</span>
          </motion.h1>
          <motion.div className="hero-role" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <span className="role-prefix">I'm a </span><span className="role-typing">{typedText}</span><span className="cursor">|</span>
          </motion.div>
          <motion.p className="hero-desc" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            {personalData.heroDescription}
          </motion.p>
          <motion.div className="hero-cta" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
            <a href={personalData.newsletter} className="btn btn-primary btn-glow" target="_blank" rel="noopener noreferrer">
              <span>The Code Report</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#contact" className="btn btn-glass" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
              <span>Contact Me</span>
            </a>
            <a href={personalData.resumeUrl} className="btn btn-primary btn-glow" download rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              <span>Resume</span>
            </a>
          </motion.div>
          <motion.div className="hero-stats" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
            {personalData.stats.map((s, i) => (
              <div key={i} className="stat-item-wrapper">
                {i > 0 && <div className="stat-divider"></div>}
                <div className="stat-item">
                  <Counter target={s.count} />
                  {s.plus && <span className="stat-plus">+</span>}
                  <span className="stat-label">{s.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div className="hero-photo-wrapper" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
          <div className="hero-photo-container">
            <div className="hero-photo-glow"></div>
            <div className="hero-photo-ring"></div>
            <img src={personalData.profilePic} alt="Profile photo of Shubham Singh — Android Developer at PhonePe" className="hero-photo" width="320" height="320" />
            <div className="hero-photo-dot"></div>
            <div className="hero-photo-dot"></div>
            <div className="hero-photo-dot"></div>
          </div>
          <div className="hero-socials">
            {socialLinks.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label={s.label}
                whileHover={{ y: -3 }}
                whileTap={{ y: 2, scale: 0.9 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      <ScrollGesture />
    </section>
  );
}

function ScrollGesture() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <div className="scroll-mouse">
            <motion.div
              className="scroll-wheel"
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.div
            className="scroll-chevrons"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "-6px", opacity: 0.5 }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll to explore
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Particles({ count }) {
  const ref = useRef(null);
  const colors = ["#14b8a6", "#0f766e", "#2dd4bf", "#f59e0b", "#fbbf24"];

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.width = p.style.height = Math.random() * 6 + 3 + "px";
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = Math.random() * 10 + 6 + "s";
      p.style.animationDelay = Math.random() * 6 + "s";
      p.style.opacity = 0;
      container.appendChild(p);
    }
    return () => { container.innerHTML = ""; };
  }, [count]);

  return <div className="particles" ref={ref}></div>;
}

export { Particles };
