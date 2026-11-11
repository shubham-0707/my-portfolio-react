import { personalData } from "../data/personalData";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" title="Skills" intro="Android and Kotlin day to day, with enough backend and cloud to ship end to end." ink>
      <div className="grid gap-px overflow-hidden rounded-lg border-[1.5px] border-paper/30 bg-paper/30 sm:grid-cols-2 lg:grid-cols-4">
        {personalData.skills.map((group) => (
          <div key={group.category} className="bg-ink p-6">
            <h3 className="mb-4 text-xl">{group.category}</h3>
            <ul className="space-y-2">
              {group.items.map((s) => (
                <li key={s.name}>{s.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
