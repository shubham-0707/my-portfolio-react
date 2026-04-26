import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Particles } from "./Hero";
import SEO from "./SEO";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const [activeTag, setActiveTag] = useState(searchParams.get("tag") || "all");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/posts.json")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => {});
  }, []);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    posts.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter posts by active tag
  const filteredPosts = useMemo(() => {
    if (activeTag === "all") return posts;
    return posts.filter((p) => p.tags?.includes(activeTag));
  }, [posts, activeTag]);

  return (
    <main className="blog-page">
      <SEO
        title="Blog"
        description="Technical articles on Android development, Kotlin, Jetpack Compose, career advice, and software engineering by Shubham Singh."
        url="/blog"
        type="blog"
      />
      <Particles count={15} />

      {/* Header */}
      <div className="blog-page-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/" className="blog-back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back to Home</span>
            </Link>
            <h1 className="blog-page-title">
              All <span className="gradient-text">Blog Posts</span>
            </h1>
            <p className="blog-page-subtitle">
              {posts.length} article{posts.length !== 1 ? "s" : ""} — Thoughts, tutorials, and things I've learned along the way
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container blog-page-content">
        {/* Tag Filters */}
        {allTags.length > 0 && (
          <motion.div
            className="tag-filter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <button
              className={`tag-filter-btn${activeTag === "all" ? " active" : ""}`}
              onClick={() => setActiveTag("all")}
            >
              All ({posts.length})
            </button>
            {allTags.map((tag) => {
              const count = posts.filter((p) => p.tags?.includes(tag)).length;
              return (
                <button
                  key={tag}
                  className={`tag-filter-btn${activeTag === tag ? " active" : ""}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag} ({count})
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Blog Grid — 2 columns */}
        <AnimatePresence mode="wait">
          <motion.div
            className="blog-page-grid"
            key={activeTag}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {filteredPosts.length === 0 ? (
              <motion.div className="blog-empty" variants={cardVariants}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-light)" strokeWidth="1.5">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                </svg>
                <p>No posts found for "{activeTag}"</p>
              </motion.div>
            ) : (
              filteredPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  className="blog-page-card glass-card"
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  whileTap={{ y: 2, scale: 0.98, transition: { duration: 0.1 } }}
                >
                  <Link to={`/blog/${post.slug}`} className="blog-page-card-link">
                    {post.cover ? (
                      <img src={post.cover} alt={post.title} className="blog-page-card-cover" loading="lazy" />
                    ) : (
                      <div className="blog-page-card-cover blog-page-card-cover-placeholder">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(15,118,110,0.3)" strokeWidth="1.5">
                          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                        </svg>
                      </div>
                    )}
                    <div className="blog-page-card-body">
                      <div className="blog-card-meta">
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                        <span>{post.readTime || "5 min read"}</span>
                      </div>
                      <h2>{post.title}</h2>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      {post.tags && (
                        <div className="blog-card-tags">
                          {post.tags.map((t) => (
                            <span key={t} className={`blog-tag${t === activeTag ? " blog-tag-active" : ""}`}>{t}</span>
                          ))}
                        </div>
                      )}
                      <span className="blog-page-read-more">
                        Read article
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
