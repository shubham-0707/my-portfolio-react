import { personalData } from "../data/personalData";
import Section from "./Section";

export default function Achievements() {
  return (
    <Section id="achievements" title="Recognition" intro="Certifications, community work and writing.">
      <ol className="grid gap-x-12 md:grid-cols-2">
        {personalData.achievements.map((a, i) => (
          <li key={a} className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-b border-rule py-4">
            <span className="font-display text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
            <span>{a}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
