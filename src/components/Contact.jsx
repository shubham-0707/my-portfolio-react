import { useState } from "react";
import { Field, Label, Input, Textarea } from "@headlessui/react";
import { personalData } from "../data/personalData";

const fieldClass =
  "mt-2 block w-full rounded-md border-2 border-ink bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/60 focus:outline-none data-[focus]:outline-3 data-[focus]:outline-offset-2 data-[focus]:outline-signal";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = await res.json();
      if (!json.success) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="ink-band py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div>
          <h2 className="text-4xl leading-tight md:text-6xl">Let’s talk.</h2>
          <p className="mt-6 max-w-md text-lg opacity-80">
            Hiring for Android, want a code review, or have a question about a post? Write to me.
          </p>
          <dl className="mt-10 space-y-4">
            <div>
              <dt className="text-sm opacity-60">Email</dt>
              <dd><a href={`mailto:${personalData.email}`} className="link-ink text-lg">{personalData.email}</a></dd>
            </div>
            <div>
              <dt className="text-sm opacity-60">Based in</dt>
              <dd className="text-lg">{personalData.location}</dd>
            </div>
            <div>
              <dt className="text-sm opacity-60">1:1 sessions</dt>
              <dd><a href={personalData.topmate} target="_blank" rel="noopener noreferrer" className="link-ink text-lg">Book on Topmate</a></dd>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border-2 border-paper bg-paper p-6 text-ink md:p-8" style={{ boxShadow: "var(--shadow-lift-on-ink)" }}>
          <input type="hidden" name="access_key" value={personalData.web3formsKey} />
          <input type="hidden" name="subject" value="New message from portfolio" />
          <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" tabIndex={-1} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <Label className="font-medium">Name</Label>
              <Input name="name" required autoComplete="name" className={fieldClass} />
            </Field>
            <Field>
              <Label className="font-medium">Email</Label>
              <Input type="email" name="email" required autoComplete="email" className={fieldClass} />
            </Field>
          </div>
          <Field className="mt-5">
            <Label className="font-medium">Message</Label>
            <Textarea name="message" rows={5} required className={fieldClass} />
          </Field>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === "sending"} className="btn-lift btn-signal" style={{ borderColor: "var(--ink)", boxShadow: "var(--shadow-lift)" }}>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <p role="status" className="text-sm">
              {status === "sent" && "Thanks, your message is on its way."}
              {status === "error" && <span className="text-error">That didn’t send. Try again, or email me directly.</span>}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
