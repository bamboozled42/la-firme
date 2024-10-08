import ProjectCard from "./projectCard";

export default async function ProjectDashboard() {
  return (
    <div className="flex flex-wrap justify-center">
      <ProjectCard
        title="Sample"
        startDate="2/3/24"
        architect="Eric"
        location="Cambridge, MA"
        clients="t4sg"
        status="Assigned"
        description="description"
      />
      <ProjectCard
        title="Sample"
        startDate="2/3/24"
        architect="Eric"
        location="Cambridge, MA"
        clients="t4sg"
        status="Assigned"
        description="description"
      />
      <ProjectCard
        title="Sample"
        startDate="2/3/24"
        architect="Eric"
        location="Cambridge, MA"
        clients="t4sg"
        status="Assigned"
        description="description"
      />
    </div>
  );
}
