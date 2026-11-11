export default function Section({ id, title, intro, children, ink = false }) {
  return (
    <section id={id} className={`${ink ? "ink-band" : ""} border-t-[1.5px] border-rule py-20 md:py-28`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-12">
          <h2 className="text-4xl leading-tight md:text-5xl">{title}</h2>
          {intro && <p className={`max-w-xl self-end text-lg ${ink ? "opacity-75" : "text-ink-soft"}`}>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
