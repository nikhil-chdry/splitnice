import { useState } from "react";
import Navbar from "./components/Navbar";
import DashboardHero from "./components/DashboardHero";
import GroupsSection from "./components/GroupsSection";
import PeopleSection from "./components/PeopleSection";
import SettleUpSection from "./components/SettleUpSection";
import AddExpenseModal from "./components/AddExpenseModal";
import RecentActivity, {
  initialActivities,
} from "./components/RecentActivity";
import CreateGroupModal from "./components/CreateGroupModal";
import SettlementModal from "./components/SettlementModal";
import { initialGroups, initialPeople } from "./data/initialData";

function App() {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isSettlementOpen, setIsSettlementOpen] = useState(false);
  const [activities, setActivities] = useState(initialActivities);
  const [groups, setGroups] = useState(initialGroups);
  const [people, setPeople] = useState(initialPeople);

  function handleAddExpense(newExpense) {
    setActivities((current) => [newExpense, ...current]);
  }

  function handleCreateGroup(newGroup) {
    setGroups((current) => [
      {
        id: crypto.randomUUID(),
        icon: newGroup.icon,
        name: newGroup.name,
        members: "1 member",
        expenses: "0 expenses",
        balance: "All settled up",
        balanceColor: "text-ink/50",
        background: "bg-white",
      },
      ...current,
    ]);
  }

  function handleSettle(personId, settleAmount) {
    setPeople((current) =>
      current.map((person) => {
        if (person.id !== personId) return person;

        const remaining = person.amount - settleAmount;

        if (remaining <= 0) {
          return {
            ...person,
            amount: 0,
            status: "settled up",
            balance: "Settled up",
            balanceColor: "text-ink/40",
            action: "View",
          };
        }

        return {
          ...person,
          amount: remaining,
          status: "you owe",
          balance: `You owe ₹${remaining.toLocaleString("en-IN")}`,
          balanceColor: "text-negative",
          action: "Settle",
        };
      })
    );

    const person = people.find((p) => p.id === personId);
    if (person) {
      setActivities((current) => [
        {
          id: crypto.randomUUID(),
          icon: "💰",
          title: `Payment to ${person.name}`,
          detail: `You paid ₹${settleAmount.toLocaleString("en-IN")}`,
          time: "Just now",
          balance: "Settled",
          balanceColor: "text-ink/50",
        },
        ...current,
      ]);
    }
  }

  const totalOwed = people
    .filter((p) => p.status === "you owe")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <>
      <Navbar onNewExpense={() => setIsExpenseModalOpen(true)} />
      <DashboardHero
        onNewExpense={() => setIsExpenseModalOpen(true)}
        onCreateGroup={() => setIsCreateGroupOpen(true)}
        onSettle={() => setIsSettlementOpen(true)}
      />
      <GroupsSection groups={groups} />
      <PeopleSection people={people} onSettle={() => setIsSettlementOpen(true)} />
      <SettleUpSection totalOwed={totalOwed} onSettle={() => setIsSettlementOpen(true)} />
      <RecentActivity activities={activities} />
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onAddExpense={handleAddExpense}
      />
      <CreateGroupModal
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
      <SettlementModal
        isOpen={isSettlementOpen}
        onClose={() => setIsSettlementOpen(false)}
        people={people}
        onSettle={handleSettle}
      />
    </>
  );
}

export default App;