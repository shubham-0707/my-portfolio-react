import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import SEO from "./SEO";
import PostCard from "./PostCard";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag") || "all";

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/posts.json").then((r) => r.json()).then(setPosts).catch(() => {});
  }, []);

  const tags = useMemo(() => {
    const s = new Set();
    posts.forEach((p) => p.tags?.forEach((t) => s.add(t)));
    return ["all", ...Array.from(s).sort()];
  }, [posts]);

  const filtered = activeTag === "all" ? posts : posts.filter((p) => p.tags?.includes(activeTag));
  const setTag = (t) => setSearchParams(t === "all" ? {} : { tag: t });

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <SEO
        title="Blog"
        description="Technical articles on Android development, Kotlin, Jetpack Compose, career advice, and software engineering by Shubham Singh."
        url="/blog"
        type="blog"
      />
      <Link to="/" className="link-ink text-ink-soft">Back to home</Link>
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-5xl md:text-6xl">Writing</h1>
          <p className="mt-4 text-lg text-ink-soft">Notes on Android, Kotlin and engineering careers.</p>
        </div>
        {tags.length > 1 && (
          <Listbox value={activeTag} onChange={setTag}>
            <div className="relative w-56">
              <ListboxButton className="btn-lift btn-paper w-full justify-between">
                <span>{activeTag === "all" ? "All topics" : activeTag}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
              </ListboxButton>
              <ListboxOptions anchor="bottom end" className="z-50 mt-2 w-56 rounded-md border-2 border-ink bg-paper p-1 focus:outline-none" style={{ boxShadow: "var(--shadow-lift)" }}>
                {tags.map((t) => (
                  <ListboxOption key={t} value={t} className="cursor-pointer rounded px-3 py-2 data-[focus]:bg-paper-deep data-[selected]:font-semibold">
                    {t === "all" ? "All topics" : t}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        )}
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => <PostCard key={p.slug} post={p} headingLevel="h2" />)}
      </div>
      {posts.length > 0 && filtered.length === 0 && <p className="mt-12 text-ink-soft">No posts tagged "{activeTag}".</p>}
    </main>
  );
}
