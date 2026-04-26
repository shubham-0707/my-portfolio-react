import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShootingStars from "./components/ShootingStars";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Blog from "./components/Blog";
import BlogPage from "./components/BlogPage";
import BlogPost from "./components/BlogPost";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./styles/index.css";

export const ThemeContext = createContext();

function HomePage() {
  return (
    <>
      <Hero />
      <Journey />
      <Skills />
      <Achievements />
      <Blog />
      <Contact />
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter basename="/my-portfolio-react">
        <ShootingStars />
        <CursorGlow />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}
