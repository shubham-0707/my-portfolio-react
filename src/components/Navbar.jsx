import { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { personalData } from "../data/personalData";
import { ThemeContext } from "../App";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);

      // Hide/show based on scroll direction (only after scrolling past 80px)
      if (currentY > 80) {
        setVisible(currentY < lastScrollY.current || currentY < 100);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;

      // Active section detection (home page only)
      if (isHome) {
        const sections = document.querySelectorAll("section[id]");
        let current = "home";
        sections.forEach((sec) => {
          if (currentY >= sec.offsetTop - 100) current = sec.id;
        });
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Always show navbar when menu is open
  const navVisible = visible || menuOpen;

  const links = [
    { href: "#home", label: "Home" },
    { href: "#journey", label: "Journey" },
    { href: "#skills", label: "Skills" },
    { href: "#achievements", label: "Achievements" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);

    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      }, 100);
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}${navVisible ? "" : " nav-hidden"}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => { setMenuOpen(false); if (isHome) window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <span className="logo-text">{personalData.initials}</span>
          <span className="logo-dot"></span>
        </Link>
        <button
          className={`nav-toggle${menuOpen ? " active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`nav-link${isHome && activeSection === l.href.slice(1) ? " active" : ""}`}
                onClick={(e) => scrollTo(e, l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
