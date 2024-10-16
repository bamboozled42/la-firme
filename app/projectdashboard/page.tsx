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

/*
export default async function ProjectDashboard() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*');

  if (error) {
    console.error('Error fetching projects:', error);
    return <div>Error loading projects...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {projects?.map((project) => (
        <ProjectCard
          key={project.id} 
          title={project.title}
          startDate={project.start_date}
          architect={project.architect}
          location={project.location}
          clients={project.clients}
          status={project.status}
          description={project.description}
        />
      ))}
    </div>
  );
}
*/
