import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { personalData } from "../data/personalData";
import Section from "./Section";

const roles = personalData.journey.filter((item) => item.type === "work");
const teaser = (text) => text.split(". ")[0] + ".";

export default function Journey() {
  return (
    <Section id="journey" title="Experience" intro="Most recent first. Open a role to see what I shipped and the stack behind it.">
      <ol className="border-t-[1.5px] border-ink">
        {roles.map((item, i) => (
          <li key={item.title + item.date} className="border-b-[1.5px] border-ink">
            <Disclosure defaultOpen={i === 0}>
              {({ open }) => (
                <>
                  <DisclosureButton className="role-row grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-start gap-4 px-2 py-6 text-left md:grid-cols-[11rem_minmax(0,1fr)_auto] md:gap-8 md:px-4">
                    <span className="text-ink-soft md:pt-1.5">{item.date}</span>
                    <span className="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
                      <span className="block font-display text-2xl">
                        {item.company}
                        {item.current && <span className="ml-3 rounded border border-ink px-2 py-0.5 align-middle font-sans text-sm">Current</span>}
                      </span>
                      <span className="mt-1 block font-medium">{item.title}</span>
                      {!open && <span className="mt-2 block max-w-2xl text-ink-soft">{teaser(item.description)}</span>}
                    </span>
                    <span className="col-start-2 row-start-1 flex items-center gap-3 md:col-start-3">
                      <span className="hidden text-sm font-medium sm:inline">{open ? "Close" : "Read more"}</span>
                      <span className="role-toggle flex h-10 w-10 items-center justify-center rounded border-2 border-ink" aria-hidden="true">
                        <svg className="role-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                      </span>
                    </span>
                  </DisclosureButton>
                  <DisclosurePanel transition className="role-panel px-2 pb-8 md:pl-[13rem] md:pr-4">
                    <p className="max-w-3xl text-ink-soft">{item.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <li key={t} className="rounded border border-rule bg-paper-deep px-2.5 py-1 text-sm">{t}</li>
                      ))}
                    </ul>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </li>
        ))}
      </ol>
    </Section>
  );
}
