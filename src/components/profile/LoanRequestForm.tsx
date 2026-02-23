import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface LoanRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoanRequestForm = ({ open, onOpenChange }: LoanRequestFormProps) => {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [repaymentMonths, setRepaymentMonths] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Loan Request Submitted", description: `LKR ${parseFloat(amount).toLocaleString()} over ${repaymentMonths} months` });
    setAmount(""); setReason(""); setRepaymentMonths("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Loan Request
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Loan Amount (LKR)</Label>
            <Input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Repayment Period (Months)</Label>
            <Input type="number" placeholder="e.g. 12" value={repaymentMonths} onChange={(e) => setRepaymentMonths(e.target.value)} required min={1} max={60} />
          </div>
          <div className="space-y-2">
            <Label>Reason</Label>
            <Textarea placeholder="Reason for loan request..." value={reason} onChange={(e) => setReason(e.target.value)} required />
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

export default LoanRequestForm;
