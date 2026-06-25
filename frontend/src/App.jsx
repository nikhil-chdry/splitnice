import { useAuth } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar";
import DashboardHero from "./components/DashboardHero";
import GroupsSection from "./components/GroupsSection";
import PeopleSection from "./components/PeopleSection";
import SettleUpSection from "./components/SettleUpSection";
import AddExpenseModal from "./components/AddExpenseModal";
import RecentActivity, { initialActivities } from "./components/RecentActivity";
import CreateGroupModal from "./components/CreateGroupModal";
import SettlementModal from "./components/SettlementModal";
import AuthPage from "./pages/AuthPage";
import { initialGroups, initialPeople } from "./data/initialData";
import { useState } from "react";

function App() {
  const { user, isLoggedIn, logout } = useAuth();
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isSettlementOpen, setIsSettlementOpen] = useState(false);

  // Show auth page if not logged in
  if (!isLoggedIn) {
    return <AuthPage />;
  }

  return (
    <>
      <Navbar
        onNewExpense={() => setIsExpenseModalOpen(true)}
        user={user}
        onLogout={logout}
      />
      <DashboardHero
        onNewExpense={() => setIsExpenseModalOpen(true)}
        onCreateGroup={() => setIsCreateGroupOpen(true)}
        onSettle={() => setIsSettlementOpen(true)}
      />
      <GroupsSection groups={initialGroups} />
      <PeopleSection people={initialPeople} onSettle={() => setIsSettlementOpen(true)} />
      <SettleUpSection totalOwed={2350} onSettle={() => setIsSettlementOpen(true)} />
      <RecentActivity activities={initialActivities} />
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onAddExpense={(expense) => console.log("Add expense:", expense)}
      />
      <CreateGroupModal
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onCreateGroup={(group) => console.log("Create group:", group)}
      />
      <SettlementModal
        isOpen={isSettlementOpen}
        onClose={() => setIsSettlementOpen(false)}
        people={initialPeople}
        onSettle={(id, amount) => console.log("Settle:", id, amount)}
      />
    </>
  );
}

export default App;