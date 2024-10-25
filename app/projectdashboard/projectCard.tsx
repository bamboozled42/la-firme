import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectDashboardType } from "./page";
// import ContentBlob from "./contentBlob";

export default function ProjectCard({
  project,
}: {
  project : ProjectDashboardType;}) {
  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded-lg border-2 p-3 shadow">
      <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
      <h4 className="text-lg font-light">Start date: {project.start_date}</h4>
      <h4 className="text-lg font-light">Assigned Architect: {`${project.architect.first_name} ${project.architect.last_name}`}</h4>
      <h4 className="text-lg font-light">Location: {project.location}</h4>
      <h4 className="text-lg font-light">Clients: {`${project.clients.first_name} ${project.clients.last_name}`}</h4>
      <h4 className="text-lg font-light">Status: {project.status}</h4>
      {/* Flex container to center the DialogTrigger */}
      <div className="mt-4 flex justify-center">
        <Dialog>
          <DialogTrigger className="row-span-1 w-full rounded-2xl border bg-blue-400 p-2">Expand</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">{project.title}</DialogTitle>
              </DialogHeader>
              <DialogTitle>Description</DialogTitle>
              <DialogDescription>{project.description}</DialogDescription>
              <DialogTitle>Location</DialogTitle>
            <DialogDescription>{project.location}</DialogDescription>
            <DialogTitle>Clients</DialogTitle>
            <DialogDescription>{`${project.clients.first_name} ${project.clients.last_name}`}</DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
