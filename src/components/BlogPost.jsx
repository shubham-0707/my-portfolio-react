import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Particles } from "./Hero";

function parseMarkdown(md) {
  if (!md) return "";
  let html = md
    // Code blocks (``` ... ```)
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre><code class="language-${lang || "text"}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim()}</code></pre>`
    )
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold & italic
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Blockquotes
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // Tables (simple)
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split("|").filter(Boolean).map((c) => c.trim());
      if (cells.every((c) => /^[-:]+$/.test(c))) return ""; // separator row
      return "<tr>" + cells.map((c) => `<td>${c}</td>`).join("") + "</tr>";
    })
    // Horizontal rule
    .replace(/^---$/gm, "<hr/>")
    // Paragraphs: wrap loose lines
    .replace(/^(?!<[huplbotrd]|$)(.+)$/gm, "<p>$1</p>");

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\s*)+)/g, "<ul>$1</ul>");
  // Wrap consecutive <tr> in <table>
  html = html.replace(/((?:<tr>.*<\/tr>\s*)+)/g, '<table class="blog-table">$1</table>');
  // Clean up empty lines
  html = html.replace(/\n{2,}/g, "\n");

  return html;
}

function generateTOC(content) {
  if (!content) return [];
  const headings = [];
  const regex = /^#{2,3} (.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[0].startsWith("###") ? 3 : 2;
    const text = match[1];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ level, text, id });
  }
  return headings;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/posts.json")
      .then((r) => r.json())
      .then((posts) => {
        const found = posts.find((p) => p.slug === slug);
        setPost(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const htmlContent = useMemo(() => {
    if (!post?.content) return "";
    let md = post.content;
    // Add IDs to headings for TOC linking
    md = md.replace(/^(#{2,3}) (.+)$/gm, (_, hashes, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `${hashes} <span id="${id}">${text}</span>`;
    });
    return parseMarkdown(md);
  }, [post]);

  const toc = useMemo(() => (post ? generateTOC(post.content) : []), [post]);

  if (loading) {
    return (
      <main className="blog-post-page">
        <div className="container" style={{ paddingTop: "calc(var(--nav-height) + 4rem)", textAlign: "center" }}>
          <div className="blog-post-skeleton">
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-meta" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line skeleton-short" />
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="blog-post-page">
        <div className="container" style={{ paddingTop: "calc(var(--nav-height) + 4rem)", textAlign: "center", padding: "8rem 1.5rem" }}>
          <h2 style={{ marginBottom: "1rem", color: "var(--color-text)" }}>Post Not Found</h2>
          <p style={{ color: "var(--color-text-light)", marginBottom: "2rem" }}>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn btn-primary">← Back to Blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="blog-post-page">
      <Particles count={10} />

      {/* Table of Contents — desktop sidebar */}
      {toc.length > 3 && (
        <nav className="toc">
          <h4>On This Page</h4>
          <ul>
            {toc.map((h) => (
              <li key={h.id} className={h.level === 3 ? "toc-sub" : ""}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <article className="blog-post">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/blog" className="back-to-blog">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>

          <h1>{post.title}</h1>

          <div className="blog-post-meta">
            <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>{post.readTime || "5 min read"}</span>
            {post.tags && post.tags.map((t) => (
              <Link key={t} to={`/blog?tag=${t}`} className="blog-tag">{t}</Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="blog-post-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Post footer */}
        <motion.div
          className="blog-post-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="blog-post-share">
            <span>Share this article:</span>
            <div className="share-buttons">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener"
                className="share-btn"
                aria-label="Share on Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener"
                className="share-btn"
                aria-label="Share on LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
          <Link to="/blog" className="btn btn-glass">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>All Posts</span>
          </Link>
        </motion.div>
      </article>
    </main>
  );
}
