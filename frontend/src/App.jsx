import { useState } from "react";
import Navbar from "./components/Navbar";
import DashboardHero from "./components/DashboardHero";
import RecentActivity from "./components/RecentActivity";
import GroupsSection from "./components/GroupsSection";
import PeopleSection from "./components/PeopleSection";
import SettleUpSection from "./components/SettleUpSection";
import AddExpenseModal from "./components/AddExpenseModal";

function App() {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  return (
    <>
      <Navbar onNewExpense={() => setIsExpenseModalOpen(true)} />

      <DashboardHero />
      <RecentActivity />
      <GroupsSection />
      <PeopleSection />
      <SettleUpSection />

      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
      />
    </>
  );
}

export default App;