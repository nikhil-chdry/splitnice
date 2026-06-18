const groups = [
  {
    id: 1,
    icon: "🌴",
    name: "Goa Trip",
    members: "5 members",
    expenses: "12 expenses",
    balance: "You are owed ₹3,250",
    balanceColor: "text-positive",
    background: "bg-lime",
  },
  {
    id: 2,
    icon: "🏠",
    name: "Flatmates",
    members: "3 members",
    expenses: "28 expenses",
    balance: "You owe ₹1,800",
    balanceColor: "text-negative",
    background: "bg-white",
  },
  {
    id: 3,
    icon: "🎉",
    name: "Weekend Plans",
    members: "6 members",
    expenses: "8 expenses",
    balance: "All settled up",
    balanceColor: "text-ink/50",
    background: "bg-white",
  },
];

function GroupsSection() {
  return (
    <section id="groups" className="bg-cream px-5 py-20 text-ink md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-ink/50">
              Shared spaces
            </p>

            <h2 className="text-5xl font-bold tracking-[-0.05em] md:text-7xl">
              Your groups.
            </h2>
          </div>

          <button className="w-fit rounded-full border border-ink/20 px-6 py-3 font-semibold transition hover:bg-ink hover:text-white">
            Create group +
          </button>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {groups.map((group) => (
            <article
              key={group.id}
              className={`${group.background} rounded-3xl border border-ink/10 p-7 transition duration-300 hover:-translate-y-2`}
            >
              <div className="flex items-start justify-between">
                <div className="grid size-16 place-items-center rounded-2xl bg-cream text-3xl">
                  {group.icon}
                </div>

                <button
                  className="grid size-10 place-items-center rounded-full border border-ink/10 text-xl"
                  aria-label={`Open ${group.name}`}
                >
                  ↗
                </button>
              </div>

              <div className="mt-16">
                <h3 className="text-2xl font-bold">{group.name}</h3>

                <p className="mt-2 text-sm text-ink/50">
                  {group.members} · {group.expenses}
                </p>

                <p className={`mt-6 font-semibold ${group.balanceColor}`}>
                  {group.balance}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GroupsSection;