import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Project, Column, Beam, Wall, Ceiling } from "@/lib/utils";

export default function ProjectCard({
  project,
  walls,
  columns,
  beams,
  ceilings,
}: {
  project : Project;
  walls: Wall[];
  columns: Column[];
  beams: Beam[];
  ceilings: Ceiling[];
}) {
  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded-lg border-2 p-3 shadow">
      <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
      <h4 className="text-lg font-light">Start date: {project.start_date}</h4>
      <h4 className="text-lg font-light">Assigned Architect: {project.architect_id}</h4>
      <h4 className="text-lg font-light">Location: {project.location}</h4>
      <h4 className="text-lg font-light">Clients: {project.client_id}</h4>
      <h4 className="text-lg font-light">Status: {project.status}</h4>
      {/* Flex container to center the DialogTrigger */}
      <div className="mt-4 flex justify-center">
        <Dialog>
          <DialogTrigger className="row-span-1 w-full rounded-2xl border bg-blue-400 p-2">Expand</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Project Description</DialogTitle>
              <DialogDescription>{project.description}</DialogDescription>
              <DialogTitle>Walls</DialogTitle>
              <DialogDescription>{walls.map((wall) => wall.name).join(", ")}</DialogDescription>
              <DialogTitle>Columns</DialogTitle>
              <DialogDescription>{columns.map((column) => column.name).join(", ")}</DialogDescription>
              <DialogTitle>Beams</DialogTitle>
              <DialogDescription>{beams.map((beam) => beam.name).join(", ")}</DialogDescription>
              <DialogTitle>Ceilings</DialogTitle>
              <DialogDescription>{ceilings.map((ceiling) => ceiling.cracks).join(", ")}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
