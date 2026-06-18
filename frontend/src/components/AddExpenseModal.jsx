import { useState } from "react";
import ExpenseCalculator from "./ExpenseCalculator";




function AddExpenseModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  function handleSubmit(event) {
    event.preventDefault();
  }
const [amount, setAmount] = useState("");
const [showCalculator, setShowCalculator] = useState(false);
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="expense-title"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-cream p-6 text-ink shadow-2xl md:p-9"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/45">
              New transaction
            </p>

            <h2
              id="expense-title"
              className="mt-3 text-4xl font-bold tracking-[-0.05em]"
            >
              Add an expense
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full border border-ink/15 text-xl transition hover:bg-ink hover:text-white"
            aria-label="Close expense form"
          >
            ×
          </button>
        </div>

        <form className="mt-9 space-y-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold">Description</span>
            <input
              type="text"
              placeholder="Dinner, drinks, taxi..."
              required
              className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-lg outline-none transition focus:border-brand"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Amount</span>

            <div className="mt-2 flex items-center border-b border-ink/20 focus-within:border-brand">
              <span className="text-3xl font-bold">₹</span>

            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              required
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="w-full bg-transparent px-3 py-3 text-4xl font-bold outline-none"
               />
            </div>
          </label>

          <button
           type="button"
           onClick={() => setShowCalculator((current) => !current)}
           className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold"
            >
          {showCalculator ? "Close calculator" : "Open calculator"}
          </button>

         {showCalculator && (
         <ExpenseCalculator
          onUseResult={(result) => {
           setAmount(result);
           setShowCalculator(false);
          }}
           />
             )}

          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <span className="text-sm font-semibold">Group</span>
              <select className="mt-2 w-full rounded-2xl border border-ink/15 bg-white p-4 outline-none focus:border-brand">
                <option>Goa Trip</option>
                <option>Flatmates</option>
                <option>Weekend Plans</option>
              </select>
            </label>

            <label>
              <span className="text-sm font-semibold">Paid by</span>
              <select className="mt-2 w-full rounded-2xl border border-ink/15 bg-white p-4 outline-none focus:border-brand">
                <option>You</option>
                <option>Priya Sharma</option>
                <option>Arjun Kumar</option>
              </select>
            </label>
          </div>

          <fieldset>
            <legend className="text-sm font-semibold">Split method</legend>

            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
              {["Equally", "Exact", "Percentage", "Shares"].map(
                (splitMethod) => (
                  <label
                    key={splitMethod}
                    className="cursor-pointer rounded-2xl border border-ink/15 bg-white p-4 text-center text-sm font-semibold has-checked:border-brand has-checked:bg-brand has-checked:text-white"
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      name="split-method"
                      value={splitMethod}
                      defaultChecked={splitMethod === "Equally"}
                    />

                    {splitMethod}
                  </label>
                ),
              )}
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full rounded-full bg-brand px-6 py-4 font-semibold text-white transition hover:opacity-90"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;