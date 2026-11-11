import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import SEO, { personSchema, websiteSchema } from "./components/SEO";
import "./styles/index.css";

function HomePage() {
  return (
    <main>
      <SEO url="/" jsonLd={[personSchema, websiteSchema]} />
      <Hero />
      <Journey />
      <Skills />
      <Achievements />
      <Blog />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}
