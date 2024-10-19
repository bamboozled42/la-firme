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


export default function EditDialog() {
//   const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog> {/* <Dialog open={open} onOpenChange={setOpen}> */}
      <DialogTrigger>
        <Button size="sm" className="ml-2 bg-primary">
            <Icons.pencil className="h-4 w-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto w-5/6 p-8 pt-10">
        <DialogHeader>
          <DialogTitle className="mb-2 leading-relaxed text-left">Edit subcomponent</DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex">
          <Button type="submit" className="mr-1 flex-auto">
            Submit
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
