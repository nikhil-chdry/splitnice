import { useState } from "react";

function ExpenseCalculator({ onUseResult }) {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForValue, setWaitingForValue] = useState(false);

  function formatResult(value) {
    if (!Number.isFinite(value)) return "Error";
    return String(Number(value.toFixed(10)));
  }

  function calculate(left, right, selectedOperator) {
    if (selectedOperator === "+") return left + right;
    if (selectedOperator === "−") return left - right;
    if (selectedOperator === "×") return left * right;
    if (selectedOperator === "÷") return left / right;
    return right;
  }

  function enterDigit(digit) {
    if (display === "Error" || display === "0" || waitingForValue) {
      setDisplay(digit);
      setWaitingForValue(false);
      return;
    }

    setDisplay((current) => current + digit);
  }

  function enterDecimal() {
    if (display === "Error" || waitingForValue) {
      setDisplay("0.");
      setWaitingForValue(false);
    } else if (!display.includes(".")) {
      setDisplay((current) => current + ".");
    }
  }

  function chooseOperator(nextOperator) {
    const currentValue = Number(display);

    if (storedValue === null) {
      setStoredValue(currentValue);
    } else if (operator && !waitingForValue) {
      const result = calculate(storedValue, currentValue, operator);
      const formattedResult = formatResult(result);

      setDisplay(formattedResult);
      setStoredValue(Number(formattedResult));
    }

    setOperator(nextOperator);
    setWaitingForValue(true);
  }

  function showResult() {
    if (operator === null || storedValue === null) return;

    const result = calculate(storedValue, Number(display), operator);

    setDisplay(formatResult(result));
    setStoredValue(null);
    setOperator(null);
    setWaitingForValue(true);
  }

  function clearCalculator() {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForValue(false);
  }

  function deleteDigit() {
    if (display === "Error" || waitingForValue) return;

    setDisplay((current) =>
      current.length === 1 ? "0" : current.slice(0, -1),
    );
  }

  function calculatePercentage() {
    if (display === "Error") return;
    setDisplay(formatResult(Number(display) / 100));
  }

  const buttonStyle =
    "rounded-2xl bg-white p-4 font-semibold transition hover:bg-ink hover:text-white";
  const hasLiveCalculation =
  storedValue !== null &&
  operator !== null &&
  !waitingForValue &&
  display !== "Error";

const liveResult = hasLiveCalculation
  ? formatResult(calculate(storedValue, Number(display), operator))
  : display;

const calculationIncomplete =
  operator !== null && waitingForValue;



  return (
    <div className="rounded-3xl bg-ink p-5 text-white">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            Calculator
          </p>

              <p className="mt-2 text-sm text-white/50">
             {storedValue !== null && operator
              ? `${storedValue} ${operator} ${
            waitingForValue ? "…" : display
              }`
            : "Enter an amount"}
           </p>
        </div>

        <p className="max-w-[70%] overflow-hidden text-right text-4xl font-bold">
          {display}
        </p>
      </div>

      <div className="text-lg grid grid-cols-4 gap-2 text-ink">
        <button type="button" className={buttonStyle} onClick={clearCalculator}>
          C
        </button>

        <button type="button" className={buttonStyle} onClick={deleteDigit}>
          ⌫
        </button>

        <button
          type="button"
          className={buttonStyle}
          onClick={calculatePercentage}
        >
          %
        </button>

        <button
          type="button"
          className="rounded-2xl bg-lime p-4 font-bold"
          onClick={() => chooseOperator("÷")}
        >
          ÷
        </button>

        {[7, 8, 9].map((digit) => (
          <button
            type="button"
            className={buttonStyle}
            key={digit}
            onClick={() => enterDigit(String(digit))}
          >
            {digit}
          </button>
        ))}

        <button
          type="button"
          className="rounded-2xl bg-lime p-4 font-bold"
          onClick={() => chooseOperator("×")}
        >
          ×
        </button>

        {[4, 5, 6].map((digit) => (
          <button
            type="button"
            className={buttonStyle}
            key={digit}
            onClick={() => enterDigit(String(digit))}
          >
            {digit}
          </button>
        ))}

        <button
          type="button"
          className="rounded-2xl bg-lime p-4 font-bold"
          onClick={() => chooseOperator("−")}
        >
          −
        </button>

        {[1, 2, 3].map((digit) => (
          <button
            type="button"
            className={buttonStyle}
            key={digit}
            onClick={() => enterDigit(String(digit))}
          >
            {digit}
          </button>
        ))}

        <button
          type="button"
          className="rounded-2xl bg-lime p-4 font-bold"
          onClick={() => chooseOperator("+")}
        >
          +
        </button>

        <button
          type="button"
          className={`${buttonStyle} col-span-2`}
          onClick={() => enterDigit("0")}
        >
          0
        </button>

        <button type="button" className={buttonStyle} onClick={enterDecimal}>
          .
        </button>

        <button
          type="button"
          className="rounded-2xl bg-lime p-4 font-bold"
          onClick={showResult}
        >
          =
        </button>
      </div>

           <button
          type="button"
         disabled={display === "Error" || calculationIncomplete}
           onClick={() => onUseResult(liveResult)}
          className="mt-4 w-full rounded-full border border-white/20 py-3 font-semibold transition hover:bg-white hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
             >
           {calculationIncomplete
            ? "Enter the next value"
          : `Use ₹${liveResult}`}
        </button>
    </div>
  );
}

export default ExpenseCalculator;