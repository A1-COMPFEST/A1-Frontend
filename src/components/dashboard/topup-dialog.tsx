import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,

  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TopupDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Top Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary font-semibold text-xl text-center">Top Up Detail</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-8">
          <div className="grid grid-cols-1 items-center gap-2">
            <Label htmlFor="amount" className="text-left">
              Amount
            </Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="amount" className="text-right">
                Rp
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="100000"
                className="flex-grow"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Top Up</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}