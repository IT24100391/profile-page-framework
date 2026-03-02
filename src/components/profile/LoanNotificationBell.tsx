import { useState, useEffect } from "react";
import { getSecurityNotifications, markNotificationRead, markAllNotificationsRead, subscribeLoanStore } from "@/stores/loanStore";
import { getAdvanceNotifications, markAdvanceNotificationRead, markAllAdvanceNotificationsRead, subscribeAdvanceStore } from "@/stores/advanceStore";
import { LoanNotification } from "@/data/loanData";
import { AdvanceNotification } from "@/data/advanceData";
import { Bell, CheckCircle, XCircle, DollarSign, Banknote, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

type CombinedNotification = {
  id: number;
  message: string;
  status: string;
  timestamp: string;
  read: boolean;
  type: "loan" | "advance";
};

const LoanNotificationBell = () => {
  const [loanNotifs, setLoanNotifs] = useState<LoanNotification[]>(getSecurityNotifications());
  const [advanceNotifs, setAdvanceNotifs] = useState<AdvanceNotification[]>(getAdvanceNotifications());

  useEffect(() => {
    const unsub1 = subscribeLoanStore(() => setLoanNotifs(getSecurityNotifications()));
    const unsub2 = subscribeAdvanceStore(() => setAdvanceNotifs(getAdvanceNotifications()));
    return () => { unsub1(); unsub2(); };
  }, []);

  const combined: CombinedNotification[] = [
    ...loanNotifs.map((n) => ({ ...n, type: "loan" as const })),
    ...advanceNotifs.map((n) => ({ ...n, type: "advance" as const })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const unreadCount = combined.filter((n) => !n.read).length;

  const handleMarkRead = (n: CombinedNotification) => {
    if (n.type === "loan") markNotificationRead(n.id);
    else markAdvanceNotificationRead(n.id);
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    markAllAdvanceNotificationsRead();
  };

  const getIcon = (n: CombinedNotification) => {
    if (n.type === "advance") return <Banknote className="w-4 h-4 text-primary shrink-0" />;
    switch (n.status) {
      case "APPROVED": return <CheckCircle className="w-4 h-4 text-[hsl(var(--success))] shrink-0" />;
      case "REJECTED": return <XCircle className="w-4 h-4 text-destructive shrink-0" />;
      default: return <DollarSign className="w-4 h-4 text-primary shrink-0" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-[9px] font-bold text-white flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-bold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-7 text-primary" onClick={handleMarkAllRead}>
              <Check className="w-3 h-3 mr-1" />Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="max-h-80">
          {combined.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground text-sm">
              <Bell className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
              No notifications yet
            </div>
          ) : (
            <div className="divide-y divide-border">
              {combined.map((n) => (
                <button
                  key={`${n.type}-${n.id}`}
                  className={`w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors ${!n.read ? "bg-primary/5" : ""}`}
                  onClick={() => handleMarkRead(n)}
                >
                  <div className="flex gap-3">
                    {getIcon(n)}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs leading-relaxed ${!n.read ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {n.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="h-4 px-1.5 text-[9px] bg-muted text-muted-foreground border-0">
                          {n.type === "loan" ? "Loan" : "Advance"}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{formatTime(n.timestamp)}</span>
                        {!n.read && (
                          <Badge className="h-4 px-1.5 text-[9px] bg-primary/15 text-primary border-0">NEW</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default LoanNotificationBell;
