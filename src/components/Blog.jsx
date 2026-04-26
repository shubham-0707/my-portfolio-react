import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Particles } from "./Hero";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetch("/posts.json")
      .then((r) => r.json())
      .then((p) => {
        setTotalCount(p.length);
        setPosts(p.length > 3 ? p.slice(0, 2) : p.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section" id="blog">
      <Particles count={12} />
      <div className="container">
        <div className="section-header">
          <motion.span className="section-tag" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Writing</motion.span>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>Latest from the <span className="gradient-text">Blog</span></motion.h2>
          <motion.p className="section-subtitle" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>Thoughts, tutorials, and things I've learned</motion.p>
        </div>
        {posts.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--color-text-light)", fontSize: "1.05rem" }}>
              No blog posts yet. Stay tuned!
            </p>
          </div>
        ) : (
          <>
            <motion.div
              className="blog-grid"
              key={posts.length}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {posts.map((post) => (
                <motion.div
                  key={post.slug}
                  className="blog-card glass-card"
                  variants={cardVariants}
                  whileTap={{ y: 2, scale: 0.98, transition: { duration: 0.1 } }}
                >
                  {post.cover ? (
                    <img src={post.cover} alt={post.title} className="blog-card-cover" loading="lazy" />
                  ) : (
                    <div
                      className="blog-card-cover"
                      style={{
                        background: "linear-gradient(135deg,rgba(15,118,110,0.15) 0%,rgba(20,184,166,0.15) 50%,rgba(245,158,11,0.15) 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(15,118,110,0.3)" strokeWidth="1.5">
                        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                      </svg>
                    </div>
                  )}
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                      <span>{post.readTime || "5 min read"}</span>
                    </div>
                    <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    {post.tags && (
                      <div className="blog-card-tags">
                        {post.tags.map((t) => <span key={t} className="blog-tag">{t}</span>)}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* View All card as last grid item */}
              {totalCount > 3 && (
                <motion.div
                  className="blog-card blog-view-all-card glass-card"
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  whileTap={{ y: 2, scale: 0.98, transition: { duration: 0.1 } }}
                >
                  <Link to="/blog" className="blog-view-all-card-link">
                    <div className="blog-view-all-card-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                      </svg>
                    </div>
                    <span className="blog-view-all-card-count">{totalCount - 2}+</span>
                    <h3>More Articles</h3>
                    <p>View all {totalCount} posts with filters &amp; tags</p>
                    <span className="blog-view-all-card-arrow">
                      View All
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
