import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { personalData } from "../data/personalData";

const links = [
  { id: "journey", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Recognition" },
  { id: "blog", label: "Writing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const scroll = () => document.getElementById(id)?.scrollIntoView({ block: "start" });
    if (pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 60);
    } else scroll();
  };

  return (
    <header className="sticky top-0 z-40 border-b-[1.5px] border-ink bg-paper">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <Link to="/" className="font-display text-xl font-semibold whitespace-nowrap">
          {personalData.name}
        </Link>
        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`/#${l.id}`} onClick={(e) => go(e, l.id)} className="link-ink font-medium">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/#contact" onClick={(e) => go(e, "contact")} className="btn-lift btn-signal min-h-10 whitespace-nowrap px-4 text-sm">
              Get in touch
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="btn-lift btn-paper min-h-10 px-3 md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
      </nav>

      <Dialog open={open} onClose={setOpen} className="relative z-50 md:hidden">
        <div className="fixed inset-0 bg-ink/40" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 right-0 flex w-full max-w-xs flex-col gap-2 border-l-[1.5px] border-ink bg-paper p-6">
          <button type="button" onClick={() => setOpen(false)} className="btn-lift btn-paper mb-6 min-h-10 self-end px-3" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          {links.map((l) => (
            <a key={l.id} href={`/#${l.id}`} onClick={(e) => go(e, l.id)} className="border-b border-rule py-3 font-display text-2xl">
              {l.label}
            </a>
          ))}
          <a href="/#contact" onClick={(e) => go(e, "contact")} className="btn-lift btn-signal mt-6">
            Get in touch
          </a>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
