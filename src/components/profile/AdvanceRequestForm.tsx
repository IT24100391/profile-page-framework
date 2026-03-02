import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { mockUser } from "@/data/mockUser";
import { submitAdvanceRequest } from "@/stores/advanceStore";

interface AdvanceRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdvanceRequestForm = ({ open, onOpenChange }: AdvanceRequestFormProps) => {
  const maxAmount = mockUser.basicSalary * 0.1;
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [forMonth, setForMonth] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount > maxAmount) {
      toast({ title: "Error", description: `Maximum advance is LKR ${maxAmount.toLocaleString()} (10% of salary)`, variant: "destructive" });
      return;
    }
    const today = new Date();
    if (today.getDate() >= 15) {
      toast({ title: "Error", description: "Advance requests are only allowed before the 15th of the month.", variant: "destructive" });
      return;
    }

    submitAdvanceRequest({
      employeeName: mockUser.fullName,
      employeeId: mockUser.id,
      amount: numAmount,
      forMonth,
      reason,
    });

    toast({ title: "Advance Request Submitted", description: `LKR ${numAmount.toLocaleString()} for ${forMonth}. Sent to Area Manager for approval.` });
    setAmount(""); setReason(""); setForMonth("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Advance Request
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Amount (LKR)</Label>
            <Input type="number" placeholder={`Max: ${maxAmount.toLocaleString()}`} value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <p className="text-xs text-muted-foreground">Maximum 10% of basic salary (LKR {maxAmount.toLocaleString()})</p>
          </div>
          <div className="space-y-2">
            <Label>For Month</Label>
            <Input type="month" value={forMonth} onChange={(e) => setForMonth(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Reason</Label>
            <Textarea placeholder="Reason for advance request..." value={reason} onChange={(e) => setReason(e.target.value)} required />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Submit Request</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdvanceRequestForm;
