import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProjectCard({
  title,
  startDate,
  architect,
  location,
  clients,
  status,
  description,
}: {
  title: string;
  startDate: string;
  architect: string;
  location: string;
  clients: string;
  status: string;
  description: string;
}) {
  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded-lg border-2 p-3 shadow">
      <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
      <h4 className="text-lg font-light">Start date: {startDate}</h4>
      <h4 className="text-lg font-light">Assigned Architect: {architect}</h4>
      <h4 className="text-lg font-light">Location: {location}</h4>
      <h4 className="text-lg font-light">Clients: {clients}</h4>
      <h4 className="text-lg font-light">Status: {status}</h4>
      {/* Flex container to center the DialogTrigger */}
      <div className="mt-4 flex justify-center">
        <Dialog>
          <DialogTrigger className="row-span-1 w-full rounded-2xl border bg-blue-400 p-2">Expand</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Project Description</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
