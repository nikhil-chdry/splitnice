function PeopleSection({ people, onSettle }) {
  return (
    <section id="people" className="bg-white px-5 py-20 text-ink md:px-12 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-ink/45">
            Friends and balances
          </p>
          <h2 className="max-w-md text-5xl font-bold leading-[0.95] tracking-[-0.05em] md:text-7xl">
            Keep everyone square.
          </h2>
          <p className="mt-6 max-w-sm leading-7 text-ink/55">
            Check individual balances, settle debts and send friendly payment
            reminders.
          </p>
          <button className="mt-8 rounded-full bg-brand px-6 py-3 font-semibold text-white">
            Add a friend +
          </button>
        </div>

        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {people.map((person) => (
            <article
              key={person.id}
              className="flex flex-wrap items-center gap-4 py-6"
            >
              <div
                className={`${person.avatarColor} grid size-14 shrink-0 place-items-center rounded-full font-bold`}
              >
                {person.initials}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{person.name}</h3>
                <p className="mt-1 truncate text-sm text-ink/45">
                  {person.groups}
                </p>
              </div>

              <p
                className={`w-full text-sm font-semibold sm:w-auto ${person.balanceColor}`}
              >
                {person.balance}
              </p>

              <button
                onClick={person.action === "Settle" ? onSettle : undefined}
                className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold transition hover:bg-ink hover:text-white"
              >
                {person.action}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PeopleSection;