"use client";
import ProjectCard from "./projectCard";
import { createBrowserSupabaseClient } from "../../lib/client-utils";
import {  Project, Column, Beam, Wall, Ceiling} from "../../lib/utils";
import { useState, useEffect } from "react";
import { PostgrestError } from "@supabase/supabase-js";

export type ProjectDashboardType = Project & {
  // I don't think I need to pass in anything other than name
  architect: { first_name: string; last_name: string };
  clients: { first_name: string; last_name: string };
  walls: Wall[] ;
  columns: Column[];
  beams: Beam[];
  ceilings: Ceiling[];
};

export default function ProjectDashboard() {
  const supabase = createBrowserSupabaseClient();
  const [projects, setProjects] = useState<ProjectDashboardType[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);


  useEffect(() => {
    const fetchProjects = async () => {
    let { data: projects, error } = await supabase
    .from('projects')
    .select(`
    *,
    architect:architect_id(first_name, last_name),
    walls(name, height, length),
    columns(name, height, condition),
    beams(name, length),
    ceilings(cracks, dimension_x, dimension_y)`);

    if (error) {
      setError(error);
    }
    else {
      setProjects(projects as unknown as ProjectDashboardType[]);
    }
    }
    fetchProjects();
  }, [supabase]);

  if (error) {
    return <div>Error loading projects...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {
        projects === null ? (
          <div>Loading...</div>
        ) : projects.length === 0 ? (
          <div>No projects found.</div>
        ) : (
          projects?.map((project: ProjectDashboardType) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))
        )
      }
    </div>
  );
}
