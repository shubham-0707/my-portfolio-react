import { useState } from "react";
import { motion } from "framer-motion";
import { personalData } from "../data/personalData";
import { Particles } from "./Hero";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const data = Object.fromEntries(new FormData(e.target));
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        e.target.reset();
        setTimeout(() => setStatus("idle"), 3000);
      } else throw new Error();
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="section" id="contact">
      <Particles count={12} />
      <div className="container">
        <div className="section-header">
          <motion.span className="section-tag" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Say Hello</motion.span>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>Get in <span className="gradient-text">Touch</span></motion.h2>
          <motion.p className="section-subtitle" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>Have a project in mind or just want to say hi? Let's talk!</motion.p>
        </div>

        <motion.div className="contact-info-row" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <motion.a
            href={`mailto:${personalData.email}`}
            className="contact-pill glass-card"
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>{personalData.email}</span>
          </motion.a>
          <motion.div
            className="contact-pill glass-card"
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{personalData.location}</span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.7 }}>
          <form onSubmit={handleSubmit} className="contact-form glass-card">
            <input type="hidden" name="access_key" value={personalData.web3formsKey} />
            <input type="hidden" name="subject" value="New message from portfolio" />
            <input type="checkbox" name="botcheck" style={{ display: "none" }} />
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" placeholder="Tell me about your project or just say hi..." required></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-glow btn-full" disabled={status === "sending"}>
              {status === "sending" ? (
                <span>Sending...</span>
              ) : status === "sent" ? (
                <span style={{ color: "#22c55e" }}>Message Sent!</span>
              ) : status === "error" ? (
                <span style={{ color: "#ef4444" }}>Failed — try again</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </>
              )}
            </button>
            <p className="form-note">I typically respond within 1-2 business days</p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
