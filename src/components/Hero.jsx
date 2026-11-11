import { personalData } from "../data/personalData";
import { GitHubIcon, LinkedInIcon, XIcon } from "./Icons";

const socials = [
  { href: personalData.github, label: "GitHub", Icon: GitHubIcon },
  { href: personalData.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: personalData.twitter, label: "X (Twitter)", Icon: XIcon },
];

export default function Hero() {
  return (
    <section id="home" className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:py-28 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:py-24">
      <div>
        <h1 className="text-5xl leading-[1.05] md:text-7xl">I build Android apps for millions.</h1>
        <p className="mt-6 max-w-xl text-xl text-ink-soft">
          Android engineer at PhonePe in Bengaluru, previously at Glance.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="btn-lift btn-signal">Get in touch</a>
          <a href={personalData.resumeUrl} download className="btn-lift btn-ink">Download resume</a>
          <a href={personalData.newsletter} target="_blank" rel="noopener noreferrer" className="btn-lift btn-paper">Read the newsletter</a>
        </div>
        <ul className="mt-10 flex gap-3" aria-label="Social profiles">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="btn-lift btn-paper min-h-11 w-11 px-0">
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <figure className="mx-auto w-full max-w-sm">
        <div className="overflow-hidden rounded-lg border-2 border-ink bg-paper-deep" style={{ boxShadow: "var(--shadow-lift-hover)" }}>
          <img
            src={personalData.profilePic}
            alt="Shubham Singh"
            width="420"
            height="420"
            className="aspect-square w-full object-cover grayscale-[15%]"
          />
        </div>
        <dl className="mt-8 grid grid-cols-3 gap-4 border-t-[1.5px] border-ink pt-4">
          {personalData.stats.map((s) => (
            <div key={s.label}>
              <dt className="text-sm text-ink-soft">{s.label}</dt>
              <dd className="font-display text-2xl">{s.count.toLocaleString()}{s.plus ? "+" : ""}</dd>
            </div>
          ))}
        </dl>
      </figure>
    </section>
  );
}
