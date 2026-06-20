import { useState } from "react";

function SettlementModal({ isOpen, onClose, people, onSettle }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [amount, setAmount] = useState("");

  // Only show people you owe money to
  const owedPeople = people.filter((p) => p.status === "you owe");

  const selectedPersonData = owedPeople.find((p) => p.id === selectedPerson);
  const maxAmount = selectedPersonData?.amount || 0;

  function handleSubmit(event) {
    event.preventDefault();
    const numAmount = Number(amount);

    if (!selectedPerson || !amount || numAmount <= 0) return;
    if (numAmount > maxAmount) return;

    onSettle(selectedPerson, numAmount);
    setSelectedPerson(null);
    setAmount("");
    onClose();
  }

  function handleClose() {
    setSelectedPerson(null);
    setAmount("");
    onClose();
  }

  if (!isOpen) return null;

  const totalOwed = owedPeople.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-cream p-6 text-ink shadow-2xl md:p-9"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold tracking-[-0.05em]">Settle Up</h2>
          <button
            type="button"
            onClick={handleClose}
            className="grid size-11 place-items-center rounded-full border border-ink/15 text-xl transition hover:bg-ink hover:text-white"
          >
            ×
          </button>
        </div>

        {owedPeople.length === 0 ? (
          <p className="mt-6 text-center text-ink/50">
            You don't owe anyone. You're all caught up! 🎉
          </p>
        ) : (
          <>
            <p className="mt-4 text-sm text-ink/50">
              Total outstanding:{" "}
              <span className="font-bold text-ink">
                ₹{totalOwed.toLocaleString("en-IN")}
              </span>
            </p>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div>
                <span className="text-sm font-semibold">Select person</span>
                <div className="mt-3 space-y-2">
                  {owedPeople.map((person) => (
                    <label
                      key={person.id}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl p-4 transition ${
                        selectedPerson === person.id
                          ? "bg-brand text-white"
                          : "bg-white hover:bg-ink/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="settle-person"
                          className="sr-only"
                          checked={selectedPerson === person.id}
                          onChange={() => {
                            setSelectedPerson(person.id);
                            setAmount("");
                          }}
                        />
                        <div
                          className={`${person.avatarColor} grid size-10 place-items-center rounded-full text-sm font-bold text-ink`}
                        >
                          {person.initials}
                        </div>
                        <span className="font-semibold">{person.name}</span>
                      </div>
                      <span className="text-sm font-bold">
                        ₹{person.amount.toLocaleString("en-IN")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-sm font-semibold">Amount</span>
                <div className="mt-2 flex items-center border-b border-ink/20 focus-within:border-brand">
                  <span className="text-2xl font-bold">₹</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*\.?\d{0,2}$/.test(val)) {
                        // Don't allow more than owed amount
                        if (selectedPerson && Number(val) > maxAmount) return;
                        setAmount(val);
                      }
                    }}
                    className="w-full bg-transparent px-3 py-2 text-3xl font-bold outline-none"
                  />
                </div>
                {selectedPerson && (
                  <p className="mt-1 text-xs text-ink/45">
                    Max: ₹{maxAmount.toLocaleString("en-IN")}
                  </p>
                )}
              </label>

              <button
                type="submit"
                disabled={!selectedPerson || !amount || Number(amount) <= 0}
                className="w-full rounded-full bg-positive px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Record Payment
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default SettlementModal;