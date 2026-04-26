import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalData } from "../data/personalData";
import { Particles } from "./Hero";

// Color themes per category
const categoryThemes = {
  Mobile: {
    gradient: "linear-gradient(135deg, #0f766e, #14b8a6)",
    bg: "rgba(15,118,110,0.06)",
    color: "#0f766e",
    darkColor: "#2dd4bf",
    ring: "rgba(15,118,110,0.15)",
    emoji: "📱",
  },
  "Backend & Web": {
    gradient: "linear-gradient(135deg, #6366f1, #818cf8)",
    bg: "rgba(99,102,241,0.06)",
    color: "#6366f1",
    darkColor: "#a5b4fc",
    ring: "rgba(99,102,241,0.15)",
    emoji: "🌐",
  },
  Languages: {
    gradient: "linear-gradient(135deg, #dc2626, #ef4444)",
    bg: "rgba(220,38,38,0.06)",
    color: "#dc2626",
    darkColor: "#fca5a5",
    ring: "rgba(220,38,38,0.15)",
    emoji: "⚡",
  },
  "Tools & Cloud": {
    gradient: "linear-gradient(135deg, #1e40af, #3b82f6)",
    bg: "rgba(30,64,175,0.06)",
    color: "#1e40af",
    darkColor: "#93c5fd",
    ring: "rgba(30,64,175,0.15)",
    emoji: "☁️",
  },
};

const levelConfig = {
  expert: { label: "Expert", width: "100%", color: "#0f766e" },
  advanced: { label: "Advanced", width: "75%", color: "#f59e0b" },
  intermediate: { label: "Intermediate", width: "50%", color: "#6366f1" },
};

function SkillOrb({ skill, theme, index }) {
  return (
    <motion.div
      className="skill-orb"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95, y: 2 }}
      style={{ "--orb-color": theme.color, "--orb-ring": theme.ring }}
    >
      <div className="skill-orb-bar">
        <motion.div
          className="skill-orb-fill"
          initial={{ width: 0 }}
          animate={{ width: levelConfig[skill.level].width }}
          transition={{ delay: index * 0.04 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: theme.gradient }}
        />
      </div>
      <span className="skill-orb-name">{skill.name}</span>
      <span className="skill-orb-level" data-level={skill.level}>
        {levelConfig[skill.level].label}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const activeCat = personalData.skills[activeTab];
  const theme = categoryThemes[activeCat.category] || categoryThemes.Mobile;

  return (
    <section className="section skills-section" id="skills">
      <Particles count={15} />
      <div className="container">
        <div className="section-header">
          <motion.span
            className="section-tag"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Arsenal
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Skills & <span className="gradient-text">Technologies</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            My toolkit for building Android apps at scale
          </motion.p>
        </div>

        {/* Category selector tabs */}
        <motion.div
          className="skills-tabs"
          role="tablist"
          aria-label="Skill categories"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {personalData.skills.map((cat, i) => {
            const t = categoryThemes[cat.category] || categoryThemes.Mobile;
            return (
              <motion.button
                key={cat.category}
                className={`skills-tab ${activeTab === i ? "active" : ""}`}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`skills-panel-${i}`}
                onClick={() => setActiveTab(i)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 1, scale: 0.97 }}
                style={
                  activeTab === i
                    ? { background: t.gradient, color: "#fff", borderColor: "transparent" }
                    : {}
                }
              >
                <span className="skills-tab-emoji">{t.emoji}</span>
                <span>{cat.category}</span>
                <span className="skills-tab-count">{cat.items.length}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active category display */}
        <div className="skills-showcase" role="tabpanel" id={`skills-panel-${activeTab}`} aria-label={activeCat.category}>
          {/* Left: big radial visualization */}
          <motion.div
            className="skills-radial"
            key={activeTab + "-radial"}
            initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="radial-center" style={{ background: theme.gradient }}>
              <span className="radial-emoji">{theme.emoji}</span>
              <span className="radial-label">{activeCat.category}</span>
            </div>
            {/* Orbiting rings */}
            <div className="radial-ring radial-ring-1" style={{ borderColor: theme.ring }} />
            <div className="radial-ring radial-ring-2" style={{ borderColor: theme.ring }} />
            <div className="radial-ring radial-ring-3" style={{ borderColor: theme.ring }} />
            {/* Skill dots orbiting */}
            {activeCat.items.map((skill, i) => {
              const angle = (i / activeCat.items.length) * 360;
              const radius = 42; // percentage
              const x = 50 + radius * Math.cos((angle - 90) * (Math.PI / 180));
              const y = 50 + radius * Math.sin((angle - 90) * (Math.PI / 180));
              return (
                <motion.div
                  key={skill.name}
                  className="radial-skill-dot"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    background: theme.gradient,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 + 0.2, type: "spring", stiffness: 300 }}
                  title={skill.name}
                >
                  <span className="radial-dot-label">{skill.name.split(" ")[0].slice(0, 4)}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: skill list with animated bars */}
          <div className="skills-list">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="skills-list-inner"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeCat.items.map((skill, i) => (
                  <SkillOrb key={skill.name} skill={skill} theme={theme} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <div className="skills-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{ background: "#0f766e" }} />
                <span>Expert</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: "#f59e0b" }} />
                <span>Advanced</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: "#6366f1" }} />
                <span>Intermediate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
