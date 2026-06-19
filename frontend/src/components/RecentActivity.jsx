export const initialActivities = [
  {
    id: 1,
    icon: "🍽️",
    title: "Dinner at Olive",
    detail: "Nikhil paid ₹2,400 · Goa Trip",
    time: "Today, 8:30 PM",
    balance: "You lent ₹600",
    balanceColor: "text-positive",
  },
  {
    id: 2,
    icon: "🚕",
    title: "Airport cab",
    detail: "Priya paid ₹900 · Goa Trip",
    time: "Yesterday, 4:15 PM",
    balance: "You owe ₹300",
    balanceColor: "text-negative",
  },
  {
    id: 3,
    icon: "🏠",
    title: "June rent",
    detail: "You paid ₹24,000 · Flatmates",
    time: "June 15, 10:00 AM",
    balance: "You lent ₹8,000",
    balanceColor: "text-positive",
  },
  {
    id: 4,
    icon: "✓",
    title: "Payment settled",
    detail: "Arjun paid you ₹1,200",
    time: "June 14, 6:45 PM",
    balance: "Settled",
    balanceColor: "text-ink/50",
  },
];

function RecentActivity({ activities }) {
  return (
    <section
      id="activity"
      className="bg-brand px-5 py-20 text-white md:px-12 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            What’s happening
          </p>

          <h2 className="max-w-md text-5xl font-bold leading-[0.95] tracking-[-0.05em] md:text-7xl">
            Recent Activity.
          </h2>

          <p className="mt-6 max-w-sm leading-7 text-white/60">
            See every expense, payment and settlement shared between your
            groups.
          </p>
        </div>

        <div className="max-h-[24rem] overflow-y-auto overscroll-contain rounded-3xl bg-white text-ink">
          {activities.map((activity) => (
            <article
              key={activity.id}
              className="flex items-center gap-4 border-b border-ink/10 p-5 last:border-none md:p-7"
            >
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-cream text-2xl">
                {activity.icon}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{activity.title}</h3>

                <p className="mt-1 truncate text-sm text-ink/55">
                  {activity.detail}
                </p>

                <p className="mt-1 text-xs text-ink/35">{activity.time}</p>
              </div>

              <p
                className={`shrink-0 text-right text-sm font-semibold ${activity.balanceColor}`}
              >
                {activity.balance}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentActivity;