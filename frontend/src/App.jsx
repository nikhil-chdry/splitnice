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

function App() {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [activities, setActivities] = useState(initialActivities);

function handleAddExpense(newExpense) {
  setActivities((currentActivities) => [
    newExpense,
    ...currentActivities,
  ]);
}
  return (
    <>
      <Navbar onNewExpense={() => setIsExpenseModalOpen(true)} />
      <DashboardHero />
      <GroupsSection />
      <PeopleSection />
      <SettleUpSection />
      <RecentActivity activities={activities} />
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
       onClose={() => setIsExpenseModalOpen(false)}
       onAddExpense={handleAddExpense}
      />
    </>
  );
}

export default App;