import { Helmet } from "react-helmet-async";

const SITE_URL = "https://shubham-0707.github.io";
const DEFAULT_IMAGE = `${SITE_URL}/favicon-512.png`;

export default function SEO({
  title,
  description,
  url,
  image,
  type = "website",
  article,
  jsonLd,
}) {
  const fullTitle = title
    ? `${title} — Shubham Singh`
    : "Shubham Singh — SDE (Android) @ PhonePe | Android Developer & Tech Blogger";
  const desc =
    description ||
    "Portfolio of Shubham Singh — SDE at PhonePe, ex-Glance (InMobi). Android Developer, Kotlin Enthusiast, Tech Blogger. Author of The Code Report newsletter with 4,300+ subscribers.";
  const canonical = url ? `${SITE_URL}${url}` : SITE_URL;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Shubham Singh" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@shubham0707_11" />
      <meta name="twitter:creator" content="@shubham0707_11" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article specific */}
      {article && <meta property="article:published_time" content={article.date} />}
      {article?.tags?.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}
      {article && <meta property="article:author" content="Shubham Singh" />}

      {/* Additional SEO */}
      <meta name="author" content="Shubham Singh" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#0f766e" />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

// Pre-built JSON-LD schemas
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shubham Singh",
  url: SITE_URL,
  image: `${SITE_URL}/favicon-512.png`,
  jobTitle: "Software Development Engineer (Android)",
  worksFor: {
    "@type": "Organization",
    name: "PhonePe",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Dr. A.P.J. Abdul Kalam Technical University",
  },
  knowsAbout: [
    "Android Development",
    "Kotlin",
    "Jetpack Compose",
    "Java",
    "Mobile Engineering",
  ],
  sameAs: [
    "https://github.com/shubham-0707",
    "https://www.linkedin.com/in/shubham-0707",
    "https://x.com/shubham0707_11",
    "https://topmate.io/shubham0707",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Shubham Singh",
  url: SITE_URL,
  description:
    "Portfolio of Shubham Singh — SDE at PhonePe, ex-Glance (InMobi). Android Developer, Kotlin Enthusiast, Tech Blogger.",
  author: { "@type": "Person", name: "Shubham Singh" },
};

export function blogPostSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Shubham Singh",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Shubham Singh",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
    wordCount: post.content?.split(/\s+/).length || 0,
    timeRequired: post.readTime || "PT5M",
  };
}

export { SITE_URL };
