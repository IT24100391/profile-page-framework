import { useState } from "react";
import ProfileNavbar from "@/components/profile/ProfileNavbar";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileContent from "@/components/profile/ProfileContent";
import PaysheetHistory from "@/components/profile/PaysheetHistory";
import MonthPaysheet from "@/components/profile/MonthPaysheet";
import GenerateIDCard from "@/components/profile/GenerateIDCard";
import AdvanceRequestForm from "@/components/profile/AdvanceRequestForm";
import LoanRequestForm from "@/components/profile/LoanRequestForm";
import { mockUser } from "@/data/mockUser";

const Index = () => {
  const [activeView, setActiveView] = useState("overview");
  const [advanceOpen, setAdvanceOpen] = useState(false);
  const [loanOpen, setLoanOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleViewChange = (view: string) => {
    if (view === "advance-request") {
      setAdvanceOpen(true);
      return;
    }
    if (view === "loan-request") {
      setLoanOpen(true);
      return;
    }
    setActiveView(view);
  };

  const handleAvatarChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  const renderContent = () => {
    switch (activeView) {
      case "paysheet-history":
        return <div className="flex-1 overflow-auto p-6"><PaysheetHistory /></div>;
      case "month-paysheet":
        return <div className="flex-1 overflow-auto p-6"><MonthPaysheet /></div>;
      case "id-card":
        return <div className="flex-1 overflow-auto p-6"><GenerateIDCard /></div>;
      default:
        return <ProfileContent user={mockUser} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <ProfileNavbar />
      <div className="flex flex-1 overflow-hidden">
        <ProfileSidebar
          user={mockUser}
          activeView={activeView}
          onViewChange={handleViewChange}
          avatarPreview={avatarPreview}
          onAvatarChange={handleAvatarChange}
        />
        {renderContent()}
      </div>
      <AdvanceRequestForm open={advanceOpen} onOpenChange={setAdvanceOpen} />
      <LoanRequestForm open={loanOpen} onOpenChange={setLoanOpen} />
      <footer className="text-center py-3 text-[11px] text-muted-foreground border-t border-border bg-card">
        © 2024 Ace Front Line Security Solutions. All rights reserved. Sri Lanka Operations.
      </footer>
    </div>
  );
};

export default Index;
