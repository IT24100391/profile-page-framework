import ProfileNavbar from "@/components/profile/ProfileNavbar";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileContent from "@/components/profile/ProfileContent";
import { mockUser } from "@/data/mockUser";

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <ProfileNavbar />
      <div className="flex flex-1 overflow-hidden">
        <ProfileSidebar user={mockUser} />
        <ProfileContent user={mockUser} />
      </div>
      <footer className="text-center py-3 text-[11px] text-muted-foreground border-t border-border bg-card">
        © 2024 Ace Front Line Security Solutions. All rights reserved. Sri Lanka Operations.
      </footer>
    </div>
  );
};

export default Index;
