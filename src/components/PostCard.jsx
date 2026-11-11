import { Link } from "react-router-dom";

export const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function PostCard({ post, headingLevel = "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative flex flex-col rounded-lg border-2 border-ink bg-paper p-6 transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5" style={{ boxShadow: "var(--shadow-lift)" }}>
      <p className="text-sm text-ink-soft">
        <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.readTime || "5 min read"}
      </p>
      <H className="mt-3 text-2xl leading-snug">
        <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {post.title}
        </Link>
      </H>
      <p className="mt-3 line-clamp-3 text-ink-soft">{post.excerpt}</p>
      {post.tags?.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-2 pt-5">
          {post.tags.map((t) => (
            <li key={t} className="rounded border border-rule bg-paper-deep px-2 py-0.5 text-sm">{t}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
