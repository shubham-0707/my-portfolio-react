import { personalData } from "../data/personalData";

export default function Footer() {
  return (
    <footer className="ink-band border-t border-paper/20">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-xl">{personalData.name}</p>
        <ul className="flex flex-wrap gap-6">
          <li><a className="link-ink" href={personalData.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a className="link-ink" href={personalData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a className="link-ink" href={personalData.twitter} target="_blank" rel="noopener noreferrer">X</a></li>
          <li><a className="link-ink" href={personalData.newsletter} target="_blank" rel="noopener noreferrer">The Code Report</a></li>
        </ul>
        <p className="text-sm opacity-60">&copy; {new Date().getFullYear()} {personalData.name}</p>
      </div>
    </footer>
  );
}
