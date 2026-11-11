import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import SEO, { blogPostSchema, SITE_URL } from "./SEO";
import { formatDate } from "./PostCard";
import { LinkedInIcon, XIcon } from "./Icons";

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
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
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
        setPost(posts.find((p) => p.slug === slug) || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const htmlContent = useMemo(() => {
    if (!post?.content) return "";
    const md = post.content.replace(/^(#{2,3}) (.+)$/gm, (_, hashes, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `${hashes} <span id="${id}">${text}</span>`;
    });
    return parseMarkdown(md);
  }, [post]);

  const toc = useMemo(() => (post ? generateTOC(post.content) : []), [post]);

  if (loading) {
    return <main className="mx-auto max-w-3xl px-6 py-24 text-ink-soft">Loading…</main>;
  }

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-4xl">Post not found</h1>
        <p className="mt-4 text-ink-soft">The post you’re looking for doesn’t exist.</p>
        <Link to="/blog" className="btn-lift btn-ink mt-8">All posts</Link>
      </main>
    );
  }

  const url = encodeURIComponent(`${SITE_URL}/blog/${post.slug}`);

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        type="article"
        article={{ date: post.date, tags: post.tags }}
        jsonLd={blogPostSchema(post)}
      />
      <article className="min-w-0 max-w-3xl">
        <Link to="/blog" className="link-ink text-ink-soft">All posts</Link>
        <h1 className="mt-6 text-4xl leading-tight md:text-5xl">{post.title}</h1>
        <p className="mt-5 text-ink-soft">
          <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.readTime || "5 min read"}
        </p>
        {post.tags?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <li key={t}><Link to={`/blog?tag=${t}`} className="rounded border border-rule bg-paper-deep px-2 py-0.5 text-sm hover:border-ink">{t}</Link></li>
            ))}
          </ul>
        )}
        <div className="prose-paper mt-10 border-t-[1.5px] border-ink pt-10" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <div className="mt-12 flex flex-wrap items-center gap-4 border-t-[1.5px] border-ink pt-8">
          <span className="text-ink-soft">Share</span>
          <a className="btn-lift btn-paper min-h-11 w-11 px-0" aria-label="Share on X" target="_blank" rel="noopener noreferrer"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${url}`}><XIcon /></a>
          <a className="btn-lift btn-paper min-h-11 w-11 px-0" aria-label="Share on LinkedIn" target="_blank" rel="noopener noreferrer"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}><LinkedInIcon /></a>
          <a href="https://www.linkedin.com/newsletters/the-code-report-7197864242228678656/" target="_blank" rel="noopener noreferrer" className="btn-lift btn-signal ml-auto whitespace-nowrap">
            Subscribe to The Code Report
          </a>
        </div>
      </article>
      {toc.length > 3 && (
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24 border-l-[1.5px] border-ink pl-5">
            <p className="mb-3 font-semibold">On this page</p>
            <ul className="space-y-2 text-sm">
              {toc.map((h) => (
                <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
                  <a href={`#${h.id}`} className="text-ink-soft hover:text-ink">{h.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </main>
  );
}
