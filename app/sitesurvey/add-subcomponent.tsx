import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


export default function AddDialog() {
//   const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog> {/* <Dialog open={open} onOpenChange={setOpen}> */}
      <DialogTrigger asChild>
        <span>
            <Button size="sm" className="ml-2 bg-green-700 text-green-50">
                <Icons.add className="mr-2 h-5 w-5"/> Add
            </Button>
        </span>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto w-5/6 p-8 pt-10">
        <DialogHeader>
          <DialogTitle className="mb-2 leading-relaxed text-left">Add subcomponent</DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex">
          <Button type="submit" className="mr-1 flex-auto bg-green-700 text-green-50">
            Add
          </Button>
          <DialogClose asChild>
            <Button type="button" className="ml-1 flex-auto" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
