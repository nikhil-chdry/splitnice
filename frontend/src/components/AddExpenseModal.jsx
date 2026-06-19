import { useState } from "react";
import ExpenseCalculator from "./ExpenseCalculator";
import { getExpenseCategory } from "../utils/getExpenseCategory";


const membersByGroup = {
  "Goa Trip": ["You", "Priya", "Arjun", "Riya", "Vikram"],
  Flatmates: ["You", "Arjun", "Riya"],
  "Weekend Plans": ["You", "Priya", "Arjun", "Riya", "Vikram", "Aman"],
};

function AddExpenseModal({ isOpen, onClose,onAddExpense }) {
const [amount, setAmount] = useState("");
const [showCalculator, setShowCalculator] = useState(false);
const [exactAmounts, setExactAmounts] = useState({});
const [description, setDescription] = useState("");
const category = getExpenseCategory(description);
const [group, setGroup] = useState("Goa Trip");
const [splitMethod, setSplitMethod] = useState("Equally");
const [selectedMembers, setSelectedMembers] = useState(
  membersByGroup["Goa Trip"],
);
const amountNumber = Number(amount) || 0;
const amountPerPerson =
  selectedMembers.length > 0
    ? amountNumber / selectedMembers.length
    : 0;
const exactTotal = selectedMembers.reduce(
  (total, member) => total + (Number(exactAmounts[member]) || 0),
  0,
);

const remainingAmount = amountNumber - exactTotal;

const splitIsValid =
  splitMethod === "Equally"
    ? selectedMembers.length > 0
    : splitMethod === "Exact"
      ? selectedMembers.length > 0 &&
        Math.abs(remainingAmount) < 0.01
      : false;    


function updateExactAmount(member, value) {
  if (!/^\d*\.?\d{0,2}$/.test(value)) return;

  setExactAmounts((currentAmounts) => ({
    ...currentAmounts,
    [member]: value,
  }));
}      
function handleGroupChange(event) {
  const selectedGroup = event.target.value;

  setGroup(selectedGroup);
  setSelectedMembers(membersByGroup[selectedGroup]);
  setExactAmounts({});
}

function toggleMember(member) {
  setSelectedMembers((currentMembers) =>
    currentMembers.includes(member)
      ? currentMembers.filter((name) => name !== member)
      : [...currentMembers, member],
  );
}

function resetForm() {
  setDescription("");
  setAmount("");
  setShowCalculator(false);
  setGroup("Goa Trip");
  setSplitMethod("Equally");
  setSelectedMembers(membersByGroup["Goa Trip"]);
  setExactAmounts({});
}
function handleClose() {
  resetForm();
  onClose();
}



function handleSubmit(event) {
  event.preventDefault();

const formattedAmount = Number(amount).toLocaleString("en-IN");

  onAddExpense({
    id: crypto.randomUUID(),
    icon: category.icon,
    title: description.trim(),
    detail: `You paid ₹${formattedAmount} · ${group}`,
    time: "Just now",
    balance: "Expense added",
    balanceColor: "text-ink/50",
  });

resetForm();
onClose();
}



if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="expense-title"
      onMouseDown={handleClose}
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
            onClick={handleClose}
            className="grid size-11 place-items-center rounded-full border border-ink/15 text-xl transition hover:bg-ink hover:text-white"
            aria-label="Close expense form"
          >
            ×
          </button>
        </div>

        <form className="mt-9 space-y-6" onSubmit={handleSubmit}>

<label className="block">
  <span className="text-sm font-semibold">Description</span>

  <div className="mt-2 flex items-center gap-4 border-b border-ink/20 py-2 focus-within:border-brand">
    <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-2xl">
      {category.icon}
    </div>

    <input
      type="text"
      placeholder="Dinner, drinks, taxi..."
      required
      value={description}
      onChange={(event) => setDescription(event.target.value)}
      className="w-full bg-transparent py-3 text-lg outline-none"
    />
  </div>

  <p className="mt-2 text-sm text-ink/45">
    Category: <span className="font-semibold">{category.name}</span>
  </p>
</label>

          <label className="block">
            <span className="text-sm font-semibold">Amount</span>

            <div className="mt-2 flex items-center border-b border-ink/20 focus-within:border-brand">
              <span className="text-3xl font-bold">₹</span>

           <input
           type="text"
          inputMode="decimal"
         placeholder="0.00"
       required
       value={amount}
       onChange={(event) => {
          const value = event.target.value;

        if (/^\d*\.?\d{0,2}$/.test(value)) {
       setAmount(value);
        }
      }}
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
<select
  value={group}
  onChange={handleGroupChange}
  className="mt-2 w-full rounded-2xl border border-ink/15 bg-white p-4 outline-none focus:border-brand"
>
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
          {["Equally", "Exact", "Percentage", "Shares"].map((method) => (
        <label
         key={method}
         className="cursor-pointer rounded-2xl border border-ink/15 bg-white p-4 text-center text-sm font-semibold has-checked:border-brand has-checked:bg-brand has-checked:text-white"
          >
         <input
          className="sr-only"
          type="radio"
          name="split-method"
          value={method}
          checked={splitMethod === method}
          onChange={() => setSplitMethod(method)}
         />

    {method}
  </label>
))}
            </div>
          </fieldset>
     {splitMethod === "Equally" && (
        <fieldset>
    <div className="flex items-center justify-between">
      <legend className="text-sm font-semibold">Split with</legend>

      <span className="text-sm text-ink/50">
        ₹{amountPerPerson.toFixed(2)} each
      </span>
    </div>

    <div className="mt-3 space-y-2">
      {membersByGroup[group].map((member) => (
        <label
          key={member}
          className="flex cursor-pointer items-center justify-between rounded-2xl bg-white p-4"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedMembers.includes(member)}
              onChange={() => toggleMember(member)}
              className="size-4 accent-[#123f3a]"
            />

            <span className="font-semibold">{member}</span>
          </div>

          <span className="text-sm text-ink/50">
            {selectedMembers.includes(member)
              ? `₹${amountPerPerson.toFixed(2)}`
              : "Not included"}
          </span>
        </label>
      ))}
    </div>
   
    {selectedMembers.length === 0 && (
      <p className="mt-3 text-sm font-semibold text-negative">
        Select at least one person.
      </p>
    )}
        </fieldset>
      )}

      {splitMethod === "Exact" && (
  <fieldset>
    <legend className="text-sm font-semibold">Enter exact amounts</legend>

    <div className="mt-3 flex justify-between rounded-2xl bg-white p-4 text-sm">
      <span>Total entered: ₹{exactTotal.toFixed(2)}</span>

      <span
        className={
          Math.abs(remainingAmount) < 0.01
            ? "font-semibold text-positive"
            : "font-semibold text-negative"
        }
      >
        {Math.abs(remainingAmount) < 0.01
          ? "Fully allocated"
          : remainingAmount > 0
            ? `₹${remainingAmount.toFixed(2)} left`
            : `₹${Math.abs(remainingAmount).toFixed(2)} over`}
      </span>
    </div>

    <div className="mt-3 space-y-2">
      {membersByGroup[group].map((member) => {
        const isSelected = selectedMembers.includes(member);

        return (
          <div
            key={member}
            className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4"
          >
            <label className="flex items-center gap-3 font-semibold">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleMember(member)}
                className="size-4 accent-[#123f3a]"
              />

              {member}
            </label>

            <div className="flex items-center border-b border-ink/20">
              <span>₹</span>

              <input
                type="text"
                inputMode="decimal"
                disabled={!isSelected}
                value={exactAmounts[member] ?? ""}
                onChange={(event) =>
                  updateExactAmount(member, event.target.value)
                }
                placeholder="0.00"
                className="w-24 bg-transparent p-2 text-right outline-none disabled:opacity-30"
              />
            </div>
          </div>
        );
      })}
    </div>
  </fieldset>
)}

          <button
            type="submit"
            disabled={!splitIsValid}
            className="w-full rounded-full bg-brand px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;