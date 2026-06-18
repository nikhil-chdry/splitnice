const balances = [
  {
    label: "Total balance",
    amount: "+₹8,450",
    note: "Overall, you are owed",
    color: "text-positive",
  },
  {
    label: "You owe",
    amount: "₹2,350",
    note: "Across 3 people",
    color: "text-negative",
  },
  {
    label: "You are owed",
    amount: "₹10,800",
    note: "Across 5 people",
    color: "text-positive",
  },
];

function DashboardHero() {
  return (
    <main
      id="dashboard"
      className="min-h-screen bg-cream px-5 py-16 text-ink md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-ink/50">
          Good evening, Nikhil
        </p>

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] md:text-8xl">
            Money between friends, made simple.
          </h1>

          <button className="w-fit rounded-full bg-lime px-6 py-4 font-semibold text-ink transition hover:scale-105">
            Settle up
          </button>
        </div>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {balances.map((balance) => (
            <article
              key={balance.label}
              className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm transition hover:-translate-y-1"
            >
              <p className="text-sm text-ink/50">{balance.label}</p>

              <p
                className={`my-5 text-4xl font-bold tracking-tight ${balance.color}`}
              >
                {balance.amount}
              </p>

              <p className="text-sm text-ink/60">{balance.note}</p>
            </article>
          ))}
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-3">
          <button className="rounded-3xl bg-brand p-6 text-left text-white transition hover:-translate-y-1">
            <span className="text-3xl">＋</span>
            <p className="mt-8 text-xl font-semibold">Add an expense</p>
          </button>

          <button className="rounded-3xl bg-ink p-6 text-left text-white transition hover:-translate-y-1">
            <span className="text-3xl">◎</span>
            <p className="mt-8 text-xl font-semibold">Create a group</p>
          </button>

          <button className="rounded-3xl bg-lime p-6 text-left text-ink transition hover:-translate-y-1">
            <span className="text-3xl">⌁</span>
            <p className="mt-8 text-xl font-semibold">Scan a receipt</p>
          </button>
        </section>
      </div>
    </main>
  );
}

export default DashboardHero;