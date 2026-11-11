import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Section from "./Section";
import PostCard from "./PostCard";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/posts.json").then((r) => r.json()).then(setPosts).catch(() => {});
  }, []);

  return (
    <Section id="blog" title="Writing" intro="Notes on Android, Kotlin and engineering careers.">
      {posts.length === 0 ? (
        <p className="text-ink-soft">No posts yet.</p>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
          <div className="mt-12">
            <Link to="/blog" className="btn-lift btn-ink">All {posts.length} posts</Link>
          </div>
        </>
      )}
    </Section>
  );
}
