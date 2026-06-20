function SettleUpSection({ totalOwed, onSettle }) {
  return (
    <section id="settle" className="bg-ink px-5 py-20 text-white md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
          Clear your balance
        </p>

        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <h2 className="max-w-4xl text-5xl font-bold leading-[0.92] tracking-[-0.06em] md:text-8xl">
              No awkward conversations. Just settle up.
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/55">
              Review what you owe, record a payment and keep everyone's balance
              accurate.
            </p>
          </div>

          <div className="rounded-3xl bg-lime p-7 text-ink">
            <p className="text-sm font-semibold text-ink/55">
              Your outstanding balance
            </p>

            <p className="my-6 text-5xl font-bold tracking-tight">
              ₹{totalOwed.toLocaleString("en-IN")}
            </p>

            <div className="mb-7 flex items-center justify-between border-t border-ink/15 pt-5 text-sm">
              <span>Across {totalOwed > 0 ? "some" : "no"} people</span>
              <span>Payments</span>
            </div>

            <button
              onClick={onSettle}
              className="w-full rounded-full bg-brand px-6 py-4 font-semibold text-white transition hover:scale-[1.02]"
            >
              Settle your balances
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettleUpSection;