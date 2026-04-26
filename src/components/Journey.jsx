import { motion } from "framer-motion";
import { personalData } from "../data/personalData";
import { Particles } from "./Hero";

// Company logos — fallback to styled initials
const companyMeta = {
  "PhonePe": { logo: "https://logo.clearbit.com/phonepe.com", initials: "PP", color: "#5f259f" },
  "Glance (InMobi Group)": { logo: "https://logo.clearbit.com/glance.com", initials: "G", color: "#ff6600" },
  "DKG Labs": { logo: null, initials: "DK", color: "#2563eb" },
  "Celebal Technologies": { logo: "https://logo.clearbit.com/celebaltech.com", initials: "CT", color: "#059669" },
  "Dr. A.P.J. Abdul Kalam Technical University": { logo: null, initials: "AKTU", color: "#dc2626" },
};

const iconMap = {
  work: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  education: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
};

// Original order: newest (top) → oldest (bottom), natural reading flow
const journeyItems = personalData.journey;
const totalSteps = journeyItems.length;

function CompanyLogo({ company }) {
  const meta = companyMeta[company];
  if (!meta) return null;

  if (meta.logo) {
    return (
      <div className="journey-company-logo">
        <img
          src={meta.logo}
          alt={`${company} logo`}
          loading="lazy"
          width="40"
          height="40"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <span className="journey-logo-fallback" style={{ background: meta.color, display: "none" }}>
          {meta.initials}
        </span>
      </div>
    );
  }

  return (
    <div className="journey-company-logo">
      <span className="journey-logo-fallback" style={{ background: meta.color }}>
        {meta.initials}
      </span>
    </div>
  );
}

// Altitude label based on step
function getAltitudeLabel(index, total) {
  const altitudes = ["Summit", "Camp IV", "Camp III", "Camp II", "Camp I", "Base Camp"];
  if (total <= altitudes.length) {
    return altitudes[index] || `${(total - index) * 1000}m`;
  }
  return `${(total - index) * 1000}m`;
}

export default function Journey() {
  return (
    <section className="section journey-section" id="journey">
      <Particles count={15} />
      <div className="container">
        <div className="section-header">
          <motion.span
            className="section-tag"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Climb
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            My <span className="gradient-text">Journey</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            From base camp to the summit — every checkpoint shaped who I am
          </motion.p>
        </div>

        <div className="mountain-timeline">
          {/* The ascending path SVG */}
          <div className="mountain-path" aria-hidden="true">
            <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="mountain-path-svg">
              <defs>
                <linearGradient id="pathGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0f766e" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                d="M 50 1000 C 50 900, 25 850, 30 800 C 35 750, 70 700, 65 650 C 60 600, 30 550, 35 500 C 40 450, 70 400, 65 350 C 60 300, 35 250, 40 200 C 45 150, 55 100, 50 50 L 50 0"
                fill="none"
                stroke="url(#pathGrad)"
                strokeWidth="3"
                strokeDasharray="8 4"
              />
            </svg>
          </div>

          {/* Summit flag at the top */}
          <motion.div
            className="mountain-summit"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="summit-flag">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
            </div>
            <span className="summit-label">Current Peak</span>
          </motion.div>

          {/* Journey cards — alternating left/right, ascending */}
          {journeyItems.map((item, i) => {
            const isLeft = i % 2 === 0;
            const stepNumber = i + 1;
            const altLabel = getAltitudeLabel(i, totalSteps);

            return (
              <motion.div
                key={i}
                className={`mountain-checkpoint ${isLeft ? "left" : "right"}`}
                initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Checkpoint marker on the path */}
                <div className="checkpoint-marker">
                  <div className="checkpoint-number">{stepNumber}</div>
                  <div className="checkpoint-altitude">{altLabel}</div>
                </div>

                {/* Connector line from marker to card */}
                <div className="checkpoint-connector" />

                {/* The card */}
                <motion.div
                  className="journey-card"
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  whileTap={{ y: 2, scale: 0.98, transition: { duration: 0.1 } }}
                >
                  <div className="journey-card-accent" />
                  <div className="journey-card-header">
                    <CompanyLogo company={item.company} />
                    <div className="journey-icon-wrap" aria-hidden="true">{iconMap[item.type]}</div>
                    <time className="journey-date-badge" dateTime={item.date}>{item.date}</time>
                  </div>
                  <h3 className="journey-card-title">{item.title}</h3>
                  <p className="journey-card-company">{item.company}</p>
                  <p className="journey-card-desc">{item.description}</p>
                  <div className="journey-card-tags">
                    {item.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {item.current && (
                    <div className="journey-card-status">
                      <span className="status-dot active" /> Currently here
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}

          {/* Base camp marker at the bottom */}
          <motion.div
            className="mountain-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="base-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21l9-18 9 18H3z" />
                <path d="M12 3v18" opacity="0.3" />
              </svg>
            </div>
            <span>Where it all began</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
