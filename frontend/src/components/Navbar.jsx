function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-ink/10 bg-cream/90 px-5 py-4 backdrop-blur-xl md:px-12">
      <a href="#dashboard" className="text-2xl font-bold tracking-[-0.06em]">
        SplitNice
      </a>

      <nav className="hidden items-center gap-8 text-sm text-ink/60 md:flex">
        <a className="transition hover:text-ink" href="#dashboard">
          Dashboard
        </a>
        <a className="transition hover:text-ink" href="#groups">
          Groups
        </a>
        <a className="transition hover:text-ink" href="#activity">
          Activity
        </a>
        <a className="transition hover:text-ink" href="#profile">
          Profile
        </a>
      </nav>

      <button className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
        New Expense +
      </button>
    </header>
  );
}

export default Navbar;