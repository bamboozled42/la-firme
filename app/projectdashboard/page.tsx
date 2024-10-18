"use client";
import ProjectCard from "./projectCard";
import { createBrowserSupabaseClient } from "../../lib/client-utils";
import {  Project, Column, Beam, Wall, Ceiling} from "../../lib/utils";
import { useState, useEffect } from "react";
import { PostgrestError } from "@supabase/supabase-js";

type ProjectDashboardType = Project & {
  // I don't think I need to pass in anything else
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

  useEffect( () => {
    const fetchProjects = async () => {
    let { data: projects, error } = await supabase
    .from('projects')
    .select(`
    *,
    architect:architect_id(first_name, last_name),
    clients:client_id(first_name, last_name),
    walls(walls_project_id, id, name, height, length),
    columns(columns_project_id, id, name, height, condition),
    beams(beams_project_id, id, name, length),
    ceilings(ceilings_project_id, id, cracks, dimension_x, dimension_y)`);

    if (error) {
      setError(error);
    }
    else {
      setProjects(projects as unknown as ProjectDashboardType[]);
    }
    }
    fetchProjects();
  }, [supabase]);

  console.log(projects);
  if (error) {
    console.error('Error fetching projects:', error);
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
              walls={project.walls || []}
              columns={project.columns || []}
              beams={project.beams || []}
              ceilings={project.ceilings || []}
            />
          ))
        )
      }
    </div>
  );
}
