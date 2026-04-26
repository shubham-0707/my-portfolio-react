import { personalData } from "../data/personalData";

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="gradient-text" style={{ fontSize: "1.5rem", fontWeight: 800 }}>
              {personalData.initials}
            </span>
            <p>{personalData.name}</p>
          </div>
          <div className="footer-links">
            <a href="#home" onClick={(e) => scrollTo(e, "#home")}>Home</a>
            <a href="#journey" onClick={(e) => scrollTo(e, "#journey")}>Journey</a>
            <a href="#skills" onClick={(e) => scrollTo(e, "#skills")}>Skills</a>
            <a href="#blog" onClick={(e) => scrollTo(e, "#blog")}>Blog</a>
            <a href="#contact" onClick={(e) => scrollTo(e, "#contact")}>Contact</a>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {personalData.name}. Crafted with passion.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
