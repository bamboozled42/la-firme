"use client";
import ProjectCard from "./projectCard";
import { createBrowserSupabaseClient } from "../../lib/client-utils";
import { type Project, type Users } from "../../lib/utils";
import { useState, useEffect } from "react";
import { PostgrestError } from "@supabase/supabase-js";

export default function ProjectDashboard() {
  const supabase = createBrowserSupabaseClient();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [componentDidMount, setComponentDidMount] = useState(false);

  useEffect( () => {
    const fetchProjects = async () => {
    let { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    if (error) {
      setError(error);
    }
    else {
      setProjects(projects);
    }
    }
    fetchProjects();
  }, [componentDidMount]);


  if (error) {
    console.error('Error fetching projects:', error);
    return <div>Error loading projects...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      <h1 className="text-4xl font-semibold mt-8">Projects</h1>
      {projects?.map((project : Project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          startDate={project.start_date}
          architect={"Architect"}
          location={project.location}
          clients={
            "dsds"}
          status={project.status}
          description={project.description}
        />
      ))}
    </div>
  );
}
